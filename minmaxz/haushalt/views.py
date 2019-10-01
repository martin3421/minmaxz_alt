from django.shortcuts import render
import os
import pandas as pd
import numpy as np
from haushalt.models import KontoTyp, DeviseWertpapierTyp, DeviseWertpapier, Konto


# Create your views here.
def data_import(request, modus):
    print(os.getcwd())
    konten = pd.read_csv(
        '/home/martin/Dokumente/dbmodeldev/dbdev/haushalt/konten.csv', delimiter=';')
    konten_header = list(konten.columns.values)
#    print(konten_header)
    if modus == 'import':
        konto_typen = konten.Typ.unique()
        for typ in konto_typen:
            #            print(typ)
            obj, created = KontoTyp.objects.get_or_create(
                name=typ,
            )
        wertpapier_typen = konten['Devise/Wertpapier N'].unique()
        for typ in wertpapier_typen:
            #            print(typ)
            obj, created = DeviseWertpapierTyp.objects.get_or_create(
                name=typ,
            )
        for index, row in konten.iterrows():
            #print(type(row['Beschreibung']), row['Beschreibung'])
            parent_idx = row['Vollständige_Bezeichnung'].rfind(':')
            if parent_idx != -1:
                prefix = row['Vollständige_Bezeichnung'][:parent_idx]
                parent_parent_idx = prefix.rfind(':')
                if parent_parent_idx == -1:
                    parent = Konto.objects.get(name=prefix)
                else:
                    parent = Konto.objects.get(
                        name=prefix[parent_parent_idx+1:])
            else:
                parent = None
            if row['Devise/Wertpapier N'] == 'EUREX':
                obj, created = DeviseWertpapier.objects.get_or_create(
                    name=row['Name'],
                    symbol=row['Devise/Wertpapier M'],
                    wertpapiertyp=DeviseWertpapierTyp.objects.get(
                        name='EUREX'),
                    stueckelung=10000
                )
            if np.isnan(row['Kontonummer']):
                konto_nr = None
            else:
                konto_nr = row['Kontonummer']
            if isinstance(row['Beschreibung'], str):
                beschr = row['Beschreibung']
            else:
                beschr = None
            if np.isnan(row['Bemerkung']):
                bemerk = None
            else:
                bemerk = row['Bemerkung']
            if row['Versteckt'] == 'F':
                verst = False
            else:
                verst = True
            if row['Steuerrelevant'] == 'F':
                strelev = False
            else:
                strelev = True
            if row['Platzhalter'] == 'F':
                plzhalt = False
            else:
                plzhalt = True
            print(row['Typ'], parent, row['Name'], konto_nr, beschr,
                  bemerk, row['Devise/Wertpapier M'], verst, strelev, plzhalt)
            obj, created = Konto.objects.get_or_create(
                kontotyp=KontoTyp.objects.get(name=row['Typ']),
                elternkonto=parent,
                name=row['Name'],
                kontonummer=konto_nr,
                beschreibung=beschr,
                bemerkung=bemerk,
                devise_wertpapier=DeviseWertpapier.objects.get(
                    symbol=row['Devise/Wertpapier M']),
                versteckt=verst,
                steuerrelevant=strelev,
                platzhalter=plzhalt,
            )

    return render(request, 'haushalt/data_import.html', {'konten': konten.values,
                                                         'konten_header': konten_header})
