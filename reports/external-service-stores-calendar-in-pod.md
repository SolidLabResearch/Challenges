<!--
Fill in the WebIDs of the people below.
Leave this in comments!
It's possible to have multiple people per role.

Challenge/scenario creator:
  - https://pieterheyvaert.com/#me
Solution creator:
  - https://data.knows.idlab.ugent.be/person/ruizhao/#me
  - https://data.knows.idlab.ugent.be/person/zimengzhou/#me
Report writer:
  - https://pieterheyvaert.com/#me
-->

# External service stores calendar in pod

The corresponding challenge is [#68](https://github.com/SolidLabResearch/Challenges/issues/68),
which contributes to scenario [#2](https://github.com/SolidLabResearch/Challenges/issues/2).

## Problem

At the moment it's possible to request a calendar from a CSS instance through the use of
a [store](https://github.com/KNowledgeOnWebScale/solid-calendar-store/).
But this solution is coupled to the implementation of CSS.
A better solution would be to have an external service that reads the original calendar and
stores it in a pod using only the methods specified by Solid.

## Approved solution
<!--
Provide information about the approved solution:
names of tools/libraries created, repos, and so on.
-->

Oxford HCC developed an [orchestrator](https://github.com/renyuneyun/calendar-orchestrator) that allows users to
configure an automatic process that periodically retrieves their calendars,
converts them to RDF, and
stores them on their pods.

The repository contains both a [frontend](https://github.com/renyuneyun/calendar-orchestrator/tree/main/app) and
a [backend](https://github.com/renyuneyun/calendar-orchestrator/tree/main/core), but
only the backend is relevant for [challenge #68](https://github.com/SolidLabResearch/Challenges/issues/68) and
this report.

## User flow

<!--
Describe a concrete user flow with the approved solution.
Complete the following sections:
-->

### Actors/actresses

- User of the orchestrator

### Preconditions

- The user has a calendar that is available in the [ICS format](https://datatracker.ietf.org/doc/html/rfc5545).
We assume for the steps below that the calendar is available at `http://localhost:8080/parties.ics`.
It contains one event on 2023-03-17 that starts on 13:00 and ends at 19:00.
- The user has a WebID.
We assume for the steps below that the WebID is `https://pod.playground.solidlab.be/ash/profile/card#me`.
- The user has a pod where the calendar and the configuration of the orchestrator can be stored.
We assume for the steps below that the pod is located at `https://pod.playground.solidlab.be/ash/`,
with `https://pod.playground.solidlab.be/` as identify provider.
- The WebID has a `http://www.w3.org/ns/pim/space#storage` triple.
See the [Solid WebID Profile](https://solid.github.io/webid-profile/#storage).
For the WebID `https://pod.playground.solidlab.be/ash/profile/card#me` we added the triple

   ```turtle
    <#me> <http://www.w3.org/ns/pim/space#storage> <https://pod.playground.solidlab.be/ash/>.
   ```

- The user has [HTTPie](https://httpie.io/) installed on their local machine.

### Steps

1. Clone the [orchestrator](https://github.com/renyuneyun/calendar-orchestrator)
via `git clone https://github.com/renyuneyun/calendar-orchestrator.git`.
2. Navigate to the `core` folder via `cd calendar-orchestrator/core`.
3. Install the dependencies via `npm i`.
4. Run the orchestrator via `npm run build && npm run start`.
5. Open a new terminal.
6. Register the user via

   ```shell
   http POST localhost:3000/user webid=https://pod.playground.solidlab.be/ash/profile/card#me issuer=https://pod.playground.solidlab.be/ email=ash@example.com password=ash
   ```

7. Get the user's information via

   ```shell
   http GET localhost:3000/user webid=https://pod.playground.solidlab.be/ash/profile/card#me
   ```

8. Set user's calendar URL via

   ```shell
   http POST localhost:3000/user webid=https://pod.playground.solidlab.be/ash/profile/card#me issuer=https://pod.playground.solidlab.be/ cal_url=http://localhost:8080/parties.ics
   ```

9. Update user's calendar data

   ```shell
   http POST localhost:3000/user webid=https://pod.playground.solidlab.be/ash/profile/card#me issuer=https://pod.playground.solidlab.be/
   ```

### Postconditions

Find the availability calendar at `https://pod.playground.solidlab.be/ash/availability`.
This is a snippet of the calendar:

   ```turtle
   @prefix schema: <http://schema.org/> .

   <http://example.com/calendar/Combined%20of%20%5BParties%5D>
     schema:name "Combined of [Parties]" ;
     schema:event <http://example.com/event/testslots%2344d9bc3d66678dcec46126811e0e37e8>, <http://example.com/event/testslots%2395d06256acd59357e29d03548d07ba05>, <http://example.com/event/testslots%2374e20e44bcf40b919566183d57a01c09>, <http://example.com/event/testslots%230f587780948fda83412ab1d0112822ae>, <http://example.com/event/testslots%23a16dd8c62219f1692d5d174804046b29>, <http://example.com/event/testslots%2300f0b72dad0bdee2b388b69eb867c91f>, <http://example.com/event/testslots%238079034d03b5eacc35043a725f034037>, <http://example.com/event/testslots%23cccfb8cb19de7514031561d37843a372>.

   <http://example.com/event/testslots%2344d9bc3d66678dcec46126811e0e37e8>
     a schema:Event ;
     schema:name "Available for meetings" ;
     schema:startDate "2023-03-08T10:00:00.000Z" ;
     schema:endDate "2023-03-08T18:00:00.000Z" .

   <http://example.com/event/testslots%2395d06256acd59357e29d03548d07ba05>
     a schema:Event ;
     schema:name "Available for meetings" ;
     schema:startDate "2023-03-09T10:00:00.000Z" ;
     schema:endDate "2023-03-09T18:00:00.000Z" .

   <http://example.com/event/testslots%2374e20e44bcf40b919566183d57a01c09>
     a schema:Event ;
     schema:name "Available for meetings" ;
     schema:startDate "2023-03-10T10:00:00.000Z" ;
     schema:endDate "2023-03-10T18:00:00.000Z" .

   <http://example.com/event/testslots%230f587780948fda83412ab1d0112822ae>
     a schema:Event ;
     schema:name "Available for meetings" ;
     schema:startDate "2023-03-13T10:00:00.000Z" ;
     schema:endDate "2023-03-13T18:00:00.000Z" .

   <http://example.com/event/testslots%23a16dd8c62219f1692d5d174804046b29>
     a schema:Event ;
     schema:name "Available for meetings" ;
     schema:startDate "2023-03-14T10:00:00.000Z" ;
     schema:endDate "2023-03-14T18:00:00.000Z" .

   <http://example.com/event/testslots%2300f0b72dad0bdee2b388b69eb867c91f>
     a schema:Event ;
     schema:name "Available for meetings" ;
     schema:startDate "2023-03-15T10:00:00.000Z" ;
     schema:endDate "2023-03-15T18:00:00.000Z" .

   <http://example.com/event/testslots%238079034d03b5eacc35043a725f034037>
     a schema:Event ;
     schema:name "Available for meetings" ;
     schema:startDate "2023-03-16T10:00:00.000Z" ;
     schema:endDate "2023-03-16T18:00:00.000Z" .

   <http://example.com/event/testslots%23cccfb8cb19de7514031561d37843a372>
     a schema:Event ;
     schema:name "Available for meetings" ;
     schema:startDate "2023-03-17T10:00:00.000Z" ;
     schema:endDate "2023-03-17T13:00:00.000Z" .
   ```

On 2023-03-17 there is an event from 13:00 till 19:00 as defined by the ICS calendar at `http://localhost:8080/parties.ics`.
Therefore, on that date the user is only available until 13:00.

## Follow-up actions
<!--
List all concrete follow-up actions that someone has to do.
For example, adding helper code from the solution to Comunica.
-->

- Check for similarities and differences with [Koreografeye](https://github.com/eyereasoner/Koreografeye).

## Future work
<!--
List ideas for future work.
These ideas don't have to be concrete.
You can create a new challenge/scenario for each idea.
-->

None.
