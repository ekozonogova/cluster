from json import load, loads, dumps
from copy import deepcopy

from okpd2okved import okpd2okved, okved
from rutermextract import TermExtractor as TE
from requests import get, post
from utilites import dump, load
from regions import regions

import numpy as np

FNAME = 'out.4.json'
te = TE()

def download_fedstat():
    gget = get('https://www.fedstat.ru/indicator/43007')
    cookies = gget.cookies.get_dict()
    headers = {}
    for header in open('fedstat.headers').readlines():
        key, value = [ _.strip() for _ in header.split(':', maxsplit = 1) ]
        headers.update({key:value})
    data = []
    for item in open('fedstat.post').read().split('&'):
        key, value = item.split('=', maxsplit = 1)
        data += [(key, value)]
    ppost = post('https://www.fedstat.ru/indicator/dataGrid.do?id=43007', 
               headers = headers,
               data = data,
               cookies = cookies)
    rez = loads(ppost.content.decode('utf-8'))
    return rez
    #print(dumps(loads(rez), ensure_ascii=1, indent=2))
    
def filter_fedstat(FD = []):
    for item in FD:
        if item['dim32155'] in okved and \
           item['dim32251'] in regions:
            yield item
        
def make_structure(FD = []):
    rez_reg = {}
    rez_ind = {}
    kyears = range(2009, 2017)
    for item in FD:
        region = item['dim32251']
        industry = item['dim32155']
        year_values = {}
        for ky in kyears:
            year_values.update({ky:0})
            for k in item.keys():
                if k.startswith("dim%s_" % ky):
                    v = int(item[k].split(',')[0])
                    year_values.update({ky:v})
                    
        try:
            rez_reg[region].update({industry:year_values})
        except KeyError:
            rez_reg.update({region:{}})
            rez_reg[region].update({industry:year_values})
        try:
            rez_ind[industry].update({region:year_values})
        except KeyError:
            rez_ind.update({industry:{}})
            rez_ind[industry].update({region:year_values})
    return {"По регионам": rez_reg, "По отраслям" : rez_ind }

def calc_sums(IN = {}):
    rez_reg, rez_all, rez_ind = {}, {}, {}
    for year in range(2009, 2017):
        rez_all.update({str(year):0})
    for region in IN["По регионам"].keys():
        y = {}
        for year in range(2009, 2017):
            y.update({str(year):0})
        rez_reg.update({region:y})
        for industry in IN["По регионам"][region].keys():
            for year in IN["По регионам"][region][industry].keys():
                yearv = IN["По регионам"][region][industry][year]
                rez_reg[region].update({year:rez_reg[region][year] + yearv})
    for industry in IN["По кластерам"].keys():
        y = {}
        for year in range(2009, 2017):
            y.update({str(year):0})
        rez_ind.update({industry:y})
        for region   in IN["По кластерам"][industry].keys():
            for year in IN["По кластерам"][industry][region].keys():
                yearv = IN["По кластерам"][industry][region][year]
                rez_ind[industry].update({year:rez_ind[industry][year] + yearv})
                rez_all[year] += yearv
    
    return {"По регионам": rez_reg, "По кластерам" : rez_ind, 'Всего': rez_all }

def calc_lq(INA = {}, INB = {}):
    rez = {}
    for region in INA['По регионам']:
        reg = {}
        for industry in INA['По кластерам']:
            ind = {}
            for year in INA['Всего']:
                try:
                    B2  = INB["По регионам"][region][industry][year]
                except KeyError:
                    B2  = 0
                G2  = INA['По регионам'][region][year]
                B7  = INA['По кластерам'][industry][year]
                B10 = INA['Всего'][year]
                try:
                    v = (B2/G2)/(B7/B10)
                except ZeroDivisionError:
                    v = 0
                ind.update({year:v})
            reg.update({industry:ind})
        rez.update({region:reg})
                
    return rez
        
