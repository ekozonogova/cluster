# ИДЕНТИФИКАЦИЯ КЛАСТЕРОВ НА МАКРО-УРОВНЕ
# Елена Козоногова elenaa.semenovaa@gmail.com
# Даниил Курушин kurushin.daniel@yandex.ru
from utilites import dump, load

from stage1 import download_data, convert_data, form_matrix
from stage2 import *
from stage3 import *

URL = "http://www.gks.ru/wps/wcm/connect/rosstat_main/rosstat/ru/statistics/accounts/"

if __name__ == '__main__':
	end = False
	while not end:
		try:
			xlsx_file = load('xlsx_file.json')
			dict_data, codes = load('xlsx_content.json')
			nmpy_data = load('nmpy_data.json')
			end = True
		except FileNotFoundError as e:
			if e.filename == 'xlsx_file.json':
				xlsx_file = download_data(URL)
				dump(xlsx_file, 'xlsx_file.json')
			elif e.filename == 'xlsx_content.json':
				dict_data, codes = convert_data(xlsx_file)
				dump((dict_data, codes), 'xlsx_content.json')
			elif e.filename == 'nmpy_data.json':
				nmpy_data = form_matrix(dict_data)
				dump(nmpy_data, 'nmpy_data.json')
			
	exit(0)
	
	
	X, Y = get_XY(nmpy_data)
	XX = get_r(X)
	YY = get_r(Y)
	XY = get_xy(X, Y)
	YX = get_xy(Y, X)
	LV = get_lv(XX, YY, YX, XY)
	A = get_AftLinks(LV)
	B = get_PreLinks(LV)
	M = get_ImpLinks(A, B)
	print(M)