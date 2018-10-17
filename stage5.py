from json import load
from okpd2okved import okpd2okved, okved
from rutermextract import TermExtractor as TE
from requests import post

FNAME = 'out.4.json'
te = TE()

def download_fedstat():
    cookie = dict(
        JSESSIONID = 'D13E2B221B5AA3293EB22B55D2499D27',
        _ym_uid    = '1539604103112361576',
        _ym_d      = '1539604103', 
        _ym_isad   = '1',
        __utma     = '63246520.935552422.1539604108.1539604108.1539604108.1',
        __utmc     = '63246520',
        __utmz     = '63246520.1539604108.1.1.utmcsr=yandex|utmccn=(organic)|utmcmd=organic',
        __utmb     = '63246520.4.10.1539604108',
    )    
        
    content_type = "application/x-www-form-urlencoded; charset=UTF-8"

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
            
    
k_region = 'dim32251'
k_industry = 'dim32155'

employment_data = load(open(FNAME))['results']
years = [ str(x) for x in range(2009, 2017) ]

for item in employment_data:
    # try
    rez = {}
    try:
        assert item[k_industry] in okved
        rez.update({'industry':item[k_industry]})
        rez.update({'region':item[k_region]})
        for year in years:
            for key in item.keys():
                try:
                    key.index(year)
                    rez.update({year:float(item[key])})
                    break
                except ValueError:
                    rez.update({year:-1})
        print(rez)
    except AssertionError:
        pass    
        
        
industry = {
     'стальное литье' : {
         'Рязанская область' : {
             2009:1017,
             2010:1116,
             2011:921,
             2012:1015,
             2013:1072,
             2014:1017,
             2015:975,
             2016:920,
         }
     }
}
