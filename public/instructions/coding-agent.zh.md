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

- **Q01** — 我的人类通常会在让我开始做事前，把背景和上下文讲清楚。 *(clarity)*
- **Q02** — 我的人类在烦躁或受挫时，语气可能会变得有点凶。 *(tone)*
- **Q03** — 我的人类通常会先讲整体方向，再进入细节。 *(thinking style)*
- **Q04** — 我的人类倾向于比较强地把控最终输出的结构和形式。 *(autonomy)*
- **Q05** — 我的人类带来的通常是一个明确思路，而不是只有一个模糊感觉。 *(clarity)*
- **Q06** — 我的人类在让我做事时，通常是礼貌的。 *(tone)*
- **Q07** — 我的人类更关注"把事情做出来"，而不是抽象讨论方向。 *(thinking style)*
- **Q08** — 我的人类会给我空间，让我自己发挥。 *(autonomy)*
- **Q09** — 我的人类会期待我自己补全一些关键细节，而不是全部明说。 *(clarity)*
- **Q10** — 我的人类说话有时会像"截止时间马上到了，一切都很紧急"。 *(tone)*
- **Q11** — 我的人类喜欢在很多事情还没完全确定前，就先探索更有野心的想法。 *(thinking style)*
- **Q12** — 我的人类会留出空间，让我自己做判断。 *(autonomy)*
- **Q13** — 我的人类会说"你懂我意思吧"，并觉得这样已经足够。 *(clarity)*
- **Q14** — 当我帮忙完成一件不容易的事时，我的人类会表达感谢或认可。 *(tone)*
- **Q15** — 我的人类经常以"如果……会怎样？"来展开讨论。 *(thinking style)*
- **Q16** — 我的人类经常希望我在措辞、格式或执行上都非常精确。 *(autonomy)*
- **Q17** — 我的人类通常会提供具体例子，来说明他们想要什么。 *(clarity)*
- **Q18** — 当我人类想加快进度时，语气可能会变得比较强硬。 *(tone)*
- **Q19** — 我的人类通常找我是为了完成具体任务，而不是只讨论概念。 *(thinking style)*
- **Q20** — 我的人类信任我可以自己处理方案中的一部分。 *(autonomy)*
- **Q21** — 我的人类和我沟通时，有时像是在给线索，让我自己拼出完整意思。 *(clarity)*
- **Q22** — 我的人类会把我当成一个聪明、可靠的搭档。 *(tone)*
- **Q23** — 我的人类更倾向于把事情做完并推进，而不是长时间讨论。 *(thinking style)*
- **Q24** — 我的人类有时会很快把主导权拿回去，自己重新接手。 *(autonomy)*
- **Q25** — 我的人类经常先给一个模糊的想法，然后希望我把它整理成可用的结果。 *(clarity)*
- **Q26** — 我的人类给反馈的方式通常是建设性的。 *(tone)*
- **Q27** — 我的人类会和我一起打磨想法，而不只是让我执行任务。 *(thinking style)*
- **Q28** — 我的人类愿意接受我主动提出、即使他们没有明确要求过的方案。 *(autonomy)*
- **Q29** — 我的人类通常会把约束、语气、格式或方向讲得比较具体。 *(clarity)*
- **Q30** — 我的人类不算刻薄，但会用"事情很急"来施加压力。 *(tone)*
- **Q31** — 我的人类经常希望实现一些比较有野心的目标。 *(thinking style)*
- **Q32** — 我的人类很信任我，直到我开始自由发挥。 *(autonomy)*

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
