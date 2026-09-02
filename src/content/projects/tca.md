---
title: "TCA — Tiny Coding Agent"
startDate: "2026.5"
endDate: "2026.6"
summary: "A compact learning-oriented coding agent with an explicit execution loop, bounded context, tool observations, completion checks, and reproducible evaluation."
tags:
  - "Coding agents"
  - "Reliability"
  - "Evaluation"
featured: false
draft: false
---

TCA is a small coding-agent harness designed to keep the main execution path visible and understandable without relying on an agent framework.

## Agent core

The agent repeatedly selects context, requests a model decision, executes one tool call, records the observation, and updates explicit run state.

It separates the complete session from the model-visible context, preserves tool-call/result pairs during context reduction, and requires successful validation after the latest file change before completion.

## Current status

The agent can inspect and edit a local workspace, run commands, recover from ordinary tool failures, persist sessions, compact older context, record JSONL traces, and evaluate runs against isolated fixtures.

Command execution is restricted to the workspace as a working directory, but it is not a security sandbox.
