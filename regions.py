from requests import get
from bs4 import BeautifulSoup as BS

regions = [
{"yandexname":"Алтайский край","emissname":"Алтайский край","code":"RU-ALT","color":"#ffffff"},
{"yandexname":"Амурская область","emissname":"Амурская область","code":"RU-AMU","color":"#ffffff"},
{"yandexname":"Архангельская область","emissname":"Архангельская область (без автономного округа)","code":"RU-ARK","color":"#ffffff"},
{"yandexname":"Астраханская область","emissname":"Астраханская область","code":"RU-AST","color":"#ffffff"},
{"yandexname":"Белгородская область","emissname":"Белгородская область","code":"RU-BEL","color":"#ffffff"},
{"yandexname":"Брянская область","emissname":"Брянская область","code":"RU-BRY","color":"#ffffff"},
{"yandexname":"Владимирская область","emissname":"Владимирская область","code":"RU-VLA","color":"#ffffff"},
{"yandexname":"Волгоградская область","emissname":"Волгоградская область","code":"RU-VGG","color":"#ffffff"},
{"yandexname":"Вологодская область","emissname":"Вологодская область","code":"RU-VLG","color":"#ffffff"},
{"yandexname":"Воронежская область","emissname":"Воронежская область","code":"RU-VOR","color":"#ffffff"},
{"yandexname":"Еврейская автономная область","emissname":"Еврейская автономная область","code":"RU-YEV","color":"#ffffff"},
{"yandexname":"Забайкальский край","emissname":"Забайкальский край","code":"RU-ZAB","color":"#ffffff"},
{"yandexname":"Ивановская область","emissname":"Ивановская область","code":"RU-IVA","color":"#ffffff"},
{"yandexname":"Иркутская область","emissname":"Иркутская область","code":"RU-IRK","color":"#ffffff"},
{"yandexname":"Кабардино-Балкарская Республика","emissname":"Кабардино-Балкарская Республика","code":"RU-KB","color":"#ffffff"},
{"yandexname":"Калининградская область","emissname":"Калининградская область","code":"RU-KGD","color":"#ffffff"},
{"yandexname":"Калужская область","emissname":"Калужская область","code":"RU-KLU","color":"#ffffff"},
{"yandexname":"Камчатский край","emissname":"Камчатский край","code":"RU-KAM","color":"#ffffff"},
{"yandexname":"Карачаево-Черкесская Республика","emissname":"Карачаево-Черкесская Республика","code":"RU-KC","color":"#ffffff"},
{"yandexname":"Кемеровская область","emissname":"Кемеровская область","code":"RU-KEM","color":"#ffffff"},
{"yandexname":"Кировская область","emissname":"Кировская область","code":"RU-KIR","color":"#ffffff"},
{"yandexname":"Костромская область","emissname":"Костромская область","code":"RU-KOS","color":"#ffffff"},
{"yandexname":"Краснодарский край","emissname":"Краснодарский край","code":"RU-KDA","color":"#ffffff"},
{"yandexname":"Красноярский край","emissname":"Красноярский край","code":"RU-KYA","color":"#ffffff"},
{"yandexname":"Курганская область","emissname":"Курганская область","code":"RU-KGN","color":"#ffffff"},
{"yandexname":"Курская область","emissname":"Курская область","code":"RU-KRS","color":"#ffffff"},
{"yandexname":"Ленинградская область","emissname":"Ленинградская область","code":"RU-LEN","color":"#ffffff"},
{"yandexname":"Липецкая область","emissname":"Липецкая область","code":"RU-LIP","color":"#ffffff"},
{"yandexname":"Магаданская область","emissname":"Магаданская область","code":"RU-MAG","color":"#ffffff"},
{"yandexname":"Московская область","emissname":"Московская область","code":"RU-MOS","color":"#ffffff"},
{"yandexname":"Мурманская область","emissname":"Мурманская область","code":"RU-MUR","color":"#ffffff"},
{"yandexname":"Нижегородская область","emissname":"Нижегородская область","code":"RU-NIZ","color":"#ffffff"},
{"yandexname":"Новгородская область","emissname":"Новгородская область","code":"RU-NGR","color":"#ffffff"},
{"yandexname":"Новосибирская область","emissname":"Новосибирская область","code":"RU-NVS","color":"#ffffff"},
{"yandexname":"Омская область","emissname":"Омская область","code":"RU-OMS","color":"#ffffff"},
{"yandexname":"Оренбургская область","emissname":"Оренбургская область","code":"RU-ORE","color":"#ffffff"},
{"yandexname":"Орловская область","emissname":"Орловская область","code":"RU-ORL","color":"#ffffff"},
{"yandexname":"Пензенская область","emissname":"Пензенская область","code":"RU-PNZ","color":"#ffffff"},
{"yandexname":"Пермский край","emissname":"Пермский край","code":"RU-PER","color":"#ffffff"},
{"yandexname":"Приморский край","emissname":"Приморский край","code":"RU-PRI","color":"#ffffff"},
{"yandexname":"Псковская область","emissname":"Псковская область","code":"RU-PSK","color":"#ffffff"},
{"yandexname":"Республика Адыгея","emissname":"Республика Адыгея","code":"RU-AD","color":"#ffffff"},
{"yandexname":"Республика Алтай","emissname":"Республика Алтай","code":"RU-AL","color":"#ffffff"},
{"yandexname":"Республика Башкортостан","emissname":"Республика Башкортостан","code":"RU-BA","color":"#ffffff"},
{"yandexname":"Республика Бурятия","emissname":"Республика Бурятия","code":"RU-BU","color":"#ffffff"},
{"yandexname":"Республика Дагестан","emissname":"Республика Дагестан","code":"RU-DA","color":"#ffffff"},
{"yandexname":"Республика Ингушетия","emissname":"Республика Ингушетия","code":"RU-IN","color":"#ffffff"},
{"yandexname":"Республика Калмыкия","emissname":"Республика Калмыкия","code":"RU-KL","color":"#ffffff"},
{"yandexname":"Республика Карелия","emissname":"Республика Карелия","code":"RU-KR","color":"#ffffff"},
{"yandexname":"Республика Коми","emissname":"Республика Коми","code":"RU-KO","color":"#ffffff"},
{"yandexname":"Республика Марий Эл","emissname":"Республика Марий Эл","code":"RU-ME","color":"#ffffff"},
{"yandexname":"Республика Мордовия","emissname":"Республика Мордовия","code":"RU-MO","color":"#ffffff"},
{"yandexname":"Республика Саха","emissname":"Республика Саха (Якутия)","code":"RU-SA","color":"#ffffff"},
{"yandexname":"Республика Северная Осетия — Алания","emissname":"Республика Северная Осетия - Алания","code":"RU-SE","color":"#ffffff"},
{"yandexname":"Республика Татарстан","emissname":"Республика Татарстан","code":"RU-TA","color":"#ffffff"},
{"yandexname":"Республика Тыва","emissname":"Республика Тыва","code":"RU-TY","color":"#ffffff"},
{"yandexname":"Республика Хакасия","emissname":"Республика Хакасия","code":"RU-KK","color":"#ffffff"},
{"yandexname":"Ростовская область","emissname":"Ростовская область","code":"RU-ROS","color":"#ffffff"},
{"yandexname":"Рязанская область","emissname":"Рязанская область","code":"RU-RYA","color":"#ffffff"},
{"yandexname":"Самарская область","emissname":"Самарская область","code":"RU-SAM","color":"#ffffff"},
{"yandexname":"Саратовская область","emissname":"Саратовская область","code":"RU-SAR","color":"#ffffff"},
{"yandexname":"Сахалинская область","emissname":"Сахалинская область","code":"RU-SAK","color":"#ffffff"},
{"yandexname":"Свердловская область","emissname":"Свердловская область","code":"RU-SVE","color":"#ffffff"},
{"yandexname":"Смоленская область","emissname":"Смоленская область","code":"RU-SMO","color":"#ffffff"},
{"yandexname":"Ставропольский край","emissname":"Ставропольский край","code":"RU-STA","color":"#ffffff"},
{"yandexname":"Тамбовская область","emissname":"Тамбовская область","code":"RU-TAM","color":"#ffffff"},
{"yandexname":"Тверская область","emissname":"Тверская область","code":"RU-TVE","color":"#ffffff"},
{"yandexname":"Томская область","emissname":"Томская область","code":"RU-TOM","color":"#ffffff"},
{"yandexname":"Тульская область","emissname":"Тульская область","code":"RU-TUL","color":"#ffffff"},
{"yandexname":"Тюменская область","emissname":"Тюменская область (без автономных округов)","code":"RU-TYU","color":"#ffffff"},
{"yandexname":"Удмуртская Республика","emissname":"Удмуртская Республика","code":"RU-UD","color":"#ffffff"},
{"yandexname":"Ульяновская область","emissname":"Ульяновская область","code":"RU-ULY","color":"#ffffff"},
{"yandexname":"Хабаровский край","emissname":"Хабаровский край","code":"RU-KHA","color":"#ffffff"},
{"yandexname":"Челябинская область","emissname":"Челябинская область","code":"RU-CHE","color":"#ffffff"},
{"yandexname":"Чеченская Республика","emissname":"Чеченская Республика","code":"RU-CE","color":"#ffffff"},
{"yandexname":"Чувашская Республика","emissname":"Чувашская Республика","code":"RU-CU","color":"#ffffff"},
{"yandexname":"Чукотский автономный округ","emissname":"Чукотский автономный округ","code":"RU-CHU","color":"#ffffff"},
{"yandexname":"Ярославская область","emissname":"Ярославская область","code":"RU-YAR","color":"#ffffff"},
{"yandexname":"Санкт-Петербург ","emissname":"г.Санкт-Петербург","code":"RU-SPE","color":"#ffffff"},
{"yandexname":"Москва ","emissname":"г.Москва","code":"RU-MOW","color":"#ffffff"},
{"yandexname":"Ненецкий автономный округ","emissname":"Ненецкий автономный округ","code":"RU-NEN","color":"#ffffff"},
{"yandexname":"Ханты-Мансийский автономный округ","emissname":"Ханты-Мансийский автономный округ-Югра","code":"RU-KHM","color":"#ffffff"},
{"yandexname":"Ямало-Ненецкий автономный округ","emissname":"Ямало-Ненецкий автономный округ","code":"RU-YAN","color":"#ffffff"},
{"yandexname":"Севастополь ","emissname":"г. Севастополь","code":"RU-SEV","color":"#ffffff"},
{"yandexname":"Республика Крым","emissname":"Республика Крым","code":"RU-KRY","color":"#ffffff"}
]

regnames = set([ s['yandexname'] for s in regions])

def get_yandex_name(wikiname):
    for rec in regions:
        if rec['yandexname'].count(wikiname) > 0:
            return rec['yandexname']

def get_neighbors(region):
    soup = BS(get('https://ru.wikipedia.org/wiki/%s' % region.replace(' ', '_')).content, features="lxml")
    for p in soup('p'):
        if p.text.count('Граничит') > 0:
            neighbor_candidates = set([ get_yandex_name(a['title']) for a in p('a') ])
            neighbors = regnames & neighbor_candidates
            return neighbors
    
if __name__ == '__main__':
    print(get_neighbors('Архангельская область'))
    print(get_neighbors('Ненецкий автономный округ'))
    print(get_neighbors('Томская область'))
    