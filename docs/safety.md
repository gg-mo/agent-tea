# Safety Guardrails (AE-19)

Agent Tea supports funny/spicy copy, but it should never become abusive or demeaning.

## Guardrail Architecture
1. Narrative lines are generated in `buildProfileCopy`.
2. Every line passes through moderation transforms in `src/lib/results/moderation.ts`.
3. Matched terms are rewritten using severity-based replacements.
4. Rewrites are surfaced to analytics via `moderation_rewrite` event for auditability.

## Severity Tiers
- `1` Low-risk spicy language, safe to keep with minimal rewrite.
- `2` Escalating tone, rewrite to neutral/funny alternatives.
- `3` Harmful/abusive language, always rewritten.

## Denylist Rewrite Strategy
The guardrail layer scans for disallowed terms and rewrites them.

Examples:
- `idiot` -> `chaos engine`
- `stupid` -> `rough`
- `worthless` -> `low-signal`
- `moron` -> `wild card`
- `abusive` -> `overheated`

## Moderation Audit Logging
When rewrites occur, the client emits `moderation_rewrite` with:
- `rewriteCount`
- `highestSeverity`
- `terms`
- `typeCode`
- `mode`

This allows post-launch review of:
- which phrases are being hit most
- whether intrusive mode is over-triggering rewrites
- whether copy templates need editing

## UX Fallback Rules
- Never block result rendering due to moderation.
- Always return a safe rewritten line instead of hard failure.
- Keep tone playful, not clinical, after rewrite.

## Future Hardening Backlog
- Add allowlist-by-template for high-confidence safe phrases.
- Add locale-aware moderation map.
- Add per-term hit-rate alerting when severity-3 rewrites spike.
