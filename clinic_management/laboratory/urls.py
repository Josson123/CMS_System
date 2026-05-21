from django.urls import path
from . import views

urlpatterns = [
    path('api/labtests/', views.api_labtests, name='api_labtests'),

    path(
        'api/labtest-prescriptions/',
        views.api_labtest_prescriptions,
        name='api_labtest_prescriptions'
    ),

    path(
        'api/labtest-prescriptions/<int:pk>/result/',
        views.api_update_lab_result,
        name='api_update_lab_result'
    ),
]