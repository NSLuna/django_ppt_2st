from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import About, Project
from .serializers import AboutSerializer, ProjectSerializer

@api_view(['GET'])
def about(request):
    about_data = About.objects.first()
    serializer = AboutSerializer(about_data)
    return Response(serializer.data)

@api_view(['GET'])
def project_list(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)
