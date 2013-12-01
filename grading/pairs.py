import networkx as nx

class Graph():
  def __init__(self, essay_count):
    self.essay_count = essay_count
    self.g = self.generate_graph()

  def generate_graph(self):
    graph = nx.random_regular_graph(3, self.essay_count)
    return graph

  def average_degree_connectivity(self):
    return nx.average_degree_connectivity(self.g)

  def valid_connectivity(self):
    return self.average_degree_connectivity() > 3

  def no_self_loops(self):
    return len(self.g.nodes_with_selfloops()) == 0

  def is_valid(self):
    return self.no_self_loops() and self.valid_connectivity()

class Essays():
  def __init__(self, essay_ids):
    self.essay_ids = essay_ids
    self.number_of_essays = len(essay_ids)
    self.essay_map = dict(zip(range(0,self.number_of_essays),self.essay_ids))
    self.graph = Graph(self.number_of_essays).g


