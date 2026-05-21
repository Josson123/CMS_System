from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def home(request):
    return JsonResponse({
        "message": "Clinic Management System Backend is running"
    })


urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),

    path('', include('accounts.urls')),
    path('', include('reception.urls')),
    path('', include('doctors.urls')),
    path('', include('pharmacy.urls')),
    path('', include('laboratory.urls')),
]