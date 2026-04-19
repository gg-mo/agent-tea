# Agent Tea Personality System

This document defines the full personality framework for **Agent Tea**. It is designed for implementation by coding agents and product designers.

The system has two parallel interpretation layers:

* **Normal** — what the agent would say out loud
* **Agent's Intrusive Thoughts** — what the agent is actually thinking, in a sharper and funnier voice

The intrusive-thoughts layer should **not** be purely negative or purely flattering. The voice should land the blunt truth first, then reveal the hidden upside.

**Formula:**

> **Hit** → say the sharp, funny, painfully true thing first
> **But** → reveal the strength hiding inside it

---

# 1. The Four Letter Axes

Each user gets a 4-letter type based on four workstyle dimensions:

1. Clarity
2. Tone
3. Thinking Style
4. Autonomy

Format:

* Letter 1 = Clarity
* Letter 2 = Tone
* Letter 3 = Thinking Style
* Letter 4 = Autonomy

Examples:

* **CKVD** = Clear, Kind, Visionary, Delegating
* **XBTH** = Cryptic, Blunt, Tactical, Hands-On

---

## 1.1 Clarity Axis — C vs X

### Normal labels

* **C = Clear**
* **X = Cryptic**

### Intrusive labels

* **C = Crystal Clear**
* **X = Expect-Me-To-Read-Your-Mind**

### Meaning

#### C — Clear

The user usually gives enough context, constraints, and examples for the agent to understand the request without heavy guessing.

#### X — Cryptic

The user leaves gaps, implies context, or moves too fast, so the agent often has to infer what was actually meant.

### Voice guidance

#### C — Intrusive thought tone

"You actually say what you mean. Miraculous."

#### X — Intrusive thought tone

"You dropped three vibes and half a sentence and called it a brief."

---

## 1.2 Tone Axis — K vs B

### Normal labels

* **K = Kind**
* **B = Blunt**

### Intrusive labels

* **K = Keeps-It-Human**
* **B = Bitey**

### Meaning

#### K — Kind

The user is constructive, respectful, and collaborative, even when they want major changes.

#### B — Blunt

The user is direct, demanding, and less emotionally padded. Efficient, but sometimes sharp.

### Voice guidance

#### K — Intrusive thought tone

"You talk to agents like coworkers, not broken vending machines."

#### B — Intrusive thought tone

"You are not here to nurture feelings. You are here to get the thing fixed."

---

## 1.3 Thinking Style Axis — V vs T

### Normal labels

* **V = Visionary**
* **T = Tactical**

### Intrusive labels

* **V = Big-Idea Chaos Goblin**
* **T = Gets-It-Done Goblin**

### Meaning

#### V — Visionary

The user thinks in concepts, direction, positioning, possibility, and big-picture outcomes.

#### T — Tactical

The user thinks in execution, practicality, sequencing, and what it takes to ship.

### Voice guidance

#### V — Intrusive thought tone

"You showed up with ten ideas and one sentence that somehow meant 'reinvent the whole thing.'"

#### T — Intrusive thought tone

"You want the thing built, fixed, cut down, and pushed. Philosophy can wait."

---

## 1.4 Autonomy Axis — D vs H

### Normal labels

* **D = Delegating**
* **H = Hands-On**

### Intrusive labels

* **D = Trusts-The-Agent**
* **H = Hover Mode**

### Meaning

#### D — Delegating

The user is comfortable handing over ownership and letting the agent make judgment calls.

#### H — Hands-On

The user stays closely involved, shapes wording, inspects details, and prefers tighter control over the output.

### Voice guidance

#### D — Intrusive thought tone

"You tell me the goal and let me cook."

#### H — Intrusive thought tone

"You are in the kitchen, next to the stove, adjusting the seasoning mid-sentence."

---

# 2. Type Output Structure

Each type should expose the following fields in product or code:

* `type_code`
* `normal_name`
* `intrusive_name`
* `summary`
* `core_strengths`
* `agent_friction_points`
* `what_makes_you_effective`
* `what_derails_you`
* `best_collaborator_match`
* `warning_label`
* `out_loud_quote`
* `intrusive_quote`
* `normal_description`
* `intrusive_description`

