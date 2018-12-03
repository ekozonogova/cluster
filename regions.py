from requests import get
from bs4 import BeautifulSoup as BS
from utilites import load, dump

regions = load('regions.json')

regnames = set(regions.keys())

def get_wiki_center(region):
    try:
        return regions[region]['center']
    except KeyError:
        soup = BS(get('https://ru.wikipedia.org/wiki/%s' % region.replace(' ', '_')).content, features="lxml")    
        for th in soup('th'):
            if th.text == 'Административный центр':
                regions[region].update({'center':th.parent.td.text})
                return get_wiki_center(region)
        
def get_distance(reg_A, reg_B):
    try:
        return regions['%s<->%s' % (reg_A, reg_B) ]
    except KeyError:
        try:
            center_A = get_wiki_center(reg_A).replace(' ', '+')
            center_B = get_wiki_center(reg_B).replace(' ', '+')
            soup = BS(get('https://www.avtodispetcher.ru/distance/?from=%s&to=%s' % (center_A, center_B)).content, features='lxml')
            d = int(soup.find(id="totalDistance").text)
        except AttributeError:
            d = 10000
        except ValueError:
            raise ValueError
        regions.update({'%s<->%s' % (reg_A, reg_B): d})
        return get_distance(reg_A, reg_B)

def get_yandex_name(wikiname):
    for rec in regions.keys():
        if rec.count(wikiname) > 0:
            return rec

def get_neighbors(region):
    try:
        return set(regions[region]['neighbors'])
    except KeyError:
        soup = BS(get('https://ru.wikipedia.org/wiki/%s' % region.replace(' ', '_')).content, features="lxml")
        for p in soup('p'):
            if p.text.lower().count('граничит') > 0:
                neighbor_candidates = set([ get_yandex_name(a['title']) for a in p('a') ])
                neighbors = list(regnames & neighbor_candidates)
                regions[region].update({'neighbors':neighbors})
                return neighbors
    
if __name__ == '__main__':
    print(get_neighbors('Архангельская область'))
    print(get_neighbors('Новосибирская область'))
    print(get_distance('Новосибирская область', 'Кемеровская область'))
    print(get_distance('Калининградская область', 'Камчатский край'))
    dump(regions, 'regions.json')