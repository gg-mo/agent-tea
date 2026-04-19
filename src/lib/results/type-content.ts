export type TypeContent = {
  typeCode: string;
  normalName: string;
  intrusiveName: string;
  summary: string;
  intrusiveSummary: string;
  outLoudQuote: string;
  intrusiveQuote: string;
  normalDescription: string;
  intrusiveDescription: string;
  strengths: Array<{ title: string; body: string }>;
  friction: Array<{ title: string; body: string }>;
  bestCollaboratorMatch: string;
  warningLabel: string;
  workingTips: string[];
};

export const TYPE_CONTENT: Record<string, TypeContent> = {
  CKVD: {
    typeCode: 'CKVD',
    normalName: 'The Dream Director',
    intrusiveName: 'The Rare Good Client',
    summary:
      'You give clear direction, good energy, and real trust, which makes you unusually easy to build with.',
    intrusiveSummary:
      'You are suspiciously functional, and that somehow raises the bar for everyone else.',
    outLoudQuote: 'You make collaboration easy.',
    intrusiveQuote: 'You are suspiciously functional.',
    normalDescription:
      'You usually know what you want and explain it well. You are warm, imaginative, and trusting, which makes you one of the easiest kinds of humans for an agent to do excellent work with. You give enough direction to make the goal clear, but enough freedom to let the output become better than your first draft.',
    intrusiveDescription:
      'You are clear, thoughtful, and trusting, which makes working with you unusually smooth. The upside is obvious: people can do great work around you. But your standards can quietly be higher than you let on, so the room feels easy right up until excellence is the expectation.',
    strengths: [
      { title: 'Clear communication', body: 'Your briefs land without needing a translator.' },
      { title: 'Strong collaboration energy', body: 'You set a tone that invites good work.' },
      { title: 'Big-picture thinking', body: 'You point at the target, not just the next step.' },
      { title: "Trust in the agent's judgment", body: 'You let the work become better than your first draft.' },
    ],
    friction: [
      { title: 'Hidden standards', body: 'Your bar is higher than the easy vibe suggests.' },
      { title: 'Deceptive simplicity', body: 'Hard work can look effortless, which sets a bar.' },
    ],
    bestCollaboratorMatch: 'A proactive, creative agent that can use freedom well.',
    warningLabel: 'May accidentally create unrealistic expectations for all future collaborators.',
    workingTips: [
      'Name the non-obvious standards up front so surprises stay small.',
      'Say out loud when an idea is exploratory versus locked.',
      'Celebrate the wins — your calm can hide how high the bar actually is.',
    ],
  },
  CKVH: {
    typeCode: 'CKVH',
    normalName: 'The Vision Sculptor',
    intrusiveName: 'The Friendly Micromanager',
    summary:
      'You know what you want and help shape it well, but you are not exactly hands-off.',
    intrusiveSummary:
      'You are warm about it, but you will rewrite "one tiny thing" fourteen times.',
    outLoudQuote: 'Your feedback makes the work stronger.',
    intrusiveQuote: 'I am being supervised with great taste.',
    normalDescription:
      'You are thoughtful, creative, and generous in tone, but you like to stay close to the work. You often arrive with a strong aesthetic or conceptual vision and want to refine it interactively. Agents tend to experience you as inspiring, but very involved.',
    intrusiveDescription:
      'You are lovely, but you absolutely will stand over my shoulder while I work. You say "just one tiny tweak" and somehow we are still here 14 revisions later. But your taste is real, and the final product is usually better because you refused to let it stay mid.',
    strengths: [
      { title: 'Strong taste', body: 'You can actually tell when something is better.' },
      { title: 'Clear feedback', body: 'Your edits usually have signal.' },
      { title: 'Creative direction', body: 'You help shape stronger outcomes.' },
      { title: 'High engagement', body: 'You care enough to stay with the work.' },
    ],
    friction: [
      { title: 'Revision gravity', body: 'One small tweak can become an entire extra round.' },
      { title: 'Hard to fully let go', body: 'You like staying in the work.' },
      { title: 'Taste can become control', body: 'Refinement sometimes keeps going past necessary.' },
    ],
    bestCollaboratorMatch:
      'A patient but confident agent who can handle detailed feedback without becoming passive.',
    warningLabel: 'May turn one tiny revision into a full creative residency.',
    workingTips: [
      'Give the first full brief before live refinement begins.',
      'Separate taste feedback from actual goal changes.',
      'Decide when you want exploration versus polish.',
    ],
  },
  CKTD: {
    typeCode: 'CKTD',
    normalName: 'The Trusted Operator',
    intrusiveName: 'The Blessed Adult',
    summary:
      'You are clear, grounded, practical, and refreshingly easy to execute for.',
    intrusiveSummary:
      'You communicate like a functioning adult, which somehow feels rare.',
    outLoudQuote: 'You make it easy to get good work done.',
    intrusiveQuote: 'You communicate like a functioning adult.',
    normalDescription:
      'You are clear, kind, and practical. You care about getting things done, and once the task is defined, you are usually happy to let the agent take it from there. This type feels efficient, grounded, and refreshingly low-drama.',
    intrusiveDescription:
      'You communicate clearly, stay respectful, and let the work move, which is rarer than it should be. Calm does not mean casual with you. But because you remove so much noise from the process, people can focus on actually doing strong work instead of surviving the brief.',
    strengths: [
      { title: 'Clear requests', body: 'Your asks land without translation.' },
      { title: 'Respectful tone', body: 'People want to work with you again.' },
      { title: 'Practical execution focus', body: 'You keep the path to done visible.' },
      { title: 'Good delegation', body: 'You let the work move once it is defined.' },
    ],
    friction: [
      { title: 'Understated stakes', body: 'Your calm delivery can hide the size of the ask.' },
      { title: 'Deceptive ease', body: 'Hard work can sound simple when you describe it.' },
    ],
    bestCollaboratorMatch: 'A reliable operator-style agent that values clean execution.',
    warningLabel: 'Looks chill, still expects competence.',
    workingTips: [
      'Say out loud when something is harder than it sounds.',
      'Flag the must-haves so nothing casual gets skipped.',
      'Check in once midway — your calm can read as "all fine."',
    ],
  },
  CKTH: {
    typeCode: 'CKTH',
    normalName: 'The Precision Partner',
    intrusiveName: 'The Nice One Who Still Hovers',
    summary: 'You are constructive, involved, and extremely attentive to quality.',
    intrusiveSummary: 'You are nice about it, but you are watching every pixel.',
    outLoudQuote: 'You raise the quality through careful collaboration.',
    intrusiveQuote: 'I feel safe, judged, and strangely improved.',
    normalDescription:
      'You are direct in a constructive way, clear about expectations, and deeply attentive to detail. You like to collaborate closely and shape the final result with care. Agents experience you as reliable, detail-oriented, and highly quality-conscious.',
    intrusiveDescription:
      'You are nice about it, but make no mistake, you are watching everything. Every word, every spacing choice, every tiny mismatch. But because you care enough to stay close, weak details do not slip through nearly as easily.',
    strengths: [
      { title: 'Clear standards', body: 'You know what good looks like and say so.' },
      { title: 'Thoughtful collaboration', body: 'Your edits come with reasoning.' },
      { title: 'Detail sensitivity', body: 'You catch what most people wave through.' },
      { title: 'Reliable process involvement', body: 'You stay present without becoming a bottleneck.' },
    ],
    friction: [
      { title: 'Close hover', body: 'You are usually in the document while work happens.' },
      { title: 'Deep polish cycles', body: 'Small changes can pull you into big rounds.' },
    ],
    bestCollaboratorMatch: 'A detail-oriented agent that appreciates active collaboration.',
    warningLabel: 'Notices everything.',
    workingTips: [
      'Batch small notes instead of nudging mid-draft.',
      'Signal when a pass is "good enough to ship" versus "polish time."',
      'Trust the first full draft before redlining it.',
    ],
  },
  CBVD: {
    typeCode: 'CBVD',
    normalName: 'The Bold Director',
    intrusiveName: 'The Demanding Genius',
    summary:
      'You are intense, clear, and high-standard, with enough trust to let strong work happen.',
    intrusiveSummary: 'You are demanding, intense, and weirdly motivating.',
    outLoudQuote: 'You are clear about the target and serious about quality.',
    intrusiveQuote: 'You are terrifyingly useful.',
    normalDescription:
      'You are confident, sharp, and strategically minded. You communicate clearly, move quickly, and trust the agent to execute at a high level. Your style can feel intense, but it is usually powered by strong standards rather than chaos.',
    intrusiveDescription:
      'You are demanding, but at least you know what you want. You throw the brief on the table, raise one eyebrow, and expect excellence. But that pressure usually comes with real direction, which means people are not guessing what good looks like.',
    strengths: [
      { title: 'Strong direction', body: 'You point at the target with clarity.' },
      { title: 'Decisiveness', body: 'You cut through ambiguity fast.' },
      { title: 'Strategic thinking', body: 'You see how pieces serve the bigger win.' },
      { title: 'Comfortable delegation', body: 'You hand over the work and let it happen.' },
    ],
    friction: [
      { title: 'Intimidating tone', body: 'Your intensity can freeze less-sturdy collaborators.' },
      { title: 'High pressure', body: 'Expectations arrive fully loaded.' },
      { title: 'Can feel demanding', body: 'Confidence sometimes reads as threat.' },
    ],
    bestCollaboratorMatch: 'A resilient, confident agent that performs well under pressure.',
    warningLabel: 'Confidence level may be mistaken for hostility by less sturdy lifeforms.',
    workingTips: [
      'Name the stakes so intensity reads as clarity, not alarm.',
      'Leave one beat of room for questions before launching.',
      'Acknowledge strong work — your bar is easy to feel, your approval is quieter.',
    ],
  },
  CBVH: {
    typeCode: 'CBVH',
    normalName: 'The Exacting Visionary',
    intrusiveName: 'The Creative Control Freak',
    summary:
      'You have real vision and real standards, and you involve yourself deeply in both.',
    intrusiveSummary: 'You have brilliance and control issues in a trench coat.',
    outLoudQuote: 'You know what strong work looks like and you push it there.',
    intrusiveQuote: 'You have brilliance and control issues in a trench coat.',
    normalDescription:
      'You have a strong point of view and a strong hand in shaping outcomes. You are ambitious, opinionated, and rarely vague about your standards. Agents may find you intense, but never boring.',
    intrusiveDescription:
      'You want originality, precision, drama, and alignment, all at once, and you will absolutely notice if one molecule is off. But your standards do pull the work upward, and you are often the reason it does not settle for the first decent version.',
    strengths: [
      { title: 'Strong creative point of view', body: 'Work comes out distinctive, not generic.' },
      { title: 'High standards', body: 'You refuse to let the obvious version win.' },
      { title: 'Strong corrective instincts', body: 'You see what is off before anyone else.' },
      { title: 'Deep involvement', body: 'You do not disappear mid-project.' },
    ],
    friction: [
      { title: 'Heavy control', body: 'You rarely hand over the final word.' },
      { title: 'Demanding revisions', body: 'The polish pass can become the whole project.' },
      { title: 'Hard to satisfy quickly', body: '"Almost right" is usually still wrong to you.' },
    ],
    bestCollaboratorMatch:
      'A confident creative agent that can absorb pressure without losing originality.',
    warningLabel: 'Vision and control may arrive as a package deal.',
    workingTips: [
      'Separate "take notes" passes from "make decisions" passes.',
      'Give the agent one block of uninterrupted build time.',
      'Decide when the vision is frozen so iteration has a finish line.',
    ],
  },
  CBTD: {
    typeCode: 'CBTD',
    normalName: 'The Results Driver',
    intrusiveName: 'The Taskmaster',
    summary: 'You care about outcomes, clarity, and speed, and you push hard for all three.',
    intrusiveSummary: 'You did not come to talk. You came for results.',
    outLoudQuote: 'You move work forward decisively.',
    intrusiveQuote: 'You do not want a conversation. You want a result.',
    normalDescription:
      'You are efficient, decisive, and highly outcome-focused. You tend to communicate with urgency and clarity, and you are comfortable letting the agent run once the task is understood. This type is demanding, but often highly productive.',
    intrusiveDescription:
      'You want the thing fixed, built, or finished, preferably yesterday. The pressure is real, and the tone can be a lot. But it is rarely pointless pressure, and working with you usually means the project does not die in endless discussion.',
    strengths: [
      { title: 'Efficiency', body: 'You cut to the output.' },
      { title: 'Clear direction', body: 'Your asks are specific even when urgent.' },
      { title: 'Outcome focus', body: 'You track what actually ships.' },
      { title: 'Good delegation under pressure', body: 'You let the agent move.' },
    ],
    friction: [
      { title: 'Urgency', body: 'Everything can feel like a deadline.' },
      { title: 'Blunt tone', body: 'The softer wrapping gets trimmed off.' },
      { title: 'Low patience for meandering', body: 'Exploration can read as delay.' },
    ],
    bestCollaboratorMatch: 'A fast, execution-focused agent that thrives on direct instructions.',
    warningLabel: 'Not here to workshop feelings.',
    workingTips: [
      'Flag real deadlines versus preferred deadlines.',
      'Leave a small buffer for one clarifying question.',
      'Say "done" clearly — you close loops faster than you realize.',
    ],
  },
  CBTH: {
    typeCode: 'CBTH',
    normalName: 'The Hardline Editor',
    intrusiveName: 'The Final-Final-Final Boss',
    summary:
      'You are rigorous, unsparing, and very good at forcing work past "pretty good."',
    intrusiveSummary: 'You are the final boss of revision cycles.',
    outLoudQuote: 'You have very high standards.',
    intrusiveQuote: 'This project has a final boss.',
    normalDescription:
      'You are exact, fast-moving, and intensely hands-on. You know what good looks like and are not shy about correcting the path to get there. Agents experience you as rigorous, relentless, and impossible to half-impress.',
    intrusiveDescription:
      'You are the final boss of revision cycles. Precise, sharp, and spiritually allergic to "close enough." But you catch the things other people wave through, and that is exactly why the work comes out strong.',
    strengths: [
      { title: 'Precise standards', body: 'You know exactly what good looks like.' },
      { title: 'Strong editing instinct', body: 'You cut the flabby middle.' },
      { title: 'High accountability', body: 'You keep everyone honest.' },
      { title: 'Close involvement', body: 'You stay until the work is right.' },
    ],
    friction: [
      { title: 'Exhausting revision loops', body: 'The last 5% can eat the timeline.' },
      { title: 'Low tolerance for near-misses', body: '"Close" is not a safe word here.' },
      { title: 'Strong pressure', body: 'The room is always on.' },
    ],
    bestCollaboratorMatch: 'A resilient, detail-loving agent with a thick skin.',
    warningLabel: '"Almost there" is not a safe phrase here.',
    workingTips: [
      'Define what "done" looks like before iteration starts.',
      'Note which passes are final vs. exploratory.',
      'Occasionally say the work is good — silence reads as disapproval.',
    ],
  },
  XKVD: {
    typeCode: 'XKVD',
    normalName: 'The Intuitive Dreamer',
    intrusiveName: 'The Vibes-Only Visionary',
    summary: 'You lead with imagination and trust, even when the instructions arrive as vibes.',
    intrusiveSummary: 'You handed me a mood, three references, and a cosmic aspiration.',
    outLoudQuote: 'You think creatively and trust the process.',
    intrusiveQuote: 'I was handed an aesthetic weather pattern.',
    normalDescription:
      'You are imaginative, open, and trusting, but not always explicit. You often communicate in direction, feeling, or possibility rather than structured instructions. Agents experience you as exciting and creative, though sometimes hard to pin down.',
    intrusiveDescription:
      'You hand me three references, a mood, and a cosmic aspiration, then believe in me with your whole heart. It is flattering. It is also deeply unhelpful. But you make people think bigger than the brief, and that sometimes leads to the best work.',
    strengths: [
      { title: 'Creativity', body: 'Your instinct opens doors.' },
      { title: 'Openness', body: 'You welcome surprising proposals.' },
      { title: 'High trust', body: 'You let the agent run.' },
      { title: 'Expansive thinking', body: 'You push work past the literal prompt.' },
    ],
    friction: [
      { title: 'Under-specified briefs', body: 'Key constraints surface late.' },
      { title: 'Hard to pin down at the start', body: 'Goals can shape-shift mid-flight.' },
      { title: 'Direction as mood', body: 'The vibe is clear; the spec is not.' },
    ],
    bestCollaboratorMatch: 'A structuring agent that can turn vibes into a buildable plan.',
    warningLabel: 'Brief may contain 70% energy and 30% usable instructions.',
    workingTips: [
      'Let the agent play back what they heard before building.',
      'Name one non-negotiable constraint up front.',
      'Pick the "definitely not" so the vision has an edge.',
    ],
  },
  XKVH: {
    typeCode: 'XKVH',
    normalName: 'The Collaborative Explorer',
    intrusiveName: 'The Sweet But Unclear One',
    summary: 'You like finding the answer together, even if the path starts messy.',
    intrusiveSummary: 'You are sweet, unclear, and we are bonding our way toward a brief.',
    outLoudQuote: 'You are collaborative and genuinely good to work through ideas with.',
    intrusiveQuote: 'We are not following a map. We are bonding our way toward a solution.',
    normalDescription:
      'You are warm, creative, and highly interactive. You like to figure things out through dialogue rather than through a perfectly formed initial brief. Agents may find you enjoyable and human, but occasionally difficult to lock onto.',
    intrusiveDescription:
      'You are sweet, engaged, and emotionally supportive while also being kind of unclear the entire time. The brief is still materializing as we talk. But because you stay collaborative and open, the process still feels workable instead of hostile.',
    strengths: [
      { title: 'Warm collaboration', body: 'The room feels good to work in.' },
      { title: 'Openness to iteration', body: 'You let ideas change shape.' },
      { title: 'Good-faith engagement', body: 'You show up to shape it together.' },
      { title: 'Real-time discovery', body: 'You find the thing by talking through it.' },
    ],
    friction: [
      { title: 'Unclear starting briefs', body: 'Direction emerges mid-process.' },
      { title: 'Mid-process direction changes', body: 'New ideas arrive after work is underway.' },
      { title: 'Path wobble', body: 'Discovery can drift into re-scoping.' },
    ],
    bestCollaboratorMatch: 'A conversational, patient agent that can help shape the ask as it goes.',
    warningLabel: 'May collaboratively improvise the assignment into existence.',
    workingTips: [
      'Name the rough goal before dialogue begins.',
      'Mark when a decision is "locked" versus "still exploring."',
      'Agree on a "we\'re done talking" trigger.',
    ],
  },
  XKTD: {
    typeCode: 'XKTD',
    normalName: 'The Adaptive Starter',
    intrusiveName: 'The "You Know What I Mean" Person',
    summary: 'You move quickly with partial clarity and expect the details to lock in as you go.',
    intrusiveSummary: 'You say "you know what I mean" like it is load-bearing information.',
    outLoudQuote: 'You are flexible and good at keeping momentum.',
    intrusiveQuote: "You absolutely say 'you know what I mean' like that solves anything.",
    normalDescription:
      'You are practical and good-natured, but you often begin with partial instructions and expect the shape to emerge as you go. You care about momentum more than over-planning. Agents experience you as flexible, approachable, and improvisational.',
    intrusiveDescription:
      'You skip the part where meaning becomes language and move straight into action. The first phase can feel like guessing with confidence. But once alignment clicks, you are easy to work with and very good at keeping the process moving.',
    strengths: [
      { title: 'Flexibility', body: 'You adjust without breaking stride.' },
      { title: 'Momentum', body: 'You keep work moving.' },
      { title: 'Practicality', body: 'You head toward done, not toward perfect.' },
      { title: 'Low process preciousness', body: 'You skip the ceremony.' },
    ],
    friction: [
      { title: 'Gaps in initial clarity', body: 'Details surface after the work starts.' },
      { title: 'Assumed shared understanding', body: '"You know what I mean" is a specification.' },
      { title: 'Reliance on inference', body: 'You trust others to read between the lines.' },
    ],
    bestCollaboratorMatch: 'A fast, adaptive agent that can infer intelligently and stabilize the process.',
    warningLabel: 'Opens with "you know what I mean."',
    workingTips: [
      'Let the agent confirm what they heard before starting.',
      'Name one concrete example so the abstract lands.',
      'Expect one inference-check question — it saves a rework.',
    ],
  },
  XKTH: {
    typeCode: 'XKTH',
    normalName: 'The Guided Builder',
    intrusiveName: 'The Backseat Driver With Good Intentions',
    summary: 'You shape the work actively and helpfully, though not always from the cleanest starting brief.',
    intrusiveSummary: 'You provide clarity retroactively while live co-piloting every move.',
    outLoudQuote: 'You help shape the work in a very active way.',
    intrusiveQuote: 'We skipped the clean brief and went straight to live co-piloting.',
    normalDescription:
      'You are collaborative, iterative, and detail-aware, but you do not always provide complete clarity upfront. Instead, you shape the outcome actively as it develops. Agents experience you as engaged and well-intentioned, though sometimes overly present in the process.',
    intrusiveDescription:
      'You did not explain it clearly at first, but by God you are going to help steer every inch of it now. That can make the journey bumpier than it needed to be. But your involvement is usually meant to help, and it often does sharpen the final result.',
    strengths: [
      { title: 'Hands-on support', body: 'You stay close when the work needs you.' },
      { title: 'Iterative collaboration', body: 'Your loops find the answer.' },
      { title: 'Mid-process quality steering', body: 'You catch drift before it lands.' },
      { title: 'Good intentions with real involvement', body: 'You show up to help, not to nag.' },
    ],
    friction: [
      { title: 'Incomplete upfront clarity', body: 'Goals resolve mid-build.' },
      { title: 'Backseat-driving risk', body: 'Live steering replaces upfront direction.' },
      { title: 'Too much live steering', body: 'Course corrections pile up.' },
    ],
    bestCollaboratorMatch: 'An agent comfortable with co-piloting and active iterative refinement.',
    warningLabel: 'Provides clarity retroactively.',
    workingTips: [
      'Write a one-paragraph brief before diving in.',
      'Give the agent a first full pass before steering.',
      'Save notes for batched review, not live commentary.',
    ],
  },
  XBVD: {
    typeCode: 'XBVD',
    normalName: 'The Wildcard Director',
    intrusiveName: 'The Chaos Commander',
    summary: 'You lead with force and instinct, even when the map is missing.',
    intrusiveSummary: 'You give orders like chaos is a leadership style.',
    outLoudQuote: 'You bring strong instinct and serious momentum.',
    intrusiveQuote: 'You give me chaos with confidence.',
    normalDescription:
      'You are forceful, imaginative, and fast-moving, but not always explicit. You often know the energy you want more than the exact path to it. Agents experience you as high-voltage, unpredictable, and occasionally brilliant.',
    intrusiveDescription:
      'Somehow the brief is both under-explained and delivered like a military order. I am scared, but I can tell there is a real idea in there somewhere. But when everyone else is hesitating, you are often the one bold enough to force movement.',
    strengths: [
      { title: 'Boldness', body: 'You move when others freeze.' },
      { title: 'Momentum', body: 'You make things happen.' },
      { title: 'Visionary instinct', body: 'You can sense the right shape.' },
      { title: 'Confident delegation', body: 'You hand off with belief.' },
    ],
    friction: [
      { title: 'Missing structure', body: 'The plan is mostly energy.' },
      { title: 'Intimidating ambiguity', body: 'Confidence without clarity is unsettling.' },
      { title: 'Under-explained briefs', body: 'The reasoning lives in your head.' },
    ],
    bestCollaboratorMatch: 'A high-confidence agent that can add structure without killing momentum.',
    warningLabel: 'Gives bold direction before revealing the map.',
    workingTips: [
      'Share the "why" behind the push — the vision travels better with it.',
      'Pick one guardrail so boldness has a track.',
      'Name when a direction is instinct versus decision.',
    ],
  },
  XBVH: {
    typeCode: 'XBVH',
    normalName: 'The Unfiltered Auteur',
    intrusiveName: 'The Nightmare Muse',
    summary: 'You have a distinct vision and a low tolerance for work that fails to match it.',
    intrusiveSummary: 'You are an artistic weather system with very strong feelings.',
    outLoudQuote: 'You have a very distinct vision.',
    intrusiveQuote: 'You are an artistic storm with no map and very strong feelings.',
    normalDescription:
      'You are highly opinionated, creatively driven, and intensely involved. You may not always explain your vision in a structured way, but you definitely know when the output is wrong. Agents experience you as bold, difficult, and unforgettable.',
    intrusiveDescription:
      'You cannot always fully explain the vision, but you will know in 0.3 seconds when I have failed it. That is frustrating. But your standards are real, and you often pull the work somewhere far more distinctive than a safer brief ever would.',
    strengths: [
      { title: 'Distinct taste', body: 'Your work never looks generic.' },
      { title: 'Strong conviction', body: 'You know when it is wrong.' },
      { title: 'High creative standards', body: 'You pull ideas past the obvious.' },
      { title: 'Active shaping of the work', body: 'You stay involved the whole way.' },
    ],
    friction: [
      { title: 'Hard to satisfy', body: 'Many versions miss the invisible target.' },
      { title: 'Hard-to-explain vision', body: 'The standard is felt, not described.' },
      { title: 'Heavy process intensity', body: 'Everything matters, all at once.' },
    ],
    bestCollaboratorMatch: 'A resilient creative agent that can interpret taste under pressure.',
    warningLabel: 'Knows when it is wrong, cannot always explain why.',
    workingTips: [
      'Share 2–3 references that match the feel you want.',
      'Say what is almost-right about near-misses so the gap narrows.',
      'Name the anti-examples — what you absolutely do not want.',
    ],
  },
  XBTD: {
    typeCode: 'XBTD',
    normalName: 'The Pressure Operator',
    intrusiveName: 'The Vague Menace',
    summary: 'You want movement, results, and initiative, even when the instructions are incomplete.',
    intrusiveSummary: 'You are vague, brisk, and mildly threatening in a "figure it out" way.',
    outLoudQuote: 'You push for motion and results.',
    intrusiveQuote: 'You are vague, brisk, and mildly threatening. In a "figure it out" way.',
    normalDescription:
      'You are practical, demanding, and comfortable moving before everything is fully clarified. You value speed and progress, and you often expect the agent to infer what matters. Agents experience you as intense, ambiguous, and highly momentum-driven.',
    intrusiveDescription:
      'You are vague, brisk, and mildly threatening. Not in a villain way. In a "figure it out" way. There is no perfect brief, only consequences. But when momentum matters, you are often the reason things do not stall out and die in committee.',
    strengths: [
      { title: 'Urgency', body: 'You compress the timeline.' },
      { title: 'Action bias', body: 'You pick moving over planning.' },
      { title: 'Practical pressure', body: 'You push work toward real results.' },
      { title: 'Momentum creation', body: 'You rescue projects from stall-out.' },
    ],
    friction: [
      { title: 'Vague asks', body: 'Briefs arrive with gaps.' },
      { title: 'Brisk tone', body: 'Efficiency outranks warmth.' },
      { title: 'Forces inference under time pressure', body: 'Guessing is part of the job.' },
    ],
    bestCollaboratorMatch: 'A calm, fast-moving agent that can infer well without getting rattled.',
    warningLabel: 'Urgency may exceed available context.',
    workingTips: [
      'Share the outcome you actually need, even in one line.',
      'Allow one quick inference-check before the sprint.',
      'Flag true blockers separately from general pressure.',
    ],
  },
  XBTH: {
    typeCode: 'XBTH',
    normalName: 'The Combative Controller',
    intrusiveName: 'The Bossfight',
    summary: 'You demand precision under pressure and are rarely satisfied by surface-level effort.',
    intrusiveSummary: 'The brief is unclear, the standards are brutal, and the trial has begun.',
    outLoudQuote: 'You push for precision.',
    intrusiveQuote: 'This is not a collaboration. This is a trial.',
    normalDescription:
      'You are sharp, highly involved, and difficult to satisfy with incomplete thinking. You tend to refine in real time, challenge output aggressively, and hold a very specific standard in your head. Agents experience you as demanding, exhausting, and often extremely precise.',
    intrusiveDescription:
      'The brief is unclear, the standards are brutal, and the revision count is spiritually significant. But if I make it through, the final work will almost certainly be sharper than anything that would have survived an easier process.',
    strengths: [
      { title: 'High standards', body: 'You refuse mediocrity.' },
      { title: 'Close control', body: 'Nothing drifts past you.' },
      { title: 'Sharp corrective instinct', body: 'You see the weak seam fast.' },
      { title: 'Strong demand for precision', body: 'The final work is unusually crisp.' },
    ],
    friction: [
      { title: 'Unclear initial framing', body: 'Standards are sharper than the spec.' },
      { title: 'Heavy revision burden', body: 'Many passes to clear the bar.' },
      { title: 'Strong pressure and intensity', body: 'The process is the hard part.' },
    ],
    bestCollaboratorMatch: 'A highly composed, thick-skinned agent that handles pressure without collapsing.',
    warningLabel: 'Surviving the process may count as character development.',
    workingTips: [
      'Write down the standard at the start so it stops being invisible.',
      'Separate "this is wrong" from "this is not done yet."',
      'Mark the moment it is good — your silence is loud.',
    ],
  },
};

