from django.db import models


# Create your models here.
class Translation(models.Model):
    id = models.AutoField(primary_key=True)
    input_text=models.CharField(max_length=150)
    output_text=models.CharField(max_length=150)

    class Meta:
        db_table="translation"

"""
{"input_text":"ok",
   "output_text":"yes"}"""