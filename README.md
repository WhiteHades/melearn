# melearn

simple offline course learner with a tauri desktop app.

## requirements

- node 20+
- pnpm 10+
- rust + cargo
- tauri desktop prerequisites for your os

## features

- scan and organize local course folders
- custom video and document viewer
- timestamped lesson notes
- progress saved locally in sqlite
- light and dark themes

## tech stack

- frontend: next.js 16, react 19, tailwind css 4, shadcn ui components
- data: trpc, @tanstack/react-query
- forms: react-hook-form, zod
- state: zustand with persist
- search: minisearch
- url state: nuqs
- date utils: date-fns
- desktop: tauri 2.x with rust backend

## development

```bash
# install dependencies
pnpm install

# run the web shell
pnpm dev

# run the tauri desktop app
pnpm tauri:dev
```

note: folder scanning and local file playback are desktop-first. the web shell is mainly for ui work and static smoke checks.

`pnpm tauri:dev` already starts the web dev server for you through Tauri. don't run `pnpm dev` in a second terminal before it unless you intentionally want to manage the web server yourself.

## verification

```bash
# typecheck + lint + production web build + rust check
pnpm verify

# or run them one by one
pnpm type-check
pnpm lint
pnpm build
pnpm tauri:check
```

## manual smoke test

desktop / tauri:

1. run `pnpm tauri:dev`
2. click `Choose folder`
3. select a course library with nested folders and media/docs
4. confirm the library populates
5. open a course
6. play a video, seek, pause, resume, and reload the app
7. confirm progress restores
8. save a note on a lesson
9. reopen the lesson and confirm the note persists
10. open a markdown or pdf lesson and confirm it renders correctly

linux note: tauri dev needs a real desktop session. in a headless shell without x11/wayland, gtk/webview startup will fail.

web shell:

1. run `pnpm dev`
2. open `http://localhost:3000`
3. verify the home screen, theme toggle, empty states, and responsive layout
4. use `pnpm build` before shipping any ui changes

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

## license

source available - see license for details.
