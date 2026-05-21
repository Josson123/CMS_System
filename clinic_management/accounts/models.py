from django.db import models


class Role(models.Model):

    role_name = models.CharField(max_length=100)

    is_active = models.BooleanField(default=True)

    def __str__(self):

        return self.role_name


class Staff(models.Model):

    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
    )

    full_name = models.CharField(max_length=200)

    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES
    )

    joining_date = models.DateField()

    mobile_number = models.CharField(max_length=15)

    username = models.CharField(max_length=100)

    password = models.CharField(max_length=128)

    role = models.ForeignKey(
        Role,
        on_delete=models.CASCADE
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):

        return self.full_name