- npm install -g ngrok
- npm run dev -- --host
- ngrok http 5173

- ngrok config check
- ngrok config add-authtoken PASTE_TOKEN_HERE

- vite.config.ts
- server: {
    allowedHosts: [
      "reversing-reliant-scavenger.ngrok-free.dev",
    ],
  }
