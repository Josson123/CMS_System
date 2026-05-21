from django.contrib import admin
from .models import LabTestCategory, LabTest, LabTestPrescription

admin.site.register(LabTestCategory)
admin.site.register(LabTest)
admin.site.register(LabTestPrescription)