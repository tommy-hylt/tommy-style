# Tommy Style

A collection of coding guidelines and specialized Gemini skills designed to enforce a specific, high-quality coding style across projects.

## Core Guidelines

- **GENERAL.md**: Non-negotiable principles (Zero comments, functional chains, etc.).
- **DEVELOPMENT.md**: Foundation-first philosophy and sprint-based workflow.
- **STRUCTURE.md**: Project organization and file ordering.
- **READABILITY.md**: Naming conventions and formatting.
- **PATTERNS.md**: Expression-level code patterns.
- **TYPESCRIPT.md**: Type system usage and conventions.
- **REACT.md**: Component patterns and state management.
- **CSS.md**: Styling, layout, and animations.

## Gemini Skills

This repository includes a `.gemini/` folder containing specialized skills that help Gemini (or other agents) understand and enforce these guidelines in your own projects.

### How to use in your project

If you are working in a sibling project (e.g., `do-do`) and have this repository cloned next to it:

1. Open a Gemini session in your project.
2. Use the following prompt to import the skills:

> "Follow the hydration protocol in ../tommy-style/.gemini/COPY_SKILLS.md to copy the skills into my current project"

## Dehydrated Architecture

The skills in `.gemini/skills/` are "dehydrated" to avoid duplicate maintenance. They point back to the root markdown files as the single source of truth. The hydration protocol handles the expansion of these files into your target workspace.
