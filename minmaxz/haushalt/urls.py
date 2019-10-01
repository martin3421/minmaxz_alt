from django.urls import path

from . import views

app_name = 'haushalt'
urlpatterns = [
    path('data_import/<modus>/', views.data_import, name='data_import'),
]
