# Development

Sprint phases, foundation-first philosophy, and testing discipline.

---

## Core Philosophy

Do not build everything at once. A project built on weak foundation will collapse when complexity grows. Lay out solid, tested utility functions before touching the real application. Then build the MVP. Then iterate in small steps.

Every phase builds on the previous one. Never skip ahead.

## Applying to Existing Projects

This guide is not only for projects that start from scratch. When you take up an existing project, evaluate it against these phases. Identify what phase the project has reached and what is missing. Is the foundation tested? Are utility functions solid or fragile? Is the MVP functional but unpolished? Then apply the appropriate phase from where the project actually is — not from the beginning.

---

## Phase 1 — Foundation (Sprints 0-2)

The first sprints are entirely about utility functions. No UI, no features, no application logic yet.

### Sprint 0 — Identify

List every core utility function the project will need. These are not trivial helpers — they are the technical capabilities the entire project depends on. Name them. Define their inputs, outputs, and what they must achieve.

```
Example — OCR scanning app:
  captureImage(device) → ImageBuffer
  preprocessImage(image, options) → ImageBuffer
  recognizeText(image, language) → TextRegion[]
  parseStructuredData(regions) → Document

Example — console buffer capture tool:
  attachToProcess(pid) → ProcessHandle
  readConsoleBuffer(handle) → BufferSnapshot
  detectBufferChange(prev, current) → Diff[]
  extractVisibleText(buffer, rect) → string
```

### Sprint 1 — Build

This sprint often involves extensive evaluation and experimentation. Many core capabilities depend on external libraries or APIs — and most of them are inadequate. Do not pick the first option and move on.

**Evaluate thoroughly.** If the project needs OCR, try every viable library. Tesseract, EasyOCR, PaddleOCR, cloud APIs — test each one. Most will disappoint. Adjust parameters, try different preprocessing pipelines, compare accuracy across real input samples. This takes time. Spend it.

**Explore all possibilities without giving up.** The first library may fail. The second may be slightly better. The third may work only after you discover the right combination of parameters. Do not settle for "good enough" in Phase 1 — the entire project will inherit whatever limitations you accept here.

**Build with the simplest code possible.** Once the right tool or approach is found, implement each utility function simply. One function per file. No clever abstractions, no premature optimization. Just make it work correctly.

### Sprint 2 — Test

This is where most agents fail. Testing in Phase 1 is not about checking happy paths — it is about **achieving the desired functionality and knowing the limits.**

Test on two dimensions: **technical correctness** and **real-world targets.**

**Technical correctness** — push each utility to its boundaries. Discover what works, what breaks, and where the walls are. This knowledge shapes every decision in later phases.

**Real-world targets** — think about why the user wants this program. What will they actually use it on? Test against those specific targets. The user does not care that your function works on a synthetic test case — they care that it works on the thing they need it for.

```
Example — OCR recognizeText():

  Technical:
    - Clean printed text → must achieve high accuracy
    - Handwritten text → know the accuracy limit
    - Skewed/rotated images → find the angle tolerance
    - Low resolution → find the minimum DPI
    - Noisy backgrounds → find where it breaks

  Real-world targets (why does the user want OCR?):
    - Scanned receipts → test with actual receipt photos
    - Business cards → test with various layouts and fonts
    - Whiteboard photos → test with glare, angle, handwriting
    - Screenshots of foreign text → test with CJK, Arabic, mixed scripts
    - PDF scans → test with low-quality office scanner output

Example — console readConsoleBuffer():

  Technical:
    - ASCII output → must capture correctly
    - Unicode/CJK output → verify encoding handling
    - ANSI color codes → preserved or stripped?
    - Rapidly scrolling output → find the capture rate limit
    - Process exits mid-read → verify graceful handling

  Real-world targets (why does the user need console capture?):
    - CMD → test with dir, ping, ipconfig output
    - PowerShell → test with formatted tables, colored output
    - Windows Terminal → test with tabs, multiple profiles
    - Claude Code → test with streaming AI responses, tool output
    - Gemini CLI → test with markdown rendering in terminal
    - npm/build tools → test with long scrolling logs, progress bars
```

