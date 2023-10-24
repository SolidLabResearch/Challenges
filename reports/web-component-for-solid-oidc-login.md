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

# Web Component for Solid-OIDC login

The corresponding challenge is [#125](https://github.com/SolidLabResearch/Challenges/issues/125).

## Problem

When building Solid apps, allowing users to log in with their WebID or Identity Provider is crucial.
Developers have to implement this functionality every time.
Thus, it would improve the ease of developing Solid apps if
there exists a [Web Component](https://www.webcomponents.org/introduction) that handles the logging in and out.

## Approved solution
<!--
Provide information about the approved solution:
names of tools/libraries created, repos, and so on.
-->

We developed a [Web Component](https://github.com/SolidLabResearch/lit-solid-login/releases/tag/v1.0.0)
to log in with Solid-OIDC.
We used [Lit](https://lit.dev/) to build the component.
The component is framework-agnostic.
You can use it with vanilla JavaScript and
frameworks such as React and Vue.
End-users have the option to use either their WebID or Identity Provider to log in.
The minimal code that you need to use the component is

```js
<script type="module">
  import 'solid-login/solid-login.js';
</script>

<solid-login />
```

The screenshot belows shows the result in a Web app.

![A screenshot from a Web app.
It contains two radio buttons next to each other:
one for "WebID" and one for "Identity Provider".
Below that there is a field where the user fills in either their WebID or
Identity Provider.
Next to the field is the login button.](./img/lit-solid-login.png)

You find a screencast [here](https://cloud.ilabt.imec.be/index.php/s/gWfBDSp5WZKaySc).
You find all options to configure the component [here](https://github.com/SolidLabResearch/lit-solid-login#options).

<!--
Provide a list of important technical decisions and assumptions.
-->
We made the following important technological decisions and assumptions:

- We used Lit to build the component
because Lit is part of the [Open Web Component Recommendations](https://github.com/open-wc/open-wc).
- We included some minimal styling for the component.
You can change the styling yourself using CSS.

[PodOS](https://github.com/pod-os/PodOS) also offers a component with similar functionality, but
it requires the component to be part of a `<pos-app>` component.
`<pos-app>` holds the session and
can give other components access to an instance of PodOS,
which can do authenticated fetches using the [rdflib.js](https://github.com/linkeddata/rdflib.js/)
store/fetcher that is part of it.
Thus, it doesn't full the acceptance criteria of the challenge,
but it does show an interesting, alternative approach.

## User flow

<!--
Describe a concrete user flow with the approved solution.
Complete the following sections:
-->

This user flow describes how to set up a demo of the Web Component.

### Actors/actresses

- User of the demo Web app.

### Preconditions

- The user has Node.js installed.

### Steps

1. Clone the [repository](https://github.com/SolidLabResearch/lit-solid-login/) (v1.0.0) via

   ```shell
   git clone -b v1.0.0 https://github.com/SolidLabResearch/lit-solid-login.git
   ```

2. Install the dependencies via

   ```shell
   npm i
   ```

3. Start the demo via

   ```shell
   npm start
   ```

   Keep the demo running.
4. In another terminal prepare the Solid pods via

   ```shell
   npm run prepare:pods
   ```

5. Start the Solid server with the pods via

   ```shell
   npm run start:pods
   ```

   The server is ready when the following message appears in the terminal

   ```text
   Listening to server at http://localhost:3000/
   ```

   Keep this process running.

6. Open a browser at <http://localhost:8080>.
   You see a Web app that uses the component.
7. Enter the WebID <http://localhost:3000/example/profile/card#me> in the text field.
8. Click on the button "Log in".
   The component redirects you to the Identity Provider.
9. Fill the email `hello@example.com` and the password `abc123`.
10. Click on the button "Log in".
11. Click on the button "Authorize"
    The Identity Provider redirects you to the app.
12. The component shows the following message:

    ```text
    Logged in with http://localhost:3000/example/profile/card#me
    ```

    It also shows a logout button.
13. Click on the button "Show favourite books".
    The resource with your favourite books is accessible when logged in.
14. The app shows the content of the resource as the JSON-LD.
    It uses the authenticated fetch provided by the component.
15. Click on the button "Log out".
16. The component shows it's initial state again.

### Postconditions

None.

## Follow-up actions
<!--
List all concrete follow-up actions that someone has to do.
For example, adding helper code from the solution to Comunica.
-->

None.

## Future work
<!--
List ideas for future work.
These ideas don't have to be concrete.
You can create a new challenge/scenario for each idea.
-->

None.

## Lessons learned about developer experience
<!--
List all lessons learned about your experience as a Solid developer:
issues you encountered, tasks that could be automated or could be made easier and so on.
-->

None.
