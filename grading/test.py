import unittest
from pairs import Essays
import networkx as nx


class TestPairFunctions(unittest.TestCase):

  def setUP(self):
    pass

  def test_init(self):
    essays = Essays([1,2])
    self.assertTrue(isinstance(essays.graph, nx.classes.graph.Graph))

  def test_next_pair(self):
    essays = Essays([1,2,3,4])
    self.assertEqual(essays.next_pair(1),[3,4])

if __name__ == '__main__':
    unittest.main()