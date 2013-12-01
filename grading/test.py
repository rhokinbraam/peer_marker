import unittest
from pairs import Essays, Graph
import networkx as nx


class TestEssays(unittest.TestCase):
  def setUP(self):
    pass

  def test_init(self):
    essays = Essays([123,456,789,101])
    self.assertEqual(essays.essay_map, {0: 123, 1: 456, 2: 789, 3: 101 })

class TestGraph(unittest.TestCase):
  def setUp(self):
    self.graph = Graph(4)
    self.odd_graph = Graph(5)

  def test_graph_average_degree_connectivity(self):
    self.assertGreaterEqual(self.graph.average_degree_connectivity, 3)

  def test_no_self_loops(self):
    self.assertTrue(self.graph.no_self_loops())

  def test_is_valid(self):
    self.assertTrue(self.graph.is_valid())

  def test_choose_random_nodes(self):
    random_choice = Graph(5).choose_random_nodes()
    self.assertNotIn(4, random_choice)

  def test_odd_graph(self):
    self.assertTrue(self.odd_graph.all_connected)

  def test_odd_graph_is_valid(self):
    self.assertTrue(self.odd_graph.is_valid())

if __name__ == '__main__':
    unittest.main()