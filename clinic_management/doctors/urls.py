from django.urls import path
from . import views

urlpatterns = [
    path('api/consultations/', views.api_consultations, name='api_consultations'),
    path('api/doctors/', views.api_doctors, name='api_doctors'),
    path('api/doctors/<int:pk>/', views.api_doctor_detail, name='api_doctor_detail'),
    path('api/specializations/', views.api_specializations, name='api_specializations'),
    path(
        'api/specializations/<int:pk>/',
        views.api_specialization_detail,
        name='api_specialization_detail'
    ),
]