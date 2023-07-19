<!--
Fill in the WebIDs of the people below.
Leave this in comments!
It's possible to have multiple people per role.

Challenge/scenario creator:
  - https://id.inrupt.com/jeswr
Solution creator:
  - https://id.inrupt.com/jeswr
Report writer:
  - https://pieterheyvaert.com/#me
-->

# Edit pod files in Visual Studio Code

The corresponding challenge is [#80](https://github.com/SolidLabResearch/Challenges/issues/80).

## Problem
The goal is to create a Visual Studio Code extension similar to remote SSH that 
allows you to edit files on a remote pod as if they were directly on your machine. 
This removes the barrier of entry for developers and admins, 
because it allows them to 

- better understand what data is in the pods, and  
- edit the data in the pods.

## Approved solution

We developed an [extension](https://marketplace.visualstudio.com/items?itemName=jeswr.solidfs)
that allows users to 

* open directories (containers)
* open files (resources)
* delete files (resources)
* create files (resources)
* modify files (resources)

You can watch a screencast [here](https://cloud.ilabt.imec.be/index.php/s/Ty2pNyqtmDn5Qsk).
The source code of the extension is not publicly available.

## Follow-up actions

None.

## Future work

None.
