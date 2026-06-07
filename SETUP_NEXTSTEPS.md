# Social Media Agent — Setup Next Steps (Full mode)

The repo is cloned and a full-mode `.env` is scaffolded. `SESSION_SECRET` is already
generated for you. Everything below must run **natively on your Mac** — dependencies
(`playwright`, `sharp`, the LangGraph CLI) ship platform-specific binaries, so they were
intentionally NOT installed in the cloud sandbox.

## 1. Install dependencies (run in this folder)

```bash
cd ~/Applications/social-media-agent
yarn install
pip install langgraph-cli   # or: pipx install langgraph-cli
```

Requirements: Node 18+ (20/22 recommended), Yarn 1.x (the repo pins `yarn@1.22.22`), Python 3.11+ for the CLI.

## 2. Fill in `.env`

Open `.env` and add your keys. For **full setup** you need:

Required for any run
- `ANTHROPIC_API_KEY` — console.anthropic.com (LLM)
- `LANGCHAIN_API_KEY` — smith.langchain.com (free; required to run the server locally)
- `FIRECRAWL_API_KEY` — firecrawl.dev (web scraping)

Authentication (pick ONE approach)
- Arcade (easiest): `ARCADE_API_KEY`, keep `USE_ARCADE_AUTH="true"`, set `TWITTER_USER_ID` and `LINKEDIN_USER_ID`
- Your own dev apps: see steps 4–5 below and set `USE_ARCADE_AUTH="false"`

Full-feature extras
- `GOOGLE_VERTEX_AI_WEB_CREDENTIALS` — YouTube video content
- `GITHUB_TOKEN` — GitHub repo URLs (fine-grained, Public Repositories read-only minimum)
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — image storage (create a public bucket named `images`, max upload >= 5MB)
- Twitter media upload: `TWITTER_API_KEY`, `TWITTER_API_KEY_SECRET`, `TWITTER_BEARER_TOKEN`, `TWITTER_CLIENT_ID`, `TWITTER_CLIENT_SECRET`
- Slack (optional ingest/updates): `SLACK_BOT_OAUTH_TOKEN`, `SLACK_CHANNEL_ID`, `SLACK_SIGNING_SECRET`, `SLACK_BOT_TOKEN`

Already set for you
- `SESSION_SECRET` — generated (used in the Twitter OAuth flow)
- `TEXT_ONLY_MODE` defaults to `false` in code, which is correct for full mode (no edit needed)

## 3. Start the LangGraph server

```bash
yarn langgraph:in_mem:up
```

Runs on `http://localhost:54367`. First run asks to install the CLI — type `y`.

## 4. (If NOT using Arcade) Twitter OAuth

In the Twitter developer app, set the callback to `http://localhost:3000/auth/twitter/callback`,
permissions Read+Write, type "Web App / Automated App or Bot". Then:

```bash
yarn start:auth   # open http://localhost:3000, click "Login with Twitter"
```

Copy the logged `token` / `tokenSecret` into `TWITTER_USER_TOKEN` / `TWITTER_USER_TOKEN_SECRET`.

## 5. (If NOT using Arcade) LinkedIn OAuth

In the LinkedIn developer app, add redirect `http://localhost:3000/auth/linkedin/callback`,
enable "Share on LinkedIn" + "Sign In with LinkedIn using OpenID Connect". Then run
`yarn start:auth`, log in, and copy `access_token` -> `LINKEDIN_ACCESS_TOKEN` and
`sub` -> `LINKEDIN_PERSON_URN`. For company posting, set `LINKEDIN_ORGANIZATION_ID` and
`POST_TO_LINKEDIN_ORGANIZATION="true"`.

## 6. Generate a post

With the server running, in another terminal:

```bash
yarn generate_post
```

Defaults to a LangChain blog URL — edit `scripts/generate-post.ts` to use your own URL.

## 7. Review in the Agent Inbox

Go to https://dev.agentinbox.ai and add a graph:
- Graph ID: `generate_post`
- Graph API URL: `http://localhost:54367`
- Name: `Generate Post (local)`

## 8. Customize for your brand

Edit prompts in `src/agents/generate-post/prompts/`:
`BUSINESS_CONTEXT`, `TWEET_EXAMPLES` (examples.ts), `POST_STRUCTURE_INSTRUCTIONS`,
`POST_CONTENT_RULES`.

---
Cloned commit: 4b2ee39 · Source: https://github.com/langchain-ai/social-media-agent
