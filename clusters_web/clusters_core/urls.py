from django.urls import path
from clusters_core import views

urlpatterns = [
	path('', views.index, name='site_index'),
	path('clusters', views.clusters, name='clusters'),
	path('benchmark', views.benchmark, name='benchmark'),
	path('spatial_development', views.macroregions, name='macroregions'),
	path('regions_list', views.regions_list, name='regions'),
	path('i_regions_list/<str:reg_name>', views.identical_regions_list, name='identical_regions'),
	path('m_region_members/<str:reg_name>', views.macro_region_members, name='macro_region_members'),
	path('svg_img/<str:path>', views.svg_img, name='svg_img'),
	path('get_keywords/<str:text>', views.get_keywords, name='get_keywords'),
	path('about/', views.about, name='about')
]