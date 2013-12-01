essay_distributor
===


Distribution of Essays
----
Problem: Evenly distribute pairs of Essays. The suggest solution is to use a  simple graph, with average degree of 3.

Approach:

1. Generate a random Graph, selected uniformly, with an average degree of 3


- https://en.wikipedia.org/wiki/Random_regular_graph

- http://networkx.lanl.gov/reference/generated/networkx.generators.random_graphs.random_regular_graph.html

- https://egtheory.wordpress.com/2012/03/29/random-regular-graphs/

2. If the number of nodes are odd, we remove it so we can generate the graph

3. We then add the isoltaed node back in and randomly add edges - some essays will be graded a few times more

The graph only needs to be generated once, and is random. Once we have, we pull out the connected pairs and put them all on a stack.

When a request comes in for pairs of essays to evaluate the stack is used

Scoring of Essays
---

Problem: To infer a ranking based on the grading done by the students, and then calabirate scoring based on the teachers grading.

Approach: 
1. Use a pairwise comparison :
https://en.wikipedia.org/wiki/Pairwise_comparison 


2. Teacher grades some of the essays there are two ways that this could be done:
 - Using the score, cluster the essays and select an essay at random to be graded
 - Use furthest point first to select essays to be graded
