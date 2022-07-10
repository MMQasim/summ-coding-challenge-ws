
from django.urls import path
#now import the views.py file into this code
from . import views

urlpatterns=[
  
  path('translations/',views.tarnslations),
  path('translations/<str:id>/',views.tarnslations),
  path('',views.api)
  ]