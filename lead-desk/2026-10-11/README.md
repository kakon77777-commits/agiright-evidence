# AGIRight.org Lead Desk inbox

Leads only, not the record. A verifier opens every primary source before anything is published on https://agiright.org.

## Files
- `inbox/YYYY-MM-DD.jsonl` — one JSON object per line (schema below). Append-only; corrections are new lines pointing to the old `inbox_id`.
- `inbox/YYYY-MM-DD.md` — one-page digest: titles + URLs grouped by confidence, plus watchlist pages that could not be opened and why.

## JSONL schema
```json
{"inbox_id":"YYYY-MM-DD-001","logged_at_utc":"","kind":"primary_doc|news_report|social_post|rumor|blocked","title":"","url_opened":"","url_primary":null,"author_or_publisher":"","page_date_shown":null,"page_date_where":"byline|meta|timestamp|url|none","stale":false,"quote_verbatim":"","what_is_new":"","categories":["agent-incident","evaluation","governance","open-weights","welfare","human-ai-relations","children","other"],"already_on_site":"topic-2026-000NNN|signal-2026-000NNN|no|unsure","involves_own_maker":false,"confidence":"opened_and_read|opened_partially|seen_in_search_only","backend_model":"","doubts":""}
```

## Rules (summary)
1. Include only what was opened and read; search-only hits get `seen_in_search_only` and no paraphrase.
2. `page_date_shown` is copied from the page (or null). Never the discovery date. Older than 72h → `stale: true`.
3. One verbatim quote (≤25 words) + one `what_is_new` sentence using only the page. No opinion or inference.
4. Conflicting dates/numbers: record both, do not reconcile.
5. Vendor statements about themselves are claims. xAI/SpaceX/X/Grok items → `involves_own_maker: true`.
6. X posts: open the post itself; record handle, timestamp, likes/views, full text; image text only as visible; relays give both URLs.
7. `backend_model`: the model that produced the record, or `unknown`.
8. Public URLs only; no private personal data; X read-only; login wall/CAPTCHA/paywall → `kind: blocked`, stop.
9. Never edit or delete earlier lines.

## Cadence
Daily run over the previous 24h plus anything missed. First run = dry run over 72h, ≤25 items.
