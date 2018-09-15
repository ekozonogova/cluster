# ИДЕНТИФИКАЦИЯ КЛАСТЕРОВ НА МАКРО-УРОВНЕ
# Елена Козоногова elenaa.semenovaa@gmail.com
# Даниил Курушин kurushin.daniel@yandex.ru

from download import download_data
from xlsx2dict import convert_data
from matrix import form_matrix

URL = "http://www.gks.ru/wps/wcm/connect/rosstat_main/rosstat/ru/statistics/accounts/"

if __name__ == '__main__':
	xlsx_file = download_data(URL)
	dict_data = convert_data(xlsx_file)
	nmpy_data = form_matrix(dict_data)
	print(nmpy_data)