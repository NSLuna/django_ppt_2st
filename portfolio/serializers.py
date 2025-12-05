from rest_framework import serializers
from .models import About, Project, ProjectImage


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = "__all__"


class ProjectImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProjectImage
        fields = ['image_url']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            url = request.build_absolute_uri(obj.image.url)
            # HTTPS 강제 (배포 환경)
            if url.startswith('http://') and request.get_host().startswith('luna-ppt.kr'):
                url = url.replace('http://', 'https://')
            return url
        return obj.image.url   # fallback
        

class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "tech_stack",
            "github",
            "thumbnail",
            "thumbnail_url",
            "images",
        ]

    def get_thumbnail_url(self, obj):
        request = self.context.get('request')
        if obj.thumbnail:
            if request:
                url = request.build_absolute_uri(obj.thumbnail.url)
                # HTTPS 강제 (배포 환경)
                if url.startswith('http://') and request.get_host().startswith('luna-ppt.kr'):
                    url = url.replace('http://', 'https://')
                return url
            return obj.thumbnail.url
        return None
