# minmaxz
CREATE DATABASE minmax WITH OWNER=minmax LC_COLLATE='de_DE.UTF-8' LC_CTYPE='de_DE.UTF-8' ENCODING='UTF8';
b = Buchung.objects.order_by('datum').distinct('beschreibung')
