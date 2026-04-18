# Launch Readiness and Backlog Split (AE-22)

## Go/No-Go Checklist

| Item | Owner | Status | Pass Criteria |
| --- | --- | --- | --- |
| Core test loop stable | Engineering | Pending | Session create -> ingest -> score -> result passes in prod |
| Share flow stable | Engineering | Pending | Share card endpoint and copy flow both work |
| Moderation guardrails active | Product/Eng | Pending | Rewrites trigger and unsafe terms do not appear |
| Funnel analytics visible | Growth | Pending | 7-day funnel and type distribution endpoints populate |
| Auth optional and non-blocking | Engineering | Pending | Anonymous flow untouched; post-result sign-in works |
| Release runbook validated | Engineering | Pending | Smoke + perf scripts run successfully on preview |

## 30-Day KPI Targets

| KPI | Target |
| --- | --- |
| Session start rate (`session_created / landing_view`) | >= 25% |
| Completion rate (`session_scored / session_created`) | >= 55% |
| Share rate (`share_click / session_scored`) | >= 22% |
| Retake/compare usage (`compare_created / session_scored`) | >= 8% |
| Optional account claim rate (`session_claimed / session_scored`) | >= 6% |

## v1.1 Backlog (Impact / Effort)

### High impact, low/medium effort
- Add side-by-side trait conflict explanations in compare mode.
- Improve referral attribution from click-through to scored session.
- Add leaderboard snippets: "Most common among builders this week."

### High impact, high effort
- Multi-agent compare matrix (3+ sessions with mergeable labels).
- Personal history timeline with type drift over time.
- Rich evidence view with quote-level context linking.

### Medium impact
- Localization for spicy mode copy.
- Exportable PDF result cards.
- Team workspace aggregation dashboards.

## Experiment Templates

### A/B Copy Experiment
- Hypothesis: A playful launch line increases session starts.
- Variant A: "Your AI has tea about you."
- Variant B: "Find out what your AI really thinks of you."
- Primary metric: `session_created / landing_view`
- Guardrail: no completion drop > 10%

### Spicy Intensity Experiment
- Hypothesis: Softer spicy copy increases share rate without complaints.
- Variant A: current intrusive mode text.
- Variant B: softened modifiers and fewer harsh metaphors.
- Primary metric: `share_click / session_scored`
- Guardrail: moderation rewrite rate should not increase.

## Weekly Operating Cadence (Launch Month)
- Monday: review funnel + top shared types + moderation events.
- Tuesday: ship one copy or UX experiment.
- Wednesday: analyze experiment movement and retention deltas.
- Thursday: implement fixes for biggest drop-off stage.
- Friday: release summary and next-week priorities.
