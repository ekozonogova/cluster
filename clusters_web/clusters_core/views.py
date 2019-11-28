from django.shortcuts import render
from clusters.utils import ErrorConnector
import json
from django.http import HttpResponse

# Create your views here.
def add_meta(ctx, page_header=None, current_page=None):
	ctx.update(settings.SITE_SETTINGS)
	# banners = models.Banner.objects.filter(enabled=True).order_by('-id')
	# ctx.update({'banners': banners})
	ctx.update({
		'page_header': page_header,
		'current_page': current_page
	})

	return ctx

def index(request):
	ctx = {}
	ctx.update({'a': 1})

	return render(request, 'c_index.html', context=ctx)

def clusters(request):
	context = {}
	context.update({'a': 1})
	# data = {}

	# data.update({
		# 'process': 'RuClusters',
		# 'status': 1,
		# 'message': 'Testing connector',
	# })

	# data.update(context)
	# conn = ErrorConnector(data=data, exception=None)
	# conn.send_data()

	return render(request, 'clusters.html', context=context)

def benchmark(request):
	context = {}
	context.update({'a': 1})
	# data = {}

	# data.update({
		# 'process': 'RuClusters',
		# 'status': 1,
		# 'message': 'Testing connector',
	# })

	# data.update(context)
	# conn = ErrorConnector(data=data, exception=None)
	# conn.send_data()

	return render(request, 'benchmark.html', context=context)

def regions_list(request):
	regions = json.load(open('../../cluster/r_data.json', 'r'))
	res = {}
	for r in regions:
		res.update({ r:regions[r]["code"] })

	# print(res)

	return HttpResponse(json.dumps(dict(res), ensure_ascii=0))

def identical_regions_list(request, reg_name):
	# get regions codes from regions.json -> yandexname
	# then create json with regions codes
	# print(reg_name)
	selected_region = {}
	regions = json.load(open('../../cluster/r_data.json', 'r'))
	for r in regions:
		if r == reg_name:
			selected_region = regions[r]

	return HttpResponse(json.dumps(dict(selected_region), ensure_ascii=0))


