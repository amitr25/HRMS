from rest_framework import serializers
from .models import Employee, Attendance

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

    def validate_employee_id(self, value):
        # Check for duplicate employee_id, excluding current instance during update
        instance_id = self.instance.id if self.instance else None
        if Employee.objects.filter(employee_id=value).exclude(id=instance_id).exists():
            raise serializers.ValidationError("Employee ID already exists")
        return value

    def validate_email(self, value):
        # Check for duplicate email, excluding current instance during update
        instance_id = self.instance.id if self.instance else None
        if Employee.objects.filter(email=value).exclude(id=instance_id).exists():
            raise serializers.ValidationError("Email already exists")
        return value
class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.full_name', read_only=True)
    
    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'employee_name', 'date', 'status']

    def validate_status(self, value):
        if value not in ['Present', 'Absent']:
            raise serializers.ValidationError("Status must be Present or Absent")
        return value

    def validate(self, data):
        employee = data.get('employee')
        date = data.get('date')

        # Check for duplicate attendance, excluding current instance during update
        instance_id = self.instance.id if self.instance else None
        if Attendance.objects.filter(employee=employee, date=date).exclude(id=instance_id).exists():
            raise serializers.ValidationError(
                "Attendance for this employee on this date already exists"
            )

        return data
