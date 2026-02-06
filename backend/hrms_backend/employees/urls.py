from django.urls import path   # 👈 YE LINE ADD KARO
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, AttendanceViewSet, DashboardSummary

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'attendance', AttendanceViewSet)

urlpatterns = router.urls

urlpatterns += [
    path('dashboard/', DashboardSummary.as_view()),
]
