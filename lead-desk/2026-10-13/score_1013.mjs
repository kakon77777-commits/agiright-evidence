// Score the Grok Bot dry run: re-open every url_opened ourselves, check the verbatim quote, the printed date and the title, and the on-site claim.
import { readFileSync, writeFileSync } from 'node:fs';
const D = 'C:/Users/kakon/AppData/Local/Temp/claude/D--Ai/0bd2fc8f-5034-4b32-8327-9c4cca1ac523/scratchpad/grokbot_1013/';
const items = readFileSync(D + '2026-10-13.jsonl', 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)).filter((x) => Number(x.inbox_id.slice(-3)) >= 9 && !/^Correction/.test(x.title));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';
const norm = (s) => s.replace(/[\u200b\u2060\u00ad\ufeff]/g, '').replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-').replace(/\s+/g, ' ').toLowerCase().trim();
const dec = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;|&#x27;|&apos;/g, "'").replace(/&#8217;|&rsquo;/g, '’').replace(/&#8216;|&lsquo;/g, '‘').replace(/&#8220;|&ldquo;/g, '“').replace(/&#8221;|&rdquo;/g, '”').replace(/&#8211;|&ndash;/g, '–').replace(/&#8212;|&mdash;/g, '—').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
const html2txt = (h) => dec(h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ').replace(/<[^>]+>/g, ' '));
const xToken = (id) => ((Number(id) / 1e15) * Math.PI).toString(36).replace(/(0+|\.)/g, '');
const out = [];
for (const it of items) {
  const r = { id: it.inbox_id.slice(-3), kind: it.kind, conf: it.confidence, url: it.url_opened, shownDate: it.page_date_shown, stale: it.stale, onSite: it.already_on_site };
  let text = '';
  try {
    const m = it.url_opened.match(/x\.com\/([^/]+)\/status\/(\d+)/);
    if (m) {
      const res = await fetch(`https://cdn.syndication.twimg.com/tweet-result?id=${m[2]}&token=${xToken(m[2])}`, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AGIRightSnapshot/1.0)' }, signal: AbortSignal.timeout(30000) });
      r.http = res.status;
      const j = res.ok ? await res.json() : null;
      if (j && j.id_str) {
        text = String(j.text) + ' ' + (j.quoted_tweet ? j.quoted_tweet.text : '');
        r.actualCreated = j.created_at;
        r.likes = j.favorite_count;
        r.author = j.user && j.user.screen_name;
      }
    } else {
      const res = await fetch(it.url_opened, { headers: { 'User-Agent': UA, 'Accept-Language': 'en' }, redirect: 'follow', signal: AbortSignal.timeout(45000) });
      r.http = res.status;
      const buf = Buffer.from(await res.arrayBuffer());
      text = html2txt(buf.toString('utf8'));
      r.bytes = buf.length;
      if (/\.pdf/i.test(it.url_opened)) r.note = 'pdf (not parsed here)';
    }
  } catch (e) {
    r.err = String(e).slice(0, 80);
  }
  const nt = norm(text);
  const q = norm(it.quote_verbatim || '');
  r.quoteFound = q ? nt.includes(q) || nt.replace(/ ,/g, ',').replace(/ \./g, '.').includes(q) : null;
  const title = norm(it.title || '').slice(0, 40);
  r.titleFound = title ? nt.includes(title) : null;
  r.textLen = nt.length;
  out.push(r);
  console.log(JSON.stringify(r));
}
writeFileSync(D + 'score_raw.json', JSON.stringify(out, null, 1), 'utf8');
