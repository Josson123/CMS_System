from django.urls import path
from . import views

urlpatterns = [
    path('api/patients/', views.api_patients, name='api_patients'),
    path('api/patients/<int:pk>/', views.api_patient_detail, name='api_patient_detail'),
    path('api/appointments/', views.api_appointments, name='api_appointments'),
    path('api/appointments/<int:pk>/', views.api_appointment_detail, name='api_appointment_detail'),
    path('api/bills/', views.api_bills, name='api_bills'),
    path('api/bills/<int:pk>/', views.api_bill_detail, name='api_bill_detail'),
    path('api/bills/preview/', views.api_bill_preview, name='api_bill_preview'),
]