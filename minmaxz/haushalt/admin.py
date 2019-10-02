from django.contrib import admin

from .models import Konto, DeviseWertpapierTyp, DeviseWertpapier, KontoTyp, Buchung

admin.site.register(Konto)
admin.site.register(DeviseWertpapierTyp)
admin.site.register(DeviseWertpapier)
admin.site.register(KontoTyp)
admin.site.register(Buchung)
