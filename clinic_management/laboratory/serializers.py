from rest_framework import serializers

from .models import LabTestCategory, LabTest, LabTestPrescription


class LabTestCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTestCategory
        fields = '__all__'


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

    reference_min_range = serializers.CharField(
        source='lab_test.reference_min_range',
        read_only=True
    )

    reference_max_range = serializers.CharField(
        source='lab_test.reference_max_range',
        read_only=True
    )

    class Meta:
        model = LabTestPrescription
        fields = '__all__'