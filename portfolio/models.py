from django.db import models

# Create your models here.

class About(models.Model):
    name = models.CharField(max_length=50)
    role = models.CharField(max_length=100)
    description = models.TextField()
    github = models.CharField(max_length=100, blank=True)
    blog = models.CharField(max_length=200, blank=True)

    def __str__(self) :
        return self.name
    

class Project(models.Model) :
    title = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack = models.CharField(max_length=300, blank=True)
    github = models.CharField(max_length=300, blank=True)

    thumbnail = models.ImageField(upload_to="project_thumbnails/", blank=True, null=True)

    def __str__(self):
        return self.title
    
class ProjectImage(models.Model) :
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='project_images/')

    def __str__(self) :
        return f"{self.project.title} 이미지"
