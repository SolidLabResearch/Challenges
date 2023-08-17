# SolidLab Challenges

This repository contains challenges that can be tackled during SolidLab.
Each challenge is represented by a separate issue.
Everybody is free to add new challenges using the provided template that you select when creating a new issue.
This template helps you with providing the needed information for a challenge.

**Please read all [instructions](./how-to-manage-issues.md) on how to manage challenges.**

The Working Group 1 (Use Cases) of the Outreach component of SolidLab will create different use cases.
You find the steps that you need to follow to turn these use cases into challenges via scenarios [here](use-case-flow.md).

Once a scenario or challenge is completed,
we write a report.
You find all reports [here](reports).

## Useful links

- Find all approved challenges without a lead
[here](https://github.com/SolidLabResearch/Challenges/issues?q=is%3Aissue+is%3Aopen+no%3Aassignee+label%3A%22proposal%3A+approved+%E2%9C%85%22+label%3Achallenge).
- Find all challenges that need changes and without assignee
[here](https://github.com/SolidLabResearch/Challenges/issues?q=is%3Aissue+is%3Aopen+no%3Aassignee+label%3A%22proposal%3A+changes+needed+%F0%9F%91%B7%22+label%3Achallenge+).
- Find all ongoing challenges
[here](https://github.com/SolidLabResearch/Challenges/issues?q=is%3Aissue+is%3Aopen+label%3Achallenge+label%3Aongoing).
- Find all challenges that await completion approval
[here](https://github.com/SolidLabResearch/Challenges/issues?q=is%3Aissue+is%3Aopen+label%3A%22completion%3A+pending+%E2%9D%93%22+label%3A%22challenge%22).
- Find all completed challenges
[here](https://github.com/SolidLabResearch/Challenges/issues?q=is%3Aissue+is%3Aclosed+label%3A%22completion%3A+approved+%E2%9C%85%22).
- Find all completed challenges without a report
[here](https://github.com/SolidLabResearch/Challenges/issues?q=is%3Aissue+label%3A%22report%3A+ongoing+%F0%9F%91%B7%E2%80%8D%E2%99%82%EF%B8%8F%22).

## Lint markdown

We use a linter to make sure that the markdown is correctly and consistently formatted.
Follow these steps to run the linter:

1. Install dependencies via

   ```shell
   npm i
   ```

2. Run the linter via

   ```shell
   npm run lint
   ```

We can fix some errors automatically via

```shell
npm run lint:fix
```
