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

# Building, rendering, and viewing forms

The corresponding scenario is [#19](https://github.com/SolidLabResearch/Challenges/issues/19).

## Problem

The idea is to have a Google Forms-like interface but for the generation of RDF data.
We envision an environment in which:

- Form builders can generate an RDF form definition.
- Form renders that can render an RDF form for end users (e.g. as HTML or as a text menu).
- Form viewers that can view the generated RDF in a human friendly way.

These three components can work together, for example, so that

1. a form builder creates a Doodle form,
2. a form renderer makes a HTML version to input the data, and
3. a form viewer generates a nice read-only view.

See also the reports ["Drag & drop form builder to build basic RDF form definition"](./drag-drop-form-builder-to-build-basic-rdf-form-definition.md)
and ["Form renderer that to view RDF form and store filled-in data in pod"](./form-renderer-to-view-form-store-data.md).

## Approved solutions
<!--
Provide information about the approved solution:
names of tools/libraries created, repos, and so on.
-->

We created a proof-of-concept of a form builder via challenge #64.
You find the corresponding report [here](./drag-drop-form-builder-to-build-basic-rdf-form-definition.md).
We created a proof-of-concept of a form renderer via challenge #65.
You find the corresponding report [here](./form-renderer-to-view-form-store-data.md).

There is no challenge for the form viewer,
but we did create a proof-of-concept.
You find a viewer for curriculum vitae [here](https://github.com/phochste/CVViewer)
and a live demo [here](https://patrickhochstenbach.net/cv.html).

## Follow-up actions

None.

## Future work

- Create Svelte reusable components based on the code in the different repositories.
