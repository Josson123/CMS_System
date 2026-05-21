from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import (
    Patient,
    Appointment,
    ConsultationBill
)

from .serializers import (
    PatientSerializer,
    AppointmentSerializer,
    ConsultationBillSerializer
)

from pharmacy.models import MedicinePrescription
from laboratory.models import LabTestPrescription


@api_view(['GET', 'POST'])
def api_patients(request):

    if request.method == 'GET':
        patients = Patient.objects.all()
        serializer = PatientSerializer(
            patients,
            many=True
        )
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = PatientSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET', 'POST'])
def api_appointments(request):

    if request.method == 'GET':

        doctor_id = request.GET.get('doctor_id')

        appointments = Appointment.objects.all()

        if doctor_id:
            appointments = appointments.filter(
                doctor_id=doctor_id
            )

        serializer = AppointmentSerializer(
            appointments,
            many=True
        )

        return Response(serializer.data)

    if request.method == 'POST':

        serializer = AppointmentSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


def calculate_bill_amounts(appointment):

    consultation_fee = appointment.doctor.consultation_fee

    medicine_prescriptions = MedicinePrescription.objects.filter(
        appointment=appointment,
        is_active=True
    )

    medicine_charge = 0

    for prescription in medicine_prescriptions:

        medicine_charge += (
            prescription.medicine.price *
            prescription.quantity
        )

    lab_prescriptions = LabTestPrescription.objects.filter(
        appointment=appointment,
        is_active=True
    )

    lab_charge = 0

    for prescription in lab_prescriptions:

        lab_charge += (
            prescription.lab_test.amount
        )

    total_amount = (
        consultation_fee +
        medicine_charge +
        lab_charge
    )

    return (
        consultation_fee,
        medicine_charge,
        lab_charge,
        total_amount
    )


@api_view(['GET'])
def api_bill_preview(request):

    appointment_id = request.GET.get('appointment')

    try:

        appointment = Appointment.objects.get(
            id=appointment_id
        )

        (
            consultation_fee,
            medicine_charge,
            lab_charge,
            total_amount
        ) = calculate_bill_amounts(appointment)

        return Response({
            "consultation_fee": consultation_fee,
            "medicine_charge": medicine_charge,
            "lab_charge": lab_charge,
            "total_amount": total_amount
        })

    except Appointment.DoesNotExist:

        return Response(
            {"error": "Appointment not found"},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET', 'POST'])
def api_bills(request):

    if request.method == 'GET':

        bills = ConsultationBill.objects.all()

        serializer = ConsultationBillSerializer(
            bills,
            many=True
        )

        return Response(serializer.data)

    if request.method == 'POST':

        appointment_id = request.data.get(
            'appointment'
        )

        try:

            appointment = Appointment.objects.get(
                id=appointment_id
            )

            (
                consultation_fee,
                medicine_charge,
                lab_charge,
                total_amount
            ) = calculate_bill_amounts(appointment)

            bill = ConsultationBill.objects.create(
                appointment=appointment,
                consultation_fee=consultation_fee,
                medicine_charge=medicine_charge,
                lab_charge=lab_charge,
                total_amount=total_amount,
                payment_status=request.data.get(
                    'payment_status',
                    'Pending'
                ),
                is_active=True
            )

            serializer = ConsultationBillSerializer(
                bill
            )

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        except Appointment.DoesNotExist:

            return Response(
                {"error": "Appointment not found"},
                status=status.HTTP_400_BAD_REQUEST
            )