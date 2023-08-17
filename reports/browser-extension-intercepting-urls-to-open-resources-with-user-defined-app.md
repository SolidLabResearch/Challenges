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

# Browser extension intercepting urls to open resources with user-defined app

The corresponding challenge is [#45](https://github.com/SolidLabResearch/Challenges/issues/45).

## Problem

In a decentralized Solid world many applications will provide functionality to do one or more specialised actions,
such as browsing files, playing games, creating a Doodle, participating in a Quiz.
In this environment users have a preference for apps they want to use to do some tasks:

- When the user wants to browse a pod, she wants to use App X.
- When the user wants to play chess, she wants to use App Y.
- When the user wants to edit a text resource, she wants to use App Z.

## Approved solution

We developed a [browser extension](https://github.com/phochste/AcmePlugin) that
allows users to open resources with existing Solid apps via the context menu.
You can configure what Web pages and resources are considered by the extension and what specific apps should be used.
Below you see a screenshot of the context menu that appears when right-clinking on a page
when the plugin is installed.

![A context menu that appears when right-clicking on a page.
It has the option "Acme Open in".
This option has three options: edit, open, and permissions.](img/acmeplugin.png)

## User flow

### Actors/actresses

- Browser extension
- User of the extension

### Preconditions

- The user has installed the extension in the browser.

### Steps

1. The user visits a Web page that is considered by the extension.
2. The user right-clicks on a resource that is considered by the extension.
3. The extension opens the corresponding Solid app and loads the resource.

### Postconditions

- The resource is opened in the preferred Solid app based on the extension's configuration.

## Follow-up actions

None.

## Future work

- Advanced functions implementations might consider creating (N3) rules to decide what app to open based on resources/types.
