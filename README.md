# Woods Lisenby: Theology and Practice — web app

A shareable site with the theology systematic, the practice library, and a chat that
answers from the full text of everything (sermons, notes, Bible studies, papers,
and the Resource Hub library).

## Files
- `index.html` — the whole interface (loads `data/corpus.json` in the browser).
- `data/corpus.json` — the full-text corpus (large; served gzipped by the host).
- `api/chat.js` — a serverless function that holds the Anthropic API key and calls Claude.
- `vercel.json` — config.

## Deploy on Vercel (recommended)
1. Go to vercel.com, "Add New… Project," and drag this whole folder in (or push it to a
   GitHub repo and import it).
2. In the project's Settings -> Environment Variables, add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your key from console.anthropic.com
3. Deploy. Browsing works immediately; the chat works once the key is set.

## Deploy on Netlify (alternative)
Netlify serves the site the same way, but its functions live in `netlify/functions/`
and use a slightly different signature. Ask Claude to produce the Netlify version if you
prefer Netlify; the Vercel layout above is the simplest.

## Cost
The chat uses Claude Haiku 4.5. A typical question costs about 1 to 2 cents. Set a monthly
spend limit in the Anthropic console to cap it. Browsing costs nothing.

## Updating the corpus
Regenerate `data/corpus.json` with the build scripts in the Mind Map project folder
(`build_corpus.py`, `build_corpus_academic.py`) and replace the file.
