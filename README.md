# melearn

modern, shadcn-powered offline course viewer with tauri desktop app.

## features

- 📚 scan and organize local video courses
- 🎬 custom video player with keyboard shortcuts
- 📝 timestamped notes and bookmarks
- 🔍 command palette search (⌘k)
- 📊 analytics dashboard with progress tracking
- 🎨 10 color themes (catppuccin, gruvbox, tokyo night, etc.)
- 💾 offline-first with sqlite persistence

## tech stack

- **frontend**: next.js 16, react 19, tailwind css 4, shadcn/ui
- **desktop**: tauri 2.x with rust backend
- **state**: zustand v5.0.8 with persist middleware
- **search**: minisearch for fast local search

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

- **linux**: `src-tauri/target/release/bundle/deb/` and `appimage/`
- **windows**: `src-tauri/target/release/bundle/msi/` and `nsis/`
- **macos**: `src-tauri/target/release/bundle/dmg/` and `macos/`

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
| ⌘k      | search           |

## license

source available - see LICENSE for details.
