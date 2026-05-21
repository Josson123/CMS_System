from django.db import models


class LabTestCategory(models.Model):

    lab_test_category_name = models.CharField(max_length=100)

    def __str__(self):
        return self.lab_test_category_name


class LabTest(models.Model):

    test_name = models.CharField(max_length=150)

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    reference_min_range = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    reference_max_range = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    sample_required = models.CharField(max_length=100)

    lab_test_category = models.ForeignKey(
        LabTestCategory,
        on_delete=models.CASCADE
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.test_name


class LabTestPrescription(models.Model):

    lab_test = models.ForeignKey(
        LabTest,
        on_delete=models.CASCADE
    )

    lab_test_value = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    created_date = models.DateField(auto_now_add=True)

    remarks = models.TextField(
        blank=True,
        null=True
    )

    appointment = models.ForeignKey(
        'reception.Appointment',
        on_delete=models.CASCADE
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.lab_test.test_name