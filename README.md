# agiright-evidence

Public archive of the source captures and saved source texts behind the arguments on [AGIRight.org](https://agiright.org). 這是 AGIRight.org 論證所依據的來源擷取與當日保存的來源文字，公開放在這裡。

AGIRight.org discusses AI power and AI rights. This repository is a **historical record** of what the sources we cite said when we read them. It is not a news service and not a verification service: if you want fuller evidence on any claim, go to the original sources and use AI to help you search. Our duty is only to confirm the sources of our own arguments; we do not search for you.

## Layout

| Path | What it holds |
| --- | --- |
| `topic-2026-NNNNNN/`, `signal-2026-NNNNNN/` | Source snapshots written by `scripts/snapshot.mjs` in the site repository ([`kakon77777-commits/agiright-org`](https://github.com/kakon77777-commits/agiright-org)): `<entry-id>/<UTC capture time>/` with `raw.<ext>` (HTTP body as served), `rendered.html` and `rendered.txt` (what a browser showed after scripts ran), `screenshot.png` (full page, 1366 px wide) and `meta.json`. The SHA-256 of these files, the capture time and the Wayback links are published at <https://agiright.org/snapshots/index.json>. |
| `_superseded/` | Earlier captures replaced by a redo; kept for the record. |
| `sources/YYYY-MM-DD/` | The primary texts read for that day's entries (HTML as fetched, tag-stripped `.txt`, PDFs and their text, X post texts read in a browser). Begins 2026-10-06. |
| `lead-desk/YYYY-MM-DD/` | Files from the Grok Bot lead desk (daily `.jsonl` and `.md` digests, `FOLLOWING.md`, INDEX/README versions) and `LEAD_DESK_INSTRUCTIONS_v2.md`. A lead is a lead, not a record. |
| `README.txt` | The original note for the snapshot folder. |

## Rules

* Files are write-once: add, never edit or delete (a redo goes to `_superseded/`).
* A snapshot shows what a page said when we captured it, not what it said earlier, and not whether it is true.
* These are copies of other publishers' pages, kept so readers can check what a cited source said. **If you hold rights in a page and want a capture removed, open an issue in this repository and it will be taken down.**
* No credentials are kept here. Third-party pages may embed their own public keys in their HTML; those belong to the publishers.
* If this repository grows too large, further repositories will be started and named by period, and this README will point to them.

Created 2026-10-12. Maintained by the AGIRight daily flow.
