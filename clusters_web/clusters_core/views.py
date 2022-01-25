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

def macroregions(request):
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

	return render(request, 'macroregions.html', context=context)

def regions_list(request):
	regions = json.load(open('../../cluster/r_data.json', 'r'))
	res = {}
	for r in regions:
		res.update({ r:[regions[r]["code"], list_names(r)] })

	# print(res)

	return HttpResponse(json.dumps(dict(res), ensure_ascii=0))

class CodeTypeError(TypeError):
	def __init__(self, message, errors):
		super(CodeTypeError, self)

def list_names(reg_name):
	for a,b,c in json.load(open('../../cluster/regions_compare_matrix.json', 'r')):
		if reg_name.lower() in [a.lower(),b.lower(),c.lower()]:
			return [a.lower(),b.lower(),c.lower()]
	return []

def get_code(reg_name):
	regions = json.load(open('../../cluster/r_data.json', 'r'))
	for r in regions:
		nms = list_names(reg_name)
		if nms and list_names(r.lower()) == nms:
			return regions[r]["code"]
	raise CodeTypeError('Region code has a NoneType!')
	return None

def is_there(reg_name, macro_members_list):
	mms = [list_names(x) for x in macro_members_list]
	if list_names(reg_name) in mms:
		return True
	return False

def macro_region_members(request, reg_name): # reg_code?
	macro_regions = json.load(open('../../cluster/macroregions.json', 'r'))
	res = []
	for r in macro_regions:
		try:
			if is_there(reg_name, macro_regions[r]['состав кластера']):
				try:
					res = [{get_code(x): x} for x in macro_regions[r]['состав кластера']]
				except CodeTypeError as e:
					print(e, file=sys.stderr)
					break
		except TypeError as e:
			print(e)

	# print(test)

	return HttpResponse(json.dumps(res, ensure_ascii=0))

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

def svg_img(request, path):
	img = open(path).read()
	
	return HttpResponse(json.dumps(img, ensure_ascii=0))