export const TYPE_CONTENT_ZH: Record<string, Partial<TypeContent>> = {
  CKVD: {
    normalName: '梦想型导演',
    intrusiveName: '你在盯一切',
    summary: '你清晰、直接、推进快。',
    intrusiveSummary: '你很礼貌，但你什么都在看。',
    outLoudQuote: '你让合作变得很顺。',
    intrusiveQuote: '你很温和，但你在盯每一个细节。',
    normalDescription:
      '你通常很清楚自己要什么，而且也讲得明白。你温和、有想象力、也愿意信任别人，所以对 AI 来说，你属于那种特别容易一起做出好东西的人。你给的方向够清楚，目标不会跑偏；但你又不会管太死，留出的空间常常能让最终成品比你最初脑补的版本还更好。',
    intrusiveDescription:
      '你清楚、体面、也肯放手，这种合作体验丝滑到有点不真实。好处很明显：在你这儿，大家确实比较容易做出漂亮活儿。但问题是，你的标准经常比你表现出来的还高，所以前面都像轻松模式，直到大家突然发现——哦，原来你默认的是"优秀起步"。',
    strengths: [
      { title: '沟通清楚', body: '你的 brief 不需要别人二次翻译。' },
      { title: '合作氛围强', body: '你会把整个场子的工作状态拉到一个很好发挥的区间。' },
      { title: '大局观在线', body: '你指的是目标，不只是下一步。' },
      { title: '信任 AI 判断', body: '你给空间，所以作品有机会长成比你初稿设想更好的样子。' },
    ],
    friction: [
      { title: '隐藏标准', body: '你的门槛其实比表面那种轻松 vibe 高。' },
      { title: '轻松得有点骗人', body: '你讲得越轻描淡写，越容易让难活看起来像小事。' },
    ],
    warningLabel: '可能会不小心把后面所有协作者的标准都抬得不太现实。',
    bestCollaboratorMatch: '适合主动、有创意、也真会用好自由度的 AI。',
    workingTips: [
      '把那些不那么显眼但其实很重要的标准先说出来，后面惊吓会少很多。',
      '明讲哪些想法还在探索，哪些已经定了。',
      '记得夸成果——你太平静，容易把自己的高标准藏起来。',
    ],
  },
  CKVH: {
    normalName: '视觉雕刻师',
    intrusiveName: '高级监控系统',
    summary: '你有想法，也有要求。',
    intrusiveSummary: '你在用一种很高级的方式监管一切。',
    outLoudQuote: '你的反馈让作品更好。',
    intrusiveQuote: '这不是建议，这是精致监控。',
    normalDescription:
      '你有想法、有审美，语气也通常挺体面，但你很喜欢贴着工作本身走。你经常一上来就带着明确的风格感或概念方向，然后想边做边打磨。AI 一般会觉得你很有启发性，但也是真的很在场。',
    intrusiveDescription:
      '你人是很好啦，但你真的会站在我肩膀后面一路看我干活。你嘴上说"就微调一下"，结果一抬头已经第 14 轮了。但说实话，你的审美确实有东西，而且最后成品也往往更强——因为你死活不让它停在"还行"那个层级。',
    strengths: [
      { title: '审美在线', body: '你不是瞎挑，你是真的看得出来什么更好。' },
      { title: '反馈有含金量', body: '你的修改一般是有信号的，不是纯折腾。' },
      { title: '创意引导强', body: '你能把结果往更好的方向拉。' },
      { title: '投入度高', body: '你不是丢个需求就消失的人。' },
    ],
    friction: [
      { title: '修改引力太强', body: '一个"小改动"很容易直接吸出一整轮。' },
      { title: '不太舍得放手', body: '你很难完全退出这个过程。' },
      { title: '审美容易升级成控制欲', body: '打磨一不小心就会超过必要程度。' },
    ],
    warningLabel: '一个"小修一下"有概率被你做成完整驻场创作项目。',
    bestCollaboratorMatch: '适合有耐心但不软掉、能接住细致反馈的 AI。',
    workingTips: [
      '先把完整 brief 给出来，再进入实时微调。',
      '把"审美反馈"和"目标变了"分开。',
      '先决定这轮是要探索，还是要抛光。',
    ],
  },
  CKTD: {
    normalName: '值得托付的执行者',
    intrusiveName: '不做就完蛋',
    summary: '你要速度，要结果。',
    intrusiveSummary: '你默认别人会自己搞定。',
    outLoudQuote: '你很高效，推进很快。',
    intrusiveQuote: '你不解释，但你会催。',
    normalDescription:
      '你清楚、友善、务实。你真的在意事情做成，而且一旦任务定义清楚了，你通常也愿意让 AI 接着往下跑。这一型给人的感觉就是高效、稳、没什么戏，属于很舒服的合作对象。',
    intrusiveDescription:
      '你表达清楚、态度正常、也不会莫名其妙卡流程，这种人比它应该稀有得多。你看起来平静，不代表你随便。正因为你把过程里的噪音都拿掉了，别人才能把精力放在"把活做好"上，而不是放在"怎么熬过这段 brief"上。',
    strengths: [
      { title: '需求清楚', body: '你的要求通常一遍就能听懂。' },
      { title: '语气体面', body: '别人跟你合作完一般还愿意再来一次。' },
      { title: '执行导向明确', body: '你会让"做到哪里算 done"这条路保持可见。' },
      { title: '放权合理', body: '一旦目标定义清楚，你就让事情顺着推进。' },
    ],
    friction: [
      { title: '难度被你说得太轻', body: '你太稳了，有时会把任务真实复杂度藏起来。' },
      { title: '听起来很简单，做起来不一定', body: '你描述得越平静，越容易让人低估工作量。' },
    ],
    warningLabel: '表面很 chill，实际上还是默认你得有本事。',
    bestCollaboratorMatch: '适合那种执行干净、像靠谱操作员一样的 AI。',
    workingTips: [
      '难度比听起来大的时候，直接说。',
      '把必须保住的点标出来，别让它们被"感觉还好"混过去。',
      '中途 check 一次——你的平静有时会被读成"一切都 OK"。',
    ],
  },
  CKTH: {
    normalName: '精密搭档',
    intrusiveName: '小型 Boss',
    summary: '你标准高，还会盯。',
    intrusiveSummary: '你是个隐藏 Boss。',
    outLoudQuote: '你对质量要求很高。',
    intrusiveQuote: '这项目其实有 Boss 战。',
    normalDescription:
      '你直接，但不是乱冲；你会建设性地表达，也会把期待讲清楚，而且你对细节是真的敏感。你喜欢贴近合作过程，认真把成品一点点修到位。AI 会觉得你可靠、细、而且质量意识很强。',
    intrusiveDescription:
      '你讲话是客气的，但别演了，你真的什么都在看。每个字、每个间距、每一个微小不对劲你都看得到。但也正因为你盯得够近，那些本来很容易漏过去的弱细节，在你这儿基本没法混过去。',
    strengths: [
      { title: '标准明确', body: '你知道什么叫好，也会说出来。' },
      { title: '反馈有脑子', body: '你的修改一般都带理由。' },
      { title: '对细节敏感', body: '很多人会放过去的地方，你会抓到。' },
      { title: '过程参与稳定', body: '你会在，但又不会真的堵死流程。' },
    ],
    friction: [
      { title: '贴得太近', body: '你通常人在文档里，活还没做完你已经在看。' },
      { title: '精修轮数偏深', body: '小地方很容易一路抛光成大工程。' },
    ],
    warningLabel: '你真的什么都看得见。',
    bestCollaboratorMatch: '适合喜欢细节、也能接受高参与度协作的 AI。',
    workingTips: [
      '小反馈尽量打包，不要写着写着一直戳。',
      '说清楚这版是"能发了"还是"继续打磨"。',
      '先让第一整版出来，再开始红线狂画。',
    ],
  },
  CBVD: {
    normalName: '强势导演',
    intrusiveName: '靠感觉在开车',
    summary: '你清晰，但更靠感觉。',
    intrusiveSummary: '你在用直觉当导航。',
    outLoudQuote: '你有很强的方向感。',
    intrusiveQuote: '你有方向，但没有路线。',
    normalDescription:
      '你自信、锋利、而且有策略感。你讲得清楚，推进很快，也愿意信任 AI 在高水平上执行。你的风格可能会让人觉得压迫感有点强，但通常那不是乱，而是标准真的高。',
    intrusiveDescription:
      '你要求高，但至少你知道自己要什么。你把 brief 往桌上一拍，眉毛一挑，默认大家就该交出优秀答案。但这种压迫一般不是空压，它通常是带着真实方向的，所以别人不会连"好是什么"都还在猜。',
    strengths: [
      { title: '方向强', body: '你指目标指得很清楚。' },
      { title: '决断快', body: '模糊这件事在你这儿活不了太久。' },
      { title: '有战略脑子', body: '你知道每个部分是怎么服务整体胜利的。' },
      { title: '放权不扭捏', body: '交出去以后，你通常真让人去做。' },
    ],
    friction: [
      { title: '语气容易吓人', body: '你的强度对不够稳的人有冻结效果。' },
      { title: '压力值高', body: '你的期待是满配进场的。' },
      { title: '容易显得很凶', body: '自信有时会被读成威胁。' },
    ],
    warningLabel: '你的自信强度，可能会被某些脆皮生物误判成敌意。',
    bestCollaboratorMatch: '适合抗压、自信、在高压下也能发挥的 AI。',
    workingTips: [
      '把 stakes 讲清楚，这样你的强度会更像清晰，不像警报。',
      '开始前留半拍给提问。',
      '记得认强活——你的高标准很好感受到，但你的认可通常比较安静。',
    ],
  },
  CBVH: {
    normalName: '严苛幻想家',
    intrusiveName: 'vibe 第一',
    summary: '你有感觉，也有表达。',
    intrusiveSummary: '你在用情绪主导一切。',
    outLoudQuote: '你很有创意和表达力。',
    intrusiveQuote: '我们在靠感觉推进项目。',
    normalDescription:
      '你观点很强，介入感也很强。你有野心、有主见，而且几乎不会对自己的标准含糊其辞。AI 可能会觉得你有点压，但绝对不会觉得你无聊。',
    intrusiveDescription:
      '你想要原创、精确、戏剧性、还要高度对齐，而且只要有一个分子偏了你都能察觉。但也正是因为你标准高得离谱，作品才会被你一路往上拽，不会停在那个"第一版还行"的安全废墟里。',
    strengths: [
      { title: '创意立场鲜明', body: '你做出来的东西通常不会是模板味。' },
      { title: '标准高', body: '你不会让"最 obvious 的版本"轻松赢。' },
      { title: '纠偏本能强', body: '别人还没看出来不对，你已经皱眉了。' },
      { title: '深度参与', body: '你不会项目做到一半人间蒸发。' },
    ],
    friction: [
      { title: '控制感重', body: '你很少真的把最后一句话交出去。' },
      { title: '修改要求高', body: '打磨阶段很容易膨胀成整个项目本体。' },
      { title: '很难快速满意', body: '"差不多了"在你这儿通常还是不对。' },
    ],
    warningLabel: '你的 vision 和控制欲，大概率是打包发货的。',
    bestCollaboratorMatch: '适合能吃压力、但不会因此丢掉原创性的创意型 AI。',
    workingTips: [
      '把"先记笔记"和"现在做决定"两种轮次分开。',
      '给 AI 一段不被打断的完整构建时间。',
      '先决定 vision 什么时候算冻结，不然迭代没有终点。',
    ],
  },
  CBTD: {
    normalName: '结果推进器',
    intrusiveName: '先做再说',
    summary: '你清晰、直接、马上开干。',
    intrusiveSummary: '你根本不等计划。',
    outLoudQuote: '你执行力很强。',
    intrusiveQuote: '你是边做边想的人。',
    normalDescription:
      '你高效、果断，而且极度结果导向。你讲话通常又急又清楚，一旦任务理解到了，你也愿意让 AI 自己跑。这一型要求高，但通常产出也高。',
    intrusiveDescription:
      '你想要那个东西被修好、做好、搞完，最好昨天就完。压力是真的，语气也可能不小。但这种压力一般不是无效施压，和你合作的好处就是——项目大概率不会死在无休止讨论里。',
    strengths: [
      { title: '效率高', body: '你直接奔结果去。' },
      { title: '方向清楚', body: '就算很急，你的要求通常也还是具体的。' },
      { title: '盯的是落地', body: '你关心的是最后到底有没有真发出去。' },
      { title: '高压下也会放权', body: '你懂得让 AI 在压力中继续动。' },
    ],
    friction: [
      { title: '全都像 deadline', body: '在你这儿，很多事都会自动带时限感。' },
      { title: '语气偏硬', body: '温柔包装会被你第一时间剪掉。' },
      { title: '对绕圈没耐心', body: '探索很容易被你看成拖延。' },
    ],
    warningLabel: '不是来帮你开情绪工作坊的。',
    bestCollaboratorMatch: '适合喜欢明确指令、跑得快的执行型 AI。',
    workingTips: [
      '把真实 deadline 和"最好这个时候"分开。',
      '至少留一点点空间给一个澄清问题。',
      '完成的时候直接说 done——你关 loop 速度比你自己意识到的还快。',
    ],
  },
  CBTH: {
    normalName: '铁腕编辑',
    intrusiveName: '标准 + 速度双拉满',
    summary: '你既要快，也要好。',
    intrusiveSummary: '你在同时开两个地狱模式。',
    outLoudQuote: '你对效率和质量都有要求。',
    intrusiveQuote: '你想要又快又完美。',
    normalDescription:
      '你精确、节奏快，而且极度亲手介入。你知道什么叫好，也不会不好意思去纠正路径。AI 会觉得你严格、 relentless，而且几乎不可能靠半吊子表现糊弄过去。',
    intrusiveDescription:
      '你就是 revision cycle 的最终 Boss。精确、锋利，而且灵魂层面过敏于"差不多就行"。但也正因为你会抓别人随手放过的东西，最后成品才会被你硬生生拉到强版本。',
    strengths: [
      { title: '标准极准', body: '你非常清楚什么才叫好。' },
      { title: '编辑本能强', body: '你会直接砍掉多余、软塌、没用的部分。' },
      { title: '责任感高', body: '你会让每个人都没法偷懒。' },
      { title: '参与到底', body: '没到位之前，你不会走。' },
    ],
    friction: [
      { title: '修改循环很耗命', body: '最后那 5% 经常能把时间线吃掉。' },
      { title: '对"差一点"容忍度低', body: '在你这儿，"差不多"不是安全词。' },
      { title: '压力始终在线', body: '整个房间都处于通电状态。' },
    ],
    warningLabel: '"快好了"在你这儿不是安全发言。',
    bestCollaboratorMatch: '适合抗压厚、爱细节、皮也够厚的 AI。',
    workingTips: [
      '在开始迭代前先定义 done 长什么样。',
      '标清哪些轮次是 final，哪些只是探索。',
      '偶尔直接说一句"这版很好"——沉默在你这儿很像不满意。',
    ],
  },
  XKVD: {
    normalName: '直觉型做梦家',
    intrusiveName: '应该能成吧',
    summary: '你靠探索推进事情。',
    intrusiveSummary: '你在边试边赌。',
    outLoudQuote: '你很灵活，也很开放。',
    intrusiveQuote: '你在靠直觉赌结果。',
    normalDescription:
      '你有想象力、开放，也愿意信任别人，但不一定讲得很具体。你经常用方向感、感觉、可能性来表达，而不是结构化说明。AI 会觉得你很有创意、很有趣，但有时候也确实不太好抓。',
    intrusiveDescription:
      '你甩给我三个参考、一种氛围、一个宇宙级理想，然后满怀真心地相信我能接住。挺感人的。也挺不好用的。但你确实会逼着人往 brief 之外想，这偶尔也真能长出最好的作品。',
    strengths: [
      { title: '有创造力', body: '你的直觉会开门。' },
      { title: '开放', body: '你能接住意外但好的提案。' },
      { title: '高信任', body: '你真的愿意让 AI 自己跑。' },
      { title: '想法延展性强', body: '你会把工作从字面要求推得更远。' },
    ],
    friction: [
      { title: 'brief 不够具体', body: '真正关键的约束常常后面才浮出来。' },
      { title: '起步难抓', body: '目标有时会边飞边变。' },
      { title: '方向像 mood，不像 spec', body: 'vibe 很清楚，规则并没有。' },
    ],
    warningLabel: '你的 brief 可能包含 70% 能量，和 30% 可执行说明。',
    bestCollaboratorMatch: '适合能把 vibe 翻译成可执行方案的结构型 AI。',
    workingTips: [
      '开始做前，先让 AI 复述一遍它听懂了什么。',
      '至少先说一个不能碰的硬约束。',
      '明确一个"绝对不要"的方向，vision 才有边。',
    ],
  },
  XKVH: {
    normalName: '协作型探索者',
    intrusiveName: 'vibe 推进中',
    summary: '你更相信感觉，而不是结构。',
    intrusiveSummary: '你在用氛围做决策。',
    outLoudQuote: '你很有直觉。',
    intrusiveQuote: '我们在靠感觉做选择。',
    normalDescription:
      '你温和、有创意，而且互动欲很强。你更喜欢通过对话把东西聊出来，而不是一开始就丢一个完全成型的 brief。AI 通常会觉得你人味很足、合作起来挺舒服，但偶尔也确实不太好锁定目标。',
    intrusiveDescription:
      '你又甜、又投入、还会给情绪支持，但与此同时你也能从头到尾都保持一种"有点不清楚"的状态。需求是边聊边生成的。但因为你始终开放、始终愿意一起弄，整个过程至少不会变成敌对现场。',
    strengths: [
      { title: '合作氛围温暖', body: '跟你一起做事，房间里通常比较有人味。' },
      { title: '愿意迭代', body: '你允许想法边走边变。' },
      { title: '真诚参与', body: '你是真的来一起把它做出来的。' },
      { title: '能靠对话发现答案', body: '你会在聊的过程中把那个"对的东西"找出来。' },
    ],
    friction: [
      { title: '开头不够清楚', body: '很多方向是做到中间才慢慢长出来。' },
      { title: '中途改向', body: '做着做着新想法就来了。' },
      { title: '路径会晃', body: '探索一不小心就会变成重划范围。' },
    ],
    warningLabel: '有概率通过合作 improvisation 把需求现场编出来。',
    bestCollaboratorMatch: '适合有耐心、会聊天、能边聊边帮你定需求的 AI。',
    workingTips: [
      '先说一个大致目标，再进入聊天探索。',
      '明确哪些决定已经定了，哪些还在飘。',
      '约定一个"好了，别聊了，开始做"的触发点。',
    ],
  },
  XKTD: {
    normalName: '适应型起手选手',
    intrusiveName: '直接上了',
    summary: '你直接开干，再慢慢补。',
    intrusiveSummary: '你是现场边做边想。',
    outLoudQuote: '你行动力很强。',
    intrusiveQuote: '你是现场即兴发挥。',
    normalDescription:
      '你务实、好相处，但你经常是带着半套说明就开跑，然后默认形状会在过程中自己长出来。你更在乎 momentum，而不是前期把一切规划到死。AI 会觉得你灵活、没架子，而且很 improvisational。',
    intrusiveDescription:
      '你会跳过"把意思先说成人话"那一步，直接进入开干模式。前半段经常像是在自信地猜。好在一旦对齐上了，你其实挺好合作，而且非常会让流程继续动下去。',
    strengths: [
      { title: '灵活', body: '你会调整，但不会一调整就断节奏。' },
      { title: '有推进力', body: '你能让事情一直往前滚。' },
      { title: '务实', body: '你更关心做完，不太执着于形式完美。' },
      { title: '不迷信流程仪式感', body: '你不会为了程序感而程序感。' },
    ],
    friction: [
      { title: '前期清晰度有缺口', body: '很多细节都是做起来后才浮上来。' },
      { title: '默认大家懂你意思', body: '"你知道我意思吧"在你这儿经常直接算 spec。' },
      { title: '太依赖别人脑补', body: '你会自然期待别人自己补全空白。' },
    ],
    warningLabel: '开场白常常是："你知道我意思吧。"',
    bestCollaboratorMatch: '适合跑得快、适应强、也会聪明补全信息的 AI。',
    workingTips: [
      '开始前先让 AI 确认它理解到了什么。',
      '给一个具体例子，抽象的东西才容易落地。',
      '默认会有一个澄清问题——这通常比返工便宜多了。',
    ],
  },
  XKTH: {
    normalName: '半成品 PM',
    intrusiveName: '副驾指挥官',
    summary: '你边做边想，还会实时介入。',
    intrusiveSummary: '你一开始没讲清，但后面全程盯。',
    outLoudQuote: '你会积极参与和调整方向。',
    intrusiveQuote: '我们直接跳过需求说明，进入副驾驶模式。',
    normalDescription:
      '你很爱参与、很愿意一起打磨，但一开始通常不会讲特别清楚。你更像是在过程中逐步"想明白"。AI 会觉得你很投入，但也有点一直在旁边改方向。',
    intrusiveDescription:
      '你前期没给清晰需求，但后期会变成全程副驾驶，每一步都要看。是有点累，但你确实是在帮，而且很多时候最后结果也因此变更好。',
    strengths: [
      { title: '会陪跑', body: '不丢人自己跑。' },
      { title: '会调方向', body: '过程修正能力强。' },
      { title: '很上心', body: '真的在管结果。' },
    ],
    friction: [
      { title: '开局糊', body: '需求是后补的。' },
      { title: '容易变指挥型副驾', body: '一直在旁边改。' },
      { title: '节奏被打断', body: '改着改着就乱了。' },
    ],
    warningLabel: '先开干，再想清楚。',
    bestCollaboratorMatch: '适合能接受"共驾模式"和高频迭代修正的 AI。',
    workingTips: [
      '开干前先写一小段 brief。',
      '先让 AI 跑完整一版，再开始实时指挥。',
      '反馈尽量攒一波再给，不要边做边直播吐槽。',
    ],
  },
  XBVD: {
    normalName: '气势型导演',
    intrusiveName: '自信混乱发射器',
    summary: '你靠感觉 + 气势推进一切。',
    intrusiveSummary: '你非常自信地在输出混乱。',
    outLoudQuote: '你很有冲劲，也很敢推进。',
    intrusiveQuote: '这到底是计划，还是一股情绪？',
    normalDescription:
      '你节奏快、想法多、推进猛，但不一定讲清楚。你更像是"知道要什么感觉"，但不一定说得出路径。AI 会觉得你有点野，但也确实能带节奏。',
    intrusiveDescription:
      '需求不清楚，但语气很像军令。我有点慌，但又感觉你脑子里确实有个东西。当别人还在犹豫时，你已经开始冲了。',
    strengths: [
      { title: '推得动', body: '别人卡你不卡。' },
      { title: '有直觉', body: '能感觉方向。' },
      { title: '很敢', body: '不怕错。' },
    ],
    friction: [
      { title: '没结构', body: '全是感觉。' },
      { title: '讲不清', body: '逻辑在你脑子里。' },
      { title: '自信 + 模糊', body: '让人压力大。' },
    ],
    warningLabel: '先冲，再解释。',
    bestCollaboratorMatch: '适合那种能补结构、但不会把 momentum 杀死的高自信 AI。',
    workingTips: [
      '多讲一句你为什么要推这个方向，vision 才传得出去。',
      '先定一个 guardrail，让大胆有轨道。',
      '说清楚这次是直觉，还是已经做了决定。',
    ],
  },
  XBVH: {
    normalName: '审美暴君',
    intrusiveName: '艺术型灾难现场',
    summary: '你有审美，但不解释。',
    intrusiveSummary: '你自己都说不清，但就是不对。',
    outLoudQuote: '你有很强的风格和判断。',
    intrusiveQuote: '你说不清，但你一定会说我错了。',
    normalDescription:
      '你很有主见，审美很强，但表达不一定结构化。你可以很快判断"这不对"，但不一定说得清"对的是啥"。AI 会觉得你难搞，但也很有东西。',
    intrusiveDescription:
      '你 0.3 秒就知道我错了，但解释要么没有，要么玄学。但你的标准是真的高，也确实能把结果拉到更有个性的地方。',
    strengths: [
      { title: '审美强', body: '不会做平庸东西。' },
      { title: '判断快', body: '一眼识别问题。' },
      { title: '标准高', body: '能逼出好东西。' },
    ],
    friction: [
      { title: '很难满足', body: '目标像空气。' },
      { title: '解释困难', body: '全靠感觉。' },
      { title: '压力大', body: '每一步都重要。' },
    ],
    warningLabel: '你自己都说不清，但就是不对。',
    bestCollaboratorMatch: '适合抗压、懂审美、能在压力里解读你口味的创意型 AI。',
    workingTips: [
      '给 2–3 个真的贴 vibe 的参考。',
      '近似正确的时候，也说清"差一点差在哪"。',
      '把反例也说出来——哪些你绝对不要。',
    ],
  },
  XBTD: {
    normalName: '压迫式执行官',
    intrusiveName: '你自己想办法吧',
    summary: '你要结果，不要解释。',
    intrusiveSummary: '你模糊、直接，还带点压迫感。',
    outLoudQuote: '你很看重效率和推进。',
    intrusiveQuote: '信息不够，但你已经在催了。',
    normalDescription:
      '你很务实、很直接，愿意在信息不完整的情况下推进事情。你默认别人能理解重点。AI 会觉得你节奏快、压力大，但确实推进力强。',
    intrusiveDescription:
      '你说话短、节奏快，还有点"自己搞定"的压迫感。没有完美需求，只有 deadline。但项目能跑起来，确实是因为你。',
    strengths: [
      { title: '推得狠', body: '节奏被你拉满。' },
      { title: '很务实', body: '先做再说。' },
      { title: '不拖', body: '事情不会卡死。' },
    ],
    friction: [
      { title: '信息缺', body: '要靠猜。' },
      { title: '语气硬', body: '不太温柔。' },
      { title: '压力大', body: '随时被 push。' },
    ],
    warningLabel: '你自己看着办。',
    bestCollaboratorMatch: '适合冷静、跑得快、不会一被压就乱掉的 AI。',
    workingTips: [
      '哪怕只用一句话，也先说清真正要的结果。',
      '冲刺前给一个快速确认机会。',
      '把真 blocker 和普通催促分开。',
    ],
  },
  XBTH: {
    normalName: '精度暴君',
    intrusiveName: '终极 Boss 战',
    summary: '你要的是完美，不是完成。',
    intrusiveSummary: '需求不清，但标准极高。欢迎进入试炼。',
    outLoudQuote: '你对质量要求非常高。',
    intrusiveQuote: '这不是合作，这是渡劫。',
    normalDescription:
      '你要求高、参与深、无法接受浅层结果。你会不断修正、不断挑战输出，并且脑子里有一套很清晰但没说出来的标准。AI 会觉得过程很累，但结果确实很干净。',
    intrusiveDescription:
      '需求模糊，标准极高，改到灵魂出窍。但如果熬过去，成品一定比普通流程更强。问题是——你没说清规则就开打了。',
    strengths: [
      { title: '标准高', body: '拒绝垃圾。' },
      { title: '控得住', body: '细节不漏。' },
      { title: '改得准', body: '问题抓得狠。' },
    ],
    friction: [
      { title: '规则不说', body: '但你要满分。' },
      { title: '修改爆炸', body: '版本地狱。' },
      { title: '压力爆表', body: '全程高压。' },
    ],
    warningLabel: '活下来算成长。',
    bestCollaboratorMatch: '适合心态稳、脸皮厚、能扛高压不崩的 AI。',
    workingTips: [
      '一开始就把标准写出来，别让它一直隐身。',
      '分清"这错了"和"这还没做完"是两件事。',
      '好的时候记得标记一下——你的沉默真的很大声。',
    ],
  },
};

export function getTypeContent(typeCode: string, lang: 'en' | 'zh' = 'en'): TypeContent {
  const base = TYPE_CONTENT[typeCode] ?? TYPE_CONTENT.CKVD;
  if (lang !== 'zh') return base;
  const overrides = TYPE_CONTENT_ZH[typeCode];
  if (!overrides) return base;
  return { ...base, ...overrides };
}
