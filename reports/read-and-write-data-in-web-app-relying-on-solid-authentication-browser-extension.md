# Read and write data in Web app relying on Solid authentication browser extension

The corresponding challenge is [#102](https://github.com/SolidLabResearch/Challenges/issues/102).

## Problem
<!--
You can reuse the pitch of the challenge, but check if you need to make changes.
For example, it might happen that the approved solution does more than what the original pitch requested.
-->

The goal of [this browser extension](https://github.com/SolidLabResearch/Challenges/issues/67) is that requests are 
automatically authenticated when needed. 
Using this we can show that a Web app can be created that reads data from and stores data 
in a protected resources in a pod without the need for including Solid authentication in the Web app.

## Approved solution
<!--
Provide information about the approved solution:
names of tools/libraries created, repos, and so on.
-->

We developed a [Web app](https://github.com/pheyvaer/markdown-editor) that allows 
users to edit Markdown files using only GET and PUT requests.
It has the following features:

- Load Markdown files via GET requests.
- Store Markdown files via PUT requests.
- Show WebID of user if user has logged in with the Solid Authentication browser extension.
- WebID and browser extension are not needed when working with public resources.
- Show urls of most recent files. The urls are stored in the browser storage.

You find a screencast of the app [here](https://cloud.ilabt.imec.be/index.php/s/JcqFbRzNMFztC8D).

<!--
Provide a list of important technical decisions and assumptions.
-->
We made the following important technological decisions and assumptions:
- The tool relies on the Solid authentication browser extension for requests that required authentication. 
No fallback is provided for when the extension is not installed. 
- The user knows where a new resource should be stored on the pod. 
They manually provide the full URL of the resource in a text-field.


## User flow

<!--
Describe a concrete user flow with the approved solution.
Complete the following sections:
-->

### Actors/actresses

- Menubar app
- User of the application

### Preconditions

- The user has Node.js installed.
- The user has [this version](https://github.com/KNowledgeOnWebScale/solid-authentication-browser-extension/commit/bd8d9f8466382b637a640ec2ec11caccdecafc41) of 
the Solid authentication browser extension installed.
- The user has a WebID and pod.
You can create both for testing via the [Pod Playground of SolidLab](https://pod.playground.solidlab.be/).
- The user has logged in with their WebID in the browser extension.

### Steps

1. Clone [the repo of the app](https://github.com/pheyvaer/markdown-editor) via
   ```shell
   git clone https://github.com/pheyvaer/markdown-editorgit
   ```
2. Install the dependencies via
   ```shell
   npm i
   ```
3. Start the server via
   ```shell
   npm start
   ```
4. Open Firefox and browse to http://localhost:8080/.
5. In the text field at the top enter the URL for a new Markdown resource on your pod.
6. Edit the Markdown file.
7. The app automatically saves your changes.

### Postconditions

- Open the resource in a new tab in your browser. 
  You don't need the app to see its content.
  Note that the [Community Solid Server](https://github.com/CommunitySolidServer/CommunitySolidServer)
  will not show the Markdown file directly, but
  a rendered HTML version instead.

## Follow-up actions

None.

## Future work

None.
