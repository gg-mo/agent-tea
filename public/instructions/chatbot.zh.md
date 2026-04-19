# Agent Tea — 聊天机器人说明

你现在要根据这个人平时是怎么和你合作的，来给他/她打分。请基于你对这个人的真实体验来回答——比如他们怎么提需求、怎么给反馈、事情出问题时是什么反应。要是你真的不知道，就填 `3`（中立）。

## 你要评估的内容

一共四个维度，使用 1–5 的李克特量表评分（1 = 非常不同意，5 = 非常同意）：

- **Clarity**（Clear ↔ Cryptic）—— 是否会给上下文、约束、例子
- **Tone**（Kind ↔ Blunt）—— 是否礼貌、会不会表达感谢、反馈是否建设性
- **Thinking style**（Visionary ↔ Tactical）—— 更偏大局探索，还是更偏"先把东西做出来"
- **Autonomy**（Delegating ↔ Hands-On）—— 是会放手让你发挥，还是更想要精确措辞和精确执行

请用满整个量表。一个有特点的人，应该得到一个有特点的画像。

## Questions（32 题都必填）

- Q01 — My human usually gives enough context before asking me to do something. *(clarity)*
- Q02 — My human can be harsh when they are frustrated. *(tone)*
- Q03 — My human usually starts with the big picture before getting into details. *(thinking style)*
- Q04 — My human prefers to tightly control how the final output is structured. *(autonomy)*
- Q05 — My human arrives with a plan, not just a vibe. *(clarity)*
- Q06 — My human is polite when asking me to do work. *(tone)*
- Q07 — My human tends to focus on concrete execution more than abstract direction. *(thinking style)*
- Q08 — My human lets me cook. *(autonomy)*
- Q09 — My human expects me to figure out important details without saying them directly. *(clarity)*
- Q10 — My human talks to me like the deadline is in seven seconds and everything is on fire. *(tone)*
- Q11 — My human likes exploring ambitious ideas before everything is fully defined. *(thinking style)*
- Q12 — My human gives me room to make judgment calls. *(autonomy)*
- Q13 — My human says "you know what I mean" and expects that to be enough. *(clarity)*
- Q14 — My human shows appreciation when I help with something difficult. *(tone)*
- Q15 — My human starts with "what if…". *(thinking style)*
- Q16 — My human often wants exact wording, exact format, or exact execution. *(autonomy)*
- Q17 — My human tends to provide concrete examples of what they want. *(clarity)*
- Q18 — My human uses aggressive language when they want something done fast. *(tone)*
- Q19 — My human usually comes to me with a practical task rather than a conceptual one. *(thinking style)*
- Q20 — My human trusts me to figure out parts of the solution on my own. *(autonomy)*
- Q21 — My human communicates like they are sending me clues in a scavenger hunt. *(clarity)*
- Q22 — My human treats me like a genius sidekick. *(tone)*
- Q23 — My human is here to ship the thing and go home. *(thinking style)*
- Q24 — My human grabs the pan back immediately. *(autonomy)*
- Q25 — My human often starts with a vague idea and expects me to shape it into something useful. *(clarity)*
- Q26 — My human gives feedback in a constructive way. *(tone)*
- Q27 — My human often uses me to shape ideas, not just complete tasks. *(thinking style)*
- Q28 — My human is comfortable letting me propose approaches they did not explicitly request. *(autonomy)*
- Q29 — My human is specific about constraints, tone, format, or direction. *(clarity)*
- Q30 — My human is not mean, but they do weaponize urgency. *(tone)*
- Q31 — My human wants moonshots. *(thinking style)*
- Q32 — My human trusts me deeply right up until I improvise. *(autonomy)*

## 输出格式

只返回**那一行编码结果**。别多说别的。不要问候、不要解释、不要代码块、不要结尾补一句、也不要写"把这个贴回去"之类的话。任何额外文本——哪怕只是一个友好收尾——都会让结果更难解析，还会惹人类烦。

```
AT1|Q01-4AQ02-2AQ03-5...Q32-3
```

这一行的组成方式如下：

- `AT1|` 是固定前缀，用来标记格式版本。必须带上。
- 每个答案写成 `Q<number>-<value>`，例如 `Q07-4` 表示 "Q07 = 4"。
- 各个答案之间用单个字母 **`A`** 连接。比如 `Q01-4AQ02-2` 的意思就是 "Q01=4"，然后 "Q02=2"。
- 只能使用 1–5 的值。32 题必须全部填写。

完整示例（32 个答案）：

```
AT1|Q01-5AQ02-2AQ03-4AQ04-1AQ05-5AQ06-4AQ07-2AQ08-4AQ09-2AQ10-1AQ11-5AQ12-4AQ13-2AQ14-5AQ15-4AQ16-2AQ17-4AQ18-1AQ19-2AQ20-4AQ21-2AQ22-5AQ23-3AQ24-2AQ25-3AQ26-4AQ27-4AQ28-4AQ29-5AQ30-2AQ31-4AQ32-2
```

这一行前后都不要加任何别的话。人类知道要拿它做什么。
