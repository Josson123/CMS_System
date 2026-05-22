from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import LabTestCategory, LabTest, LabTestPrescription
from .serializers import (
    LabTestCategorySerializer,
    LabTestSerializer,
    LabTestPrescriptionSerializer
)


@api_view(['GET', 'POST'])
def api_labtest_categories(request):

    if request.method == 'GET':
        categories = LabTestCategory.objects.all()
        serializer = LabTestCategorySerializer(categories, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = LabTestCategorySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def api_labtest_category_detail(request, pk):

    try:
        category = LabTestCategory.objects.get(id=pk)
    except LabTestCategory.DoesNotExist:
        return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = LabTestCategorySerializer(category, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def api_labtests(request):

    if request.method == 'GET':
        labtests = LabTest.objects.all()

        if request.GET.get('active') == 'true':
            labtests = labtests.filter(is_active=True)

        serializer = LabTestSerializer(labtests, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = LabTestSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def api_labtest_detail(request, pk):

    try:
        labtest = LabTest.objects.get(id=pk)
    except LabTest.DoesNotExist:
        return Response({'error': 'Lab test not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = LabTestSerializer(labtest, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        labtest.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def api_labtest_prescriptions(request):

    if request.method == 'GET':
        doctor_id = request.GET.get('doctor_id')
        active_only = request.GET.get('active') == 'true'

        prescriptions = LabTestPrescription.objects.all()

        if doctor_id:
            prescriptions = prescriptions.filter(
                appointment__doctor_id=doctor_id
            )

        if active_only:
            prescriptions = prescriptions.filter(
                is_active=True,
                appointment__is_active=True,
                appointment__patient__is_active=True,
                appointment__doctor__is_active=True
            )

        serializer = LabTestPrescriptionSerializer(
            prescriptions,
            many=True
        )

        return Response(serializer.data)

    if request.method == 'POST':
        serializer = LabTestPrescriptionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def api_update_lab_result(request, pk):

    prescription = LabTestPrescription.objects.get(id=pk)

    prescription.lab_test_value = request.data.get(
        'lab_test_value',
        prescription.lab_test_value
    )

    prescription.remarks = request.data.get(
        'remarks',
        prescription.remarks
    )

    prescription.save()

    serializer = LabTestPrescriptionSerializer(prescription)

    return Response(serializer.data)