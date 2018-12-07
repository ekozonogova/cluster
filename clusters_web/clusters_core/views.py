from django.shortcuts import render
from clusters.utils import ErrorConnector

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
	context = {}
	context.update({'a': 1})
	data = {}

	data.update({
		'process': 'RuClusters',
		'status': 1,
		'message': 'Testing connector',
	})

	data.update(context)
	conn = ErrorConnector(data=data, exception=None)
	conn.send_data()

	return render(request, 'c_index.html', context=context)