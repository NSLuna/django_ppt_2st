from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import logging
from .models import About, Project
from .serializers import AboutSerializer, ProjectSerializer

logger = logging.getLogger(__name__)

@api_view(['GET'])
def about(request):
    try:
        about_data = About.objects.first()
        if about_data:
            serializer = AboutSerializer(about_data, context={'request': request})
            return Response(serializer.data)
        return Response({'error': 'About data not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error in about view: {str(e)}")
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def project_list(request):
    try:
        projects = Project.objects.all().order_by('-id')
        logger.info(f"Found {projects.count()} projects")
        serializer = ProjectSerializer(projects, many=True, context={'request': request})
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Error in project_list view: {str(e)}")
        return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
