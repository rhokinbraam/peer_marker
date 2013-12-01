import networkx as nx

class Graph():
  def __init__(self, essay_count):
    self.essay_count = essay_count

  def generate_graph(self,number_of_essays):
    graph = nx.random_regular_graph(3, self.essay_count)
    return graph

  def average_degree_connectivity(self):
    return nx.average_degree_connectivity(self.graph)

  def no_self_loops(self):
    pass

  def is_simple(self, graph):
    pass

class Essays():
  def __init__(self, essay_ids):
    self.essay_ids = essay_ids
    self.number_of_essays = len(essay_ids)
    self.essay_map = dict(zip(range(0,self.number_of_essays),self.essay_ids))
    self.graph = Graph(self.number_of_essays)


