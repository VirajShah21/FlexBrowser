# I'm Making A Browser

One day I installed Microsoft Edge. That's the same thing as Chrome, but with a different frame. So I decided to make my own browser... with a different frame.

## Contributing

**Step 1: Installing Dependencies**

```
npm install
```

**Step 2: Testing**

```
npm run start
```

**Step 3: Building**

```
npm run make
```

(Not working yet)

---

If something isn't working, then try using the following command before `npm run make`:

```
sudo npm install -g electron --unsafe-perm=true --allow-root
```

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
-   **Vibrancy to Window Frame**
-   **Sleekify titlebar**
-   **Taskbar customization**
    -   **Partitioning Taskbar** – Create regions, set alignment, and min/max/default sizes
    -   **Picking Items** – Choose browser frame components and insert them into different partitions
