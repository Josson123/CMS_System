from django.contrib import admin
from .models import MedicineCategory, Medicine, MedicinePrescription, MedicineStock

admin.site.register(MedicineCategory)
admin.site.register(Medicine)
admin.site.register(MedicinePrescription)
admin.site.register(MedicineStock)