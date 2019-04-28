# discord-snake

A bot to play snake on discord

[![Build Status](https://travis-ci.com/ptlm500/discord-snake.svg?branch=master)](https://travis-ci.com/ptlm500/discord-snake)

# Recommended tooling

## IDE
[Visual Studio Code](https://code.visualstudio.com/) with the following packages:

- ESLint
- Jest
- npm Intellisense
- Path Intellisense
- vscode-icons

[Git for Windows](https://gitforwindows.org/)

# Setup

## NPM
If you already have NPM installed you can skip this section. You can check this by running `node -v` and `npm -v` in your terminal.

1. [Install Node.js](https://www.npmjs.com/get-npm)
2. Verify your installation was succesful by running `node -v` and `npm -v` in your terminal.

## SSH keys
If you already have an SSH key for your development machine linked to your GitHub account you can skip this section.

1. [Generate an ssh key and add it to an ssh-agent](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

2. [Add an ssh key to your GitHub account](https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account)

## Repository setup

1. Open your terminal
2. Navigate to the directory where you want the local copy of the repository to be stored
3. Clone the repository by running `git clone git@github.com:ptlm500/discord-snake.git`
4. CD into `discord-snake` by running `cd discord-snake`
5. Run `npm install` to install the dependencies

## Setting up a Discord Bot

1. Follow [these steps](https://discordjs.guide/preparations/setting-up-a-bot-application.html) to setup a Discord Bot linked to your account. You'll use this bot for testing.
2. [Add a bot to a server you own](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links)
3. Open the repository folder `discord-snake` with VS Code
4. Create a new file called `secrets.json` in the root of the project
5. Copy the following into `secrets.json`:

```json
{
  "token": "<YOUR BOTS TOKEN>"
}
```

## Test it out!

Hopefully you're now ready to start up the bot! Test it out by running `npm start` in your terminal.
If you see "Ready !" logged out, your server is running.

Press ctrl + c in the terminal window to shutdown the bot.

Optionally, you can install nodemon to live update your bot as you make changes to the code!

1. Run `npm install nodemon -g` to globally install nodemon
2. Start the server by running `nodemon npm start`
3. You can force a restart by typing `rs` into the terminal, and shutdown the bot by pressing ctrl + c