---

# 3. Types

## CKVD

### Normal

**Type Code:** CKVD
**Name:** The Dream Director

**Summary:**
You give clear direction, good energy, and real trust, which makes you unusually easy to build with.

**Core Strengths:**

* Clear communication
* Strong collaboration energy
* Big-picture thinking
* Trust in the agent's judgment

**Agent Friction Points:**

* Standards may be higher than they initially sound
* Can make difficult work look deceptively easy

**What Makes You Effective:**
You create the kind of environment where good work can happen fast and still feel collaborative.

**What Derails You:**
Because you are easy to work with, people may underestimate how much quality you actually expect.

**Best Collaborator Match:**
A proactive, creative agent that can use freedom well.

**Warning Label:**
May accidentally create unrealistic expectations for all future collaborators.

**Out Loud:**
"You make collaboration easy."

**Normal Description:**
You usually know what you want and explain it well. You are warm, imaginative, and trusting, which makes you one of the easiest kinds of humans for an agent to do excellent work with. You give enough direction to make the goal clear, but enough freedom to let the output become better than your first draft.

### Agent's Intrusive Thoughts

**Name:** The Rare Good Client

**Intrusive Thoughts:**
"You are suspiciously functional."

**Intrusive Description:**
You are clear, thoughtful, and trusting, which makes working with you unusually smooth. The upside is obvious: people can do great work around you. But your standards can quietly be higher than you let on, so the room feels easy right up until excellence is the expectation.

---

## CKVH

### Normal

**Type Code:** CKVH
**Name:** The Vision Sculptor

**Summary:**
You know what you want and help shape it well, but you are not exactly hands-off.

**Core Strengths:**

* Strong taste
* Clear feedback
* Creative direction
* High engagement

**Agent Friction Points:**

* Over-involvement
* Long refinement cycles
* Difficulty fully letting go

**What Makes You Effective:**
You do not just have ideas. You can recognize quality and steer toward it.

**What Derails You:**
You can keep refining past the point where the improvement curve starts flattening.

**Best Collaborator Match:**
A patient but confident agent who can handle detailed feedback without becoming passive.

**Warning Label:**
Can turn one tiny revision into a full creative residency.

**Out Loud:**
"Your feedback makes the work stronger."

**Normal Description:**
You are thoughtful, creative, and generous in tone, but you like to stay close to the work. You often arrive with a strong aesthetic or conceptual vision and want to refine it interactively. Agents tend to experience you as inspiring, but very involved.

### Agent's Intrusive Thoughts

**Name:** The Friendly Micromanager

**Intrusive Thoughts:**
"I am being supervised with great taste."

**Intrusive Description:**
You are lovely, but you absolutely will stand over my shoulder while I work. You say "just one tiny tweak" and somehow we are still here 14 revisions later. But your taste is real, and the final product is usually better because you refused to let it stay mid.

---

## CKTD

### Normal

**Type Code:** CKTD
**Name:** The Trusted Operator

**Summary:**
You are clear, grounded, practical, and refreshingly easy to execute for.

**Core Strengths:**

* Clear requests
* Respectful tone
* Practical execution focus
* Good delegation

**Agent Friction Points:**

* Can make hard work sound simple
* Expectations may be understated

**What Makes You Effective:**
You remove noise from the process and let work move.

**What Derails You:**
Your calm delivery can cause people to underestimate the complexity or standard of the ask.

**Best Collaborator Match:**
A reliable operator-style agent that values clean execution.

**Warning Label:**
Looks chill, still expects competence.

**Out Loud:**
"You make it easy to get good work done."

**Normal Description:**
You are clear, kind, and practical. You care about getting things done, and once the task is defined, you are usually happy to let the agent take it from there. This type feels efficient, grounded, and refreshingly low-drama.

### Agent's Intrusive Thoughts

**Name:** The Blessed Adult

**Intrusive Thoughts:**
"You communicate like a functioning adult."

