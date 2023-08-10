<!--
Fill in the WebIDs of the people below.
Leave this in comments!
It's possible to have multiple people per role.

Challenge/scenario creator:
  - https://patrickhochstenbach.net/profile/card#me
Solution creator:
  - https://patrickhochstenbach.net/profile/card#me
Report writer:
  - https://pieterheyvaert.com/#me
-->

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
Koreografeye provides two commands: `orch` for the orchestrator and 
`pol` for the policy executor.
The `orch` command takes the input data,  
use the N3 rules to decide what to do with the data, and
put the results output folder.
The `pol` command takes the output of the `orch` command and 
executes the requested policies defined with the N3 rules.

<!--
Provide a list of important technical decisions and assumptions.
-->
We made the following important technological decisions and assumptions:

- We expect the solution to be part of a larger existing framework. 
Koreografeye doesn't implement some features on purpose such as 
scheduling, rate limits, input and outputs, priorities, and so on. 
For these features there are already existing tools that provide that. 
On other words Koreografeye should be able to be just one added component to for example an Apache Nifi installation.

- The Composition of Koreografeye parts such as input, orchestration and 
policy execution are possible via the command line. 
That way it's programming language-independent. 
The JavaScript API is just an added feature and not the core of the design.

- Developers can create a lot of plugins for policy enforcement and reasoner implementations. 
Component.JS was used to facilitate this.

- Koreografeye makes a strict separation between reasoning and policy execution. 
  We don't advise to create any side effects in the reasoning part for two reasons:
  - The rule book that the reasoner gets as input can be from external sources. 
    We don't want arbitrary execution of code.
  - During the reasoning phase there is little control over possible side effects,
    such as when they are executed, in which order and how often.

- Retrieving input from a (Solid) source is a [solved issue](https://solidproject.org/TR/protocol#reading-resources). 
  The Koreografeye starts when an RDF resource is copied into a local storage location accessible for Koreografeye,
- Retrieving the rule book from an external source is a [solved issue](https://solidproject.org/TR/protocol#reading-resources). 
  Koreografeye expects a local storage location with zero or more rule book N3 or N3S (RDF Surfaces) files.
- The order in which policy enforcements are executed is not relevant.
- Rule books don't interfere with each other. 
  Each rule book gets a new copy of the RDF input data

## User flow

<!--
Describe a concrete user flow with the approved solution.
Complete the following sections:
-->

### Actors/actresses

- User of Koreografeye

### Preconditions

- User has Node.js installed.

### Steps

1. Clone the [demo repo](https://github.com/eyereasoner/KoreografeyeDemo) via 
    ```shell
    git clone https://github.com/eyereasoner/KoreografeyeDemo.git`
   ```
2. Install dependencies via 
   ```shell
   npm i
   ```
3. Run the `orch` command to process all RDF resources in the `in` directory using the `ldn.n3` rules file via
   ```shell
   npm run orch:ldn
   ```
   This generates the file `out/demo.ttl` as output containing the input RDF resource plus injected policies.
4. Run the `pol` command against the output of step 3 via 
   ```shell
   npm run pol
   ```
   This will send a notification to https://httpbin.org/post 
   using the [SendNotificationPlugin](https://github.com/eyereasoner/Koreografeye/blob/main/src/policy/plugin/SendNotificationPlugin.ts).

### Postconditions

If https://httpbin.org/post pointed to a real Solid pod inbox, 
then the notification would be available there.

## Follow-up actions
<!--
List all concrete follow-up actions that someone has to do.
For example, adding helper code from the solution to Comunica.
-->

- Integrate the [Event Notifications Typescript library](https://github.com/ErfgoedPod/evno) or 
[Bashlib](https://github.com/SolidLabResearch/Bashlib/) into Koreografeye to 
provide out-of-the-box importing of notifications. 
This is now an external dependency.
- The current implementation is single threaded. 
Make options to specify how many threads can be used to execute the policies.

## Future work
<!--
List ideas for future work.
These ideas don't have to be concrete.
You can create a new challenge/scenario for each idea.
-->

- Current systems makes no assumptions on how policies should be executed, in which order, and what to do when policies fail. 
Align with other groups to find a solution on how a composition of policies should be executed.

## Lessons learned about developer experience
<!--
List all lessons learned about your experience as a Solid developer:
issues you encountered, tasks that could be automated or could be made easier and so on.
-->

TODO: explain more

- Solid application development is not only about Web programming.
- Logic and reasoning can be external to your implementation.
- It is possible to provide very limited remote execution near or inside a Solid pod when 
  logic and handling side effects can be separated.
- Although with [Bashlib](https://github.com/SolidLabResearch/Bashlib) 
we have a command line tool to access a Solid pod and manage its content, 
remote server-side Solid data management is in general not a solved issue. 
Bashlib requires assumptions about specialised authentication methods for each Solid implementation.
