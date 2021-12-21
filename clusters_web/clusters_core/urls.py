from django.urls import path
from clusters_core import views

urlpatterns = [
	path('', views.index, name='site_index'),
	path('clusters', views.clusters, name='clusters'),
	path('benchmark', views.benchmark, name='benchmark'),
	path('macroregions', views.macroregions, name='macroregions'),
	path('regions_list', views.regions_list, name='regions'),
	path('i_regions_list/<str:reg_name>', views.identical_regions_list, name='identical_regions')
]