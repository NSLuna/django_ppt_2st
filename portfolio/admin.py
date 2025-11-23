from django.contrib import admin
from .models import About, Project, ProjectImage


# Register your models here.

admin.site.register(About)


class ProjectImageInline(admin. TabularInline) :
    model = ProjectImage
    extra = 3

class ProjectAdmin(admin.ModelAdmin) :
    inlines = [ProjectImageInline]

admin.site.register(Project, ProjectAdmin)    