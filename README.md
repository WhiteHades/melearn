# melearn

modern offline course viewer with a tauri desktop app.

## features

- scan and organize local video courses
- custom video player with keyboard shortcuts
- timestamped notes
- command palette search (cmd+k)
- analytics dashboard with progress tracking
- retro ui themes
- offline-first with sqlite persistence

## tech stack

- frontend: next.js 16, react 19, tailwind css 4, shadcn ui components
- data: trpc, @tanstack/react-query
- forms: react-hook-form, zod
- state: zustand with persist
- search: minisearch
- url state: nuqs
- charts: recharts
- tables: @tanstack/react-table
- animations: motion
- date utils: date-fns
- desktop: tauri 2.x with rust backend

## development

```bash
# install dependencies
pnpm install

# run web dev server
pnpm dev

# run tauri desktop app
pnpm tauri:dev
```

## build

### web app

```bash
pnpm web:build
# output in /out directory
```

### desktop app

```bash
# build for current platform
pnpm tauri:build

# platform-specific builds
pnpm tauri:build:linux    # linux (deb, appimage)
pnpm tauri:build:windows  # windows (msi, exe)
pnpm tauri:build:macos    # macos intel
pnpm tauri:build:macos-arm # macos apple silicon
```

build outputs:

- linux: `src-tauri/target/release/bundle/deb/` and `appimage/`
- windows: `src-tauri/target/release/bundle/msi/` and `nsis/`
- macos: `src-tauri/target/release/bundle/dmg/` and `macos/`

## keyboard shortcuts

| key     | action           |
| ------- | ---------------- |
| space/k | play/pause       |
| m       | mute/unmute      |
| f       | fullscreen       |
| j/←     | seek back 10s    |
| l/→     | seek forward 10s |
| ↑/↓     | volume up/down   |
| n       | next lesson      |
| p       | previous lesson  |
| cmd+k   | search           |

## license

source available - see license for details.
