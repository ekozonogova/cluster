from json import load, loads, dumps
from copy import deepcopy

from okpd2okved import okpd2okved, okved
from rutermextract import TermExtractor as TE
from requests import get, post
from utilites import dump, load
from regions import regions, get_yandex_name, emiss_to_yandex

import numpy as np
#from pysal import W, Moran, Moran_Local

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
           item['dim32251'] in [ regions[r]['emissname'] for r in regions.keys() ]:
            yield item
        
def make_structure(FD = []):
    rez_reg = {}
    rez_ind = {}
    kyears = range(2009, 2017)
    for item in FD:
        region = emiss_to_yandex(item['dim32251'])
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

def get_hi_lo_regions(lq, regions, distances):
    data = {}
    
    for cluster in ['Угольная промышленность', 'Высокотехнологичное оборудование и ИТ']:
        clu = {}
        DLQ_min, DLQ_max = 10000, -10000
        for region in regions.keys():
            lq_a = lq[region][cluster]['2016']
            D_lq = 0
            for neib in regions[region]['neighbors']:
                lq_b = lq[neib][cluster]['2016']
                D = distances["%s<->%s" % (region, neib)]
                if D == 0: D = 4
                D_lq += (lq_a - lq_b) * 1 / D
            D_lq /= len(regions[region]['neighbors'])
            if D_lq < DLQ_min: DLQ_min = D_lq
            if D_lq > DLQ_max: DLQ_max = D_lq
                
            clu.update({region:D_lq})
        clu.update({'min':DLQ_min})
        clu.update({'max':DLQ_max})
        data.update({cluster:clu})
    res = {}
    for cluster in ['Угольная промышленность', 'Высокотехнологичное оборудование и ИТ']:
        clu = {'hi':[],'lo':[]}
        for region in regions.keys():
            LQ = lq[region][cluster]['2016']
            DLQ = data[cluster][region]
            B = data[cluster]['min'] / 53
            A = data[cluster]['max'] / 53
            if DLQ > A:
                clu['hi'].append({region:LQ})
            elif DLQ < B:
                clu['lo'].append({region:LQ})
        res.update({cluster:clu})
    return res


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
            distances = load('distances.json')
            cluster_hi_lo = load('cluster_hi_lo.json')
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
            if e.filename == 'cluster_hi_lo.json':
                regions = load('regions.json')
                distances = load('distances.json')
                cluster_hi_lo = get_hi_lo_regions(calculated_lq, regions, distances)
                dump(cluster_hi_lo, 'cluster_hi_lo.json')
