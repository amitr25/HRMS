from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=True, methods=['get'])
    def present_days(self, request, pk=None):
        employee = self.get_object()
        count = Attendance.objects.filter(
            employee=employee,
            status='Present'
        ).count()

        return Response({
            "employee_id": employee.employee_id,
            "full_name": employee.full_name,
            "total_present_days": count
        })


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        employee_id = self.request.query_params.get('employee')
        date = self.request.query_params.get('date')

        if employee_id:
            queryset = queryset.filter(employee_id=employee_id)

        if date:
            queryset = queryset.filter(date=date)

        return queryset


class DashboardSummary(APIView):
    def get(self, request):
        total_employees = Employee.objects.count()
        total_attendance = Attendance.objects.count()
        total_present = Attendance.objects.filter(status='Present').count()

        return Response({
            "total_employees": total_employees,
            "total_attendance_records": total_attendance,
            "total_present_records": total_present
        })

