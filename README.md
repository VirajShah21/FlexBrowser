# I'm Making A Browser

One day I installed Microsoft Edge. That's the same thing as Chrome, but with a different frame. So I decided to make my own browser... with a different frame.

## Contributing

**Step 1: Installing Dependencies**

```
npm install
```

**Step 3: Packaging and Making**

```
npm run make
```

**Step 4: Run Application**

Navigate to `out/flex-browser-darwin-x64` and click on `flex-browser.app`

## Dev Tasks

### Improvements

-   **Flex Hub** DONE
    -   **Titlebars** DONE – A better (and more consistent) titlebar design
    -   **Preferences** DONE – Implement the new titlebar and stack contents more vertically
    -   **Back Button** DONE – Add back button to each page of the Flex Hub (other than the main hub)

### New Features

-   **Bookmarks**
    -   **Bookmark Button** – The ability to add new bookmarks
    -   **Bookmarks Page** – The ability to view bookmarks
-   **First Start Initialization**
    -   **Features Display** – Should give a quick walkthrough of all features.
-   **Vibrancy to Window Frame** DONE
-   **Sleekify titlebar** DONE
-   **Taskbar customization**
    -   **Partitioning Taskbar** – Create regions, set alignment, and min/max/default sizes
    -   **Picking Items** – Choose browser frame components and insert them into different partitions
