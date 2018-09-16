import xlrd
from sys import stderr
# Открываем файл формата .xlsx в директории проекта

def OpenXlsx(_in = './DATA.xlsx'):
	excel_data_file = xlrd.open_workbook(_in)
	sheet = excel_data_file.sheet_by_index(0)
	return sheet

# Формируем многомерный словарь
def create_dict(_in, filter_list):
	sheet = OpenXlsx(_in = './DATA.xlsx')
	rez = {}
	codes = {}
	for row in range(sheet.nrows):
		try:
			nn = int(sheet.cell_value(row,0))
			assert nn not in filter_list, '%s in filter %s' % (nn, str(filter_list))
			rez.update({nn:None})
			codes.update({nn:sheet.cell_value(row,1)})
			rowdata = {}
			for col in range(sheet.ncols):
				try:
					nnn = int(sheet.cell_value(3,col))
					assert nnn not in filter_list, '%s in filter %s' % (nnn, str(filter_list))
					rowdata.update({nnn:int(sheet.cell_value(row, col))})
				except ValueError as e:
					print('ValueError', col, e, file = stderr)
				except AssertionError as e:
					print('AssertionError', col, e, file = stderr)
			rez[nn] = rowdata
		except ValueError as e:
			print('ValueError', row, e, file = stderr)
		except AssertionError  as e:
			print('AssertionError', row, e, file = stderr)
			
	return rez, codes

def convert_data(_in = './DATA.xlsx'):
	filter_list = [49, 84, 92] + list(range(106, 141))
	newDict = create_dict('./DATA.xlsx', filter_list)
	return newDict

if __name__ == '__main__':
	convert_data(_in = './DATA.xlsx')
