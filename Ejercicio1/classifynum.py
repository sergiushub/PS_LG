class MyClassifier:

	def classifylist(self,listanums):
		#We iterate the list to get the classification
		for num in listanums:
			tipo=self.classifynum(num)
			print num,tipo

	def classifynum(self,number):
		acc = 0

		#First we check if the parameter recieved is in fact a integer
		if isinstance(number, basestring):
			if (self.is_integer(number)):
				number = int(number)
			else:
				return "no es un entero"
		elif not isinstance(number, int):
			return "no es un entero"

		#We itearate through each number from 1 to the total divided by two
		#because there are no more divisors after half of the total
		for i in range(1,number/2+1):
			#If the number is a divisor we add to the total
			if (number%i==0):
				acc+=i

		#Lastly we classify the number
		if acc == number:
			return "perfecto"
		elif acc > number:
			return "abundante"
		else:
			return "defectivo"

	def is_integer(self,s):

		#If the integer parsing succeds then the string is a representation
		#of an integer and we return True. False otherwise.
		try:
			int(s)
			return True
		except ValueError:
			return False


classifier = MyClassifier()

my_test_list = (1, 2, 12, 14, "15.1", "28", 15.9, "DEVO")
classifier.classifylist(my_test_list)
