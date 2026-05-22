from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Role, Staff
from .serializers import RoleSerializer, StaffSerializer
from doctors.models import Doctor


@api_view(['POST'])
def api_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        staff = Staff.objects.get(
            username=username,
            password=password,
            is_active=True
        )

        doctor_id = None

        if staff.role.role_name == 'Doctor':
            doctor = Doctor.objects.filter(staff=staff).first()
            if doctor:
                doctor_id = doctor.id

        return Response({
            "message": "Login successful",
            "staff_id": staff.id,
            "doctor_id": doctor_id,
            "full_name": staff.full_name,
            "username": staff.username,
            "role": staff.role.role_name
        })

    except Staff.DoesNotExist:
        return Response(
            {"error": "Invalid username or password"},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET', 'POST'])
def api_roles(request):

    if request.method == 'GET':
        roles = Role.objects.all()
        serializer = RoleSerializer(roles, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = RoleSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def api_role_detail(request, pk):

    try:
        role = Role.objects.get(id=pk)
    except Role.DoesNotExist:
        return Response({'error': 'Role not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = RoleSerializer(role, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        role.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def api_staff(request):

    if request.method == 'GET':
        role_name = request.GET.get('role')

        staffs = Staff.objects.all()

        if role_name:
            staffs = staffs.filter(role__role_name=role_name)

        serializer = StaffSerializer(staffs, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = StaffSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def api_staff_detail(request, pk):

    try:
        staff = Staff.objects.get(id=pk)
    except Staff.DoesNotExist:
        return Response({'error': 'Staff not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = StaffSerializer(staff, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        staff.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)