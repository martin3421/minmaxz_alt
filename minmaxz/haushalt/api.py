from haushalt.models import Buchung, Konto, DeviseWertpapier
from rest_framework import viewsets, permissions
from .serializers import BuchungSerializer, KontoSerializer, DeviseWertpapierSerializer


class BuchungenListe(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = BuchungSerializer

    def get_queryset(self):
        buchungen = Buchung.objects.filter(konto1__owner=1).\
            order_by('beschreibung', '-datum').distinct('beschreibung')
        for idx, buchung in enumerate(buchungen):
            buchungen[idx].id = idx
        return buchungen


class BuchungViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = BuchungSerializer

    def get_queryset(self):
        return Buchung.objects.filter(konto1__owner=self.request.user)


class KontoViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = KontoSerializer

    def get_queryset(self):
        return Konto.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class DeviseWertpapierViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = DeviseWertpapierSerializer

    def get_queryset(self):
        return DeviseWertpapier.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
