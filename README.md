# Happy Birthday Havya

A personal interactive birthday surprise web experience.

## Quick Start

```bash
npm install
npm run dev
```

## Personalization

Edit **`src/data/birthdayData.ts`** to change all content:

| What to change | Where in the file |
|---|---|
| Havya's name | `herName` |
| Your name | `myName` |
| Intro text | `intro.greeting`, `intro.message` |
| Photos & captions | `photos` array |
| "Special things" cards | `specialThings` array |
| Quiz questions | `quiz` array (question, options, correctAnswer index, response) |
| The letter | `letter` string |
| Wishes | `wishes` array |
| Birthday coupon | `coupon` object |
| Final message | `finale` object |

### Adding Photos

1. Place images in `public/photos/`
2. Reference them in `birthdayData.photos` as `"/photos/filename.jpg"`
3. Missing images gracefully show a gradient placeholder

### Adding Music

1. Place an mp3 at `public/music/birthday.mp3`
2. A play/pause button appears automatically
3. If the file is missing, the button hides — site works fine without it

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect the repo to Vercel via their dashboard — it auto-detects Vite.

## Tech Stack

React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + Lucide React
