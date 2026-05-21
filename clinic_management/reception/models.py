from django.db import models


class Membership(models.Model):
    membership_type = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.membership_type


class Patient(models.Model):
    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
    )

    patient_name = models.CharField(max_length=200)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    mobile_number = models.CharField(max_length=15)
    address = models.TextField()

    membership = models.ForeignKey(
        Membership,
        on_delete=models.CASCADE
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.patient_name


class Appointment(models.Model):
    STATUS_CHOICES = (
        ('Scheduled', 'Scheduled'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    )

    appointment_date = models.DateField()
    token_number = models.PositiveIntegerField()

    consultation_status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Scheduled'
    )

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE
    )

    doctor = models.ForeignKey(
        'doctors.Doctor',
        on_delete=models.CASCADE
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.patient.patient_name} - {self.doctor.staff.full_name}"


class ConsultationBill(models.Model):
    appointment = models.ForeignKey(
        Appointment,
        on_delete=models.CASCADE
    )

    consultation_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    medicine_charge = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    lab_charge = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    bill_date = models.DateField(auto_now_add=True)

    payment_status = models.CharField(
        max_length=50,
        default='Pending'
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Bill - {self.appointment.patient.patient_name}"