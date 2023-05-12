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

### Requirements before requesting completion approval of challenge
Verify the following requirements before requesting the completion approval of your challenge:

- The code/library/demo of the challenge must meet all acceptance criteria.
- The code/library/demo must work with the Community Solid Server (CSS).
  CSS follows the Solid protocol so whatever the challenge produces as output must work with CSS.
- You must provide copy-paste instructions to showcase the output of the challenge.
  You find an example [here](https://github.com/maartyman/solidBenchAggregatorDemo).
- If the output of a challenge is a graphical user interface, such as a Web app or desktop app,
  then you have to provide a screencast of a flow demonstrating the acceptance criteria.
  The screencast needs to have audio explaining what is happening.
- You must provide a list of important technical decisions and assumptions that were made,
such as the shape and the location of data.
- You must provide conclusions/actions that result from doing this challenge.
  For example, mention an unclarity in a specification, 
  the need for a new function in a used library,
  a new challenge, or
  other future work.

### Completed scenarios and challenges
Every scenario and challenge that you consider completed 
you assign the label "completion: pending ❓" and 
you assign the issue to Ruben Verborgh.
You unassign the others.
He checks the following:

- If the aforementioned requirements are met.
- If there is code of your solution that can be reused in the future.
- If there are future work and actions that come from this challenge or its solution.

If everything is ok, the scenario/challenge gets the labels "completion: approved ✅" and "report: ongoing 👷", else
it gets the label "completion: changes needed 👷" and changes are needed.

Once a challenge is approved three things happen:

- Pieter Heyvaert creates a new issue in the repo [SolidLabLib.js](https://github.com/SolidLabResearch/SolidLabLib.js)
for the reusable code, if any.
- The person who created the code of the challenge has to add this code to this library.
There are requirements for adding code such as tests and documentation.
Please check with Ruben Taelman for details. 
He has ownership of this library.
- Pieter Heyvaert writes a report as explained in the next section.

### Report

Once a challenge is completed Pieter Heyvaert writes a report using [this template](reports/template.md).
The person who reviewed the solution of the challenge also reviews the report.
Once the report is done, Pieter adds label "report: done ✅" to the issue and closes it.