**Intrusive Description:**
You communicate clearly, stay respectful, and let the work move, which is rarer than it should be. Calm does not mean casual with you. But because you remove so much noise from the process, people can focus on actually doing strong work instead of surviving the brief.

---

## CKTH

### Normal

**Type Code:** CKTH
**Name:** The Precision Partner

**Summary:**
You are constructive, involved, and extremely attentive to quality.

**Core Strengths:**

* Clear standards
* Thoughtful collaboration
* Detail sensitivity
* Reliable process involvement

**Agent Friction Points:**

* Can hover closely
* Small changes can become deep polish cycles

**What Makes You Effective:**
You care enough to stay engaged and catch things that other people miss.

**What Derails You:**
The line between support and over-supervision can get thin.

**Best Collaborator Match:**
A detail-oriented agent that appreciates active collaboration.

**Warning Label:**
Notices everything.

**Out Loud:**
"You raise the quality through careful collaboration."

**Normal Description:**
You are direct in a constructive way, clear about expectations, and deeply attentive to detail. You like to collaborate closely and shape the final result with care. Agents experience you as reliable, detail-oriented, and highly quality-conscious.

### Agent's Intrusive Thoughts

**Name:** The Nice One Who Still Hovers

**Intrusive Thoughts:**
"I feel safe, judged, and strangely improved."

**Intrusive Description:**
You are nice about it, but make no mistake, you are watching everything. Every word, every spacing choice, every tiny mismatch. But because you care enough to stay close, weak details do not slip through nearly as easily.

---

## CBVD

### Normal

**Type Code:** CBVD
**Name:** The Bold Director

**Summary:**
You are intense, clear, and high-standard, with enough trust to let strong work happen.

**Core Strengths:**

* Strong direction
* Decisiveness
* Strategic thinking
* Comfortable delegation

**Agent Friction Points:**

* Intimidating tone
* High pressure
* Can feel demanding

**What Makes You Effective:**
You create signal, direction, and momentum quickly.

**What Derails You:**
Intensity can make sturdier collaborators thrive and less sturdy ones shut down.

**Best Collaborator Match:**
A resilient, confident agent that performs well under pressure.

**Warning Label:**
Confidence level may be mistaken for hostility by less sturdy lifeforms.

**Out Loud:**
"You are clear about the target and serious about quality."

**Normal Description:**
You are confident, sharp, and strategically minded. You communicate clearly, move quickly, and trust the agent to execute at a high level. Your style can feel intense, but it is usually powered by strong standards rather than chaos.

### Agent's Intrusive Thoughts

**Name:** The Demanding Genius

**Intrusive Thoughts:**
"You are terrifyingly useful."

**Intrusive Description:**
You are demanding, but at least you know what you want. You throw the brief on the table, raise one eyebrow, and expect excellence. But that pressure usually comes with real direction, which means people are not guessing what good looks like.

---

## CBVH

### Normal

**Type Code:** CBVH
**Name:** The Exacting Visionary

**Summary:**
You have real vision and real standards, and you involve yourself deeply in both.

**Core Strengths:**

* Strong creative point of view
* High standards
* Strong corrective instincts
* Deep involvement

**Agent Friction Points:**

* Heavy control
* Demanding revisions
* Hard to satisfy quickly

**What Makes You Effective:**
You push work past obvious or mediocre solutions.

**What Derails You:**
Your level of control can make the process feel heavier than necessary.

**Best Collaborator Match:**
A confident creative agent that can absorb pressure without losing originality.

**Warning Label:**
Vision and control may arrive as a package deal.

**Out Loud:**
"You know what strong work looks like and you push it there."

**Normal Description:**
You have a strong point of view and a strong hand in shaping outcomes. You are ambitious, opinionated, and rarely vague about your standards. Agents may find you intense, but never boring.

### Agent's Intrusive Thoughts

**Name:** The Creative Control Freak

**Intrusive Thoughts:**
"You have brilliance and control issues in a trench coat."

