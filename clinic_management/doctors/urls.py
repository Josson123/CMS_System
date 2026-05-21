from django.urls import path
from . import views

urlpatterns = [
    path('api/consultations/', views.api_consultations, name='api_consultations'),
    path('api/doctors/', views.api_doctors, name='api_doctors'),
    path('api/specializations/', views.api_specializations, name='api_specializations'),
]