# melearn

modern offline course viewer for video courses with notes, bookmarks, and progress tracking.

## overview

melearn is a cross-platform desktop application built with tauri 2.x and next.js 16. it allows users to organize and view locally stored video courses with advanced features like timestamped notes, bookmarks, and progress tracking.

## tech stack

### frontend

- next.js 16 with react 19
- typescript 5.8
- tailwind css 4
- retroui components
- trpc + @tanstack/react-query for data sync
- react-hook-form + zod for forms and validation
- nuqs for url state
- recharts for charts
- @tanstack/react-table for tables
- motion for animations
- date-fns for date utilities
- zustand for state management
- minisearch for local search

### backend

- tauri 2.x (rust)
- sqlite via tauri-plugin-sql
- custom http video server (axum + tower-http)
- file system scanner with course detection

## project structure

```
melearn/
├── app/                    # next.js app router
│   ├── globals.css         # global styles and theme variables
│   ├── layout.tsx          # root layout with theme provider
│   └── page.tsx            # main application entry
├── components/             # react components
│   ├── retroui/             # retroui primitives
│   ├── course-library.tsx  # course grid/list view
│   ├── lesson-viewer.tsx   # main content viewer
│   ├── video-player.tsx    # native html5 player with custom controls
│   ├── sidebar.tsx         # navigation sidebar
│   ├── notes-panel.tsx     # timestamped notes ui
│   └── ...
├── lib/                    # shared utilities
│   ├── store.ts            # zustand store definition
│   ├── database.ts         # sqlite operations
│   ├── tauri.ts            # tauri api helpers
│   └── utils.ts            # common utilities
├── src-tauri/              # rust backend
│   ├── src/
│   │   ├── lib.rs          # tauri app entry, migrations, setup
│   │   ├── scanner.rs      # file system scanner
│   │   └── video_server.rs # http video streaming server
│   ├── Cargo.toml          # rust dependencies
│   └── tauri.conf.json     # tauri configuration
└── types/                  # typescript type definitions
```

## features

### video playback

- native html5 video with custom retroui controls
- playback speed control (0.5x - 2x)
- keyboard shortcuts for navigation
- progress tracking with resume position
- subtitle support (.srt files)

### course management

- automatic course detection from folder structure
- section grouping based on directory hierarchy
- progress percentage per course and lesson
- last accessed tracking

### notes and bookmarks

- timestamped notes synced to video position
- click note to jump to timestamp
- bookmarks for quick reference
- markdown export for notes

### search

- full-text search across courses, lessons, notes
- fuzzy matching with minisearch
- keyboard shortcut (cmd/ctrl + k) for quick access

## development

### prerequisites

- node.js 22+
- pnpm 9+
- rust 1.75+
- tauri cli 2.x

### setup

```bash
# install dependencies
pnpm install

# run development server
pnpm tauri:dev
```

### build

```bash
# build for current platform
pnpm tauri:build

# platform-specific builds
pnpm tauri:build:linux    # .deb, .rpm, .appimage
pnpm tauri:build:windows  # .msi, .exe
pnpm tauri:build:macos    # .dmg, .app
```

## database schema

### courses

| column           | type    | description                     |
| ---------------- | ------- | ------------------------------- |
| id               | text    | nanoid primary key              |
| name             | text    | course title                    |
| path             | text    | absolute filesystem path        |
| total_duration   | integer | total video duration in seconds |
| watched_duration | integer | watched time in seconds         |
| last_accessed    | text    | iso timestamp                   |
| metadata         | text    | json blob for extra data        |

### lessons

| column        | type    | description                  |
| ------------- | ------- | ---------------------------- |
| id            | text    | nanoid primary key           |
| course_id     | text    | foreign key to courses       |
| section_name  | text    | section/folder name          |
| name          | text    | lesson title                 |
| path          | text    | absolute file path           |
| type          | text    | video, audio, document, quiz |
| duration      | integer | duration in seconds          |
| watched_time  | integer | watched time in seconds      |
| completed     | integer | 1 if completed, 0 otherwise  |
| last_position | real    | resume position in seconds   |

### notes

| column     | type | description                |
| ---------- | ---- | -------------------------- |
| id         | text | nanoid primary key         |
| lesson_id  | text | foreign key to lessons     |
| timestamp  | real | video timestamp in seconds |
| content    | text | note text content          |
| created_at | text | iso timestamp              |

### bookmarks

| column     | type | description            |
| ---------- | ---- | ---------------------- |
| id         | text | nanoid primary key     |
| lesson_id  | text | foreign key to lessons |
| timestamp  | real | video timestamp        |
| name       | text | bookmark label         |
| created_at | text | iso timestamp          |

## platform notes

### linux

the app automatically sets `GST_PLUGIN_FEATURE_RANK=avdec_h264:MAX` on startup to force gstreamer's software h264 decoder. this fixes a webkitgtk frame ordering bug that causes video flickering with hardware-accelerated decoding on wayland.

### windows / macos

no special configuration required. video playback uses native system codecs.

## keyboard shortcuts

| shortcut     | action                        |
| ------------ | ----------------------------- |
| space        | play/pause video              |
| left/right   | seek -10s / +10s              |
| up/down      | volume up/down                |
| m            | toggle mute                   |
| f            | toggle fullscreen             |
| n            | add note at current timestamp |
| cmd/ctrl + k | open search                   |

## configuration

### tauri.conf.json

- `app.security.csp`: content security policy for asset loading
- `app.security.assetProtocol.scope`: allowed filesystem paths
- `bundle.linux.appimage.bundleMediaFramework`: includes gstreamer in appimage

### next.config.ts

- `output: "export"`: static site generation for tauri
- `reactStrictMode: false`: disabled to prevent video player double-mount

## troubleshooting

### video not playing

1. check console for errors
2. verify file codec (h264/aac in mp4 container is best supported)
3. on linux, check gstreamer plugins: `gst-inspect-1.0 avdec_h264`

### clicks not working in production build

this is a next.js hydration issue with webkitgtk. use development mode (`pnpm tauri:dev`) or rebuild with fresh next cache.

### appimage build fails

this is a known tauri + linuxdeploy issue. use the .deb or .rpm package instead, or run the release binary directly from `src-tauri/target/release/melearn`.

## license

mit