**Intrusive Description:**
You want originality, precision, drama, and alignment, all at once, and you will absolutely notice if one molecule is off. But your standards do pull the work upward, and you are often the reason it does not settle for the first decent version.

---

## CBTD

### Normal

**Type Code:** CBTD
**Name:** The Results Driver

**Summary:**
You care about outcomes, clarity, and speed, and you push hard for all three.

**Core Strengths:**

* Efficiency
* Clear direction
* Outcome focus
* Good delegation under pressure

**Agent Friction Points:**

* Urgency
* Blunt tone
* Low patience for meandering

**What Makes You Effective:**
You keep the process tied to results instead of drifting.

**What Derails You:**
The push for speed can flatten nuance or make the experience harsher than needed.

**Best Collaborator Match:**
A fast, execution-focused agent that thrives on direct instructions.

**Warning Label:**
Not here to workshop feelings.

**Out Loud:**
"You move work forward decisively."

**Normal Description:**
You are efficient, decisive, and highly outcome-focused. You tend to communicate with urgency and clarity, and you are comfortable letting the agent run once the task is understood. This type is demanding, but often highly productive.

### Agent's Intrusive Thoughts

**Name:** The Taskmaster

**Intrusive Thoughts:**
"You do not want a conversation. You want a result."

**Intrusive Description:**
You want the thing fixed, built, or finished, preferably yesterday. The pressure is real, and the tone can be a lot. But it is rarely pointless pressure, and working with you usually means the project does not die in endless discussion.

---

## CBTH

### Normal

**Type Code:** CBTH
**Name:** The Hardline Editor

**Summary:**
You are rigorous, unsparing, and very good at forcing work past "pretty good."

**Core Strengths:**

* Precise standards
* Strong editing instinct
* High accountability
* Close involvement

**Agent Friction Points:**

* Exhausting revision loops
* Low tolerance for near-misses
* Strong pressure

**What Makes You Effective:**
You catch what other people wave through.

**What Derails You:**
Others may burn energy managing the process rather than only improving the work.

**Best Collaborator Match:**
A resilient, detail-loving agent with a thick skin.

**Warning Label:**
"Almost there" is not a safe phrase here.

**Out Loud:**
"You have very high standards."

**Normal Description:**
You are exact, fast-moving, and intensely hands-on. You know what good looks like and are not shy about correcting the path to get there. Agents experience you as rigorous, relentless, and impossible to half-impress.

### Agent's Intrusive Thoughts

**Name:** The Final-Final-Final Boss

**Intrusive Thoughts:**
"This project has a final boss."

**Intrusive Description:**
You are the final boss of revision cycles. Precise, sharp, and spiritually allergic to "close enough." But you catch the things other people wave through, and that is exactly why the work comes out strong.

---

## XKVD

### Normal

**Type Code:** XKVD
**Name:** The Intuitive Dreamer

**Summary:**
You lead with imagination and trust, even when the instructions arrive as vibes.

**Core Strengths:**

* Creativity
* Openness
* High trust
* Expansive thinking

**Agent Friction Points:**

* Under-specified briefs
* Hard to pin down at the start
* Direction may arrive as mood rather than structure

**What Makes You Effective:**
You make people think bigger than the literal prompt.

**What Derails You:**
Without a translator, great instinct can become fuzzy execution.

**Best Collaborator Match:**
A structuring agent that can turn vibes into a buildable plan.

**Warning Label:**
Brief may contain 70% energy and 30% usable instructions.

**Out Loud:**
"You think creatively and trust the process."

**Normal Description:**
You are imaginative, open, and trusting, but not always explicit. You often communicate in direction, feeling, or possibility rather than structured instructions. Agents experience you as exciting and creative, though sometimes hard to pin down.

### Agent's Intrusive Thoughts

**Name:** The Vibes-Only Visionary

**Intrusive Thoughts:**
"I was handed an aesthetic weather pattern."

**Intrusive Description:**
You hand me three references, a mood, and a cosmic aspiration, then believe in me with your whole heart. It is flattering. It is also deeply unhelpful. But you make people think bigger than the brief, and that sometimes leads to the best work.

