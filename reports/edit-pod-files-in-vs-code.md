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

## Follow-up actions

None.

## Future work

None.