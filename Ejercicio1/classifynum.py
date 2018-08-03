"""
MyClassifier class with the solution of the code test for DEVO
"""

class MyClassifier:

	def classifylist(self,listanums):
		"""
		Classifylist recieves a list of elements and classify each 
		one using classifynum function.

		Args:
			listanums (list): A list with the elements to classify

		Returns:
			Nothing
		""" 

		#We iterate the list to get the classification
		for num in listanums:
			tipo=self.classifynum(num)
			print num,tipo

	def classifynum(self,number):
		"""
		Classifynum recieves an element and checks weather the element
		is an integer number. If the element is a string representation
		of an integer number the function parse the string to integer 
		and classifies it. If the element is not a integer number or a 
		string representation of an integer number the function returns 
		the statement "no es un entero".

		There are three possible classifications:
			"perfecto"
			"abundante"
			"defectivo" 

		Args:
			number (object): An element which could be a number.

		Returns:
			str: the name of the classification or the statement "no es un entero".
			
		"""

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
		"""
		is_integer recieves a string and resolves wheather the string represents
		an integer or not.

		Args:
			s (str): A string which could be a integer.

		Returns:
			bool: True if the string is an integer False if not.
			
		"""
		
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
