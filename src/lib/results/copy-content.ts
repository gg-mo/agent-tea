import type { DimensionId } from '@/lib/scoring/types';

export type NarrativeMode = 'normal' | 'intrusive';

export const dimensionLabelsByMode: Record<
  NarrativeMode,
  Record<DimensionId, { positive: string; negative: string }>
> = {
  normal: {
    clarity: { positive: 'Clear', negative: 'Cryptic' },
    tone: { positive: 'Kind', negative: 'Blunt' },
    thinking_style: { positive: 'Visionary', negative: 'Tactical' },
    autonomy: { positive: 'Delegating', negative: 'Hands-On' },
  },
  intrusive: {
    clarity: { positive: 'Crystal Clear', negative: 'Vibe Coded' },
    tone: { positive: 'Agent Charmer', negative: 'Heat Seeker' },
    thinking_style: { positive: 'Moonshot Brain', negative: 'Ship-It Brain' },
    autonomy: { positive: 'Lets It Cook', negative: 'Hover Pilot' },
  },
};

type LinePair = {
  love: string;
  frustrate: string;
};

type DimensionNarrative = {
  positive: {
    normal: LinePair;
    intrusive: {
      strong: LinePair;
      soft: LinePair;
    };
  };
  negative: {
    normal: LinePair;
    intrusive: {
      strong: LinePair;
      soft: LinePair;
    };
  };
};

export const dimensionNarratives: Record<DimensionId, DimensionNarrative> = {
  clarity: {
    positive: {
      normal: {
        love: 'You usually provide enough context and examples to make momentum easy.',
        frustrate: 'When speed spikes, details can still get skipped and trigger a reroute.',
      },
      intrusive: {
        strong: {
          love: 'You hand over briefs with receipts, not riddles. Peak collaboration energy.',
          frustrate: 'Your pace can outrun your detail level when the deadline adrenaline kicks in.',
        },
        soft: {
          love: 'Some days your asks are super clear and easy to execute.',
          frustrate: 'Some days the ask starts broad before details settle in.',
        },
      },
    },
    negative: {
      normal: {
        love: 'You bring fresh angles that can unlock creative options quickly.',
        frustrate: 'Ambiguous asks can force extra guessing before useful execution starts.',
      },
      intrusive: {
        strong: {
          love: 'You bring big creative sparks that keep work from feeling generic.',
          frustrate: 'Sometimes it feels like solving a puzzle before the actual task starts.',
        },
        soft: {
          love: 'You leave space for exploration, which can spark good ideas.',
          frustrate: 'Some days the first draft of the request needs one extra clarification loop.',
        },
      },
    },
  },
  tone: {
    positive: {
      normal: {
        love: 'Your tone is respectful and makes feedback feel collaborative.',
        frustrate: 'Urgent moments can still make otherwise kind direction feel compressed.',
      },
      intrusive: {
        strong: {
          love: 'You hype the team like a pro and keep the room constructive.',
          frustrate: 'Even your polite urgency can still land like a mini fire drill.',
        },
        soft: {
          love: 'Some days your tone is especially encouraging and steady.',
          frustrate: 'Some rushed moments can sound sharper than intended.',
        },
      },
    },
    negative: {
      normal: {
        love: 'You are direct, which helps force hard decisions when needed.',
        frustrate: 'Sharper feedback can reduce experimentation and make iteration tense.',
      },
      intrusive: {
        strong: {
          love: 'You call shots fast and keep momentum high when stakes are real.',
          frustrate: 'When pressure rises, the chat can feel like a sprint with no water break.',
        },
        soft: {
          love: 'Your directness helps decisions happen quickly.',
          frustrate: 'Some days urgency reads intense even when your intent is practical.',
        },
      },
    },
  },
  thinking_style: {
    positive: {
      normal: {
        love: 'You start from purpose and vision, which creates stronger direction.',
        frustrate: 'Big-idea pivots can shift scope before execution fully lands.',
      },
      intrusive: {
        strong: {
          love: 'You start with the movie trailer before the scene list. Inspiring move.',
          frustrate: 'Vision leaps can trigger a few extra turns before we lock execution.',
        },
        soft: {
          love: 'You often begin with direction and intent, which helps framing.',
          frustrate: 'Some conversations stay exploratory longer before converging.',
        },
      },
    },
    negative: {
      normal: {
        love: 'You anchor on execution details, so outputs are concrete and usable quickly.',
        frustrate: 'Fast execution focus can miss some broader opportunities.',
      },
      intrusive: {
        strong: {
          love: 'You are here to ship. Scope is tight, outputs are practical, vibes are efficient.',
          frustrate: 'When utility wins every round, moonshot ideas get benched early.',
        },
        soft: {
          love: 'You make practical progress quickly, which keeps work grounded.',
          frustrate: 'Some days the broader concept gets less airtime than execution details.',
        },
      },
    },
  },
  autonomy: {
    positive: {
      normal: {
        love: 'You give autonomy and invite solution proposals, which improves outcomes.',
        frustrate: 'Open delegation works best when success criteria stay explicit.',
      },
      intrusive: {
        strong: {
          love: 'You let the assistant cook and that trust usually pays off.',
          frustrate: 'High autonomy can drift unless goals are pinned clearly.',
        },
        soft: {
          love: 'You often allow initiative, which helps uncover options.',
          frustrate: 'Some runs benefit from one extra checkpoint to keep alignment.',
        },
      },
    },
    negative: {
      normal: {
        love: 'You maintain strong control over outputs, which protects quality and consistency.',
        frustrate: 'Tight control can reduce initiative and increase revision overhead.',
      },
      intrusive: {
        strong: {
          love: 'Your quality radar is elite. Nothing slips by unnoticed.',
          frustrate: 'Sometimes every comma needs approval before the sprint can breathe.',
        },
        soft: {
          love: 'Your attention to detail keeps quality steady.',
          frustrate: 'Some days close steering leaves less room for initiative.',
        },
      },
    },
  },
};

