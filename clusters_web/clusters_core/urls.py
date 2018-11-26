from django.urls import path
from clusters_core import views

urlpatterns = [
	path('', views.index, name='site_index')
]