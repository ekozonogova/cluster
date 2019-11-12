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
	reg = json.load(open('/Users/sanya/Work/cluster/clusters_web/clusters_core/matrix_regions_distances.json', 'r')).keys()

	return HttpResponse(json.dumps(list(reg), ensure_ascii=0))


