# Branding Features

-   [Abstract](#abstract)
-   [Technical Problems](#technical-problems)
-   [Technical Resolutions](#technical-resolutions)
-   [Branding Format Specifications](#branding-format-specifications)
    -   [Record: Branding Registry](#record-branding-registry)
    -   [Interface: Branding](#interface-branding)
    -   [Complete File Structure](#complete-file-structure)
-   [Rule Merging](#rule-merging)

## Abstract

Branding is very important for all organizations.
Every org wants their branding to displayed in the browser frame (favicons),
all over their webpages, on the bookmark/favorites section, etc.
The problem is that favicons suck: they are so small, and we do not always
know where to get them from. Additionally, sometimes a companies branding sucks
and the user may have to override the configuration to enhance their own browsing
experience. Additionally, every use should not have to rely on manually configuring
the branding for an organization.

## Technical Problems

-   Resolving favicon path on server
-   Resolving favicon extension/filetype
-   Extracting branding colors
-   Storing branding information
    -   Standardized branding data format
    -   Automatically determining scope of favicon and brand colors (branding rules)
    -   Merging branding rules (ex: same favicon for `google.com` and `google.com/search?q=...`)

## Technical Resolutions

There are a couple problems when dealing with branding:

-   Resolving favicon location:
    -   Try `domain.ext/current/dir/filename/favicon.*`
    -   Try `domain.ext/current/dir/favicon.*`
    -   Try `domain.ext/current/favicon.*`
    -   Try `domain.ext/favicon.*`
-   Resolve favicon extension: Order is `ico`, `png`, `jpg`, `svg`
-   Send requests until a `200 SUCCESS` header is sent back from server
-   Detect brand colors from favicon
-   Use favicon by default, allow user overrides
-   Save location for the favicon for the path it was found at:
    -   `(www.)domain.ext/favicon.*` is applied to entire domain by default
    -   `subdomain.domain.ext/favicon.*` is applied to entire subdomain
    -   `domain.ext/path/to/something/favicon.*` is applied to all paths
        beginning with `domain.ext/path/to/something`
-   Merging solutions:
    -   Get all rules by domain name
    -   Get all rules by subdomain within domain
    -   Get rules by most specific paths and merge with parent paths if same branding
    -   Merge to the subdomain
    -   If all subdomains share favicon, merge by domain name
    -   _Note: The favicons path is used for determining whether branding is the same_

## Branding Format Specifications

| Directory | Filename             | Format                  |
| --------- | -------------------- | ----------------------- |
| `~`       | `.flexbranding.json` | `BrandingRegistry/JSON` |

### Record: BrandingRegistry

`type BrandingRegistry = Record<string, Branding>`

**Key:** (`string`) The pattern to apply the branding to
**Value:** (`Branding`) The branding definition

Different formats for key:

-   `domain.ext`
-   `sub.domain.ext`
-   `(sub).domain.ext/path/to/dir`
-   `(sub).domain.ext/path/to/file.type`

### Interface: Branding

| Property | Type                                   | Description                                             |
| -------- | -------------------------------------- | ------------------------------------------------------- |
| `org`    | `string`                               | The name of organization which the branding applies to. |
| `fav`    | `string`<sup>1</sup>                   | The URL path of the favicon.                            |
| `color`  | `[number, number, number]`<sup>2</sup> | The RGB/RGBA of the brand color.                        |
| `abbr`   | `string`                               | The abbreviation of the organization.                   |
| `logo`   | `string`<sup>3</sup>                   | The logo frequently used by the brand.                  |
| `prod`   | `string?`                              | The product name the page(s) pertain to                 |

<sup>1</sup> `fav` should be a valid url (passed into `new ValidURL(fav).toString()`).  
<sup>2</sup> Numbers must be between `0` and `255` (inclusive).
<sup>3</sup> `logo` should be a valid url to an image of the logo.

### Complete File Structure

```JSON
{
    "example.com": {
        "org": "Example",
        "fav": "https://example.com/favicon.ico",
        "color": [230, 230, 230],
        "abbr": "Ex",
        "logo": "https://example.com/branding.png",
        "prod": "Example Landing Page"
    },

    "drive.google.com": {
        "org": "Google LLC",
        "fav": "https://drive.google.com/favicon.ico",
        "color": [46, 119, 255],
        "abbr": "GDrive",
        "logo": "https://drive.google.com/logo.svg",
        "prod": "Google Drive"
    }
    ...
}
```

## Rule Merging

Rules are merged based on the specificity of the target.

| Least Specific |         | Most Specific |
| -------------- | ------- | ------------- |
| Domain         | dirpath | filepath      |

_Note: Default subdomain is `www`_

**Before Merge:**

```JSON
{
    "drive.google.com": {
        "org": "Google LLC",
        "fav": "https://drive.google.com/favicon.ico",
        "color": [46, 119, 255],
        "abbr": "GDrive",
        "logo": "https://drive.google.com/logo.svg",
        "prod": "Google Drive"
    },
    "google.com": {
        "org": "Google LLC",
        "fav": "https://drive.google.com/favicon.ico",
        "color": [255, 119, 49],
        "abbr": "Google",
        "logo": "https://google.com/logo.png",
        "prod": "Google Search"
    },
    "google.com/search?q=hello+world": {
        "org": "Google LLC",
        "fav": "https://google.com/favicon.ico",
        "color": [255, 119, 49],
        "abbr": "Google",
        "logo": "https://google.com/logo.png",
        "prod": "Google Search"
    }
}
```

**After Merge:**

```JSON
{
    "drive.google.com": {
        "org": "Google LLC",
        "fav": "https://drive.google.com/favicon.ico",
        "color": [46, 119, 255],
        "abbr": "GDrive",
        "logo": "https://drive.google.com/logo.svg",
        "prod": "Google Drive"
    },
    "google.com": {
        "org": "Google LLC",
        "fav": "https://drive.google.com/favicon.ico",
        "color": [255, 119, 49],
        "abbr": "Google",
        "logo": "https://google.com/logo.png",
        "prod": "Google Search"
    }
}
```

**Removed:**

<pre><code style="color:red">   "google.com/search?q=hello+world": {
        "org": "Google LLC",
        "fav": "https://google.com/favicon.ico",
        "color": [255, 119, 49],
        "abbr": "Google",
        "logo": "https://google.com/logo.png",
        "prod": "Google Search"
    }
</code></pre>
