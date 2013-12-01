import networkx as nx

class Essays():
  def __init__(self, nodes):
    self.graph = nx.Graph()
    self.graph.add_nodes_from(nodes)

  def next_pair(self, id):
    return [3,4]

