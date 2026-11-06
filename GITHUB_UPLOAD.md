# Uploading Devlon Solutions to GitHub

1. Unzip this file on your computer.
2. On github.com click **New repository**, name it (e.g. devlon-solutions), keep it Private, click **Create**.
3. On the new repo page click **uploading an existing file**, drag in everything inside the
   `devlon-solutions` folder (including the hidden `.env` and `.gitignore` files), then **Commit changes**.
   (Or with Git: `git init && git add . && git commit -m "first" && git branch -M main &&
   git remote add origin https://github.com/YOUR-NAME/devlon-solutions.git && git push -u origin main`)

## Running / hosting
- Install Bun (https://bun.sh), then `bun install` and `bun run dev` (opens http://localhost:8080).
- Build for hosting: `bun run build`.
- The AI chat assistant needs `LOVABLE_API_KEY` filled in `.env` (or in your host's environment settings).
- `.env` only holds public keys, so it is safe in a private repo.

## Client data
Quotes, leads and chats are saved in your Lovable Cloud database. View them in Lovable: Backend → Database → Tables.
