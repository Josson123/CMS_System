from rest_framework import serializers

from .models import Patient, Appointment, ConsultationBill


class PatientSerializer(serializers.ModelSerializer):
    membership_name = serializers.CharField(
        source='membership.membership_type',
        read_only=True
    )

    class Meta:
        model = Patient
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(
        source='patient.patient_name',
        read_only=True
    )

    doctor_name = serializers.CharField(
        source='doctor.staff.full_name',
        read_only=True
    )

    doctor_fee = serializers.DecimalField(
        source='doctor.consultation_fee',
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = Appointment
        fields = '__all__'


class ConsultationBillSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(
        source='appointment.patient.patient_name',
        read_only=True
    )

    doctor_name = serializers.CharField(
        source='appointment.doctor.staff.full_name',
        read_only=True
    )

    class Meta:
        model = ConsultationBill
        fields = '__all__'