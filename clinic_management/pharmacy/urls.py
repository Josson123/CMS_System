from django.urls import path
from . import views

urlpatterns = [
    path(
        'api/medicines/',
        views.api_medicines,
        name='api_medicines'
    ),

    path(
        'api/medicine-stocks/',
        views.api_medicine_stocks,
        name='api_medicine_stocks'
    ),

    path(
        'api/medicine-prescriptions/',
        views.api_medicine_prescriptions,
        name='api_medicine_prescriptions'
    ),

    path(
        'api/medicine-stocks/dispense/',
        views.api_dispense_medicine,
        name='api_dispense_medicine'
    ),
]