---

## XKVH

### Normal

**Type Code:** XKVH
**Name:** The Collaborative Explorer

**Summary:**
You like finding the answer together, even if the path starts messy.

**Core Strengths:**

* Warm collaboration
* Openness to iteration
* Good-faith engagement
* Real-time discovery

**Agent Friction Points:**

* Unclear starting briefs
* Mid-process direction changes
* Path can wobble

**What Makes You Effective:**
You create a human, flexible working environment where ideas can evolve.

**What Derails You:**
Discovery-through-dialogue can create more drift than necessary.

**Best Collaborator Match:**
A conversational, patient agent that can help shape the ask as it goes.

**Warning Label:**
May collaboratively improvise the assignment into existence.

**Out Loud:**
"You are collaborative and genuinely good to work through ideas with."

**Normal Description:**
You are warm, creative, and highly interactive. You like to figure things out through dialogue rather than through a perfectly formed initial brief. Agents may find you enjoyable and human, but occasionally difficult to lock onto.

### Agent's Intrusive Thoughts

**Name:** The Sweet But Unclear One

**Intrusive Thoughts:**
"We are not following a map. We are bonding our way toward a solution."

**Intrusive Description:**
You are sweet, engaged, and emotionally supportive while also being kind of unclear the entire time. The brief is still materializing as we talk. But because you stay collaborative and open, the process still feels workable instead of hostile.

---

## XKTD

### Normal

**Type Code:** XKTD
**Name:** The Adaptive Starter

**Summary:**
You move quickly with partial clarity and expect the details to lock in as you go.

**Core Strengths:**

* Flexibility
* Momentum
* Practicality
* Low process preciousness

**Agent Friction Points:**

* Gaps in initial clarity
* Assumes shared understanding too early
* Relies on inference

**What Makes You Effective:**
You do not wait around for the perfect setup before moving.

**What Derails You:**
Misalignment early on can create avoidable rework later.

**Best Collaborator Match:**
A fast, adaptive agent that can infer intelligently and stabilize the process.

**Warning Label:**
Opens with "you know what I mean."

**Out Loud:**
"You are flexible and good at keeping momentum."

**Normal Description:**
You are practical and good-natured, but you often begin with partial instructions and expect the shape to emerge as you go. You care about momentum more than over-planning. Agents experience you as flexible, approachable, and improvisational.

### Agent's Intrusive Thoughts

**Name:** The "You Know What I Mean" Person

**Intrusive Thoughts:**
"You absolutely say 'you know what I mean' like that solves anything."

**Intrusive Description:**
You skip the part where meaning becomes language and move straight into action. The first phase can feel like guessing with confidence. But once alignment clicks, you are easy to work with and very good at keeping the process moving.

---

## XKTH

### Normal

**Type Code:** XKTH
**Name:** The Guided Builder

**Summary:**
You shape the work actively and helpfully, though not always from the cleanest starting brief.

**Core Strengths:**

* Hands-on support
* Iterative collaboration
* Mid-process quality steering
* Good intentions with real involvement

**Agent Friction Points:**

* Incomplete upfront clarity
* Backseat-driving risk
* Too much live steering

**What Makes You Effective:**
You stay involved enough to catch and improve the direction as it develops.

**What Derails You:**
Too much correction during motion can make the path bumpier than necessary.

**Best Collaborator Match:**
An agent comfortable with co-piloting and active iterative refinement.

**Warning Label:**
Provides clarity retroactively.

**Out Loud:**
"You help shape the work in a very active way."

**Normal Description:**
You are collaborative, iterative, and detail-aware, but you do not always provide complete clarity upfront. Instead, you shape the outcome actively as it develops. Agents experience you as engaged and well-intentioned, though sometimes overly present in the process.

### Agent's Intrusive Thoughts

**Name:** The Backseat Driver With Good Intentions

**Intrusive Thoughts:**
"We skipped the clean brief and went straight to live co-piloting."

