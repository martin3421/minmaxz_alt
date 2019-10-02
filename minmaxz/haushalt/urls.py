from django.urls import path
from rest_framework import routers
from .api import BuchungViewSet
from . import views

app_name = 'haushalt'
urlpatterns = [
    path('data_import/<modus>/', views.data_import, name='data_import'),
]

router = routers.DefaultRouter()
router.register('api/buchungen', BuchungViewSet, 'buchungen')

urlpatterns += router.urls