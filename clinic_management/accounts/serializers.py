from rest_framework import serializers

from .models import Role, Staff


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'


class StaffSerializer(serializers.ModelSerializer):
    role_name = serializers.CharField(
        source='role.role_name',
        read_only=True
    )

    class Meta:
        model = Staff
        fields = '__all__'