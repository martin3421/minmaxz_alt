from haushalt.models import Buchung, Konto
from rest_framework import viewsets, permissions
from .serializers import BuchungSerializer, KontoSerializer

# Lead Viewset


class BuchungViewSet(viewsets.ModelViewSet):
    queryset = Buchung.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = BuchungSerializer

    """def get_queryset(self):
        return self.request.user.leads.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)"""


class KontoViewSet(viewsets.ModelViewSet):
    queryset = Konto.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = KontoSerializer
