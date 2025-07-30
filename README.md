# Music Player App

> A modern, responsive music player web app built with React, Vite, and Tailwind CSS. Connects to a music server via WebSocket for real-time playback control and album art display.

## Features

- Play, pause, skip, rewind, and forward music tracks
- Real-time progress and volume control
- Album art and track info display
- Responsive and mobile-friendly UI
- Settings modal for configuring the WebSocket server URL

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn

### Install dependencies

```bash
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
# or
yarn build
```

The optimized static files will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Usage

1. Start your compatible music server that exposes a WebSocket API.
2. Open the app in your browser.
3. Click the settings icon and enter your WebSocket server URL (e.g., `ws://localhost:8080`).
4. Enjoy controlling your music playback!