Test everything you can think of technically. But also think about what the user is actually going to use this on and test against those real targets.

Leave tests that can be re-run easily. When the project evolves, these tests catch regressions immediately. If a test is hard to re-run, it will be ignored — and regressions will slip through.

**After testing, think and ask the user.** By now you understand the capabilities and limits of the foundation. Present what you learned — what works, what does not, what trade-offs exist. Ask the user: is this the direction they want? Are the limits acceptable? Are there targets you missed? Do not build things that no one wants. Development is a process — you build, you test, you refine, you steer. Sprint 2 is the right moment to course-correct before the MVP phase commits to a direction.

---

## Phase 2 — MVP (Sprints 3-5)

Now build the minimum viable product. The utility functions are solid — integrate them.

### Sprint 3 — Back-end

Build the data layer, API, server logic, or state management. Wire up the utility functions. The back-end should be functional and testable on its own before any UI exists.

### Sprint 4 — Front-end and Scripts

Build the UI and any supporting scripts. Connect front-end to back-end. The MVP will look raw — that is expected. Focus on making it work, not making it pretty.

### Sprint 5 — Quality Pass

Review the code for quality. Clean up naming, remove dead code, simplify logic. At this point the MVP should work well with utility functions integrated properly. It is still raw, but it is solid.

---

## Phase 3 — Iteration (Multiple Sprints)

Improve the project in small increments. Each sprint makes one focused improvement. Do not attempt large rewrites — big code changes break programs.

**Each iteration sprint:**
- Pick one area to improve (a component, a flow, a visual element)
- Make the change
- Verify nothing else broke
- Move on

This phase is about UI polish, code readability, and structural refinement. Move a little step forward each sprint.

---

## Phase 4 — UX Improvement (Multiple Sprints)

Once the product is stable and clean, focus on user experience. Again, one small step per sprint:

- Improve transitions and animations
- Refine layout and spacing
- Add feedback for user actions
- Smooth out edge cases in interaction flow

Never rush UX changes. Each sprint should leave the project in a working, improved state.

---

## Sprint Counts Are Flexible

"3 sprints per phase" is an example. A complex project may need 10 or 20 sprints per phase. The principle stays the same: **foundation first, then MVP, then iterate, then polish.** Never skip phases. Never combine them.

---

## Testing Discipline

Agents tend to test very little. This is wrong. Testing is not optional and not superficial.

**Test the real principle.** Do not write tests that only confirm the obvious. Test the actual capability — does the OCR read handwriting? At what angle does it fail? How fast can the buffer capture keep up? Achieve the desired functionality first, then map the limits.

**Know the limits.** Every utility has boundaries. A function that works on clean input but breaks on real-world data is not tested — it is a trap. Push until it breaks, document where, and decide whether the limit is acceptable or must be pushed further.

**Leave re-runnable tests.** Tests are not one-time checks. They must be easy to re-run whenever the code changes. Structure them so a single command re-validates everything. If a test requires manual setup or inspection, it will be ignored — and regressions will slip through.

**Test before building on top.** Phase 1 exists because utility functions must be proven before the MVP depends on them. A bug in a core utility discovered during Phase 3 means rework across the entire project. The foundation must be solid before anything stands on it.

---

## Summary

| Phase | Focus | Key Rule |
|---|---|---|
| Foundation | Utility functions | Identify, build simply, test thoroughly |
| MVP | Back-end → front-end → quality | Integrate utilities, make it work |
| Iteration | UI and code quality | Small improvements, one sprint at a time |
| UX | User experience polish | Small steps, never rush |

| Principle | Rule |
|---|---|
| Build order | Foundation before features. Always |
| Sprint size | One focused goal per sprint |
| Change size | Small. Big changes break things |
| Testing | Test real principles and edge cases, not just happy paths |
| Re-runnability | All tests must be easy to re-run |
