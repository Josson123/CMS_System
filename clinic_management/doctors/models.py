from django.db import models

from accounts.models import Staff


class Specialization(models.Model):
    specialization_name = models.CharField(max_length=100)

    def __str__(self):
        return self.specialization_name


class Doctor(models.Model):
    staff = models.ForeignKey(
        Staff,
        on_delete=models.CASCADE
    )

    consultation_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    specialization = models.ForeignKey(
        Specialization,
        on_delete=models.CASCADE
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.staff.full_name


class Consultation(models.Model):
    symptoms = models.TextField()

    diagnosis = models.TextField()

    notes = models.TextField(
        blank=True,
        null=True
    )

    created_date = models.DateField(
        auto_now_add=True
    )

    appointment = models.ForeignKey(
        'reception.Appointment',
        on_delete=models.CASCADE
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.appointment.patient.patient_name