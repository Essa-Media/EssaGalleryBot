# EssaGalleryBot

EssaGalleryBot is a Discord bot for the Essa Gallery Project, designed to input image and YouTube video links through a Discord channel. It integrates with Cloudinary for image hosting and Redis for data storage.

## Features

- Discord bot using `discord.js`
- Image hosting via Cloudinary
- Data storage using Redis
- Logging with `pino` and optional pretty output using `pino-pretty`
- Configurable environment variables for easy setup
- Automatic upload using Discord channel

## Installation

1. Clone the repository:
    ```bash
   git clone https://github.com/Essa-Media/EssaGalleryBot.git
   cd EssaGalleryBot
    ```
2. Install dependencies:
    ```bash
    npm i -g yarn
    yarn install
    ```
3. Create `.env` file and from the example that are provided in `.env.example`:
    ```
    TOKEN="YOUR_DISCORD_BOT_TOKEN"
    CLIENT_ID="YOUR_CLIENT_ID"
    REDIS_URI="YOUR_REDIS_URI"
    CLOUDINARY_URL="YOUR_CLOUDINARY_URL"
    LOG_LEVEL="info|debug|fatal|error|warn|trace"
    ```
## Running the Bot
### Development with Pretty Logging:
  ```bash
  yarn run dev
  ```
### Development without Pretty Logging:
  ```bash
  yarn run dev-no-pretty
  ```
### Build:
Compiles the TypeScript code into JavaScript for production.
  ```bash
  yarn run build
  ```
### Production:
Runs the bot in production mode using the compiled JavaScript.
  ```bash
  yarn run production
  ```

