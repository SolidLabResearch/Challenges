<!--
Fill in the WebIDs of the people below.
Leave this in comments!
It's possible to have multiple people per role.

Challenge/scenario creator:
  - https://data.knows.idlab.ugent.be/person/pbonte/#me
Solution creator:
  - https://data.knows.idlab.ugent.be/person/maartenvdb/#me
Report writer:
  - https://pieterheyvaert.com/#me
-->

# Aggregators to improve social media data access across many pods

The corresponding challenge is [#24](https://github.com/SolidLabResearch/Challenges/issues/24).

## Problem

Applications that require to aggregate data across many pods can be faced with slow response times due to
the latency of data retrieval and processing of the large number of pods.
This is typically the case in a social media scenario,
where the timelines of their users are curated based on the activities of their contacts.
Computing these timelines when the users access their social media applications is typically not feasible
due to latency constraints.
Therefore, the timelines should be precomputed as a form of aggregation.

## Approved solution
<!--
Provide information about the approved solution:
names of tools/libraries created, repos, and so on.
-->

We developed a [demo](https://github.com/maartyman/solidBenchAggregatorDemo) that
uses our [Solid Aggregator Server](https://github.com/maartyman/solid-aggregator-server) and
[Solid Aggregator Client](https://github.com/maartyman/solid-aggregator-client)
to show the difference in execution time of a query
between using the aggregator and not using the aggregator.
We use the [SolidBench.js](https://github.com/SolidBench/SolidBench.js) benchmark to
simulate data pods with social media data.

The Solid Aggregator Server functions as an intermediate component in the Solid network.
The server accepts queries from client applications and
directly exposes the result of the queries, which are the computed bindings.
This allows client applications to retrieve the query results directly from the aggregator instead of
evaluating expensive queries themselves.
The Solid Aggregator Client make it easier for developers to work with the aggregator.

This server computes the bindings and
keeps them up to date when changes in the resources in the Solid network occur.
In other words, the server makes sure that changes in the resources are reflected in
the resulting bindings of a specific query.
We do this by re-evaluating the queries every time a resource has changed.

## User flow

### Actors/actresses

- User of the demo

### Preconditions

- The user has Node.js installed.

### Steps

1. Clone the [demo repo](https://github.com/maartyman/solidBenchAggregatorDemo) via `git clone https://github.com/maartyman/solidBenchAggregatorDemo.git`.
2. Install dependencies via `npm i`.
3. Set up and start servers via `npm run setupAndStartServers`.
4. Wait till the console says "Everything is set up and ready for the demo!".
5. Execute one of the four demo queries in a new terminal:
    - Find all the WebIDs of the friends of pod `00000000000000000933` via `npm run simple-query`
      (see [details](https://github.com/maartyman/solidBenchAggregatorDemo#demo-1)).
    - Determine the distance between user `00000000000000000102` and some predetermined users via `npm run complex-query`
      (see [details](https://github.com/maartyman/solidBenchAggregatorDemo#demo-2)).
    - Find all the posts in a pod (including where they were posted and their contents) via `npm run link-traversal-query`
      (see [details](https://github.com/maartyman/solidBenchAggregatorDemo#demo-3)).
    - Find all the WebId's of the friends of pod `00000000000000000933` while adding and removing a friend every 2 second
      via `npm run update-example` (see [details](https://github.com/maartyman/solidBenchAggregatorDemo#demo-4)).

### Postconditions

The user sees the results of the query in the terminal where the query was started.
For `npm run complex-query` that is

```shell
Result aggregated (0.005 s): 
  bindings: 
    fr: http://localhost:3000/pods/00000000000000000296/profile/card#me
 dist: 1
  bindings: 
    fr: http://localhost:3000/pods/00000000000000000318/profile/card#me
    dist: 1
    ...
Result client (46.363 s): 
  bindings: 
    fr: http://localhost:3000/pods/00000000000000000296/profile/card#me
 dist: 1
  bindings: 
 fr: http://localhost:3000/pods/00000000000000000318/profile/card#me
 dist: 1
 ...
```

Using the aggregator it takes only 0.005s to get the results, while
when executing the query solely in a client application it takes 46.363s.

## Follow-up actions

- Instead of re-executing the query, use incremental approaches.
- Use incremental link-traversal.
- Use incremental schema-alignment.
- Research discoverability of the aggregator and combining the result of multiple aggregators to get the results to a query.
- Expose a SPARQL endpoint so that any SPARQL client can use it.

## Future work

None.
