from django.contrib import admin
from .models import Membership, Patient, Appointment, ConsultationBill

admin.site.register(Membership)
admin.site.register(Patient)
admin.site.register(Appointment)
admin.site.register(ConsultationBill)