def clusters_from_dot(filename = 'clusters.dot'):
    def get_cl_name(a):
        conv = {
            '1':'Металлообработка',
            '2':'Химическая промышленность',
            '3':'Пищевая промышленность',
            '4':'Горнодобывающее производство',
            '5':'Лесная промышленность, деревообработка, целлюлозно-бумажная обработка',
            '6':'Обработка цветных и драгоценных металлов',
            '7':'Строительные материалы',
            '8':'Легкая промышленность',
            '9':'Нефтегазовая промышленность',
            '10':'Угольная промышленность',
            '11':'Высокотехнологичное оборудование и ИТ',
        }

        return conv[a]

    industry = ''
    rez = {}
    for line in open(filename).readlines():
        if line.count('->') == 0:
            industry += line.replace('\n', ' ').replace('\t', ' ')
            if line.count('[cluster') == 1:
                cnumber = line.split('="')[1].split('"')[0]
                industry = industry.strip()
                industry = industry.replace('"', ' ')
                industry = industry.split('[')[0]
                industry = industry.strip()
                words1 = industry.split()
                for okpd in okpd2okved.keys():
                    words2 = okpd.split()
                    n = 0
                    for word in words1:
                        n += words2.count(word)
                    if n/len(words1) > 0.9:
                        key = okpd2okved[okpd]
                        rez.update({key:cnumber})
                        break
                industry = ''
    rex = {}
    for clusternumber in set(rez.values()):
        clustercontent = [ a[0] for a in rez.items() if a[1] == clusternumber ]
        clustername = get_cl_name(clusternumber)
        rex.update({clustername:clustercontent})
        
    return {'По индустриям':rez, 'По кластерам':rex}

def make_spec_data(IN = {}, CL = {}):
    def calc_PCA(a):
        return 0
    
    res = {}
    for region in IN.keys():
        for cl_name in CL['По кластерам'].keys():
            for industry in CL['По кластерам'][cl_name]:
                for year in [ str(y) for y in range(2009, 2017) ]:
                    try:
                        res[(region, cl_name, year)] += IN[region][industry][year]
                    except KeyError:
                        try:
                            res.update({(region, cl_name, year):IN[region][industry][year]})
                        except KeyError:
                            pass
                        
    rez_reg = {}
    rez_clu = {}
    for region in IN.keys():
        clu = {}
        for cluster in CL['По кластерам'].keys():
            years = {}
            for year in [ str(y) for y in range(2009, 2017) ]:
                try:
                    years.update({year:res[(region,cluster,year)]})
                except KeyError:
                    pass
            clu.update({cluster:years})
        rez_reg.update({region:clu})

    for cluster in CL['По кластерам'].keys():
        reg = {}
        for region in IN.keys():
            years = {}
            for year in [ str(y) for y in range(2009, 2017) ]:
                try:
                    years.update({year:res[(region,cluster,year)]})
                except KeyError:
                    pass
            reg.update({region:years})
        rez_clu.update({cluster:reg})
    
                
    return {'По регионам':rez_reg, 'По кластерам':rez_clu }

def calc_w_distance(IN = {}):
    n = int(len(IN.keys()) / 2)
    rez = np.zeros([n,n])
    regions = sorted([ r.split('<->')[0] for r in IN.keys() ])
    for i in range(n):
        for j in range(n):
            try:
                rez[i,j] = 1/IN["%s<->%s" % (regions[i], regions[j])]
            except KeyError:
                pass
    return rez
        
def calc_w_neighbors(IN = {}, DIST = {}):
    regions = sorted(IN.keys())
    n = len(IN.keys())
    rez = {}
    for i in range(n):
        reg = IN[regions[i]]
        try:
            neighbors = reg['neighbors']
            data = []
            for neighbor in neighbors:
                try:
                    data += [1/DIST["%s<->%s" % (regions[i], neighbor)]]
                except KeyError:
                    data += [-1]
            rez.update({i:data})
        except KeyError as e:
#            print(IN[regions[i]])
            print(e)
    return rez

if __name__ == '__main__':
    end = False
    while not end:
        try:
            fedstat_data = load('fedstat_data.json')
            filtered_data = load('filtered_data.json')
            structured_data = load('structured_data.json')
            clusters = load('clusters.json')
            spec_data = load('spec_data.json')

            calculated_sums = load('calculated_sums.json')
            calculated_lq = load('calculated_lq.json')
            w_distance =  load('w_distance.dat')
            w_neighbors =  load('w_neighbors.json')
