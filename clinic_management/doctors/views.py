from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Consultation, Doctor, Specialization
from .serializers import (
    ConsultationSerializer,
    DoctorSerializer,
    SpecializationSerializer
)


@api_view(['GET', 'POST'])
def api_consultations(request):

    if request.method == 'GET':
        doctor_id = request.GET.get('doctor_id')

        if doctor_id:
            consultations = Consultation.objects.filter(
                appointment__doctor_id=doctor_id
            )
        else:
            consultations = Consultation.objects.all()

        serializer = ConsultationSerializer(consultations, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ConsultationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def api_consultation_detail(request, pk):

    try:
        consultation = Consultation.objects.get(id=pk)
    except Consultation.DoesNotExist:
        return Response({'error': 'Consultation not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ConsultationSerializer(consultation, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        consultation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def api_doctors(request):

    if request.method == 'GET':
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = DoctorSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def api_doctor_detail(request, pk):

    try:
        doctor = Doctor.objects.get(id=pk)
    except Doctor.DoesNotExist:
        return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = DoctorSerializer(doctor, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        doctor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def api_specializations(request):

    if request.method == 'GET':
        specializations = Specialization.objects.all()
        serializer = SpecializationSerializer(specializations, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = SpecializationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def api_specialization_detail(request, pk):

    try:
        specialization = Specialization.objects.get(id=pk)
    except Specialization.DoesNotExist:
        return Response({'error': 'Specialization not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = SpecializationSerializer(
            specialization,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        specialization.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)