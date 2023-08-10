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
-->

# Generic query-based data viewer

The corresponding challenge is [#114](https://github.com/SolidLabResearch/Challenges/issues/114).

## Problem
<!--
You can reuse the pitch of the challenge, but check if you need to make changes.
For example, it might happen that the approved solution does more than what the original pitch requested.
-->

When developing apps and adding/removing/editing data in pods, 
it is useful to be able to easily view what data is actually in your pods. 
At the moment, there is no generic app that easily allows users to 
execute queries over multiple pods and inspect the corresponding results.

## Approved solution
<!--
Provide information about the approved solution:
names of tools/libraries created, repos, and so on.
-->

We developed a [Web app](https://github.com/SolidLabResearch/generic-data-viewer/releases/tag/v1.0.0) that 
has the following features:

- Before using the app, a developer defines via a config file the SPARQL queries that should be used by the app.
- Users can log in with their WebID or identity provider.
- Users select the query based on their name from the sidebar.
- The app shows the results of the query in a table. 
- Specific query variables influence how the app shows the results:
  - If a variable is a link to an image and the variable ends with `_img` then the app shows the actual images.
  - If a variable is a float and the variable ends with `_float`, the app shows the values as floats.
- Users can refresh the results of a query via a button.

You find a screencast [here](https://cloud.ilabt.imec.be/index.php/s/AJomCGpLjYbxmCX).

<!--
Provide a list of important technical decisions and assumptions.
-->
We made the following important technological decisions and assumptions:

- The app has the [option](https://github.com/SolidLabResearch/generic-data-viewer/tree/ccccc3aa882bb7c1c76fdafdf5e937ffc491d8af#configuration-file) 
  to redirect requests from Comunica, which executes the queries, via a proxy. 
  The app does this to deal with data sources that don't set the CORS headers correctly.

## User flow

<!--
Describe a concrete user flow with the approved solution.
Complete the following sections:
-->

### Actors/actresses

- User of the application.

### Preconditions

- The user has Node.js installed.

### Steps

1. Clone the repository (v1.0.0) via
   ```shell
   git clone -b v1.0.0 https://github.com/SolidLabResearch/generic-data-viewer.git
   ```
2. Install the dependencies via
   ```shell
   npm i 
   ```
3. Prepare and start the Community Solid Server with the pods via
   ```shell
   npm run prepare:pods && npm run start:pods
   ```
   The server is ready when the following message appears:
   ```
   Listening to server at http://localhost:3000/
   ```
4. Open another terminal.
5. Start the app via
   ```shell
   npm start
   ```
   The app is ready when the following message appears:
   ```
   Running CORS Anywhere on 0.0.0.0:8000
   ```
6. Open another terminal.
7. Start the proxy via
   ```shell
   npm run start:proxy
   ```
   The app is ready when the following message appears:
   ```
   Running CORS Anywhere on 0.0.0.0:8000
   ```
8. Navigate to <http://localhost:3000>.
9. Click on "Test query" in the sidebar.
10. The results appear in the table on the right.
11. Click on "A list of my favourite books".
12. The app shows the message "Something went wrong while preparing the query."
    This happens because the data source of this query requires you to be authenticated.
13. Log in with <http://localhost:8080> as identity provider.
14. Click on "A list of my favourite books".
15. The results appear in the table on the right.

### Postconditions

None.

## Follow-up actions
<!--
List all concrete follow-up actions that someone has to do.
For example, adding helper code from the solution to Comunica.
-->

- Rebuild the same functionality using [React-admin](https://marmelab.com/react-admin/).
  See this separate [repository](https://github.com/SolidLabResearch/generic-data-viewer-react-admin/).
- How to deal with queries over multiple data sources where some data sources need the proxy and others do not.
  See this [issue](https://github.com/SolidLabResearch/generic-data-viewer-react-admin/issues/4).

## Future work
<!--
List ideas for future work.
These ideas don't have to be concrete.
You can create a new challenge/scenario for each idea.
-->

- Support Solid authentication from browser window to web worker. 
  See this [issue](https://github.com/SolidLabResearch/generic-data-viewer/issues/21).

## Lessons learned about developer experience
<!--
List all lessons learned about your experience as a Solid developer:
issues you encountered, tasks that could be automated or could be made easier and so on.
-->

None.
