# Page types (Diátaxis)

Diátaxis separates documentation into four types by the reader's need. Each type
has a different purpose, so each has a different voice. Mixing them on one page
is the most common structural mistake in this repository. Read the type you are
writing, and hold the page to it.

| Type | Reader need | Voice | This repo |
|---|---|---|---|
| Tutorial | "Teach me, so I can do it." | Guided, second person, one path | `general/quickstart.md` |
| How-to | "Help me do a task." | Goal then steps, assumes basics | `general/installation.md`, `general/iso-installation.md`, `general/troubleshooting.md`, `complete/arch.md` |
| Reference | "Describe the machinery." | Terse, factual, structured | `hyprland/*.md`, `keybindings/*.md` |
| Explanation | "Help me understand why." | Discursive, no steps | `hyprland/index.md`, `features/hyprland.md` |

Blog posts, `general/showcase.md`, and `docs/index.md` are outside Diátaxis.
Keep release notes factual and dated, the showcase to images, and the home page
short.

## Tutorial

Purpose: take a beginner through one successful path. The reader learns by
doing, and the page promises a result.

- Use only one path. Do not offer the manual or expert alternatives.
- Narrate. "You boot from a USB drive, the installer sets up Arch Linux, and
  you sign in."
- Tell the reader what they will have at the end, near the start.
- Warn before a destructive step, never after.
- Link out to the how-to for the branches you omit. Do not include them.

Failure mode: a tutorial that turns into a menu of options loses the beginner.
That is what `general/iso-installation.md` is for.

## How-to

Purpose: a competent reader has a specific goal and needs the procedure. They
already know the domain.

- State the goal in one line, then give the steps.
- Cover the real branches, such as automatic and manual partitioning, because
  the reader may need them.
- Use numbered lists for sequences.
- Add a verify step and a "if it fails" step where a failure is realistic.
- Keep troubleshooting detail on `general/troubleshooting.md` and link to it.

Failure mode: explaining basics the reader already knows, or burying the
actual steps under context.

## Reference

Purpose: describe what a file or system does, accurately and completely, for
lookup.

- Lead with the path or the name.
- Give current values, defaults, and syntax.
- Include the validation commands.
- Be terse. Reference is a dictionary, not a lesson.

Failure mode: reference that drifts into a tutorial, or that omits the default
value the reader came to find.

## Explanation

Purpose: help the reader understand how and why the system is built this way.

- Discuss. No step lists.
- Explain the design decisions that are not obvious from the code, such as why
  the environment module loads first.
- Link to the reference for the exact fields.

Failure mode: explanation that becomes a second, worse reference, or that
invents a rationale the source does not support. If you do not know why, say
what the source does and stop.

## Choosing a type for a new page

Ask what the reader is trying to do.

- If they are learning the system for the first time, write a tutorial.
- If they have a task and need the steps, write a how-to.
- If they need a fact, a field, or a default, write reference.
- If they are asking "why", write explanation.

If a request seems to need two types, write one page for the primary need and
link to a second page for the other. Do not blend them.
