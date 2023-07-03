# Determining query equivalence between newly registered query and already executing query

The corresponding challenge is [#106](https://github.com/SolidLabResearch/Challenges/issues/106),
which contributes to scenario [#16](https://github.com/SolidLabResearch/Challenges/issues/16).
This challenge is an extension of challenge [#84](https://github.com/solidLabResearch/challenges/issues/84).

## Problem
<!--
You can reuse the pitch of the challenge, but check if you need to make changes.
For example, it might happen that the approved solution does more than what the original pitch requested.
-->

The [Solid Stream Aggregator](https://github.com/argahsuknesib/solid-stream-aggregator) is a service that 
aggregates data streams from Solid pods and stores the aggregation in another pod. 
This aggregation uses  
the [LDES in LDP](https://woutslabbinck.github.io/LDESinLDP/) specification. 
The user can register queries into the aggregator and 
generate a continuous materialized view over the streams stored in the pods. 
Moreover, multiple users can register the same query to the aggregator. 
On registering the same query, 
the aggregator currently instantiates a new process to compute and develop a continuous view. 
However, such an approach is resource-consuming and 
hinders the scalability of the aggregator. 
Therefore, there is a need for the aggregator to determine 
if a newly registered query is similar to an already executing query, and 
if so, not execute the query again but reuse the results of the already executing query. 
The Query Registry component of the aggregator keeps a record of 
the queries that are being executed currently and 
can be employed to identify query equivalence between 
a newly registered query and an already executing one.

## Approved solution
<!--
Provide information about the approved solution:
names of tools/libraries created, repos, and so on.
-->

We developed a [library](https://github.com/argahsuknesib/rspql-query-equivalence) to determine 
the equivalence between two 
[RSP-QL](https://re.public.polimi.it/retrieve/e0c31c0e-f3df-4599-e053-1705fe0aef77/RSP-QL-Semantics-A-Unifying%20Query%20Model%20to%20Explain%20Heterogeneity_11311-964309_Della%20Valle.pdf) 
queries.
RSP-QL is a continuous extension of SPARQL. 
These queries work on the RDF Stream Processing (RSP) data model,
which adds a temporal dimension to the RDF data model.
We developed [this demo](https://github.com/argahsuknesib/query-equivalence-demo) to show how the library works.

We made the following important technological decisions and assumptions:
- Since we are only interested in demonstrating the functionality of the Query Registry of the Solid Stream Aggregator, 
our demo doesn't include the actual aggregation of the different data streams. 
In case you wish to run the aggregator with pods and 
are interested in the aggregation results, 
you can check out [this demo](https://github.com/SolidLabResearch/aggregator-description-demo).

## User flow

<!--
Describe a concrete user flow with the approved solution.
Complete the following sections:
-->

### Actors/actresses

- User of the demo

### Preconditions

- The user has Node.js installed.

### Steps

1. Clone the repository via
   ```shell
   git clone https://github.com/argahsuknesib/query-equivalence-demo.git
   ```
2. Navigate to the folder `query-equivalence-demo` via
   ```shell
   cd query-equivalence-demo
   ```
3. Install the dependencies via
   ```shell
   npm i
   ```
4. Start the Community Solid Server instance that hosts data used by the queries via
   ```shell
   npm run start-solid-server
   ```
5. Start the aggregator in a separate terminal via
   ```shell
   npm run start demo
   ```


### Postconditions

## Follow-up actions
<!--
List all concrete follow-up actions that someone has to do.
For example, adding helper code from the solution to Comunica.
-->

## Future work
<!--
List ideas for future work.
These ideas don't have to be concrete.
You can create a new challenge/scenario for each idea.
-->

## Lessons learned about developer experience
<!--
List all lessons learned about your experience as a Solid developer:
issues you encountered, tasks that could be automated or could be made easier and so on.
-->
