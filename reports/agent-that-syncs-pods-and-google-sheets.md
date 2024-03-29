<!--
Fill in the WebIDs of the people below.
Leave this in comments!
It's possible to have multiple people per role.

Challenge/scenario creator:
  - https://pieterheyvaert.com/#me
Solution creator:
  - https://pieterheyvaert.com/#me
Report writer:
  - https://pieterheyvaert.com/#me
Report reviewer:
  - https://ben.de-meester.org/#me
-->

# Agent that syncs pods and Google Sheets

The corresponding challenge is [#120](https://github.com/SolidLabResearch/Challenges/issues/120),
which contributes to scenario [#119](https://github.com/SolidLabResearch/Challenges/issues/119).

## Problem
<!--
You can reuse the pitch of the challenge, but check if you need to make changes.
For example, it might happen that the approved solution does more than what the original pitch requested.
-->

A lot of users use Google Sheets to view and edit data.
This data can be stored in Google Sheets itself or
it can be coming from an external data source such as a
[MySQL database](https://coefficient.io/how-to-connect-mysql-database-to-google-sheets) or
[MongoDB](https://hightouch.com/integrations/google-sheets-source-to-mongodb).
So far, there is no solution that exists that allows doing this with data in Solid pods.
Challenge [#120](https://github.com/SolidLabResearch/Challenges/issues/120)
focuses on the agent/backend part of a solution for this problem.

## Approved solution
<!--
Provide information about the approved solution:
names of tools/libraries created, repos, and so on.
-->

We created an [agent](https://github.com/SolidLabResearch/google-sheet-sync/releases/tag/v1.0.0) that
syncs data between a Google Sheet and a resource on a Solid pod.
It has the following features:

- Users define which Google Sheet and resource the agent syncs.
- Users define via a SPARQL query what data the agent selects from the resource.
- Users define via YARRRML rules how the data from the sheet is converted to RDF before it is stored in the resource.
- The agent overwrites the sheet with all the queried data when it launches.
- The agent periodically checks the sheet for changes and stores these changes in the resource.
- The agent only works with public resources.

You find a screencast of the agent [here](https://cloud.ilabt.imec.be/index.php/s/eFrEKF2YCkSx22j).
You find the details on how to configure the agent for your use case
[here](https://github.com/SolidLabResearch/google-sheet-sync/tree/fac52cc087d999e8b3de465c4871f5e2ba06ab62#configuration).
This includes how to use your own sheets, pods and queries.

<!--
Provide a list of important technical decisions and assumptions.
-->
We made the following important technological decisions and assumptions:

- We did not include Solid authentication in this agent
  because we have done authentication in other challenges, and
  it is not crucial for this challenge.
  [This](https://github.com/SolidLabResearch/google-sheet-sync/issues/13) is the corresponding issue to implement this.
- We compare the RDF of the original data in the sheet with the RDF of the current data in the sheet to determine
what triples needed to be added to and deleted from the resource.
See this
[part](https://github.com/SolidLabResearch/google-sheet-sync/blob/fac52cc087d999e8b3de465c4871f5e2ba06ab62/src/main.js#L171)
of the code.
- We use a public instance of the [RMLMapper Web API](https://github.com/RMLio/rmlmapper-webapi-js) to convert
data from the sheet to RDF.
It is possible to set up a local instance of this API if you don't want to use a public one.
- We make use of the [googleapis](https://github.com/googleapis/google-api-nodejs-client) to interact with Google Sheets.
But we did not find any open-source library that
already does the two-way syncing of Google Sheets with another data source.
And to which we could directly add support for Solid.
We either found snippets that use the aforementioned library or
commercial solutions that are not open source.
- The agent needs access and refresh tokens to interact with Google Sheets on behalf of the user of the sheet.
The agent reads these tokens from a JSON file.
How the tokens are added to the JSON file is out of scope of the agent.
Therefore, we provide an
[authentication server](https://github.com/SolidLabResearch/google-sheet-sync/tree/fac52cc087d999e8b3de465c4871f5e2ba06ab62#oauth2-tokens).
This server asks the user of the sheet to log in with their Google account and
give access to the agent to make changes to Google Sheets.

Below you find a sequence diagram of how the agent works with the resource and the Google Sheet.

![A sequence diagram of how the agent works.
It has 2 actors: agent user and sheet user.
It has 3 participants: sync agent, resource, Google Sheet.
It has 12 steps, which are explained below in detail as well.
](./img/google-sheet-sync-sequence-diagram.png)

The diagram has the following steps:

1. The user of the agent configures the agent via a config file.
2. The user of the agent starts the agent.
3. The agent queries the data from the resource on the pod.
4. The resource returns the data as RDF.
5. The agent converts the RDF to a 2D-array.
6. The agent fills the sheet with the data from the array.
7. The user of the sheet edits one or more fields.
8. Periodically the agent checks for changes.
This starts with querying the data from the sheet.
9. The sheet returns the data.
10. The agent checks if there are changes on the data.
11. If there are changes, the agent converts the changes to RDF.
12. The agent writes the changes to the resource.

## User flow

<!--
Describe a concrete user flow with the approved solution.
Complete the following sections:
-->

This user flow describes how to set up and show a demo of the agent.

### Actors/actresses

- User of the agent.
- User of the Google Sheet.
- User of the pod.

In the steps below we don't make a difference between the different users
as these steps are only meant to demo the solution of the challenge.

### Preconditions

- The users of the agent and pod have Node.js installed.
- The user of the agent has set a Client ID and Secret for the Google API.
  See [these instructions](https://github.com/SolidLabResearch/google-sheet-sync#google-sheet-api).
- The user of Google Sheet has a sheet that the agent can sync with.

### Steps

1. Clone the [repository](https://github.com/SolidLabResearch/google-sheet-sync/) (v1.0.0) via

   ```shell
   git clone -b v1.0.0 https://github.com/SolidLabResearch/google-sheet-sync.git
   ```

2. Install the dependencies via

   ```shell
   npm i
   ```

3. Start the authentication server that enables us to give access to a Google account via

   ```shell
   npm run auth
   ```

   The server is ready when the following message appears in the terminal:

   ```text
   Authentication server running on port 8081
   ```

   We will use this account to access the aforementioned Google Sheet.
4. Navigate to <http://localhost:8081> in the browser.
5. Click on the "Authenticate" button.
6. Log in with the Google account that has access to the aforementioned Google Sheet.
7. Click on "Continue" when you get the message "Google hasn't verified this app".
8. Click on "Continue" when you get the message "Sheet Solid sync wants access to your Google Account".
9. If the authentication succeeded, then you get the message "Authentication successful. Credentials written to credentials.json."
10. Stop the sever via CTRL + C.
11. Prepare the local instance of the Community Solid Server (CSS) via

    ```shell
    npm run prepare:pods
    ```

12. Start the CSS instance via

    ```shell
    npm run start:pods
    ```

    The agent will use the data in the resource <http://localhost:3000/example/software>.
    The CSS instance is ready when the following message appears in the terminal:

    ```text
    Listening to server at http://localhost:3000/
    ```

13. Open another terminal.
14. Copy the example config `config.query.example.yml` to `config.yml` via

    ```shell
    cp config.query.example.yml config.yml
    ```

15. Set the `sheet.id` in `config.yml` to the ID of the Google Sheet.
    See [these instructions](https://github.com/SolidLabResearch/google-sheet-sync/tree/main#id-string).
16. Copy the example YARRRML rules `rules.example.yml` to `rules.yml` via

    ```shell
    cp rules.example.yml rules.yml
    ```

17. Start the agent via

    ```shell
    npm start
    ```

18. The agent has synced the data that is in the resource <http://localhost:3000/example/software> to
    the Google Sheet once the following message appears in the terminal:

    ```text
    Synchronisation cold start completed
    ```

19. Verify that the data is in the Google Sheet.
20. Change a cell in the Google Sheet.
21. The agent will detect this change and update the resource.
    The update is done when the following message appears in the terminal:

    ```text
    Synchronization done.
    ```

22. Verify that the agent updated the resource by browsing to <http://localhost:3000/example/software>.

### Postconditions

None.

## Follow-up actions
<!--
List all concrete follow-up actions that someone has to do.
For example, adding helper code from the solution to Comunica.
-->

- Users can only define one resource
  because the agent can only store the changes from a Google Sheet in one resource.
  The agent should be able to support multiple resource.
  [This](https://github.com/SolidLabResearch/google-sheet-sync/issues/12) is the corresponding issue.

## Future work
<!--
List ideas for future work.
These ideas don't have to be concrete.
You can create a new challenge/scenario for each idea.
-->

- Automatically determine the corresponding YARRRML rules for a SPARQL query.

## Lessons learned about developer experience
<!--
List all lessons learned about your experience as a Solid developer:
issues you encountered, tasks that could be automated or could be made easier and so on.
-->

None.
