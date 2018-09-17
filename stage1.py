from sys import stderr
from json import dumps
import numpy as np
import xlrd

def download_data(url):
	return './DATA.xlsx'

def OpenXlsx(_in = './DATA.xlsx'):
	excel_data_file = xlrd.open_workbook(_in)
	sheet = excel_data_file.sheet_by_index(0)
	return sheet

def create_dict(_in, filter_list):
	sheet = OpenXlsx(_in = './DATA.xlsx')
	rez = {}
	codes = {}
	for row in range(sheet.nrows):
		try:
			nn = int(sheet.cell_value(row,0))
			assert nn not in filter_list, '%s in filter %s' % (nn, str(filter_list))
			rez.update({nn:None})
			codes.update({nn:sheet.cell_value(row,2)})
			rowdata = {}
			for col in range(sheet.ncols):
				try:
					nnn = int(sheet.cell_value(3,col))
					assert nnn not in filter_list, '%s in filter %s' % (nnn, str(filter_list))
					rowdata.update({nnn:int(sheet.cell_value(row, col))})
				except ValueError as e:
					pass
					# print('ValueError', col, e, file = stderr)
				except AssertionError as e:
					pass
					# print('AssertionError', col, e, file = stderr)
			rez[nn] = rowdata
		except ValueError as e:
			pass
			# print('ValueError', row, e, file = stderr)
		except AssertionError  as e:
			pass
			# print('AssertionError', row, e, file = stderr)
			
	return rez, codes

def convert_data(_in = './DATA.xlsx'):
	filter_list = [49, 84, 92] + list(range(106, 141))
	rez, codes = create_dict('./DATA.xlsx', filter_list)
	return rez, codes

def form_matrix(dict_data):
	rez = []
	for i in dict_data.keys():
		row = []
		for j in dict_data[i].keys():
			row += [dict_data[i][j]]
		rez += [row]
	return np.array(rez)

