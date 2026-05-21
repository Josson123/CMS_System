from django.contrib import admin
from .models import Specialization, Doctor, Consultation

admin.site.register(Specialization)
admin.site.register(Doctor)
admin.site.register(Consultation)