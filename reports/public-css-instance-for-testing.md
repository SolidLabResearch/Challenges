<!--
Fill in the WebIDs of the people below.
Leave this in comments!
It's possible to have multiple people per role.

Challenge/scenario creator:
  - https://pieterheyvaert.com/#me
Solution creator:
  - https://data.knows.idlab.ugent.be/person/twalcarius/#me
Report writer:
  - https://pieterheyvaert.com/#me
-->

# Public Community Solid Server instance for testing

The corresponding challenge is [#75](https://github.com/SolidLabResearch/Challenges/issues/75).

## Problem

It would be great to have a public [Community Solid Server](https://github.com/CommunitySolidServer/CommunitySolidServer)
(CSS) instance that can be used for testing.
That way developers can quickly make an account to test or demo an application.

## Approved solution

We deployed a CSS instance at <https://pod.playground.solidlab.be/>.
Users can make accounts and
have complete control over their data.
The instance is reset every 24 hours,
specifically at 5:00 local time in Belgium.
During every reset the latest version of CSS is used.
It's possible to initiate the instance with a predefined set of accounts and corresponding data.
You provide the predefined accounts as follows:

```json
[
  {
    "podName": "user1",
    "email": "user1@pod.playground.solidlab.be",
    "password": "user1"
  },
  ...
  {
    "podName": "user10",
    "email": "user10@pod.playground.solidlab.be",
    "password": "user10"
  }
]
```

Please contact [Pieter Heyvaert](mailto:pieter.heyvaert@ugent.be) if you would like to add predefined accounts.

## Follow-up actions

None.

## Future work

None.
