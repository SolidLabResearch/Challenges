# Orchestrator to forward LDN notifications to LDN inbox based on N3 rules

The corresponding challenge is [#49](https://github.com/SolidLabResearch/Challenges/issues/49).

## Problem

A maintainer of a [Linked Data Notifications](https://www.w3.org/TR/ldn/) (LDN) Inbox wants to 
see some automated processes happening 
when particular LDN notifications appear in one of her Inboxes or are being sent by her.
Possible automated processes include:

- Auto reply to some messages
- Forward the notification to the LDN Inbox of another autonomous agent
- Append outgoing messages to an outbox/sent container
- Generate a new notification to be sent to a particular LDN Inbox

What should happen after receiving an incoming our outgoing message is described by an N3 rules. 
These rules could require read access to the pod (for example, to check the existence of a resource on the pod). 
An example of a rule in natural language is

```
IF inbox I contains a notification about a resource A, 
AND resource A exists on pod P, 
THEN generate new notification and send it to inbox X.
```

The automated processes and rules are executed by the orchestrator, which is an autonomous agent, on behalf of the maintainer.

## Approved solution

We developed [Koreografeye](https://github.com/eyereasoner/Koreografeye) that allows users to
run automated processed against Solid pods.
You can run Koreografeye on an input directory containing one or more RDF files (in Turtle or N3 format). 
For each of these files one or more N3 rule scripts can be executed. 
The results of this execution is put in an output directory.

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