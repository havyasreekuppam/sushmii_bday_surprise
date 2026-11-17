# Happy 19th Birthday Susmitha

A personal, continuously scrollable birthday story for Susmitha.

## Quick Start

```bash
npm install
npm run dev
```

## Personalization

Edit **`src/data/birthdayData.ts`** to change the experience's personalized content:

| What to change | Where in the file |
|---|---|
| Welcome text | `welcome` object |
| Birthday reveal | `reveal` object |
| Warnings | `warnings` object |
| Spotify dedications | `music.songs` array |
| Photos & captions | `photos` array |
| The letter | `letter` string |
| Wishes | `wishDetails` object |
| Contract and terms | `contract` and `terms` objects |
| Final message | `finale` object |

### Adding Photos

1. Place images in `public/photos/`
2. Reference them in `birthdayData.photos` as `"/photos/filename.jpg"`

### Adding Music

The looping background track is `public/music/music_full.mp3`. It starts after the visitor's first interaction, remains mounted while scrolling, and can be muted or unmuted from the fixed music button. The six dedication cards link to Spotify search results for their exact song titles; Spotify playback opens separately from the background track.

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect the repo to Vercel via their dashboard — it auto-detects Vite.

## Tech Stack

React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + Lucide React
