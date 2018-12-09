# ИДЕНТИФИКАЦИЯ КЛАСТЕРОВ НА МАКРО-УРОВНЕ
# Елена Козоногова elenaa.semenovaa@gmail.com
# Даниил Курушин kurushin.daniel@yandex.ru
from utilites import dump, load, graph

from stage1 import download_data, convert_data, form_matrix
from stage2 import *
from stage3 import *
from stage4 import *
from stage5 import *

URL = "http://www.gks.ru/wps/wcm/connect/rosstat_main/rosstat/ru/statistics/accounts/"

if __name__ == '__main__':
	end = False
	while not end:
		try:
			xlsx_file = load('xlsx_file.json')
			dict_data, codes = load('xlsx_content.json')
			nmpy_data = load('nmpy_data.dat')
			idx = load('index.json')
			LV = load('LV.dat')
			CL = load('CL.json')
			M = load('M.dat')
			graph(M, LV, CL, idx, 'filename', subgraphs=0)

			end = True
		except FileNotFoundError as e:
			if e.filename == 'xlsx_file.json':
				xlsx_file = download_data(URL)
				dump(xlsx_file, 'xlsx_file.json')
			elif e.filename == 'xlsx_content.json':
				dict_data, codes = convert_data(xlsx_file)
				dump((dict_data, codes), 'xlsx_content.json')
			elif e.filename == 'nmpy_data.dat':
				nmpy_data, idx = form_matrix(dict_data, codes)
				dump(nmpy_data, 'nmpy_data.dat')
				dump(idx, 'index.json')
			elif e.filename == 'LV.dat':
				X, Y = get_XY(nmpy_data)
				XX = get_r(X)
				YY = get_r(Y)
				XY = get_xy(X, Y)
				YX = get_xy(Y, X)
				LV = get_lv(XX, YY, YX, XY)
				dump(LV,'LV.dat')
			elif e.filename == 'CL.json':
				nmpy_data = get_ZeroDiag(nmpy_data)
				A = get_AftLinks(nmpy_data)
				B = get_PreLinks(nmpy_data)
				dump(A, 'A.dat')
				dump(B, 'B.dat')
				M = get_ImpLinks(A, B)
				dump(M, 'M.dat')
				CL = filter_clusters(make_clusters(A, B, LV, idx))
				dump(CL,'CL.json')
				end = True
			
	