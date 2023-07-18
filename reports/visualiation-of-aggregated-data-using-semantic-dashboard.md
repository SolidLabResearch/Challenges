<!--
Fill in the WebIDs of the people below.
Leave this in comments!
It's possible to have multiple people per role.

Challenge/scenario creator:
  - https://data.knows.idlab.ugent.be/person/pbonte/#me
Solution creator:
  - https://data.knows.idlab.ugent.be/person/stijnverstichel/#me
Report writer:
  - https://pieterheyvaert.com/#me
-->

# Visualisation of aggregated data using semantic dashboard

The corresponding challenge is [#85](https://github.com/SolidLabResearch/Challenges/issues/85),
which contributes to scenario [#16](https://github.com/SolidLabResearch/Challenges/issues/16).

## Problem

Aggregations and data summaries allow providing a concise view on a larger dataset. 
However, to be useful for non-technical users, 
a visualisation is needed to easily interpret the summarised data.
Aggregations and summaries from the [DAHCC dataset](https://dahcc.idlab.ugent.be/) will be used for purpose. 
This dataset data streams describing the behaviour of various patients. 
Specifically, we will create a visualisation of the patients' activity index.
This visualisation directly connects to the streaming aggregator defined in 
[Challenge #84](https://github.com/SolidLabResearch/Challenges/issues/84) while 
we will use the [Semantic Dashboard](https://biblio.ugent.be/publication/7087485) 
for the visualisation itself.
The Semantic Dashboard is build around 
[Dynamic Dashboard Web Thing](https://web-thing-specs.dynamicdashboard.ilabt.imec.be/).

## Approved solution
<!--
Provide information about the approved solution:
names of tools/libraries created, repos, and so on.
-->

We developed a [generic visualisation component](https://github.com/SolidLabResearch/LDES-Semantic-Web-Thing) that 
connects to an aggregator service and 
allows visualising the results in the Semantic Dashboard. 
The latter allows specifying in a generic manner how to present the visualisation itself. 
To enable this, a mapping of the internal data of the aggregator to the data format 
used by the Semantic Dashboard is necessary.

<!--
Provide a list of important technical decisions and assumptions.
-->
We made the following important technological decisions and assumptions:
- Java as programming language.
- [Linked Data Event Streams](https://semiceu.github.io/LinkedDataEventStreams/) to represent a stream of events detected by IOT-related devices.
- [Obelisk Web Thing](https://github.com/predict-idlab/obelisk-python) as base implementation.

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

- Enhanced integration with the streaming aggregator of 
[Challenge #84](https://github.com/SolidLabResearch/Challenges/issues/84).
- Extend the replay interface with a choice of observation-types to be replayed.

## Future work
<!--
List ideas for future work.
These ideas don't have to be concrete.
You can create a new challenge/scenario for each idea.
-->

None.

## Lessons learned about developer experience
<!--
List all lessons learned about your experience as a Solid developer:
issues you encountered, tasks that could be automated or could be made easier and so on.
-->

- Be careful with large datasets.
- Be careful with high-frequency data.
