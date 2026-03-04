# 🚀 Space Launch Tracker

A real-time space launch tracker with live countdown timers, built with React, TypeScript, and Vite.

**Live:** [https://kriskit.github.io/launch-tracker/](https://kriskit.github.io/launch-tracker/)

## Features

- **Live countdown** — prominent timer counting down to the next upcoming launch
- **Launch cards** — rocket name, provider, mission description, launch site, orbit, status
- **Launch images** — photos for each launch where available
- **Status badges** — color-coded Go / TBD / Successful indicators
- **Rate-limit friendly** — 5-minute localStorage cache to stay within free tier (15 req/hr)
- **Dark space theme** — deep blues/blacks with animated star field
- **Mobile responsive** — works on any screen size
- **Error handling** — loading states, error messages, retry button

## Data Source

[Launch Library 2](https://thespacedevs.com/llapi) by The Space Devs — free, no API key required.

## Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173/launch-tracker/](http://localhost:5173/launch-tracker/)

## Build

```bash
npm run build
npm run preview
```

## License

MIT
