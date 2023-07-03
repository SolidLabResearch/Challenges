# Temporal Usage Control Policy execution for Solid Resources

The corresponding challenge is [#111](https://github.com/SolidLabResearch/Challenges/issues/111).

## Problem

Sharing data with other people, apps, and other agents is common in the Solid ecosystem.
But you might not always want to share the data forever.
You might want to share specific data for a limited amount of time.
Therefore, we want a proof-of-concept that shows how we can give temporary access to a resource.

The [International Data Space Association (IDSA)](https://internationaldataspaces.org/) has already defined some 
[Usage Control Policies (UCPs)](https://international-data-spaces-association.github.io/DataspaceConnector/Documentation/v6/UsageControl) 
such as the Duration-restricted Data Usage Policy.
It would be preferred if the implementation uses such a policy as a basis.

## Approved solution
<!--
Provide information about the approved solution:
names of tools/libraries created, repos, and so on.
-->

We developed two plugins for [Koreografeye](https://github.com/eyereasoner/Koreografeye): 
[AclPlugin](https://github.com/SolidLabResearch/Solid-Agent/blob/feat/cron-plugin/src/plugins/AclPlugin.ts) and 
[CronPlugin](https://github.com/SolidLabResearch/Solid-Agent/blob/feat/cron-plugin/src/plugins/CronPlugin.ts).
The AclPlugin allows updating the ACL of a resource.
The CronPlugin allows executing another plugin at a specific time.
We also created 
[N3 rules](https://github.com/SolidLabResearch/Solid-Agent/blob/main/rules/usage-control/CronRule.n3)
to define how and when these plugins are executed.
The [Solid Agent](https://github.com/SolidLabResearch/Solid-Agent) brings all these components together:
it reads the policies, uses Koreografeye to reason over the policies and the rules, and
identifies what tasks need to be executed using the aforementioned plugins.
You find more information about how it works 
[here](https://github.com/SolidLabResearch/Solid-Agent/tree/6d7c236ef7c872ae1430008708b465be6b4d027b/documentation/ucp#how-does-it-work).

## Screencast

You find a screencast of the plugin 
[here](https://raw.githubusercontent.com/woutslabbinck/Solid-Agent/58da48d3bf0cadf113a26911f5304456288e4441/documentation/ucp/demo-Duration-UCP.mp4).
Note that the screencast has no audio, but we explain what is presented next.

In this screencast, you see three windows:

- On the left we have [Penny](https://penny.vincenttunru.com/) where we've logged in 
  with WebID `https://woutslabbinck.solidcommunity.net/profile/card#me`.
  In this window, we can now browse resources on Solid Pods while being authenticated.
- On the top right the Solid Agent in the `DemoUCPAgent.ts` configuration is running (see step 2).
- On the bottom right, there is a blank terminal which we will use to send a policy to 
a container that we call the Usage Control Policy Knowledge Graph (UCP KG).

1. We are authenticated and 
see the storage of the Solid pod of [woutslabbinck](https://woutslabbinck.solidcommunity.net/profile/card#me).
2. [woutslabbinck](https://woutslabbinck.solidcommunity.net/profile/card#me) wants to access the resource at 
URL `http://localhost:3000/ldes`, but does not have access.
3. However, there is a policy from the owner of that resource that can be activated.
This policy allows the assignee ([woutslabbinck](https://woutslabbinck.solidcommunity.net/profile/card#me)) to have 
read access to the [resource](http://localhost:3000/ldes) for a period of 30 seconds (`"PT30S"^^xsd:duration`).
4. In the bottom right pane we send this policy to the UCP KG, 
   which the DemoUCPAgent then immediately enforces. 
5. Now, while authenticated as [woutslabbinck](https://woutslabbinck.solidcommunity.net/profile/card#me), 
we can see the resource in Penny.
6. When 30 seconds have passed
the DemoUCPAgent executes the final part of the policy. 
It takes away read access control for [woutslabbinck](https://woutslabbinck.solidcommunity.net/profile/card#me), 
as defined in the Usage Control Policy.

<!--
Provide a list of important technical decisions and assumptions.
-->
We made the following important technological decisions and assumptions:

- The UCP KG is modelled as a Solid container, 
  which furthermore requires that the Solid server supports 
  the [Solid Notifications Protocol](https://solidproject.org/TR/notifications-protocol) v0.2.0.
  - This way, the agent can listen to any policy addition.
  - Additionally, we can then assume that the UCP KG is valid.
    The agent does not check whether the complete set of UCPs are valid or not. 
    It will only execute them.
    Any conflicts in the UCP KG thus are the fault of the end-user, not of the agent.
- For each target resource (`ids:target`), the agent MUST have `acl:Control` permission.
- The [Solid Protocol](https://solidproject.org/TR/protocol) defines two options for Authorization (§11): 
  Web Access Control (WAC) and Access Control Policy (ACP).
  The agent assumes that the Solid server hosting the target resources support WAC (and therefore Access Control List (ACL) resources).
- The N3 rules contain built-ins that do work with the [EYE reasoner](https://github.com/eyereasoner/eye), 
  though no guarantees can be made with other N3 reasoners.
- Only the *Duration-restricted Data Usage* from 
  [IDS Usage Control Policies](https://international-data-spaces-association.github.io/DataspaceConnector/Documentation/v6/UsageControl#ids-usage-control-policies) 
  has been implemented and tested as N3 Rule.
  - Due to how [Koreografeye](https://github.com/eyereasoner/Koreografeye) extracts policies from the Reasoning Result, 
    the cardinality of target resources and assignees can only be 1.
    We made a [feature request](https://github.com/eyereasoner/Koreografeye/issues/10) to solve this problem at its root.
  - We added the triple `<permissionIdentifier> <odrl:assignee> <WebID> .` to the UCP to make sure we have a WebID to 
    which we can give access (though this was not described in 
    the [Pattern examples](https://international-data-spaces-association.github.io/DataspaceConnector/Documentation/v6/UsageControl#duration-usage-2)).
- Giving Permission equals to giving read access (`acl:Read`).

They are originally described [here](https://github.com/SolidLabResearch/Solid-Agent/tree/feat/cron-plugin/documentation/ucp#limitationsassumptions).

## User flow

<!--
Describe a concrete user flow with the approved solution.
Complete the following sections:
-->

### Actors/actresses

- User of the application.

### Preconditions

- The user has Node.js installed.
- The user has a WebID and pod.
  You can create both for testing via the [Pod Playground of SolidLab](https://pod.playground.solidlab.be/).

### Steps

1. Clone [the repository](https://github.com/SolidLabResearch/Solid-Agent) via
   ```shell
   git clone https://github.com/SolidLabResearch/Solid-Agent.git
   ```
2. Navigate to the folder `Solid-Agent` via
   ```shell
   cd Solid-Agent
   ```
3. Check out commit [6d7c236](https://github.com/SolidLabResearch/Solid-Agent/commit/6d7c236ef7c872ae1430008708b465be6b4d027b) via
   ```shell
   git checkout 6d7c236
   ```
4. Install dependencies via 
   ```shell
   npm i
   ```
5. Start an instance of the [Community Solid Server](https://github.com/CommunitySolidServer/CommunitySolidServer) (CSS) via
   ```shell
   npx community-solid-server -c memory-no-setup.json
   ```
   This instance (port 3000) will contain the policies and the resource to which we will grant access.
6. Start the DemoUCPAgent via
   ```shell
   npx ts-node indexUCP.ts
   ```
   This code also starts a CSS instance (port 3123) for the Solid Actor and 
   creates an account so the Solid Actor has a WebID (http://localhost:3123/solid/profile/card#me).
   Furthermore, it creates a policy container (http://localhost:3000/policies/) and 
   creates a resource (http://localhost:3000/ldes) which is used as target resource.
7. Open the Web app [Penny](https://penny.vincenttunru.com/).
8. Log in with your WebOID.
9. Try to read the resource http://localhost:3000/ldes.
   You are not able to read the resource, because you don't have access yet.
10. Add your WebID in the file `UcpSendPolicy.ts` on line 37.
    We will grant this WebID access in the next step.
11. Send a duration usage-restricted access UCP to the policy container via
    ```shell
    npx ts-node UcpSendPolicy.ts
    ```

### Postconditions

- You are able  to read the resource with Penny.

## Follow-up actions
<!--
List all concrete follow-up actions that someone has to do.
For example, adding helper code from the solution to Comunica.
-->

- Due to how [Koreografeye](https://github.com/eyereasoner/Koreografeye) extracts policies from the Reasoning Result,
  the cardinality of target resources and assignees can only be 1.
  We made a [feature request](https://github.com/eyereasoner/Koreografeye/issues/10) to solve this problem at its root.
- Investigate if the triple `<permissionIdentifier> <odrl:assignee> <WebID> .` is the best way to add the WebID to
  which we give access.

## Future work
<!--
List ideas for future work.
These ideas don't have to be concrete.
You can create a new challenge/scenario for each idea.
-->

- Combine temporary access with the [location app](https://github.com/SolidLabResearch/LocationHistory) 
of challenge [#10](https://github.com/SolidLabResearch/Challenges/issues/10).
We described this in challenge [#116](https://github.com/SolidLabResearch/Challenges/issues/116)

## Lessons learned about developer experience

- When manually editing WebIDs and ACL files, and introducing errors, 
it is hard to find these errors. 
It would be useful to have a dedicated library to edit these types of files.
Another option would be to let the server return a 400 status code when writing invalid RDF to resources.

