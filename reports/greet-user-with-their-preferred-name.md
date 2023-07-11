<!--
Fill in the WebIDs of the people below.
Leave this in comments!
It's possible to have multiple people per role.

Challenge/scenario creator:
  - https://ruben.verborgh.org/profile/#me
Solution creator:
  - https://data.knows.idlab.ugent.be/person/SindhuVasireddy/#me
Report writer:
  - https://pieterheyvaert.com/#me
-->

# Greet user with preferred name

The corresponding challenge is [#4](https://github.com/SolidLabResearch/Challenges/issues/4).

## Problem

Users like to be addressed by their preferred name within apps.
This is a name that they are known as, or use for themselves. 
In some cultures, this is the first name.
It could also be a user-chosen name or nickname.
Other cultures do not have the concept of a first name, so another strategy is needed.

## Approved solution

We developed a [Web app](https://github.com/SolidLabResearch/SolidLoginGreeter) that
shows users their preferred name based on 
a [set of N3 rules](https://github.com/SolidLabResearch/SolidLoginGreeter/blob/main/public/PreferencePredicates.n3).

## User flow

### Actors/actresses

- Web app
- User of the application

### Preconditions

- The user has started the Web app via [these instructions](https://github.com/SolidLabResearch/SolidLoginGreeter#solidwelcomelogin).
- The user has a WebID with at least one of [these predicates](https://github.com/SolidLabResearch/SolidLoginGreeter/blob/main/public/PreferencePredicates.n3#L9-L12).

### Steps

1. The user opens the Web app.
2. The user logs in with their WebID.

### Postconditions

- The user sees their preferred name in the Web app.

## Follow-up actions

- Add a function to get a person's preferred name to SolidLabLib.js ([issue](https://github.com/SolidLabResearch/SolidLabLib.js/issues/4)).

## Future work
None.
