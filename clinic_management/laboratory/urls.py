from django.urls import path
from . import views

urlpatterns = [
    path(
        'api/labtest-categories/',
        views.api_labtest_categories,
        name='api_labtest_categories'
    ),

    path(
        'api/labtest-categories/<int:pk>/',
        views.api_labtest_category_detail,
        name='api_labtest_category_detail'
    ),

    path('api/labtests/', views.api_labtests, name='api_labtests'),

    path('api/labtests/<int:pk>/', views.api_labtest_detail, name='api_labtest_detail'),

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