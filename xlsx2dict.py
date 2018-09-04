import xlrd

# Открываем файл формата .xlsx в директории проекта

def OpenXlsx():
    excel_data_file = xlrd.open_workbook('./DATA.xlsx')
    sheet = excel_data_file.sheet_by_index(0)
    return sheet

# Формируем многомерный словарь

def FormDict():
    sheet = OpenXlsx()
    row_number = sheet.nrows
    col_number = sheet.ncols
    if row_number > 0 and col_number > 0:
        dictOut = {}
        numbers = []
        for i in range(4, row_number):
            numbers.append(int(sheet.cell_value(i, 0)))
        k = 4
        for i in numbers:
            row_data = []
            for j in range(1, col_number):
                row_data.append(sheet.cell_value(k, j))
            dictOut.update({i: row_data})
            k += 1
        return dictOut
    else:
        print("Excel файл с данными пустой или заполнен неверно")

# Формируем список на удаление

def DelNumbers():
    a = [49, 84, 92]
    for i in range (106, 141):
    	a.append(i)
    return a

# Удаление элементов

def UpdDict(delNumbers, dictOut):
    for i in delNumbers:
        try:
            del dictOut[i]
        except:
            break
    return dictOut

# Запуск

def Start():
    newDict = FormDict()
    delNumbers = DelNumbers()
    newDict = UpdDict(delNumbers, newDict)

Start()
