from rest_framework import serializers
from haushalt.models import Buchung, Konto, DeviseWertpapier

# Buchung Serializer


class BuchungSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buchung
        fields = ('id', 'datum', 'beschreibung', 'betrag',
                  'konto1', 'konto1_name', 'konto2', 'konto2_name')
    konto1_name = serializers.SerializerMethodField('get_konto1_name')
    konto2_name = serializers.SerializerMethodField('get_konto2_name')

    def get_konto1_name(self, obj):
        return obj.konto1.name

    def get_konto2_name(self, obj):
        return obj.konto2.name


# Konto Serializer
class KontoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Konto
        fields = '__all__'


# Devise/Wertpapier Serializer
class DeviseWertpapierSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeviseWertpapier
        fields = '__all__'
