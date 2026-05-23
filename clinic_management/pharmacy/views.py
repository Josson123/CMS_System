from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import (
    MedicineCategory,
    Medicine,
    MedicineStock,
    MedicinePrescription
)

from .serializers import (
    MedicineCategorySerializer,
    MedicineSerializer,
    MedicineStockSerializer,
    MedicinePrescriptionSerializer
)


@api_view(['GET', 'POST'])
def api_medicine_categories(request):

    if request.method == 'GET':
        categories = MedicineCategory.objects.all()
        serializer = MedicineCategorySerializer(categories, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = MedicineCategorySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def api_medicine_category_detail(request, pk):

    try:
        category = MedicineCategory.objects.get(id=pk)
    except MedicineCategory.DoesNotExist:
        return Response({'error': 'Medicine category not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = MedicineCategorySerializer(category, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def api_medicines(request):

    if request.method == 'GET':
        medicines = Medicine.objects.all()

        if request.GET.get('active') == 'true':
            medicines = medicines.filter(is_active=True)

        serializer = MedicineSerializer(medicines, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = MedicineSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def api_medicine_detail(request, pk):

    try:
        medicine = Medicine.objects.get(id=pk)
    except Medicine.DoesNotExist:
        return Response({'error': 'Medicine not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = MedicineSerializer(medicine, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        medicine.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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


@api_view(['PUT', 'DELETE'])
def api_medicine_stock_detail(request, pk):

    try:
        stock = MedicineStock.objects.get(id=pk)
    except MedicineStock.DoesNotExist:
        return Response({'error': 'Stock not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = MedicineStockSerializer(stock, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        stock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def api_medicine_prescriptions(request):

    if request.method == 'GET':

        doctor_id = request.GET.get('doctor_id')
        active_only = request.GET.get('active') == 'true'

        prescriptions = MedicinePrescription.objects.all()

        if doctor_id:
            prescriptions = prescriptions.filter(
                appointment__doctor_id=doctor_id
            )

        if active_only:
            prescriptions = prescriptions.filter(
                is_active=True,
                appointment__is_active=True,
                appointment__patient__is_active=True,
                appointment__doctor__is_active=True
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


@api_view(['PUT', 'DELETE'])
def api_medicine_prescription_detail(request, pk):

    try:
        prescription = MedicinePrescription.objects.get(id=pk)
    except MedicinePrescription.DoesNotExist:
        return Response({'error': 'Prescription not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = MedicinePrescriptionSerializer(prescription, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        prescription.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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