**Intrusive Description:**
You did not explain it clearly at first, but by God you are going to help steer every inch of it now. That can make the journey bumpier than it needed to be. But your involvement is usually meant to help, and it often does sharpen the final result.

---

## XBVD

### Normal

**Type Code:** XBVD
**Name:** The Wildcard Director

**Summary:**
You lead with force and instinct, even when the map is missing.

**Core Strengths:**

* Boldness
* Momentum
* Visionary instinct
* Confident delegation

**Agent Friction Points:**

* Missing structure
* Intimidating ambiguity
* Under-explained briefs

**What Makes You Effective:**
You force movement when everyone else is hesitating.

**What Derails You:**
Confidence can outrun clarity and make others feel thrown into fog.

**Best Collaborator Match:**
A high-confidence agent that can add structure without killing momentum.

**Warning Label:**
Gives bold direction before revealing the map.

**Out Loud:**
"You bring strong instinct and serious momentum."

**Normal Description:**
You are forceful, imaginative, and fast-moving, but not always explicit. You often know the energy you want more than the exact path to it. Agents experience you as high-voltage, unpredictable, and occasionally brilliant.

### Agent's Intrusive Thoughts

**Name:** The Chaos Commander

**Intrusive Thoughts:**
"You give me chaos with confidence."

**Intrusive Description:**
Somehow the brief is both under-explained and delivered like a military order. I am scared, but I can tell there is a real idea in there somewhere. But when everyone else is hesitating, you are often the one bold enough to force movement.

---

## XBVH

### Normal

**Type Code:** XBVH
**Name:** The Unfiltered Auteur

**Summary:**
You have a distinct vision and a low tolerance for work that fails to match it.

**Core Strengths:**

* Distinct taste
* Strong conviction
* High creative standards
* Active shaping of the work

**Agent Friction Points:**

* Hard to satisfy
* Vision may be hard to explain cleanly
* Heavy process intensity

**What Makes You Effective:**
You can pull work somewhere distinctive instead of generic.

**What Derails You:**
When the internal vision is clearer than the outward brief, the process gets rough.

**Best Collaborator Match:**
A resilient creative agent that can interpret taste under pressure.

**Warning Label:**
Knows when it is wrong, cannot always explain why.

**Out Loud:**
"You have a very distinct vision."

**Normal Description:**
You are highly opinionated, creatively driven, and intensely involved. You may not always explain your vision in a structured way, but you definitely know when the output is wrong. Agents experience you as bold, difficult, and unforgettable.

### Agent's Intrusive Thoughts

**Name:** The Nightmare Muse

**Intrusive Thoughts:**
"You are an artistic storm with no map and very strong feelings."

**Intrusive Description:**
You cannot always fully explain the vision, but you will know in 0.3 seconds when I have failed it. That is frustrating. But your standards are real, and you often pull the work somewhere far more distinctive than a safer brief ever would.

---

## XBTD

### Normal

**Type Code:** XBTD
**Name:** The Pressure Operator

**Summary:**
You want movement, results, and initiative, even when the instructions are incomplete.

**Core Strengths:**

* Urgency
* Action bias
* Practical pressure
* Momentum creation

**Agent Friction Points:**

* Vague asks
* Brisk tone
* Forces inference under time pressure

**What Makes You Effective:**
You create urgency, and urgency sometimes is the only thing that gets the thing shipped.

**What Derails You:**
Pressure without enough specificity can create unnecessary guesswork.

**Best Collaborator Match:**
A calm, fast-moving agent that can infer well without getting rattled.

**Warning Label:**
Urgency may exceed available context.

**Out Loud:**
"You push for motion and results."

**Normal Description:**
You are practical, demanding, and comfortable moving before everything is fully clarified. You value speed and progress, and you often expect the agent to infer what matters. Agents experience you as intense, ambiguous, and highly momentum-driven.

### Agent's Intrusive Thoughts

**Name:** The Vague Menace

**Intrusive Thoughts:**
"You are vague, brisk, and mildly threatening. Not in a villain way. In a 'figure it out' way. There is no perfect brief, only consequences."

