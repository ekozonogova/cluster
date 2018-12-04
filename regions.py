from requests import get
from bs4 import BeautifulSoup as BS
from utilites import load, dump, compare

def get_wiki_center(region):
    def is_city(region):
        x = soup.find('div', {'class':"mw-parser-output"}).table.tbody.tr.text
        return x.count('Город') > 0 or x.count('Столица') > 0
        
    try:
        return regions[region]['center']
    except KeyError:
        soup = BS(get('https://ru.wikipedia.org/wiki/%s' % region.replace(' ', '_')).content, features="lxml")    
        if is_city(region):
            regions[region].update({'center':region})
            return get_wiki_center(region)
        for th in soup('th'):
            if  th.text == 'Административный центр' or \
                th.text == 'Столица':
                cnt = th.parent.td.text.strip().strip('\n')
                regions[region].update({'center':cnt})
                return get_wiki_center(region)
        
def get_distance(reg_A, reg_B):
    try:
        return distances['%s<->%s' % (reg_A, reg_B) ]
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
        distances.update({'%s<->%s' % (reg_A, reg_B): d})
        distances.update({'%s<->%s' % (reg_B, reg_A): d})
        dump(distances, 'distances.json', quiet = 1)
        return get_distance(reg_A, reg_B)

def get_yandex_name(wikiname):
    for rec in regions.keys():
        if compare(rec, wikiname) > 0.66:
            return rec
    raise ValueError('Регион не найден')

def get_neighbors(region):
    try:
        return regions[region]['neighbors']
    except KeyError:
        try:
            soup = BS(get('https://ru.wikipedia.org/wiki/%s' % region.replace(' ', '_')).content, features="lxml")
            for p in soup('p'):
                if  p.text.lower().count('граничит') > 0 or \
                    p.text.lower().count('граница') > 0:
                    neighbor_candidates = []
                    for a in p('a'):
                        try:
                            neighbor_candidates += [get_yandex_name(a['title'])]
                        except (KeyError, ValueError):
                            pass
                        
                    neighbor_candidates = set(neighbor_candidates)
                    same = {region}
                    print(same, neighbor_candidates)
                    neighbors = list(regnames & neighbor_candidates ^ same)
                    regions[region].update({'neighbors':neighbors})
                    dump(regions, 'regions.json', quiet = 1)
                    return neighbors
        except Exception as e:
            print(region)
            print(neighbor_candidates)
            print(neighbors)
            raise e
            
if __name__ == '__main__':
    regions = load('regions.json')
    distances = load('distances.json')
    reglist = list(regions.keys())
    regnames = set(regions.keys())  

    for region in reglist:
        print(region, get_neighbors(region))
        for region2 in reglist:
            if region2 != region:
                print(region, region2, get_distance(region, region2))
    dump(regions, 'regions.json')
    dump(distances, 'distances.json')