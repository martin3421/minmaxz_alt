from haushalt.models import Buchung, Konto
from rest_framework import viewsets, permissions
from .serializers import BuchungSerializer, KontoSerializer

# Lead Viewset


class BuchungViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = BuchungSerializer

    def get_queryset(self):
        return Buchung.objects.filter(konto1__owner=self.request.user)

    """def perform_create(self, serializer):
        serializer.save(owner=self.request.user)"""


class KontoViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = KontoSerializer

    def get_queryset(self):
        return Konto.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
