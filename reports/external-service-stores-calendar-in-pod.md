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
only the backend is relevant for this challenge.

## User flow

<!--
Describe a concrete user flow with the approved solution.
Complete the following sections:
-->

### Actors/actresses

- User of the orchestrator

### Preconditions

- The user has a calendar that is available in the [ICS format](https://datatracker.ietf.org/doc/html/rfc5545).
- The user has a pod where the calendar can be stored.

### Steps

1. 

### Postconditions

## Follow-up actions
<!--
List all concrete follow-up actions that someone has to do.
For example, adding helper code from the solution to Comunica.
-->

- Check for similarities and differences with [Koreografeye](https://github.com/eyereasoner/Koreografeye). 
See this report.

## Future work
<!--
List ideas for future work.
These ideas don't have to be concrete.
You can create a new challenge/scenario for each idea.
-->