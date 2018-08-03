import unittest
import classifynum

class TestMyModule(unittest.TestCase):
	
	def test_perfecto(self):
		self.assertEqual(classifynum.classifynum(6),"perfecto")

	def test_defectivo(self):
		self.assertEqual(classifynum.classifynum(12),"abundante")

	def test_abundante(self):
		self.assertEqual(classifynum.classifynum(14),"defectivo")

	def test_string_integer(self):
		self.assertEqual(classifynum.classifynum("28"),"perfecto")

	def test_string_no_integer(self):
		self.assertEqual(classifynum.classifynum("DEVO"),"no es un entero")

	def test_string_no_integer(self):
		self.assertEqual(classifynum.classifynum("15.5334"),"no es un entero")

	def test_no_integer(self):
		self.assertEqual(classifynum.classifynum(15.5334),"no es un entero")

if __name__ == "__main__":
	unittest.main()
