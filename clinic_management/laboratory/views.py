from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import LabTest, LabTestPrescription
from .serializers import LabTestSerializer, LabTestPrescriptionSerializer


@api_view(['GET', 'POST'])
def api_labtests(request):

    if request.method == 'GET':
        labtests = LabTest.objects.all()
        serializer = LabTestSerializer(labtests, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = LabTestSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def api_labtest_prescriptions(request):

    if request.method == 'GET':
        doctor_id = request.GET.get('doctor_id')

        prescriptions = LabTestPrescription.objects.all()

        if doctor_id:
            prescriptions = prescriptions.filter(
                appointment__doctor_id=doctor_id
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