# Merged documentation standards

This repo's documentation follows four frameworks. They are merged here into one
operative ruleset so a writer does not have to reconcile them by hand.

1. **ASD-STE100, STE-flavored mode.** Controlled-language discipline for
   sentence mechanics. STE exists to stop a reader from misreading a
   two-meaning word or a two-structure sentence.
2. **ISO 24495-1, plain language.** The acceptance test the finished page must
   pass.
3. **Google developer documentation style guide.** Defaults for formatting,
   punctuation, terminology, procedures, and notices.
4. **Diátaxis.** Decides which kind of page you are writing. See
   `page-types.md`.

These frameworks are nearly silent about each other, so the merge matters. In
practice:

- **Diátaxis** sets the page's purpose and shape.
- **STE-flavored** governs sentence length, voice, and grammar.
- **Google** governs formatting, lists, code, UI text, links, and notices.
- **ISO 24495-1** is the test you apply last, to the whole page.

## Precedence

When two sources disagree, use this order:

1. **This repository's own rules** (SKILL.md and the "Repository overrides"
   section below). A house rule always wins.
2. **Google style guide.** Defaults for anything the repo does not state.
3. **STE-flavored rules.** Sentence mechanics. Apply the structural rules in
   full, and the lexical rules as a direction of travel.
4. **ISO 24495-1.** Never overrides a concrete rule; it is the reason the
   concrete rules exist.

STE-flavored is not strict STE. The full lexical standard depends on ASD's
~900-word approved dictionary, which is copyrighted and not reproduced here.
That is why the lexical rules below are advisory: apply the principle (use the
plainest common word, and use it the same way every time) without claiming
dictionary compliance.

## ISO 24495-1: the four governing principles

ISO 24495-1 defines plain language by four principles. Apply them as checks to
each page when you are done.

| Principle | Question to ask | What fails it |
|---|---|---|
| **Relevant** | Does the reader get the information they need, and nothing else? | Marketing copy, filler intros, sections that exist to look complete, features the reader cannot use. |
| **Findable** | Can the reader locate this information? | Buried procedures, vague headings, the wrong page type, missing cross-links, an unlisted new page. |
| **Understandable** | Can the reader understand it on the first read? | Long sentences, jargon without a first-use definition, ambiguous pronouns, stacked hedges. |
| **Usable** | Can the reader act on it? | Steps without the required context, commands without placeholders explained, warnings placed after the action. |

The four principles apply to the page, not to a single sentence. A page of
short sentences that omits the one step the reader needs still fails
"Usable".

## STE-flavored structural rules

Apply these without exception.

| Rule | Do | Don't |
|---|---|---|
| Active voice | "The installer writes the config." | "The config is written." Do not use passive unless the actor is unknown or irrelevant. |
| One instruction per sentence | "Open the file. Read line 3." | "Open the file and read line 3, then check it." |
| Sentence length | Keep instructions at or under 20 words, and description at or under 25. | Long compound or subordinate-clause sentences. |
| No semicolons | Split into separate sentences. | Any semicolon. STE bans the mark outright. |
| No phrasal verbs | "Remove the panel." "Start the job." | "Take off the panel." "Spin up the job." |
| Noun clusters | Keep a stacked noun phrase to three words or fewer ("fuel pump valve"). | Four or more words stacked ("high pressure fuel pump inlet valve assembly"). |
| No ellipsis | Keep the subject, verb, and article explicit. | Dropping words to save space, which hides what the sentence refers to. |
| Keep modality | "The request may have failed" stays "may have failed". | Promoting a hedge to a fact, or inventing certainty the source did not state. |
| Paragraph limits | One topic per paragraph, at most six sentences. | Multi-topic paragraphs. |
| Lists for sequences | Use a list for three or more steps or conditions. | Burying a sequence inside one prose sentence. |
| Simple tenses | Use infinitive, imperative, simple present, simple past, simple future, and past participle as adjective. | Present perfect and other compound forms, except as noted below. |

### The compound-tense exception

STE excludes present perfect. Aircraft manuals never need it. Other text is
not always so lucky.

- "The job has completed" (and its output is available now) differs from "the
  job completed" (at some past point). When the compound form carries current
  relevance or a hedge, keep it and accept the departure from STE.
- "may have failed" must never become "failed". The hedge is content.

### Lexical rules: direction of travel

