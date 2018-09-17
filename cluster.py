# ИДЕНТИФИКАЦИЯ КЛАСТЕРОВ НА МАКРО-УРОВНЕ
# Елена Козоногова elenaa.semenovaa@gmail.com
# Даниил Курушин kurushin.daniel@yandex.ru
from json import dump

from stage1 import download_data, convert_data, form_matrix
from stage2 import *
from stage3 import *

URL = "http://www.gks.ru/wps/wcm/connect/rosstat_main/rosstat/ru/statistics/accounts/"

if __name__ == '__main__':
	xlsx_file = download_data(URL)
	dict_data, codes = convert_data(xlsx_file)
	nmpy_data = form_matrix(dict_data)
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