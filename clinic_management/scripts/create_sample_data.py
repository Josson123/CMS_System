from accounts.models import Role, Staff
from reception.models import Membership, Patient
from doctors.models import Doctor
from django.utils import timezone

# Roles
r, _ = Role.objects.get_or_create(role_name='Receptionist')
d, _ = Role.objects.get_or_create(role_name='Doctor')

# Staff
staff, created = Staff.objects.get_or_create(
    username='admin',
    defaults={
        'full_name': 'Admin User',
        'gender': 'Male',
        'joining_date': timezone.now().date(),
        'mobile_number': '0000000000',
        'password': 'admin',
        'role': r,
        'is_active': True
    }
)

# Membership
m, _ = Membership.objects.get_or_create(membership_type='Regular')

# Patient
p, _ = Patient.objects.get_or_create(
    patient_name='John Doe',
    defaults={
        'date_of_birth': '1990-01-01',
        'gender': 'Male',
        'mobile_number': '1234567890',
        'address': '123 Main St',
        'membership': m,
        'is_active': True
    }
)

# If doctors app has Doctor model with staff FK, try to create one
try:
    doc, _ = Doctor.objects.get_or_create(
        staff=staff,
        defaults={
            'qualification': 'MBBS',
            'is_active': True
        }
    )
except Exception:
    pass

print('Sample data created/verified')
