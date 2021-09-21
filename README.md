# I'm Making A Browser

![Browser Layers](README/Browser.png)

One day I installed Microsoft Edge. That's the same thing as Chrome, but with a different frame. So I decided to make my own browser... with a different frame.

## Contributing

**Step 1: Installing Dependencies**

```
npm install
```

**Step 2: Compiling TypeScript**

The project is compiled using TypeScript-parser with webpack.

```
webpack
```

**Step 3: Packaging and Making**

```
npm run make
```

**Step 4: Run Application**

Navigate to `out/flex-browser-darwin-x64` and click on `flex-browser.app`

### Testing

To run all tests, run `npm test`. All tests can be found in `tests/`.

### Documentation / Lint Report Generation

Documentation and lint report generation is done using the same script.

```
source docs.sh
```

## Dev Tasks

### Improvements

> Nothing here right now

### New Features

-   **Bookmarks**
    -   **Bookmark Button** – The ability to add new bookmarks
    -   **Bookmarks Page** DONE – The ability to view bookmarks
-   **First Start Initialization**
    -   **Features Display** – Should give a quick walkthrough of all features.
-   **Taskbar customization**
    -   **Partitioning Taskbar** – Create regions, set alignment, and min/max/default sizes
    -   **Picking Items** – Choose browser frame components and insert them into different partitions
