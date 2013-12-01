import unittest
from pairs import Essays
import networkx as nx


class TestPairFunctions(unittest.TestCase):

  def setUP(self):
    pass

  def test_init(self):
    essays = Essays([123,456,789,101])
    self.assertEqual(essays.essay_map, {0: 123, 1: 456, 2: 789, 3: 101 })

  def test_graph_average_degree_connectivity(self):
    essays = Essays([123,456,789,101])
    self.assertGreaterEqual(essays.average_degree_connectivity, 3)

if __name__ == '__main__':
    unittest.main()