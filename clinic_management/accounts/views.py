from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Staff
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