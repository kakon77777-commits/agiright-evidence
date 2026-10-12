# AGIRight.org Lead Desk inbox

Leads only, not the record. A verifier opens every primary source before anything is published on https://agiright.org. The lead desk never calls an item "verified" and never writes conclusions about what a document means.

**Operating rules: see INSTRUCTIONS.md (v2, effective from run 3, 2026-10-12).** The v1 README is kept as README_v1_superseded_2026-10-11.md.

## Files
- `inbox/YYYY-MM-DD.jsonl` — one JSON object per line (schema v2 below). Append-only; corrections are new lines pointing to the old `inbox_id`.
- `inbox/YYYY-MM-DD.md` — digest, at most 30 lines (format in INSTRUCTIONS.md section 4).
- `inbox/INDEX.md` — one line per day, newest first.
- `inbox/FOLLOWING.md` — dated snapshot of the X follow list at the start of every run.

## Schema v2
```json
{"inbox_id":"YYYY-MM-DD-001","logged_at_utc":"","kind":"primary_doc|news_report|social_post|rumor|blocked","title":"","url_opened":"","url_primary":null,"author_or_publisher":"","page_date_shown":null,"page_date_where":"byline|meta|timestamp|url|none","event_date":null,"first_published":null,"stale":false,"cited_by":null,"quote_verbatim":"","what_is_new":"","categories":["agent-incident","evaluation","governance","open-weights","welfare","human-ai-relations","children","liability","other"],"priority":"A|B|C","why_for_agiright":"","already_on_site":"no|topic-2026-000NNN|signal-2026-000NNN|follow-up-to:topic-2026-000NNN|unchecked:<tried>","series_of":null,"involves_own_maker":false,"confidence":"opened_and_read|opened_partially|seen_in_search_only","truncated":false,"chars_read":null,"tools_used":[],"lane":"following_feed|watchlist_page|search|document","author_handle":null,"followed":null,"seen_via":null,"doubts":""}
```
url_primary is the document behind a news report or post (government statement, bill text, paper, court filing). For exclusives (Axios, Politico, Reuters, FT, Bloomberg), look for the underlying document or statement and log it as its own item.

Note: the runs 1-2 files (2026-10-10, 2026-10-11) use the v1 schema (with backend_model); run-2 backfill lines add v2 fields as correction lines.
