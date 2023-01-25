# How to manage issues

### New scenarios and challenges
Every new scenario and challenge gets the label "proposal: pending ❓" and
is assigned to Ruben Verborgh.
He checks if the scenario/challenge is explained well-enough and 
if all need information is present.
If everything is ok, the scenario/challenge gets the label "proposal: approved ✅", else
it gets the label "proposal: changes needed 👷" and changes are needed.

Once a challenge is approved Pieter Heyvaert looks for a lead for the challenge.

### Updates on ongoing challenges
Challenges that have a lead assigned require a status update via the issue every 2 weeks.

### Completed scenarios and challenges
Every scenario and challenge that you consider completed 
you assign the label "completion: pending ❓" and 
you assign the issue to Ruben Verborgh.
You unassign the others.
He checks if all acceptance criteria are met and 
if the demo is sufficient. 
If everything is ok, the scenario/challenge gets the label "completion: approved ✅" and 
the issue is closed, else
it gets the label "completion: changes needed 👷" and changes are needed.

The following only applies to helper code.
Once a challenge is approved three things happen:

- You inform Pieter Heyvaert about helper code that is part of your solution that can be reused in the future. 
He creates a new issue in the repo [SolidLabLib.js](https://github.com/SolidLabResearch/SolidLabLib.js).
The person who created the code of the challenge has to add it to this library.
There are requirements for adding code such as tests and documentation.
Please check with Ruben Taelman for details. 
He has ownership of this library.
- You inform Pieter Heyvaert about future work and actions that you discovered when working on the challenge.
- Pieter Heyvaert writes a report for this challenge using [this template](reports/template.md).
