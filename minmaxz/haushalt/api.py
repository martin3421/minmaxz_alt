from haushalt.models import Buchung
from rest_framework import viewsets, permissions
from .serializers import BuchungSerializer

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