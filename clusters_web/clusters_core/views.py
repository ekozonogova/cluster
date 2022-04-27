from django.shortcuts import render
from clusters.utils import ErrorConnector
import json
import sys
import os
from django.http import HttpResponse
from bs4 import BeautifulSoup as BS
from clusters import settings

# from rutermextract import TermExtractor
# # from json import load, dump
   
# te = TermExtractor()

# Create your views here.

def add_meta(ctx, page_key=None):
	ctx.update(settings.SITE_SETTINGS)
	if page_key:
		pgs = settings.SITE_SETTINGS['pages']
		current_page = [x[1] for x in pgs.items() if x[0] == page_key][0]
	ctx.update({
		'pgs_info': [{"link":x, "name":y} for x,y in pgs.items()],
		'page_key': page_key,
		'current_page': current_page,
	})

	return ctx

def index(request):
	ctx = {}
	ctx.update({'a': 1})

	return render(request, 'c_index.html', context=ctx)

def clusters(request):
	context = {}
	context.update({'a': 1})
	add_meta(context, page_key='clusters')
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
	add_meta(context, page_key='benchmark')
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
	add_meta(context, page_key='product-space')
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

def get_reg_data(reg_name, dt='code'):
	regions = json.load(open('../../cluster/r_data.json', 'r'))
	# macro_regions = json.load(open('../../cluster/macroregions.json', 'r'))
	for r in regions:
		nms = list_names(reg_name)
		if nms and list_names(r.lower()) == nms:
			# print(r)
			return regions[r][dt]
	raise CodeTypeError('Region code has a NoneType!')
	return None

def is_there(reg_name, macro_members_list):
	mms = [list_names(x) for x in macro_members_list]
	if list_names(reg_name) in mms:
		return True
	return False
 
# def _filter_term(term):
#     wrong_grammemes = {'ADJF', 'LATN', 'UNKN', 'NUMB', 'NUMR' }
    
#     word = term.words[0].parsed
    
#     return len(term.words) > 1 and \
#            len(word.tag.grammemes & wrong_grammemes) == 0
 
# def _normalize_terms_weights(kw):
#     import numpy as np
#     res = []
 
#     max_weight, min_weight = kw[0][1], kw[-1][1]
#     a, b = np.polyfit([max_weight, min_weight], [1, 0.1], 1)
#     for term, weight in kw:
#         normalized_weight = max(0, a * weight + b)
#         res += [[str(term), normalized_weight]]
        
#     return res
    
# def get_text_keywords(a_text):
#     kw = [ (term, term.count) for term in te(a_text) if _filter_term(term) ]
    
#     return _normalize_terms_weights(kw)

def macro_region_members(request, reg_name): # reg_code?
	# reg_name = reg_name.split('=')
	# print(reg_name)
	macro_regions = json.load(open('../../cluster/macroregions.json', 'r'))
	res = []
	for r in macro_regions:
		try:
			if is_there(reg_name, macro_regions[r]['состав кластера']):
				print(list_names(reg_name))
				# print(r)
				# print(macro_regions[r]['состав кластера'])
				# res_reg_name = '_'.join(macro_regions[r]['состав кластера'])
				for name in list_names(reg_name):
					try:
						svg_img('static/images/macroregion_values/graph.'+ '_'.join(name.split(' ')) +'.dot.svg' )
					except FileNotFoundError:
						print('Wrong filename', file=sys.stderr)
				try:
					res = [{get_reg_data(x): x} for x in macro_regions[r]['состав кластера']]
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

def svg_img(path):
	print(path, file=sys.stderr)
	# This code makes 500 internal server error only on production (maybe error in paths),
	# so to update graphs:
	# 	1. Uncomment lines below, run at localhost, 
	#	2. git add all generated files, collect static on production.
	# img = open(path).read()

	# soup = BS(img, features="xml")
	# for title in soup.findAll('g',  {'class': 'node'}):
	# 	qs = ",".join(["'%s'" % x for x in title.text.split("->") if title.text != "g"])
	# 	title['onclick'] = 'javascript: window.frames.parent.BVM.selectProfiles([%s]);' % qs

	# TODO: shutil.move file to /static where collectstatic saves all files!
	# open('%s_clickable.svg' % path.split(".dot")[0], 'w').write(soup.prettify())

def about(request):
	context = {
		"owners_data": [
			{
				"img_name": "julia.jpg",
				"name": "Дубровская Ю.В., кандидат экономических наук", 
				"links": [
					{"name":"E Library", "addr":"https://elibrary.ru/author_profile.asp?authorid=654406"},
					{"name":"Google Scholar", "addr":"https://scholar.google.com/citations?user=lAFTPBkAAAAJ&hl=en"},
				],
				"main_link": "https://pstu.ru/basic/glossary/staff/?sid=1729",
				"email": "elena.kozonogova@gmail.com",
			},
			{
				"img_name": "elena.jpg",
				"name": "Козоногова Е.В., кандидат экономических наук", 
				"links": [
					{"name":"E Library", "addr":"https://elibrary.ru/author_profile.asp?authorid=776901"},
					{"name":"Google Scholar", "addr":"https://scholar.google.com/citations?user=3ZdcuSUAAAAJ&hl=en"},
				],
				"main_link": "https://pstu.ru/basic/glossary/staff/mailto:/?sid=-456",
				"email": "elena.kozonogova@gmail.com",
			},
			{
				"img_name": "maria.jpg",
				"name": "Русинова М.Р., кандидат экономических наук", 
				"links": [
					{"name":"E Library", "addr":"https://elibrary.ru/author_profile.asp?authorid=911133"},
					{"name":"Google Scholar", "addr":"https://scholar.google.com/citations?user=xY1cCocAAAAJ&hl=en"},
				],
				"main_link": "https://elibrary.ru/author_profile.asp?authorid=911133",
			},
			{
				"img_name": "daniil.jpg",
				"name": "Курушин Д.C., кандидат технических наук", 
				"links": [],
				"main_link": "https://github.com/daniel-kurushin",
			},
			{
				"img_name": "sanya.jpg",
				"name": "Ларионов А.A., магистр",
				"links": [],
				"main_link": "https://github.com/alarionov93",
				"email": "alarionov93@yandex.ru",
			},
		]
	}
	add_meta(context, page_key='about')

	return render(request, 'about.html', context=context)

