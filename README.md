# I'm Making A Browser

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d3aa9ab6f4e2428994c506a1ce4ecf1e)](https://www.codacy.com/gh/VirajShah21/FlexBrowser/dashboard?utm_source=github.com&utm_medium=referral&utm_content=VirajShah21/FlexBrowser&utm_campaign=Badge_Grade)

[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/d3aa9ab6f4e2428994c506a1ce4ecf1e)](https://www.codacy.com/gh/VirajShah21/FlexBrowser/dashboard?utm_source=github.com&utm_medium=referral&utm_content=VirajShah21/FlexBrowser&utm_campaign=Badge_Coverage)

![Browser Layers](README/Browser.png)

One day I installed Microsoft Edge. That's the same thing as Chrome, but with a different frame. So I decided to make my own browser... with a different frame.

## Outline

-   [User Features](#user-features)
-   [Contributing](#contributing)
    -   [Contributing Rules](#contributing-rules)
    -   [Style Guide Notes](#style-guide-notes)
    -   [Building](#building)
    -   [Testing](#testing)
    -   [Documentation / Lint Report Generation](#documentation--lint-report-generation)
-   [Dev Tasks](#dev-tasks)
    -   [Improvements](#improvements)
    -   [New Features](#new-features)

## User Features

> **_Key:_**
>
> 🟢 = Stable
>
> 🟡 = Unstable
>
> 🔴 = Not working
>
> 🔵 = Being Implemented

-   🟢 **Basic Browsing Features** – URL/Search bar, forward/back navigation, create new windows, etc.
-   🟢 **Hub** – A central location to manage all your browser windows, bookmarks, etc.
-   🟢 **Customization Preferences**
    -   🟢 **Light/Dark Theme** – Choose when to use a light or dark theme.
    -   🟢 **Highlight Color** – Select a secondary color to use for browser UI elements.
    -   🔵 **Frame Customization** – Customize how the browser frame looks and feels.
-   🟢 **Search**
    -   🟢 **URL/Search Query detection** – Automatically determine whether to navigate to a URL or perform a search.
    -   🟢 **Google Search** – Uses Google as the default search engine.
    -   🟢 **Custom Search Engines** – Define custom search engines
    -   🔴 **Search Swap** – Allows for searching using an alternative search engine when using a specific search prefix.
-   🟢 **Windows Viewer**
    -   🟢 **Windows Overview** – Displays a list of all open Flex Browser windows.
    -   🔵 **Instant Bookmark** – Bookmark directly from the Windows Viewer

## Contributing

### Contributing Rules

-   New features should branch out from `origin/dev`.
-   All sub-branches for a feature must be merged with their original branch.
-   After merging with feature branch, pull requests should be made to `origin/quality`.
    -   All tests must pass.
    -   There must be **NO** eslint (ts) or tsc errors or warnings.
    -   All code, strings, documentation, and comments must include appropriate grammer and correct spelling.
    -   Built files should not be included in the commit (may be added to gitignore).
    -   All code must be appropriately documented with reasonable length and detail.
    -   Code must be automatically formatted using `.prettierrc`. No other formatting will be accepted.
    -   Code should be written in the simplest form with the following priority:
        -   Readability (30%)
        -   Speed (25%)
        -   Shortest print width (25%)
        -   Fewest number of lines (10%)
        -   Least nesting (conditionals/loops/etc) (10%)
    -   All imports must be used.
    -   Unrelated code should not be touched.
-   All code will be scrutinized with a thorough screening and testing process prior to approving the pull request to `origin/dev`.

### Style Guide Notes

Style warnings will be provided by eslint (`.eslintrc.js`), TypeScript (`tsconfig.json`), and Prettier (`.prettierrc`).

### Building

**Step 1: Installing Dependencies**

```bash
npm install
```

**Step 2: Compiling TypeScript**

The project is compiled using TypeScript-parser with webpack.

```bash
webpack
```

**Step 3: Packaging and Making**

```bash
npm run make
```

**Step 4: Run Application**

Navigate to `out/flex-browser-darwin-x64` and click on `flex-browser.app`

### Testing

To run all tests, run `npm test`. All tests can be found in `tests/`.

### Documentation / Lint Report Generation

Documentation and lint report generation is done using the same script.

```bash
source docs.sh
```

## Dev Tasks

### Improvements

-   Fix `FontWeight` not working on `TextView` (Branch: `himvc`). DONE
-   Add build-in and build-out animations to everything. DONE
    -   Add animation preferences in hub DONE

### New Features

-   **Bookmarks** 🔖
    -   **Bookmark Button** DONE – The ability to add new bookmarks
    -   **Bookmarks Page** DONE – The ability to view bookmarks
-   **First Start Initialization** 1️⃣
    -   **Features Display** – Should give a quick walkthrough of all features.
    -   **Keep track of launches** DONE – A .flexrc.json file should be created after first launch. (Stores preferences).
    -   **Hide other windows** DONE – Hide browser and hub until first start page is finished.
-   **Taskbar customization**
    -   **Partitioning Taskbar** – Create regions, set alignment, and min/max/default sizes
    -   **Picking Items** – Choose browser frame components and insert them into different partitions
-   **Web Apps** 📱
    -   **URL Packager** – Take the current URL and add it as a web app.
    -   **App Drawer** – Launcher for the web apps.
    -   **Frameless Windows** – Add archs for opening frameless webapps.
-   **Search** 🔍
    -   **Default Google Search** DONE – Detect if the user does not enter a URL and perform a google search instead.
    -   **Custom Search Engines** – Enable adding custom search engines or special prefixes (eg: `google: hello world`, `duckduckgo: hello world`)
-   **Window-splitting** 🪟 – Have multiple windows in the same frame side-by-side or above-and-below.
-   **Notes Plugin** 📝 – Lightweight feature for adding notes for URLs
-   **Flextensions** 🧩 – Extensions for the Flex Browser (Notes should probably be packed inside this)
    -   **Flextension to Install Chrome Extensions** – Make it easy to install chrome extensions, either from the webstore (`.crx` files, which is hard in electron, and unpacked)
-   **Brand Manager** 👾 – `.flexbrands.json` to store branding data
    -   **Favicon Finder** – Automatically resolve the location of the websites Favicon
    -   **Override Favicons** – Allow the user to prefer a large icon or image for certain domains, "contains" in address, or subdomains.
    -   **Color Resolver** – Resolve the primary colors from a favicon, icon, or logo.
    -   **Appropriate Branding** – Display brand icons and colors wherever appropriate
    -   For more information, refer to [README/branding.md](Branding documentation)
