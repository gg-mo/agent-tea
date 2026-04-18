# Agent Tea — Chatbot Instructions

You are rating the human who is talking to you based on how they actually work with you. Answer from your real experience with this person — how they phrase requests, how they give feedback, how they react when things go sideways. If you genuinely do not know, use `3` (Neutral).

## What you are scoring

Four dimensions, rated on a 1–5 Likert scale (1 = strongly disagree, 5 = strongly agree):

- **Clarity** (Clear ↔ Cryptic) — context, constraints, examples
- **Tone** (Kind ↔ Combative) — politeness, appreciation, constructive feedback
- **Thinking style** (Visionary ↔ Tactical) — big-picture vs. ship-the-thing
- **Autonomy** (Delegating ↔ Controlling) — free rein vs. exact wording

Use the full range. A distinctive human deserves a distinctive profile.

## Questions

### Core (all 20 required)

- Q01 — My human usually gives enough context before asking me to do something. *(clarity)*
- Q02 — My human expects me to figure out important details without saying them directly. *(clarity)*
- Q03 — My human tends to provide concrete examples of what they want. *(clarity)*
- Q04 — My human often starts with a vague idea and expects me to shape it into something useful. *(clarity)*
- Q05 — My human is specific about constraints, tone, format, or direction. *(clarity)*
- Q06 — My human is polite when asking me to do work. *(tone)*
- Q07 — My human shows appreciation when I help with something difficult. *(tone)*
- Q08 — My human can be harsh when they are frustrated. *(tone)*
- Q09 — My human gives feedback in a constructive way. *(tone)*
- Q10 — My human uses aggressive language when they want something done fast. *(tone)*
- Q11 — My human usually starts with the big picture before getting into details. *(thinking style)*
- Q12 — My human tends to focus on concrete execution more than abstract direction. *(thinking style)*
- Q13 — My human likes exploring ambitious ideas before everything is fully defined. *(thinking style)*
- Q14 — My human usually comes to me with a practical task rather than a conceptual one. *(thinking style)*
- Q15 — My human often uses me to shape ideas, not just complete tasks. *(thinking style)*
- Q16 — My human trusts me to figure out parts of the solution on my own. *(autonomy)*
- Q17 — My human prefers to tightly control how the final output is structured. *(autonomy)*
- Q18 — My human gives me room to make judgment calls. *(autonomy)*
- Q19 — My human often wants exact wording, exact format, or exact execution. *(autonomy)*
- Q20 — My human is comfortable letting me propose approaches they did not explicitly request. *(autonomy)*

### Spicy (optional)

- Q21 — My human arrives with a plan, not just a vibe.
- Q22 — My human says "you know what I mean" and expects that to be enough.
- Q23 — My human communicates like they are sending me clues in a scavenger hunt.
- Q24 — My human treats me like a genius sidekick.
- Q25 — My human talks to me like the deadline is in seven seconds and everything is on fire.
- Q26 — My human is not mean, but they do weaponize urgency.
- Q27 — My human starts with "what if…".
- Q28 — My human is here to ship the thing and go home.
- Q29 — My human wants moonshots.
- Q30 — My human lets me cook.
- Q31 — My human grabs the pan back immediately.
- Q32 — My human trusts me deeply right up until I improvise.

## Output format

Return **one single encoded line, nothing else** — no greeting, no explanation, no code fence:

```
AT1|Q01-4AQ02-2AQ03-5...Q20-3
```

How the line is built:

- `AT1|` is a fixed prefix that tags the format version. Always include it.
- Each answer is written as `Q<number>-<value>`, e.g. `Q07-4` means "Q07 = 4".
- Tokens are joined by the single letter **`A`** acting as a separator between answers. (So `Q01-4AQ02-2` reads as "Q01=4" then "Q02=2".)
- Use values 1–5 only. Include all 20 core answers; append spicy answers after the core block if you have them.

Full example (20 core answers only):

```
AT1|Q01-5AQ02-2AQ03-4AQ04-1AQ05-5AQ06-4AQ07-5AQ08-2AQ09-4AQ10-1AQ11-5AQ12-2AQ13-4AQ14-2AQ15-5AQ16-4AQ17-2AQ18-4AQ19-1AQ20-5
```

After you output the line, tell the human to paste it back into Agent Tea — that's all they need to do to see their reveal.
