from django.urls import path
from . import views

urlpatterns = [
    path('api/login/', views.api_login, name='api_login'),
    path('api/roles/', views.api_roles, name='api_roles'),
    path('api/roles/<int:pk>/', views.api_role_detail, name='api_role_detail'),
    path('api/staff/', views.api_staff, name='api_staff'),
    path('api/staff/<int:pk>/', views.api_staff_detail, name='api_staff_detail'),
]