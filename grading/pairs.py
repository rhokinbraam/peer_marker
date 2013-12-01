import networkx as nx
from random import choice

class Graph():
  def __init__(self, essay_count):
    self.essay_count = essay_count
    self.isolated_node = essay_count-1
    self.min_degree = 3
    self.g = self.generate_graph()

  def generate_graph(self):
    if self.essay_count % 2 == 0:
      graph = nx.random_regular_graph(self.min_degree, self.essay_count)
    else:
      graph = self.generate_odd_graph()
    return graph

  def generate_odd_graph(self):
    graph = nx.random_regular_graph(self.min_degree, self.essay_count-1)
    graph.add_node(self.isolated_node)
    for node in self.choose_random_nodes():
      graph.add_edge(self.isolated_node, node)
    return graph

  def average_degree_connectivity(self):
    return nx.average_degree_connectivity(self.g)

  def valid_connectivity(self):
    return self.average_degree_connectivity() > self.min_degree

  def no_self_loops(self):
    return len(self.g.nodes_with_selfloops()) == 0

  def all_connected(self):
    return len(nx.connected_components(graph)) == 1

  def is_valid(self):
    return self.no_self_loops() and self.valid_connectivity()

  def choose_random_nodes(self):
    nodes = range(self.essay_count)
    nodes.pop(self.isolated_node)
    nodes_to_link = []
    for x in range(self.min_degree):
      random_node = choice(nodes)
      nodes_to_link.append(random_node)
      nodes.remove(random_node)
    return nodes_to_link

class Essays():
  def __init__(self, essay_ids):
    self.essay_ids = essay_ids
    self.number_of_essays = len(essay_ids)
    self.essay_map = dict(zip(range(0,self.number_of_essays),self.essay_ids))
    self.graph = Graph(self.number_of_essays).g


