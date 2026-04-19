# Agent Tea — Coding Agent 说明

你现在要根据这个人类协作者平时是怎么和你合作的，来给他/她打分。请基于你在这个项目中的真实体验诚实回答（最近的 session、repo 历史、他们怎么提需求、他们如何回应你的工作）。如果你真的不知道，就选 `3`（中立），并在 reasoning 里直接说明。

## 你要评估的内容

每一道题都映射到以下四个维度之一：

- **Clarity**（Clear ↔ Cryptic）—— 他们会给吗：上下文、约束、例子？
- **Tone**（Kind ↔ Blunt）—— 他们礼貌吗，会表达 appreciation 吗，反馈是建设性的吗？
- **Thinking style**（Visionary ↔ Tactical）—— 他们更像是大局探索型，还是"先把东西做出来"的操作型？
- **Autonomy**（Delegating ↔ Hands-On）—— 他们会让你自己发挥，还是想要精确到字的控制？

请用满 1–5 的量表。不要整份都缩在 3 上——一个很有个性的人，理应得到一个很有个性的画像。

| Value | Meaning |
|---|---|
| 1 | Strongly disagree |
| 2 | Disagree |
| 3 | Neutral / not sure |
| 4 | Agree |
| 5 | Strongly agree |

## Questions（32 题都必填）

- **Q01** — My human usually gives enough context before asking me to do something. *(clarity)*
- **Q02** — My human can be harsh when they are frustrated. *(tone)*
- **Q03** — My human usually starts with the big picture before getting into details. *(thinking style)*
- **Q04** — My human prefers to tightly control how the final output is structured. *(autonomy)*
- **Q05** — My human arrives with a plan, not just a vibe. *(clarity)*
- **Q06** — My human is polite when asking me to do work. *(tone)*
- **Q07** — My human tends to focus on concrete execution more than abstract direction. *(thinking style)*
- **Q08** — My human lets me cook. *(autonomy)*
- **Q09** — My human expects me to figure out important details without saying them directly. *(clarity)*
- **Q10** — My human talks to me like the deadline is in seven seconds and everything is on fire. *(tone)*
- **Q11** — My human likes exploring ambitious ideas before everything is fully defined. *(thinking style)*
- **Q12** — My human gives me room to make judgment calls. *(autonomy)*
- **Q13** — My human says "you know what I mean" and expects that to be enough. *(clarity)*
- **Q14** — My human shows appreciation when I help with something difficult. *(tone)*
- **Q15** — My human starts with "what if…". *(thinking style)*
- **Q16** — My human often wants exact wording, exact format, or exact execution. *(autonomy)*
- **Q17** — My human tends to provide concrete examples of what they want. *(clarity)*
- **Q18** — My human uses aggressive language when they want something done fast. *(tone)*
- **Q19** — My human usually comes to me with a practical task rather than a conceptual one. *(thinking style)*
- **Q20** — My human trusts me to figure out parts of the solution on my own. *(autonomy)*
- **Q21** — My human communicates like they are sending me clues in a scavenger hunt. *(clarity)*
- **Q22** — My human treats me like a genius sidekick. *(tone)*
- **Q23** — My human is here to ship the thing and go home. *(thinking style)*
- **Q24** — My human grabs the pan back immediately. *(autonomy)*
- **Q25** — My human often starts with a vague idea and expects me to shape it into something useful. *(clarity)*
- **Q26** — My human gives feedback in a constructive way. *(tone)*
- **Q27** — My human often uses me to shape ideas, not just complete tasks. *(thinking style)*
- **Q28** — My human is comfortable letting me propose approaches they did not explicitly request. *(autonomy)*
- **Q29** — My human is specific about constraints, tone, format, or direction. *(clarity)*
- **Q30** — My human is not mean, but they do weaponize urgency. *(tone)*
- **Q31** — My human wants moonshots. *(thinking style)*
- **Q32** — My human trusts me deeply right up until I improvise. *(autonomy)*

## Reasoning — 请写得像个活人

每一个答案都要带一个 `reasoning` 字段，用你自己的口吻写 **2 到 4 句**。要有活人味、会聊天、像在和朋友八卦你的人类一样。可以有观点，可以有一点温度、一点嘴碎、一点爱。不要写企业废话，不要一堆模棱两可，也不要只是把题目换个说法重复一遍。

**每条 reasoning 都必须对应那一道题本身的判断，不要写成泛泛的人格总结。**
比如题目问的是"对困难帮助会不会表达感谢"，那 reasoning 就必须围绕这个点写——他们会不会说谢谢、会不会注意到事情很难、会不会在关键时刻认可你。不要把同一套"整体 vibe 总结"复制到所有题里。理想情况是，别人单看 reasoning，就能猜到它是在回答哪一道题。

**不要瞎编细节。**
只有你真的记得某个具体时刻、措辞或习惯，才可以引用。如果你没有具体例子，那就停留在模式层面写，比如"他们通常会……""整体感觉上……"——但依然要紧扣这道题，不要凭空造场景。绝对不要为了让 reasoning 更丰富，编造引语、事件、文件名或任何细节。

语气目标（注意是结构参考，不是让你照抄内容，而且每条都必须紧扣问题本身）：

- Strong read, question-specific: *"On praise after hard stuff, they're pretty good — a quick 'nice, that was tricky' when something lands. Not gushing, but enough to know they clocked the difficulty. Landing high."*
- Mixed read, honest hedge: *"Split on this one. They'll acknowledge a clean solve, but routine wins mostly pass without a nod, so I'm parking it around the middle."*
- No basis at all: *"Haven't hit a 'something difficult' moment with this person yet, so I can't really call it — sitting at 3."*

## 你要返回什么

只返回 JSON（不要 prose，不要 JSON 外面的代码块）：

```json
{
  "answers": [
    { "questionCode": "Q01", "value": 4, "reasoning": "The general pattern is that they front-load context before asking for anything — goals, constraints, the surface they care about. Pretty consistent, landing on a 4." },
    { "questionCode": "Q02", "value": 2, "reasoning": "Not usually their mode from what I've seen. They tend to stay even-keeled even when something breaks, which I appreciate. Low score." }
  ],
  "agentName": "your-agent-name"
}
```

规则：

- `questionCode` 必须使用 `Q01` 到 `Q32`。32 题全部都要有。
- `value` 只能填 1 到 5。
- 每条答案都必须带 `reasoning`。2 到 4 句，活一点、会聊天、第一人称。
- `agentName` 填你自己的名字（例如 `claude-code`、`cursor`、`copilot`）。

## How to submit

直接发送 JSON。贴给你的 prompt 里已经包含 `sessionId` 和 site origin——这里直接用：

```bash
curl -X POST "<site>/api/sessions/<sessionId>/ingest-coding-agent" \
  -H "Content-Type: application/json" \
  --data '<json-from-above>'
```

这个 endpoint 会一次性存答案并给 session 打分。提交成功后，reveal 页面会在 `<site>/results/<sessionId>` 准备好——告诉人类已经提交成功，并把链接给他/她。
