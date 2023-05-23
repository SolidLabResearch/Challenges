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
Storing streams in a low-cost file-based Web environment could be done using 
[Linked Data Event Streams](https://semiceu.github.io/LinkedDataEventStreams/) (LDES). 
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

The solution builds on [this code](https://github.com/woutslabbinck/SolidEventSourcing).
The code is not included as a dependency as it was not designed as a library.
We copy and pasted the parts of the code that were useful for our solution.

<!--
Provide a list of important technical decisions and assumptions.
-->

We made the following important technological decisions and assumptions:
- TODO: @Stijn Can you add this?

## User flow

<!--
Describe a concrete user flow with the approved solution.
Complete the following sections:
-->

### Actors/actresses

- User of the tool

### Preconditions

Configure the engine via the following steps:

1. Clone [the repository](https://github.com/SolidLabResearch/LDES-in-SOLID-Semantic-Observations-Replay) via
   ```shell
   git clone https://github.com/SolidLabResearch/LDES-in-SOLID-Semantic-Observations-Replay
   ```
2. Navigate to `LDES-in-SOLID-Semantic-Observations-Replay` via
   ```shell
   cd LDES-in-SOLID-Semantic-Observations-Replay
   ```
3. Start an instance of the Community Solid Server via
   ```shell
   docker run --rm -p 3000:3000 -it solidproject/community-server:latest -c config/default.json
   ```
4. Open a new terminal at the same location.
5. Navigate to `engine` via
   ```shell
   cd engine
   ```
6. Install dependencies via
   ```shell
   npm i
   ```
7. Download the example DAHCC dataset via 
   ```shell
   curl -L https://cloud.ilabt.imec.be/index.php/s/8BatNcg2iEyJktR/download -o data/dataset_participant1_100obs
   ```
8. Set the value of `datasetFolders` to the full path of the folder `engine/data` in the file `src/config/replay_properties.json`.
9. Start the engine via
   ```shell
   npm start
   ```

If you get an error, see the [README](https://github.com/SolidLabResearch/LDES-in-SOLID-Semantic-Observations-Replay#installation) of the repository.

### Steps

1. Get all loadable datasets using a GET request via
   ```shell
   curl http://localhost:3001/datasets
   ```
   You get something like
   ```shell
   ["dataset_participant1_100obs","dataset_participant2_100obs"]
   ```
2. Load a particular dataset using a GET request via
   ```shell
   curl http://localhost:3001/loadDataset?dataset=dataset_participant1_100obs
   ```
   You get an empty result.
3. Check the loading progress (in quad count) using a GET request via
   ```shell
   curl http://localhost:3001/checkLoadingSize
   ```
   You get something like
   ```shell
   [500]
   ```
4. Get the actual observation count (quads / observation) using a GET request via
   ```shell
   curl http://localhost:3001/checkObservationCount
   ```
   You get something like
   ```shell
   [100]
   ```
5. Sort the loaded observations (as according to the configured TreePath) using a GET request via
   ```shell
   curl http://localhost:3001/sortObservations
   ```
   You get something like
   ```shell
   [["https://dahcc.idlab.ugent.be/Protego/_participant1/obs0","https://dahcc.idlab.ugent.be/Protego/_participant1/obs1","https://dahcc.idlab.ugent.be/Protego/_participant1/obs2" ... ]]
   ```
6. Get a sample (as in the configured chunk) set of observations using a GET request via
   ```shell
   curl http://localhost:3001/getObservations
   ```
   You get something like
   ```shell
   [{"termType":"NamedNode","value":"https://dahcc.idlab.ugent.be/Protego/_participant1/obs0"},{"termType":"NamedNode","value":"https://dahcc.idlab.ugent.be/Protego/_participant1/obs1"} ...}]
   ```
7. Replay one next observation using a GET request via
   ```shell
   curl http://localhost:3001/advanceAndPushObservationPointer
   ```
   You get something like
   ```shell
   [1]
   ```
   This represents the pointer to the next replayable observation.
   Checking the LDES in the Solid pod (default: http://localhost:3000/test/),
   you should see at least two containers (the inbox and the LDES buckets),
   where the LDES buckets should now contain the replayed observation,
   for example http://localhost:3000/test/1641197095000/aa28a2fa-010f-4b81-8f3c-a57f45e13758.

8. Replay all remaining observations using a GET request via
   ```shell
   curl http://localhost:3001/advanceAndPushObservationPointerToTheEnd
   ```

### Postconditions

All observations are in the pod.

## Follow-up actions
<!--
List all concrete follow-up actions that someone has to do.
For example, adding helper code from the solution to Comunica.
-->

None.

## Future work
<!--
List ideas for future work.
These ideas don't have to be concrete.
You can create a new challenge/scenario for each idea.
-->

- Real-time replay including throttling. 
Challenge [#83](https://github.com/SolidLabResearch/Challenges/issues/83) is relevant,
together with the [roadmap](https://github.com/SolidLabResearch/LDES-in-SOLID-Semantic-Observations-Replay#roadmap)
in the solution's repository.
- Elaborate filtering on the datasets used, such as selecting specific metrics that need to be replayed rather than the entire dataset.
- Improve the LDES in LDP approach, if possible.


