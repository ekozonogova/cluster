import xlrd

# Открываем файл формата .xlsx в директории проекта

def OpenXlsx(_in = './DATA.xlsx'):
	excel_data_file = xlrd.open_workbook(_in)
	sheet = excel_data_file.sheet_by_index(0)
	return sheet

# Формируем многомерный словарь

def create_dict(_in = './DATA.xlsx'):
	sheet = OpenXlsx(_in = './DATA.xlsx')
	row_number = sheet.nrows
	col_number = sheet.ncols
	if row_number > 0 and col_number > 0:
		dictOut = {}
		numbers = []
		for i in range(4, row_number):
			numbers.append(int(sheet.cell_value(i, 0)))
		k = 4
		for i in numbers:
			row_data = {}
			for j in range(1, col_number):
				print(i,j)
				row_data.update({int(sheet.cell_value(k, 5)):sheet.cell_value(k, j)})
			dictOut.update({i: row_data})
			k += 1
		return dictOut
	else:
		print("Excel файл с данными пустой или заполнен неверно")

# Формируем список на удаление

def filter_dict():
	a = [49, 84, 92]
	for i in range (106, 141):
		a.append(i)
	return a

# Удаление элементов

def update_dict(delNumbers, dictOut):
	for i in delNumbers:
		try:
			del dictOut[i]
		except:
			break
	return dictOut

# Запуск

def convert_data(_in = './DATA.xlsx'):
	newDict = create_dict(_in = './DATA.xlsx')
	delNumbers = filter_dict()
	newDict = update_dict(delNumbers, newDict)
	return newDict

if __name__ == '__main__':
	convert_data(_in = './DATA.xlsx')
