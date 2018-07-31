def classifylist(listanums):

	for num in listanums:
		tipo=classifynum(num)
		print num,tipo

def classifynum(number):
	acc = 0
	
	for i in range(1,number/2+1):
		if (number%i==0):
			acc+=i

	if acc == number:
		return "perfecto"
	elif acc > number:
		return "abundante"
	else:
		return "defectivo"

list = (5, 10, 12, 14, 28)

classifylist(list)