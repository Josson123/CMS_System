from django.urls import path
from . import views

urlpatterns = [
    path(
        'api/medicine-categories/',
        views.api_medicine_categories,
        name='api_medicine_categories'
    ),

    path(
        'api/medicine-categories/<int:pk>/',
        views.api_medicine_category_detail,
        name='api_medicine_category_detail'
    ),

    path(
        'api/medicines/',
        views.api_medicines,
        name='api_medicines'
    ),

    path(
        'api/medicines/<int:pk>/',
        views.api_medicine_detail,
        name='api_medicine_detail'
    ),

    path(
        'api/medicine-stocks/',
        views.api_medicine_stocks,
        name='api_medicine_stocks'
    ),

    path(
        'api/medicine-stocks/<int:pk>/',
        views.api_medicine_stock_detail,
        name='api_medicine_stock_detail'
    ),

    path(
        'api/medicine-prescriptions/',
        views.api_medicine_prescriptions,
        name='api_medicine_prescriptions'
    ),

    path(
        'api/medicine-prescriptions/<int:pk>/',
        views.api_medicine_prescription_detail,
        name='api_medicine_prescription_detail'
    ),

    path(
        'api/medicine-stocks/dispense/',
        views.api_dispense_medicine,
        name='api_dispense_medicine'
    ),
]