from django.urls import path
from . import views

urlpatterns = [
    path('api/patients/', views.api_patients, name='api_patients'),
    path('api/appointments/', views.api_appointments, name='api_appointments'),
    path('api/bills/', views.api_bills, name='api_bills'),
    path('api/bills/preview/', views.api_bill_preview, name='api_bill_preview'),
]