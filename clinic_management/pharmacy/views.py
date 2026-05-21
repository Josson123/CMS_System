from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import (
    Medicine,
    MedicineStock,
    MedicinePrescription
)

from .serializers import (
    MedicineSerializer,
    MedicineStockSerializer,
    MedicinePrescriptionSerializer
)


@api_view(['GET', 'POST'])
def api_medicines(request):

    if request.method == 'GET':
        medicines = Medicine.objects.all()
        serializer = MedicineSerializer(medicines, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = MedicineSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def api_medicine_stocks(request):

    if request.method == 'GET':
        stocks = MedicineStock.objects.all()
        serializer = MedicineStockSerializer(stocks, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = MedicineStockSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def api_medicine_prescriptions(request):

    if request.method == 'GET':

        doctor_id = request.GET.get('doctor_id')

        prescriptions = MedicinePrescription.objects.all()

        if doctor_id:
            prescriptions = prescriptions.filter(
                appointment__doctor_id=doctor_id
            )

        serializer = MedicinePrescriptionSerializer(
            prescriptions,
            many=True
        )

        return Response(serializer.data)

    if request.method == 'POST':

        serializer = MedicinePrescriptionSerializer(
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


@api_view(['POST'])
def api_dispense_medicine(request):

    medicine_id = request.data.get('medicine')

    quantity = int(request.data.get('quantity', 0))

    try:

        stock = MedicineStock.objects.get(
            medicine_id=medicine_id
        )

        if stock.stock_in_hand < quantity:

            return Response(
                {"error": "Not enough stock available"},
                status=status.HTTP_400_BAD_REQUEST
            )

        stock.stock_in_hand = (
            stock.stock_in_hand - quantity
        )

        stock.issuance = (
            stock.issuance + quantity
        )

        stock.save()

        serializer = MedicineStockSerializer(stock)

        return Response({
            "message": "Medicine dispensed successfully",
            "stock": serializer.data
        })

    except MedicineStock.DoesNotExist:

        return Response(
            {"error": "Stock record not found"},
            status=status.HTTP_404_NOT_FOUND
        )