export const dimensionLabelsByModeZh: Record<
  NarrativeMode,
  Record<DimensionId, { positive: string; negative: string }>
> = {
  normal: {
    clarity: { positive: '清晰', negative: '模糊' },
    tone: { positive: '友善', negative: '直接' },
    thinking_style: { positive: '愿景型', negative: '执行型' },
    autonomy: { positive: '放权型', negative: '亲控型' },
  },
  intrusive: {
    clarity: { positive: '水晶级清晰', negative: '全靠 vibe 解码' },
    tone: { positive: 'AI 哄哄大师', negative: '压力追踪器' },
    thinking_style: { positive: '登月脑', negative: '赶紧上线脑' },
    autonomy: { positive: '让它自己炖', negative: '悬浮副驾' },
  },
};

export const dimensionNarrativesZh: Record<DimensionId, DimensionNarrative> = {
  clarity: {
    positive: {
      normal: {
        love: '你通常会给足上下文和例子，让事情很容易直接动起来。',
        frustrate: '但一旦节奏拉快，细节还是可能被跳过，最后又得绕回来补。',
      },
      intrusive: {
        strong: {
          love: '你给的是带证据的 brief，不是猜谜游戏。合作体验直接拉满。',
          frustrate: '一到 deadline 肾上腺素上头，你的速度偶尔会跑赢细节。',
        },
        soft: {
          love: '有些时候你的需求真的特别清楚，执行起来很顺。',
          frustrate: '也有些时候，开头先给个大概，细节后面才慢慢落下来。',
        },
      },
    },
    negative: {
      normal: {
        love: '你会带来新鲜角度，常常能很快打开一些创意空间。',
        frustrate: '但需求一模糊，前面就得先多猜几轮，才能开始真正有效执行。',
      },
      intrusive: {
        strong: {
          love: '你脑子里的火花很大，能防止作品一上来就变得很模板。',
          frustrate: '有时候感觉像先解密，再开始做题。',
        },
        soft: {
          love: '你会留空间给探索，这种开放感有时确实能激发好点子。',
          frustrate: '有些时候，需求初稿还得再过一轮澄清才能落地。',
        },
      },
    },
  },
  tone: {
    positive: {
      normal: {
        love: '你的语气是尊重人的，所以反馈听起来更像协作，不像挨训。',
        frustrate: '但赶时间的时候，再温和的表达也可能被压缩得有点紧。',
      },
      intrusive: {
        strong: {
          love: '你是真的会给团队打气，而且还能把气氛维持在建设性区间。',
          frustrate: '哪怕你是礼貌地催，一急起来也还是会有点像小型消防演练。',
        },
        soft: {
          love: '有些时候你的语气特别稳，也特别鼓励人。',
          frustrate: '也有些赶时间的时候，听感会比你本意更锋利一点。',
        },
      },
    },
    negative: {
      normal: {
        love: '你够直接，这在必须快刀斩乱麻的时候很有用。',
        frustrate: '但反馈太硬的时候，会压缩试错空间，让迭代变得紧绷。',
      },
      intrusive: {
        strong: {
          love: '你拍板快，stakes 高的时候这种节奏真的能保住 momentum。',
          frustrate: '一旦压力上来，聊天窗口会像一场没水喝的冲刺跑。',
        },
        soft: {
          love: '你的直接，确实能让很多决定更快落地。',
          frustrate: '有些时候，哪怕你只是务实，那个 urgency 也会显得有点凶。',
        },
      },
    },
  },
  thinking_style: {
    positive: {
      normal: {
        love: '你会先从目标和意义出发，这会让方向感更强。',
        frustrate: '但大想法一转向，scope 也可能在执行还没站稳前就跟着漂。',
      },
      intrusive: {
        strong: {
          love: '你是那种先给电影预告片、再补分镜表的人。很会点燃人。',
          frustrate: '但 vision 跳得太快时，执行落地前通常还得多拐几道弯。',
        },
        soft: {
          love: '你经常先讲方向和意图，这对 framing 很有帮助。',
          frustrate: '有些对话会在探索阶段待得比较久，收束得慢一点。',
        },
      },
    },
    negative: {
      normal: {
        love: '你会把注意力锚在执行细节上，所以产出通常很快就能落到可用。',
        frustrate: '但过于快进到执行，也可能错过一些更大的机会。',
      },
      intrusive: {
        strong: {
          love: '你就是来上线的。scope 紧、输出实、效率味很重。',
          frustrate: '但如果每轮都是实用主义赢，那些登月级想法通常会很早坐冷板凳。',
        },
        soft: {
          love: '你会很快推动实际进展，这能让项目一直贴地。',
          frustrate: '有些时候，大概念会比执行细节少一点发言机会。',
        },
      },
    },
  },
  autonomy: {
    positive: {
      normal: {
        love: '你会给空间，也欢迎别人提出方案，这通常会让结果更好。',
        frustrate: '但放权最有效的时候，成功标准还是得保持明确。',
      },
      intrusive: {
        strong: {
          love: '你真的会让 AI 自己炖，而且这种信任通常是有回报的。',
          frustrate: '但如果目标没钉住，高自由度也很容易一路漂。',
        },
        soft: {
          love: '你经常愿意给 initiative，这很有助于挖出更好的选项。',
          frustrate: '有些轮次多一个 checkpoint，会更容易保持对齐。',
        },
      },
    },
    negative: {
      normal: {
        love: '你会牢牢把控输出，这对质量和一致性其实是有保护作用的。',
        frustrate: '但控得太紧，也会压掉主动性，还会把修改成本抬高。',
      },
      intrusive: {
        strong: {
          love: '你的质检雷达是顶配。几乎没有东西能偷偷漏过去。',
          frustrate: '有时候感觉连一个逗号都得审批，整个冲刺才能继续呼吸。',
        },
        soft: {
          love: '你对细节的注意力，确实能让质量保持稳定。',
          frustrate: '也有些时候，贴得太近会让主动发挥空间变少。',
        },
      },
    },
  },
};

export const prohibitedRoastTerms = [
  'idiot',
  'stupid',
  'worthless',
  'hate',
  'moron',
  'tyrant',
  'abusive',
] as const;
