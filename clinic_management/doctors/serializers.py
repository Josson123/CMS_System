from rest_framework import serializers
from .models import Consultation, Doctor, Specialization


class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = '__all__'


class DoctorSerializer(serializers.ModelSerializer):
    staff_name = serializers.CharField(
        source='staff.full_name',
        read_only=True
    )

    specialization_name = serializers.CharField(
        source='specialization.specialization_name',
        read_only=True
    )

    class Meta:
        model = Doctor
        fields = '__all__'


class ConsultationSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(
        source='appointment.patient.patient_name',
        read_only=True
    )

    doctor_name = serializers.CharField(
        source='appointment.doctor.staff.full_name',
        read_only=True
    )

    class Meta:
        model = Consultation
        fields = '__all__'