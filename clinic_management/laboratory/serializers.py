from rest_framework import serializers

from .models import LabTest, LabTestPrescription


class LabTestSerializer(serializers.ModelSerializer):
    lab_test_category_name = serializers.CharField(
        source='lab_test_category.lab_test_category_name',
        read_only=True
    )

    class Meta:
        model = LabTest
        fields = '__all__'


class LabTestPrescriptionSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(
        source='appointment.patient.patient_name',
        read_only=True
    )

    doctor_name = serializers.CharField(
        source='appointment.doctor.staff.full_name',
        read_only=True
    )

    lab_test_name = serializers.CharField(
        source='lab_test.test_name',
        read_only=True
    )

    class Meta:
        model = LabTestPrescription
        fields = '__all__'