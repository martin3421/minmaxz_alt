from rest_framework import serializers
from haushalt.models import Buchung

# Lead Serializer
class BuchungSerializer(serializers.ModelSerializer):
  class Meta:
    model = Buchung 
    fields = '__all__'