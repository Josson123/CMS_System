from django.db import models


class MedicineCategory(models.Model):
    medicine_category_name = models.CharField(max_length=100)

    def __str__(self):
        return self.medicine_category_name


class Medicine(models.Model):
    medicine_name = models.CharField(max_length=150)
    manufacturing_date = models.DateField()
    expiry_date = models.DateField()
    unit = models.CharField(max_length=50)

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    medicine_category = models.ForeignKey(
        MedicineCategory,
        on_delete=models.CASCADE
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.medicine_name


class MedicinePrescription(models.Model):
    medicine = models.ForeignKey(
        Medicine,
        on_delete=models.CASCADE
    )

    dosage = models.CharField(max_length=100)
    frequency = models.CharField(max_length=100)
    duration = models.CharField(max_length=100)

    quantity = models.IntegerField(default=1)

    appointment = models.ForeignKey(
        'reception.Appointment',
        on_delete=models.CASCADE
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.medicine.medicine_name


class MedicineStock(models.Model):
    stock_in_hand = models.IntegerField()
    reorder_level = models.IntegerField()
    purchase = models.IntegerField(default=0)
    issuance = models.IntegerField(default=0)

    medicine = models.ForeignKey(
        Medicine,
        on_delete=models.CASCADE
    )

    created_date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.medicine.medicine_name