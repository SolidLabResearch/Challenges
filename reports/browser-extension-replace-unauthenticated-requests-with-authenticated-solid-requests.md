# Browser extension: replace unauthenticated requests with authenticated Solid requests

The corresponding challenge is [#67](https://github.com/SolidLabResearch/Challenges/issues/67).

## Problem
<!--
You can reuse the pitch of the challenge, but check if you need to make changes.
For example, it might happen that the approved solution does more than what the original pitch requested.
-->

A webpage `http://example.com` is only readable by my WebID `https://example.com/card#me`.
We want a browser extension that makes authenticated requests using my WebID.
That way, we don't have to change the webpage `http://example.com` to support a Solid login.

## Approved solution
<!--
Provide information about the approved solution:
names of tools/libraries created, repos, and so on.
-->

We developed a [browser extension](https://github.com/KNowledgeOnWebScale/solid-authentication-browser-extension/releases/tag/v1.0.0) 
that replaces unauthenticated requests with authenticated Solid requests.
This happens by adding `authentication` and `dpop` headers to requests that 
return a [401 status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401) when a HEAD request first.
It works in Firefox and 
you find a signed version [here](https://github.com/KNowledgeOnWebScale/solid-authentication-browser-extension/releases/download/v1.0.0/solid-authentication-1.0.xpi).
You find a screencast of the extension [here](https://cloud.ilabt.imec.be/index.php/s/QbabTcHkX2J8GHG).

<!--
Provide a list of important technical decisions and assumptions.
-->
We made the following important technological decisions and assumptions:
- The extension only works for GET requests, because this was the use case of the challenge.
You find more information [here](https://github.com/KNowledgeOnWebScale/solid-authentication-browser-extension/tree/24d274d7a3228c7a3ff1748b7dbb25b289ada82b#get-requests-only).
- The extension only works with WebIDs that use the Community Solid Server (>= v4.0.0) as identity provider,
because the extension relies on the [Client Credentials API](https://communitysolidserver.github.io/CommunitySolidServer/5.x/usage/client-credentials/).
You find more information [here](https://github.com/KNowledgeOnWebScale/solid-authentication-browser-extension/tree/24d274d7a3228c7a3ff1748b7dbb25b289ada82b#client-credentials).
We are looking into supporting [Solid-OIDC](https://solidproject.org/TR/oidc) for the next version.

## User flow

<!--
Describe a concrete user flow with the approved solution.
Complete the following sections:
-->

### Actors/actresses

- Browser extension
- User of the extension

### Preconditions

- The user has installed 
[v1 of the extension](https://github.com/KNowledgeOnWebScale/solid-authentication-browser-extension/releases/tag/v1.0.0) in the browser.
- The user has a WebID and pod.
  You can create both for testing via the [Pod Playground of SolidLab](https://pod.playground.solidlab.be/).
- The pod has a resource that is publicly accessible, for example `https://example.com/public`.
- The pod has a resource that is only accessible with the user's WebID, for example `https://example.com/private`.


### Steps

1. The user browses to `https://example.com/public` and sees the content of the page.
Note that the user did not log in with the extension yet.
2. The user browses to `https://example.com/private` and 
can't see the content of the page.
3. The user logs in with the extension.
4. The user browses to `https://example.com/public` and 
can still see the content of the page.
5. The user browses to `https://example.com/private` and 
can now also see the content of the page.

### Postconditions

None. 

## Follow-up actions
<!--
List all concrete follow-up actions that someone has to do.
For example, adding helper code from the solution to Comunica.
-->

- What are the security issues of letting the extension adjusting the authentication headers of every request?
- Support Solid apps to access information about the logged-in user ([issue](https://github.com/KNowledgeOnWebScale/solid-authentication-browser-extension/issues/36)).
- Support Solid-OIDC ([issue](https://github.com/KNowledgeOnWebScale/solid-authentication-browser-extension/issues/30)).
- Support other HTTP methods, such as POST ([issue](https://github.com/KNowledgeOnWebScale/solid-authentication-browser-extension/issues/14)) and PUT.
- Support Google Chrome ([issue](https://github.com/KNowledgeOnWebScale/solid-authentication-browser-extension/issues/5)). 

## Future work
<!--
List ideas for future work.
These ideas don't have to be concrete.
You can create a new challenge/scenario for each idea.
-->

None.
