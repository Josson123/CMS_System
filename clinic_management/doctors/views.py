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