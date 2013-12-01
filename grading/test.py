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

  def setUP(self):
    pass

  def test_graph_average_degree_connectivity(self):
    graph = Graph(4)
    self.assertGreaterEqual(graph.average_degree_connectivity, 3)

  def test_no_self_loops(self):
    graph = Graph(4)
    self.assertTrue(graph.no_self_loops())

  def test_is_valid(self):
    graph = Graph(4)
    self.assertTrue(graph.is_valid())

  def test_choose_random_nodes(self):
    random_choice = Graph(5).choose_random_nodes()
    self.assertNotIn(4, random_choice)

  def test_odd_graph(self):
    graph = Graph(5)
    self.assertTrue(graph.all_connected)

  def test_odd_graph_is_valid(self):
    graph = Graph(5)
    self.assertTrue(graph.is_valid())

if __name__ == '__main__':
    unittest.main()