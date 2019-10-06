from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('haushalt/', include('haushalt.urls', namespace='haushalt')),
    path('', include('frontend.urls')),
    path('', include('accounts.urls')),
]
