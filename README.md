# Beat Junkies Record Pool manager

A niche webapp to navigate and manage your
[Beat Junkies record pool](https://www.beatjunkies.com/record-pool/) library.

<img title="Beat Junkies Record Pool" src="https://user-images.githubusercontent.com/487182/141512226-0444e9ff-e4b9-48a1-bae3-790d0a57ff65.gif" width="600"  />

## Features

- 🔎 Search by title and filter by genre + clean/dirty tracks\*
- 🗃️ Mark tracks as 'reviewed', 'queued' or 'downloaded' for easy management
- 📥 Copy URL's of queued tracks for batch downloading\*\*
- ⌨️ Keyboard shortcuts
- 💿 Quick link to Spotify search
- 🔅 Dark & light mode

\* Will filter out the other version when both a dirty and a clean version is
available.

\*\* You may want to use a download manager that accepts a list of links
[like this one](https://addons.mozilla.org/en-US/firefox/addon/multithreaded-download-manager/).

## Installation

_This guide requires you have [Node](https://nodejs.org/en/download/) and
[npm](https://docs.npmjs.com/cli/install/) installed._

- Clone/download this repo and navigate to the folder in your CLI.
- Install the dependencies by running `npm install`.
- Start the server by running `npm run start`.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to use

Add tracks to the download queue or mark as reviewed by using the buttons next
to the track. The download queue you can access via the top right icon where you
can copy the download links and mark the items as downloaded.

### Keyboard shortcuts

You can quickly navigate through the library using the following keyboard
shortcuts:

| Action                       | Shortcut                                             |
| ---------------------------- | ---------------------------------------------------- |
| Play/pause current track     | <kbd>Space</kbd>                                     |
| Select all                   | <kbd>Cmd/Ctrl</kbd>+<kbd>a</kbd>                     |
| Clear selection              | <kbd>Cmd/Ctrl</kbd>+<kbd>d</kbd> / <kbd>Escape</kbd> |
| Skip 15 sec.                 | <kbd>]</kbd>                                         |
| Rewind 15 sec.               | <kbd>[</kbd>                                         |
| Play previous track          | <kbd>Cmd/Ctrl</kbd>+<kbd>←</kbd>                     |
| Play next track              | <kbd>Cmd/Ctrl</kbd>+<kbd>→</kbd>                     |
| Add selection to queue       | <kbd>q</kbd>                                         |
| Mark selection as reviewed   | <kbd>r</kbd>                                         |
| Mark selection as downloaded | <kbd>d</kbd>                                         |
| Reset selection              | <kbd>Backspace</kbd>                                 |

## Scraping

The data is stored locally in `crate.json`. Since accessing the Record Pool
requires authentication the scraping is done client-side via a simple script
which can be found [here](./src/scraper.js).
