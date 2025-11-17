from django.urls import path
from .views import about, project_list

urlpatterns = [
    path("about/", about),
    path("projects/", project_list),
]