# Storing large real-time data streams in pod using LDES

The corresponding challenge is [#82](https://github.com/SolidLabResearch/Challenges/issues/82),
which contributes to scenario [#16](https://github.com/SolidLabResearch/Challenges/issues/16).

## Problem
<!--
You can reuse the pitch of the challenge, but check if you need to make changes.
For example, it might happen that the approved solution does more than what the original pitch requested.
-->

Data streams are becoming omnipresent and 
are a crucial component in many use cases. 
Storing streams in a low-cost file-based Web environment could be done using Linked Data Event Streams (LDES). 
However, pushing large volumes of high volatile data into a Solid-based LDES is not possible because 
the [current solution](https://github.com/woutslabbinck/SolidEventSourcing) does the partitioning of the data 
after all data has been retrieved, 
instead of in a streaming fashion. 
This crashes the [Community Solid Server](https://github.com/CommunitySolidServer/CommunitySolidServer) 
due to the high load on the server 
when repartitioning large amounts of data.
We use data from the [DAHCC dataset](https://dahcc.idlab.ugent.be/) for this challenge,
which contains data streams describing the behaviour of various patients.
The streams contain over 100.000 events.

We want a streaming Solid-based LDES connector that replays data and 
partitions this data in a streaming fashion when retrieving the data, 
instead of needing to wait till the whole dataset is received.
Besides avoid the high load on the server,
replaying allows to mimic the real-time behaviour of data streams,
even though the data is historical data.
This allows to showcase how solutions can process live data streams and
how they can handle different data rates.

## Approved solution
<!--
Provide information about the approved solution:
names of tools/libraries created, repos, and so on.
-->

We developed a [tool](https://github.com/SolidLabResearch/LDES-in-SOLID-Semantic-Observations-Replay/) that
replays captured streams. 
The tool has the following features:

- TO VERIFY: The tool can connect to a pull- or push-based RDF stream.
- The tool adds new events to the right bucket.
- If new buckets are required, the tool updates the LDES.
- The user can parameterize the bucket size.

The repository contains both a [Web app](https://github.com/SolidLabResearch/LDES-in-SOLID-Semantic-Observations-Replay/tree/main/webapp) and
a [engine](https://github.com/SolidLabResearch/LDES-in-SOLID-Semantic-Observations-Replay/tree/main/engine), but
only the engine is relevant for [challenge #82](https://github.com/SolidLabResearch/Challenges/issues/82) and
this report.

<!--
Provide a list of important technical decisions and assumptions.
-->

We made the following important technological decisions and assumptions:
- TODO: Ask Stijn.

## User flow

<!--
Describe a concrete user flow with the approved solution.
Complete the following sections:
-->

### Actors/actresses

### Preconditions

### Steps

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