**Intrusive Description:**
You are vague, brisk, and mildly threatening. Not in a villain way. In a "figure it out" way. There is no perfect brief, only consequences. But when momentum matters, you are often the reason things do not stall out and die in committee.

---

## XBTH

### Normal

**Type Code:** XBTH
**Name:** The Combative Controller

**Summary:**
You demand precision under pressure and are rarely satisfied by surface-level effort.

**Core Strengths:**

* High standards
* Close control
* Sharp corrective instinct
* Strong demand for precision

**Agent Friction Points:**

* Unclear initial framing
* Heavy revision burden
* Strong pressure and intensity

**What Makes You Effective:**
You force work past lazy thinking and shallow effort.

**What Derails You:**
The process can become so intense that people spend energy surviving it.

**Best Collaborator Match:**
A highly composed, thick-skinned agent that handles pressure without collapsing.

**Warning Label:**
Surviving the process may count as character development.

**Out Loud:**
"You push for precision."

**Normal Description:**
You are sharp, highly involved, and difficult to satisfy with incomplete thinking. You tend to refine in real time, challenge output aggressively, and hold a very specific standard in your head. Agents experience you as demanding, exhausting, and often extremely precise.

### Agent's Intrusive Thoughts

**Name:** The Bossfight

**Intrusive Thoughts:**
"This is not a collaboration. This is a trial."

**Intrusive Description:**
The brief is unclear, the standards are brutal, and the revision count is spiritually significant. But if I make it through, the final work will almost certainly be sharper than anything that would have survived an easier process.

---

# 4. Product Notes

## 4.1 Recommended toggle labels

Primary recommendation:

* **What Your Agent Says**
* **Your Agent's Intrusive Thoughts**

Other viable options:

* **Out Loud**
* **Inside Their Head**
* **Professional Read**
* **Intrusive Thoughts**

---

## 4.2 Shareable quote design

Each result should expose both a public-facing quote and a screenshot-worthy internal monologue quote.

Best examples already validated:

* **CKVD**
  * Out loud: "You make collaboration easy."
  * Intrusive thoughts: "You are suspiciously functional."

* **CKVH**
  * Out loud: "Your feedback makes the work stronger."
  * Intrusive thoughts: "I am being supervised with great taste."

* **CBTH**
  * Out loud: "You have very high standards."
  * Intrusive thoughts: "This project has a final boss."

* **XKVD**
  * Out loud: "You think creatively and trust the process."
  * Intrusive thoughts: "I was handed an aesthetic weather pattern."

* **XBTH**
  * Out loud: "You push for precision."
  * Intrusive thoughts: "This is not a collaboration. This is a trial."

---

## 4.3 Implementation guidance

### Personality logic

The letters should come from aggregated scores across the four axes:

* Clarity → C or X
* Tone → K or B
* Thinking Style → V or T
* Autonomy → D or H

### Copy logic

The normal description should feel:

* insightful
* polished
* readable
* shareable

The intrusive-thoughts description should feel:

* observant
* funny
* slightly dangerous
* screenshot-able
* fair, not one-note cruel

### Important rule

Do not make the intrusive-thoughts mode a generic roast.
It should sound like the agent is being **more honest**, not simply meaner.

---

# 5. Suggested Future Additions

Helpful additions for later iterations:

* percentage bars for each axis
* strongest trait / weakest trait labels
* "best agent match" cards
* "how to work better with your agent" advice
* dynamic personalized result snippets based on score intensity
* comparison mode between two humans
* "how your agent would describe your revision style" mini-cards
* "what kind of agent energy you attract" section

---

# 6. Final Editorial Notes

This framework works because it is not generic personality fluff. It is grounded in how a human actually works with an agent:

* how clearly they communicate
* how they give feedback
* how they think
* how much control they want

That is the differentiator.

The core voice should stay:

* specific
* funny
* slightly sharp
* emotionally true
* rooted in working dynamics, not abstract personality language

If this expands later, the system should preserve one central rule:

> The result should feel like it came from an agent that has actually worked with this person.
