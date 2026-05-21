from rest_framework import serializers

from .models import (
    Medicine,
    MedicineStock,
    MedicinePrescription
)


class MedicineSerializer(serializers.ModelSerializer):
    medicine_category_name = serializers.CharField(
        source='medicine_category.medicine_category_name',
        read_only=True
    )

    class Meta:
        model = Medicine
        fields = '__all__'


class MedicineStockSerializer(serializers.ModelSerializer):
    medicine_name = serializers.CharField(
        source='medicine.medicine_name',
        read_only=True
    )

    class Meta:
        model = MedicineStock
        fields = '__all__'


class MedicinePrescriptionSerializer(serializers.ModelSerializer):
    medicine_name = serializers.CharField(
        source='medicine.medicine_name',
        read_only=True
    )

    patient_name = serializers.CharField(
        source='appointment.patient.patient_name',
        read_only=True
    )

    doctor_name = serializers.CharField(
        source='appointment.doctor.staff.full_name',
        read_only=True
    )

    class Meta:
        model = MedicinePrescription
        fields = '__all__'