from django.db import models
from django.contrib.auth.models import User
import datetime


# Create your models here.
class KontoTyp(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Kontotypen'


class DeviseWertpapierTyp(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Devisen/Wertpapiertypen'


class DeviseWertpapier(models.Model):
    name = models.CharField(max_length=100, unique=True)
    anzeigesymbol = models.CharField(max_length=50)
    wertpapiertyp = models.ForeignKey(
        DeviseWertpapierTyp, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=50, unique=True)
    stueckelung = models.IntegerField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Devisen/Wertpapiere'


class Konto(models.Model):
    kontotyp = models.ForeignKey(KontoTyp, on_delete=models.CASCADE)
    elternkonto = models.ForeignKey('self', on_delete=models.CASCADE,
                                    null=True, blank=True, related_name='eltern_konto')
    ebene = models.IntegerField()
    name = models.CharField(max_length=100)
    beschreibung = models.CharField(max_length=100, null=True, blank=True)
    devise_wertpapier = models.ForeignKey(
        DeviseWertpapier, on_delete=models.CASCADE)
    steuerrelevant = models.BooleanField(default=False)
    platzhalter = models.BooleanField(default=False)
    owner = models.ForeignKey(
        User, related_name='konten', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Konten'
        ordering = ['name', ]
        constraints = [
            models.UniqueConstraint(
                fields=['name', 'owner'], name="konto_owner")
        ]


class Buchung(models.Model):
    datum = models.DateField(default=datetime.date.today)
    konto1 = models.ForeignKey(
        Konto, on_delete=models.SET_NULL, related_name='abbuchung', null=True)
    konto2 = models.ForeignKey(
        Konto, on_delete=models.SET_NULL, related_name='zubuchung', null=True)
    nummer = models.IntegerField(null=True, blank=True)
    bemerkung = models.CharField(max_length=100, null=True, blank=True)
    buchungstext = models.CharField(max_length=100, null=True, blank=True)
    beschreibung = models.CharField(max_length=100, default='')
    is_multibuchung = models.BooleanField(default=False)
    betrag = models.FloatField()

    def __str__(self):
        date_time = self.datum.strftime("%d.%m.%Y")
        return date_time + '_' + self.beschreibung

    class Meta:
        verbose_name_plural = 'Buchungen'
        ordering = ['datum', ]


class MultiBuchung(models.Model):
    multibuchung_id = models.IntegerField()
    buchung = models.ForeignKey(Buchung, on_delete=models.CASCADE)
