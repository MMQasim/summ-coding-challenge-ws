
from django.urls import path
#now import the views.py file into this code
from . import views

urlpatterns=[
  path('',views.api),
  path('tarnslations/',views.tarnslations),
  path('tarnslations/<str:id>/',views.tarnslations)
  ]