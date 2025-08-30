## AI Vision App

Two features:
- Ask AI: send text and optional images; AI analyzes and answers.
- Document Q&A: take photos of book pages, upload per session, and ask questions about them.

### Quickstart
1. Copy env and set your keys
```
cp .env.example .env.local
```
2. Install deps
```
npm install
```
3. Run dev server
```
npm run dev
```

Open `http://localhost:3000`.

### Environment
- `OPENAI_API_KEY`: OpenAI API key with access to vision-capable models (e.g., gpt-4o/gpt-4o-mini)

### Notes
- Images are stored per session on local filesystem under `.data/sessions/<id>` for the doc feature.
- This is an MVP. For production, replace filesystem storage with an object store and add auth.

