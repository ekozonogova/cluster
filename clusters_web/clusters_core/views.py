from django.shortcuts import render
from clusters.utils import ErrorConnector
import json
import sys
import os
from django.http import HttpResponse
from bs4 import BeautifulSoup as BS
from clusters import settings

from rutermextract import TermExtractor
   
te = TermExtractor()

def add_meta(ctx, page_key=None):
    ctx.update(settings.SITE_SETTINGS)
    if page_key:
        pgs = settings.SITE_SETTINGS['pages']
        current_page = [x[1] for x in pgs if x[0] == page_key][0]
        # pgs_lst = []
        # for x,y in pgs.items():
        #   pgs_lst[pgs_org.index(x)] = { "link":x, "name":y }
    ctx.update({
        'pgs_info': [{"link":x, "name":y} for x,y in pgs],
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
    add_meta(context, page_key='spatial_development')
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
    app_cur_dir = ''
    if 'settings_dev' in os.getenv('DJANGO_SETTINGS_MODULE'):
        app_cur_dir = 'clusters_core/'
    try:
        reg_name = reg_name.split('=')[1]
    except IndexError:
        print(reg_name)
    try:
        macro_regions = json.load(open('../../cluster/macroregions.json', 'r'))
    except FileNotFoundError:
        # errors.write('1111')
        macro_regions = json.load(open('/home/cluster/macroregions.json', 'r'))
    res = []
    for r in macro_regions:

        try:
    
            if is_there(reg_name, macro_regions[r]['состав кластера']):
                # print(list_names(reg_name))
                # print(r)
                # print(macro_regions[r]['состав кластера'])
                # res_reg_name = '_'.join(macro_regions[r]['состав кластера'])
        
                for name in list_names(reg_name):
            
                    try:
                
                        nn = "_".join(name.split(" "))
                        # errors.write(nn)
                        svg_img('/home/cluster/clusters_web/static/images/macro_new/new_graph.%s.svg' % nn)
                    except FileNotFoundError as e:
                
                        # errors.write('[ ERROR ] Wrong filename %s' % e, file=sys.stderr)
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
    # [ WARNING ] !!!
    # This code (below) makes '500 Internal Server Error' only on production 
    # (maybe errors in paths) with no explanation, so to update graphs:
    #   0. Check GET parameter reg_name in def macro_region_members
    #   1. Compare it with GET param of Curl in update_macroregions.sh
    #   2. Check urls.py with this route! Add ?reg_name= in urls !!
    #   1. Uncomment lines below, run at localhost, run update_macroregions.sh from path: /Users/sanya/Work/cluster/clusters_web/clusters_core/static/images/region_values
    #   2. Git add all generated files
    #   3. Collect static on production.
    #   4. Check js files to new region names line with 'self.getMacroRegionMembers()'
    
    # # TODO: This way is not working because of curl URLs creating in update_macroregions.sh
    img_name = '%s_clickable.svg' % path.split(".dot")[0].split(".svg")[0]
    if not os.path.isfile(img_name):

        img = open(path).read()

        soup = BS(img, features="xml")
        open('/tmp/soup.xml', 'w').write(soup.prettify())
        for title in soup.findAll('g',  {'class': 'node'}):
    
            qs = ",".join(["'%s'" % x for x in title.text.split("->") if title.text != "g"])
    
            title['onclick'] = 'javascript: window.frames.parent.BVM.selectProfiles([%s]);' % qs

        # # TODO: shutil.move file to /static where collectstatic saves all files!

        open(img_name, 'w').write(soup.prettify())


def about(request):
    context = {
        "owners_data": [
            {
                "img_name": "elena.jpg",
                "text": "кандидат экономических наук",
                "name": "Козоногова Елена Викторовна", 
                "links": [
                    {"name":"elibrary", "addr":"https://elibrary.ru/author_profile.asp?authorid=776901"},
                    {"name":"Google Scholar", "addr":"https://scholar.google.com/citations?user=3ZdcuSUAAAAJ&hl=en"},
                ],
                "main_link": "https://pstu.ru/basic/glossary/staff/mailto:/?sid=-456",
                "email": "elena.kozonogova@gmail.com",
            },
            {
                "img_name": "julia.jpg",
                "text": "кандидат экономических наук",
                "name": "Дубровская Юлия Владимировна", 
                "links": [
                    {"name":"elibrary", "addr":"https://elibrary.ru/author_profile.asp?authorid=654406"},
                    {"name":"Google Scholar", "addr":"https://scholar.google.com/citations?user=lAFTPBkAAAAJ&hl=en"},
                ],
                "main_link": "https://pstu.ru/basic/glossary/staff/?sid=1729",
                "email": "yuliadubrov@mail.ru",
            },
            {
                "img_name": "maria.jpg",
                "text": "кандидат экономических наук",
                "name": "Русинова Мария Романовна", 
                "links": [
                    {"name":"elibrary", "addr":"https://elibrary.ru/author_profile.asp?authorid=911133"},
                    {"name":"Google Scholar", "addr":"https://scholar.google.com/citations?user=xY1cCocAAAAJ&hl=en"},
                ],
                "main_link": "https://elibrary.ru/author_profile.asp?authorid=911133",
                "email": "rusinova.mr@gmail.com"
            },
            {
                "img_name": "daniil.jpg",
                "text": "кандидат технических наук",
                "name": "Курушин Даниил Сергеевич",
                "links": [
                    {"name":"elibrary", "addr":"https://elibrary.ru/author_profile.asp?authorid=101415"},
                    {"name":"Orcid", "addr":"https://orcid.org/0000-0003-4798-7423"},
                ],
                "main_link": "https://github.com/daniel-kurushin",
                "email": "daniel@kurushin-perm.ru",
            },
            {
                "img_name": "sanya.jpg",
                "text": "магистр",
                "name": "Ларионов Александр Андреевич",
                "links": [
                    {"name":"Orcid", "addr":"https://orcid.org/0000-0001-5214-7467"},
                    {"name":"Telegram", "addr":"https://t.me/photoalarionovpro/"},
                ],
                "main_link": "https://github.com/alarionov93",
                "email": "alarionov93@yandex.ru",
            },
        ]
    }
    add_meta(context, page_key='about')

    return render(request, 'about.html', context=context)

def _filter_term(term):
    wrong_grammemes = {'ADJF', 'LATN', 'UNKN', 'NUMB', 'NUMR' }
    
    word = term.words[0].parsed
    
    return len(term.words) > 1 and \
           len(word.tag.grammemes & wrong_grammemes) == 0

def get_keywords(request, text):
    try:
        kw = json.load(open('../../cluster/svg_kw_new.json', 'r'))[' '.join(text.split(' ')[:-1]).strip()]
    except (KeyError, FileNotFoundError):
        print('Error with key or finding JSON file, generating kw by TE();', file=sys.stderr)
        kw = [ term for term in te(text, strings=1) ]
    except json.decoder.JSONDecodeError as e:
        print('Error in JSON file, %s, %s.'%(e.pos, e.msg), file=sys.stderr)
        kw = []
    print(kw, file=sys.stderr)

    return HttpResponse(json.dumps(kw, ensure_ascii=0))


