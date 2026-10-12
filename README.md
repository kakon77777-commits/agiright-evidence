# agiright-evidence (PRIVATE)

Private evidence archive behind AGIRight.org (agiright.org). 這是 AGIRight.org 背後的私有證據庫（新聞、爆料、快照與當日來源原文）。

**Do not make this repository public and do not republish its contents.** Most of it is copies of other publishers' pages, kept only so we can check what a source said when we read it.

## Layout

| Path | What it holds |
| --- | --- |
| `topic-2026-NNNNNN/`, `signal-2026-NNNNNN/` | Source snapshots written by `scripts/snapshot.mjs` in the site repo (`kakon77777-commits/agiright-org`): `<entry-id>/<UTC capture time>/` with `raw.<ext>` (HTTP body as served), `rendered.html` and `rendered.txt` (what a browser showed after scripts ran), `screenshot.png` (full page, 1366 px wide), `meta.json`. The SHA-256 of these files, the capture time and the Wayback links are published at `https://agiright.org/snapshots/index.json` (from `src/data/snapshots.json`). |
| `_superseded/` | Earlier captures replaced by a redo; kept for the record. |
| `sources/YYYY-MM-DD/` | The primary texts the daily flow read for that day's topics and signals (HTML as fetched, tag-stripped `.txt`, PDFs and their `pdftotext` output, X post texts read in the browser). Quote checks run against these. Begins 2026-10-06; earlier days' working copies were not kept. |
| `lead-desk/YYYY-MM-DD/` | Files from the Grok Bot lead desk (daily `.jsonl` and `.md` digests, `FOLLOWING.md`, INDEX/README versions) as downloaded, and `LEAD_DESK_INSTRUCTIONS_v2.md`. A lead is a lead, not a record: items used on the site were re-verified at their primaries. |
| `README.txt` | The original note for the snapshot folder. |

## Rules

* Evidence files are write-once. Add; never edit or delete (a redo goes to `_superseded/`).
* A snapshot shows what a page said when we captured it, not what it said earlier, and not whether it is true.
* No credentials in this repository. Third-party pages may embed their own public keys in their HTML; those are the publishers', not ours.
* Copying this elsewhere (another cloud, a drive) is the owner's choice and tooling (rclone); it is not part of the site's deploy.

Created 2026-10-12 after the owner retired the Google-Drive-for-desktop backup. Maintained by the AGIRight daily flow (Themis).
