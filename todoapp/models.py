from django.db import models

from usersapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=64, unique=True)
    repository = models.URLField(blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class TODO(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(User, on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True)
