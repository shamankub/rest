# Generated by Django 2.2.25 on 2022-01-27 18:32

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('usersapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, verbose_name='UUID'),
        ),
    ]
