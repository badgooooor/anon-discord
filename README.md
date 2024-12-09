# anon-discord

Proof-of-concept for proving if user has a role in a discord server using bot client to do the process from generating proof to bring proof to on-chain.

## Used technologies

- [Noir](https://noir-lang.org/) - DSL for zero-knowledge proof circuit
- [discord.js](https://discordjs.guide/#before-you-begin)
- [Bun](https://bun.sh)

## Prerequisite and setup

- Have `bun` installed
- Have [noir.js toolchain](https://noir-lang.org/docs/getting_started/quick_start) installed (`nargo`, `bb`)
- Have [Discord bot token](https://discord.com/developers/docs/tutorials/hosting-on-cloudflare-workers#creating-an-app-on-discord)
- Have Discord bot added to your discord server

1. To install dependencies:

```bash
bun install
```

2. Add copy `packages/client/.env.example` to `packages/client/.env` and add environment variables

```bash
cp packages/client/.env.example packages/client/.env

// Environment variables
# Discord application key
DISCORD_APPLICATION_ID=
DISCORD_APPLICATIION_PUBLIC_KEY=
DISCORD_BOT_TOKEN=
```

3. Generate circuit

```bash
bun run circuit:check
```

4. Run `client`

```bash
bun run client:start
```
