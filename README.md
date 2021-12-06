# I'm Making A Browser

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d3aa9ab6f4e2428994c506a1ce4ecf1e)](https://www.codacy.com/gh/VirajShah21/FlexBrowser/dashboard?utm_source=github.com&utm_medium=referral&utm_content=VirajShah21/FlexBrowser&utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/d3aa9ab6f4e2428994c506a1ce4ecf1e)](https://www.codacy.com/gh/VirajShah21/FlexBrowser/dashboard?utm_source=github.com&utm_medium=referral&utm_content=VirajShah21/FlexBrowser&utm_campaign=Badge_Coverage)

[![](README/AvailableForMac.png)](https://github.com/VirajShah21/FlexBrowser/releases/download/v0.3.0-alpha.4/Flex.Browser.app.zip)

![Browser Thumbnail](README/BrowserThumb.png)

One day I installed Microsoft Edge. That's the same thing as Chrome, but with a different frame. So I decided to make my own browser... with a different frame.

## Outline

-   [User Features](#user-features)
    -   [Preferences](#preferences)
-   [Contributing](#contributing)
    -   [Contributing Rules](#contributing-rules)
    -   [Style Guide Notes](#style-guide-notes)
    -   [Building](#building)
    -   [Testing](#testing)
    -   [Documentation / Lint Report Generation](#documentation--lint-report-generation)

## User Features

-   **Basic Browsing Features** – URL/Search bar, forward/back navigation, create new windows, etc.
-   **Hub** – A central location to manage all your browser windows, bookmarks, etc.
-   **Customization Preferences**
    -   **Light/Dark Theme** – Choose when to use a light or dark theme.
    -   **Highlight Color** – Select a secondary color to use for browser UI elements.
    -   **Frame Customization** – Customize how the browser frame looks and feels.
-   **Search**
    -   **URL/Search Query detection** – Automatically determine whether to navigate to a URL or perform a search.
    -   **Google Search** – Uses Google as the default search engine.
    -   **Custom Search Engines** – Define custom search engines
    -   **Search Swap** – Allows for searching using an alternative search engine when using a specific search prefix.
-   **Windows Viewer**
    -   **Windows Overview** – Displays a list of all open Flex Browser windows.
    -   **Instant Bookmark** – Bookmark directly from the Windows Viewer
-   **Dragable Menu Bar** – Allow the user to drag the entire browser window via the **websites** menu bar.

### Preferences

Configuring the browser should always be flawless. There are several different ways to configure the browser:

1. Modify `~/.flexrc.json`: After the browser has been launched for the first time, a preferences file will be created in the current user's home directory.
2. Use the Preferences GUI in the Hub menu.

So why are there two different ways of configuring the browser? Method 1 is the default way to configure the browser. Every preferences is stored within the runcom file (JSON format). Preferences are constantly pulled from this file and used by the browser. When the browser accesses each preference, it is stored in a cache. After 60 seconds of each preference being loaded into cache, the preference property is deleted. Once the property needs to be retrieved again, the browser will go back to the `~/.flexrc.json` file to get the potentially new value of the preference property. The Preferences GUI, however, is just a simplified medium of modifying the runcome/json file.

After first launch, the following `~/.flexrc.json` file is created:

```json
{
    "lastSession": {
        "version": "0.0.1"
    },
    "colorTheme": "blue",
    "theme": "dark",
    "searchEngines": [
        {
            "id": "google",
            "name": "Google",
            "urlPrefix": "https://google.com/search?q="
        },
        {
            "id": "duck-duck-go",
            "name": "Duck Duck Go",
            "urlPrefix": "https://duckduckgo.com/q="
        },
        {
            "id": "bing",
            "name": "Bing",
            "urlPrefix": "https://duckduckgo.com/q="
        }
    ],
    "defaultSearchEngine": "google"
}
```

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
