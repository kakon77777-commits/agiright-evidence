#!/bin/bash
# Add a day's material to the private evidence repository and push it, then confirm the remote matches.
#
#   tools/daily-add.sh <YYYY-MM-DD> [<source-texts-dir> [<lead-desk-dir>]]
#
# - Snapshot folders (topic-*/, signal-*/, _superseded/) written by `npm run snapshot -- --pending` are always added.
# - <source-texts-dir>  (the day's saved primaries, e.g. the session's src_YYYYMMDD) is copied to sources/<date>/ .
# - <lead-desk-dir>     (the Grok Bot's downloaded files)                          is copied to lead-desk/<date>/ .
# Files are write-once: existing files are never overwritten (cp -n); nothing is deleted. Bytes are kept exact
# (.gitattributes "* -text"). Needs `gh auth` for kakon77777-commits. The repository is PUBLIC (owner's decision 2026-10-12);
# if it grows too large, start a further repository named by period and point the README to it.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
DATE="${1:?usage: tools/daily-add.sh YYYY-MM-DD [source-texts-dir [lead-desk-dir]]}"
if [ -n "$2" ]; then mkdir -p "sources/$DATE" && cp -rn "$2/." "sources/$DATE/"; fi
if [ -n "$3" ]; then mkdir -p "lead-desk/$DATE" && cp -rn "$3/." "lead-desk/$DATE/"; fi
git add -A
if git diff --cached --quiet; then echo "nothing new to commit"; else
  git commit -q -m "Add evidence and sources for $DATE

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
  echo "committed: $(git log --oneline -1)"
fi
git push -q origin main
LOCAL="$(git rev-parse HEAD)"
REMOTE="$(git ls-remote origin refs/heads/main | cut -f1)"
if [ "$LOCAL" = "$REMOTE" ]; then echo "OK: remote main == local HEAD ($(git rev-parse --short HEAD))"; else echo "MISMATCH: local $LOCAL remote $REMOTE"; exit 1; fi