#            spatial_corr =  load('spatial_corr.json')
            end = True
        except FileNotFoundError as e:
            if e.filename == 'fedstat_data.json':
                fedstat_data = download_fedstat()
                dump(fedstat_data, 'fedstat_data.json')
            if e.filename == 'filtered_data.json':
                filtered_data = filter_fedstat(fedstat_data['results'])
                dump(list(filtered_data), 'filtered_data.json')
            if e.filename == 'structured_data.json':
                structured_data = make_structure(filtered_data)
                dump(structured_data, 'structured_data.json')
            if e.filename == 'clusters.json':
                clusters = clusters_from_dot()
                dump(clusters, 'clusters.json')
            if e.filename == 'spec_data.json':
                spec_data = make_spec_data(structured_data['По регионам'], clusters)
                dump(spec_data, 'spec_data.json')
            if e.filename == 'calculated_sums.json':
                calculated_sums = calc_sums(spec_data)
                dump(calculated_sums, 'calculated_sums.json')
            if e.filename == 'calculated_lq.json':
                calculated_lq = calc_lq(calculated_sums, spec_data)
                dump(calculated_lq, 'calculated_lq.json')
            if e.filename == 'w_distance.dat':
                distances = load('distances.json')
                w_distance = calc_w_distance(distances)
                dump(w_distance, 'w_distance.dat')
            if e.filename == 'w_neighbors.json':
                neighbors = load('regions.json')
                w_neighbors = calc_w_neighbors(neighbors, distances)
                dump(w_neighbors, 'w_neighbors.json')
#exit(0)
    
#    cookie = dict(
#        JSESSIONID = 'D13E2B221B5AA3293EB22B55D2499D27',
#        _ym_uid    = '1539604103112361576',
#        _ym_d      = '1539604103', 
#        _ym_isad   = '1',
#        __utma     = '63246520.935552422.1539604108.1539604108.1539604108.1',
#        __utmc     = '63246520',
#        __utmz     = '63246520.1539604108.1.1.utmcsr=yandex|utmccn=(organic)|utmcmd=organic',
#        __utmb     = '63246520.4.10.1539604108',
#    )    
#        
#    content_type = "application/x-www-form-urlencoded; charset=UTF-8"

def get_longest_key(item):
    l = 0
    for k in item.keys():
        if len(k) > l:
            l = len(k)
            rez = k
    return rez

def normalize(string):
    x1 = set([ _.normalized for _ in te(string) ])
    if not x1:
        x1 = set([string])
    m = 0
    rez = ''
    for x in list(okpd2okved.values()) + list(okpd2okved.keys()):
        x2 = set([ _.normalized for _ in te(x) ])
        n = len(x1 & x2) / min(len(x1), len(x2))
        if n > m:
            m = n
            rez = x
    return rez
            
    
#k_region = 'dim32251'
#k_industry = 'dim32155'
#
#employment_data = load(open(FNAME))['results']
#years = [ str(x) for x in range(2009, 2017) ]
#
#industry = {}
#regions = set([ x[k_region] for x in employment_data ])
#
#
#for ind in okved:# сделать по другому!!!
#    industry_data = {}
#    for reg in regions:
#        region_data = {}
#        for item in employment_data:
#            rez = {}
#            if item[k_industry] == ind and \
#               item[k_region] == reg:
#                for year in years:
#                    for key in item.keys():
#                        try:
#                            key.index(year)
#                            rez.update({year:float(item[key])})
#                            break
#                        except ValueError:
#                            rez.update({year:0})
#            region_data.update({reg: rez})
#        industry_data.update({ind: region_data})
#
#print(industry)
        
# industry = {
#      'стальное литье' : {
#          'Рязанская область' : {
#              2009:1017,
#              2010:1116,
#              2011:921,
#              2012:1015,
#              2013:1072,
#              2014:1017,
#              2015:975,
#              2016:920,
#          }
#      }
# }
