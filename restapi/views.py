from django.shortcuts import render


from rest_framework import status
from rest_framework.decorators import api_view,schema
from rest_framework.response import Response
from .serializer import TarnslationSerializer
from .models import Translation
from django.forms.models import model_to_dict
from rest_framework.schemas import AutoSchema
from rest_framework.views import APIView



def validate(str):
    return (len(str.strip())>0 and not(str.isnumeric()))



@api_view(['GET'])
def api(request):
    api_urls={
        'Get_All_Data':{'method':'GET','url':'/translations/','parameters':None,'Return':'List'},
        'Get_One':{'method':'GET','url':'/translations/<id>/','parameters':None,'Return':'Transtation'},
        'Create':{'method':'POST','url':'/translations/','parameters':{"input_text":"str","output_text":"str"},'Return':'Transtation'},
        'Update':{'method':'PUT','url':'/translations/<id>/','parameters':{"input_text":"str","output_text":"str"},'Return':'Transtation'},
        'Delete':{'method':'DELETE','url':'/translations/<id>/','parameters':None,'Return':'response'},
    }

    return Response(api_urls)
        

@api_view(['GET','POST','DELETE','PUT'])
def tarnslations(request,id=False):

    if request.method=="POST":
        if(validate(request.data['input_text']) and validate(request.data['output_text'])):
            serializer = TarnslationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method=='PUT' and id:
        if(validate(request.data['input_text']) and validate(request.data['output_text'])):
            try:
                translations=Translation.objects.get(id=id)
            except:
                return Response({"message":"invalid id"}, status=status.HTTP_404_NOT_FOUND)

            serializer = TarnslationSerializer(instance=translations,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method=="DELETE" and id:
        try:
            translations=Translation.objects.get(id=id)
            translations.delete()
            return Response({"message":"Sucess"}, status=status.HTTP_200_OK)
        except:
            return Response({"message":"invalid id"}, status=status.HTTP_404_NOT_FOUND)
    elif request.method=='GET' and id:
        try:
            translations=Translation.objects.get(id=id)
        except:
            return Response({"message":"invalid id"}, status=status.HTTP_404_NOT_FOUND)
        serializer = TarnslationSerializer(instance=translations,data=model_to_dict( translations ),many=False)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
    elif request.method=='GET':

        translations=Translation.objects.all()
        serializer = TarnslationSerializer(data=translations,many=True)
        serializer.is_valid(raise_exception=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    return Response( status=status.HTTP_404_NOT_FOUND)