import xlrd

# Открываем файл формата .xlsx в директории проекта
excel_data_file = xlrd.open_workbook('./DATA.xlsx')
sheet = excel_data_file.sheet_by_index(0)

dictOut = {}

row_number = sheet.nrows
col_number = sheet.ncols

if row_number > 0 and col_number > 0:

    # Формируем многомерный словарь
    for i in range (0, row_number):
        dictOut[i] = {}

    # Выгружаем данные из ячеек
    for i in range(0, row_number):
        for j in range(0, col_number):
            dictOut[i][j] = sheet.cell_value(i, j)
else:
    print("Excel файл с данными пустой или заполнен неверно")

# Формируем список на удаление
a = ['049', '084', '092', '093', '094', '095', '096', '097', '098', '099']
for i in range (100, 140):
    a.append(i)
number = len(a)

# Удаление элементов

#print(dictOut[47])

newDictOut = {}
newRowNumber = 0
check = 0
for i in range(0, number):
    for j in range(0, row_number):
        if check == j and a[i] != dictOut[j][0]:
            print(dictOut[j][0])
            newDictOut[newRowNumber] = {}
            newDictOut[newRowNumber]=dictOut[j].copy()
            newRowNumber += 1
            check += 1
    check+=1

#print(newDictOut[47])
