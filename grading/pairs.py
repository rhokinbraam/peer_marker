import networkx as nx

class Essays():
  def __init__(self, essay_ids):
    self.essay_ids = essay_ids
    self.number_of_essays = len(essay_ids)
    self.essay_map = dict(zip(range(0,self.number_of_essays),self.essay_ids))
    self.graph = self.generate_graph(self.number_of_essays)

  def generate_graph(self,number_of_essays):
    graph = nx.random_regular_graph(3, self.number_of_essays)
    return graph

  def average_degree_connectivity(self):
    return nx.average_degree_connectivity(self.graph)

  def next_pair(self, id):
    pass