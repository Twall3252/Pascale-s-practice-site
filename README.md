# FlipperHub

This project is a simple React Native (Expo) application that aggregates firmware releases for the Flipper Zero and related developer boards.

## Features

- Preloaded list of popular firmware repositories
- Ability to add custom firmware repositories
- Fetches latest release information from GitHub
- Basic tab navigation for firmware list, upcoming apps, and settings

## Getting started

These instructions assume a Linux workstation.  You will need a recent
version of [Node.js](https://nodejs.org/) (18 or later) and `npm` installed.
On Debian/Ubuntu you can install them with:

```bash
sudo apt-get update
sudo apt-get install nodejs npm
```

Install the project dependencies and start the Expo development server:

```bash
npm install
npm start
```

From the interactive prompt you can press `a` to launch the Android
emulator or `w` to run the web version in your browser.
