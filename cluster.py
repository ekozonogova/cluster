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
			xlsx_file = load('data/xlsx_file.json')
			dict_data, codes = load('data/xlsx_content.json')
			nmpy_data = load('data/nmpy_data.dat')
			idx = load('data/index.json')
			LV = load('data/LV.dat')
			CL = load('data/CL.json')
			M = load('data/M.dat')
			graph(M, LV, CL, idx, 'filename', subgraphs=0)

			end = True
		except FileNotFoundError as e:
			if e.filename == 'data/xlsx_file.json':
				xlsx_file = download_data(URL)
				dump(xlsx_file, 'data/xlsx_file.json')
			elif e.filename == 'data/xlsx_content.json':
				dict_data, codes = convert_data(xlsx_file)
				dump((dict_data, codes), 'data/xlsx_content.json')
			elif e.filename == 'data/nmpy_data.dat':
				nmpy_data, idx = form_matrix(dict_data, codes)
				dump(nmpy_data, 'data/nmpy_data.dat')
				dump(idx, 'data/index.json')
			elif e.filename == 'data/LV.dat':
				X, Y = get_XY(nmpy_data)
				XX = get_r(X)
				YY = get_r(Y)
				XY = get_xy(X, Y)
				YX = get_xy(Y, X)
				LV = get_lv(XX, YY, YX, XY)
				dump(LV,'data/LV.dat')
			elif e.filename == 'CL.json':
				nmpy_data = get_ZeroDiag(nmpy_data)
				A = get_AftLinks(nmpy_data)
				B = get_PreLinks(nmpy_data)
				dump(A, 'data/A.dat')
				dump(B, 'data/B.dat')
				M = get_ImpLinks(A, B)
				dump(M, 'data/M.dat')
				CL = filter_clusters(make_clusters(A, B, LV, idx))
				dump(CL,'data/CL.json')
				end = True
			
	