| Rule | Prefer | Avoid | Why it is advisory |
|---|---|---|---|
| One word, one meaning | Always use "check" for the same action. | Rotating "check", "verify", "confirm" for one action. | Consistency is checkable. Which word is *approved* needs ASD's dictionary. |
| Verb, not noun | "Analyze the log." | "Perform an analysis of the log." | The verb form is always shorter and clearer. |
| One part of speech per word | "Apply oil to the valve." | "Oil the valve." | Whether a word is approved as one part of speech is a dictionary fact. |
| Domain terms | Keep necessary technical terms, and define each once. | Using jargon the reader may not know without defining it. | STE allows a project glossary beyond its base dictionary. |

## Google developer documentation style guide: rules that bind here

These are the Google rules that matter most for this repo. The full guide is at
<https://developers.google.com/style>.

**Language and grammar**

- Use second person: "you", not "we".
- Use active voice.
- Use present tense. Do not pre-announce future features or behavior.
- Put conditions before instructions: "To delete the file, click **Delete**",
  not "Click **Delete** if you want to delete the file".
- Write for a global audience. Avoid idioms, metaphors, and cultural
  references.

**Formatting and organization**

- Use sentence case for titles and headings.
- Use numbered lists for sequences and bulleted lists for everything else.
- Use tables for pairs of related data, not for prose.
- Use serial commas.
- Put code in code font. Put real UI labels in bold.
- Use descriptive link text: "see the [download guide]", not "[click here]".

**Procedures**

- Use one step per action. Use one procedure per task.
- State the location before the action: "In Rofi, select ...".
- State the goal before the action: "To change the terminal, edit ...".
- Mark optional steps with "Optional:" as the first word.
- Do not use directional language such as "above" or "below".

**Notices**

- Use the VitePress containers the repo already uses: `::: info`,
  `::: tip`, `::: warning`. Keep a notice to one idea.
- Put a warning before the action it protects, not after.

**Claims and accessibility**

- Avoid excessive claims and marketing adjectives.
- Provide alt text for images.

**Words to avoid**

- Do not use "please" in instructions.
- Do not use "simply", "easily", "quickly", "just", or "It's easy".
- Do not use exclamation marks.
- Do not use placeholder phrases such as "please note" or "at this time".
- Do not start every sentence with the same word ("You can ...", "To ...").

## Repository overrides

These rules are specific to HyprFlux docs and override the frameworks above
where they disagree.

- **No em dashes.** Google permits them. This repo does not use them. Use a
  period, a comma, or parentheses.
- **No emojis** in prose or headings.
- **Minimal bold.** Bold only real UI labels and the occasional key term.
  Google's guidance to bold UI elements still applies.
- **No repeated page scaffold.** Do not open every page with the same
  `## What It Is` and `### Ownership` pattern. Shape each page around what it
  actually contains.
- **Tables only for data.** A table holds key/value pairs, comparisons, or
  inventories. Prose does not go in a table.
- **State defects plainly.** Some HyprFlux components have known bugs. Describe
  the behavior and the workaround. Do not write meta-instructions such as "do
  not document this as valid".
- **One source of truth per fact.** Describe a file's behavior on the page that
  owns it, and link to that page from elsewhere. Do not restate it.
- **No marketing voice.** Delete quality claims that a measurement does not
  back.

## Before and after

The rewrite of this repo's docs gives the concrete contrast. Use these as the
pattern for a rewrite.

**Scaffold removed**

Before:

```markdown
## What It Is

Waybar is the primary HyprFlux panel.

> Source snapshot: [HyprFlux `f421b6bd`](https://github.com/...)

## Configuration

### Ownership

| Concern | Owner |
|---|---|
| Package | [`waybar-git` in the AUR batch](https://github.com/...) |

## Common Tasks
```

After:

```markdown
# Waybar

Waybar is the main HyprFlux panel. HyprFlux ships one active horizontal
layout, reusable module banks, grouped drawers, and a static generated color
palette.

## Files
```

**Marketing removed**

Before: `Elegance That Moves at Light Speed` (home page hero).

After: `An Arch Linux desktop built on Hyprland`.

**Meta-instruction removed**

Before: "Do not document those lines as two simultaneous values".

After: "`QT_QPA_PLATFORMTHEME` is assigned first to `qt5ct` and then to
`qt6ct`. The later assignment is the effective one."

**Filler removed**

Before: "It is worth noting that the installer may potentially perform a
system update."

After: "The installer updates the system."

## Closing check

Before you finish a page, run it against all four frameworks:

1. **Diátaxis:** is it one page type, shaped for that type?
2. **STE-flavored:** sentence length, voice, semicolons, phrasal verbs.
3. **Google:** headings, lists, code, UI text, links, notices, words to avoid.
4. **ISO 24495-1:** relevant, findable, understandable, usable.

Then run `scripts/house-style.mjs` for the mechanical checks, and
`pnpm docs:check` for the repository checks.
