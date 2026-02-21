
# Yamata Community Sources

This repository is a **community-maintained collection of external sources** for **Yamata Launcher**.

Its purpose is to centralize and share **game catalog** and **download source definitions** created by the community, making it easier for users to discover and use new content providers within Yamata.

> This repository does **not host any game files**. It only contains metadata and links to external resources.

---

## Repository Structure

If you want to contribute a new source, you must add a record to the appropriate file:

| Source Type                                             | File               |
| ------------------------------------------------------- | ------------------ |
| Game catalog source (metadata, covers, game lists)      | `catalog-sources`  |
| Download source (files, mirrors, or download providers) | `download-sources` |

---

## How to create a source
Here's a guide of how to make a source https://github.com/Gr3gorywolf/Yamata-launcher/wiki/External-sources when hosting a source please make sure that the url is accessible through http

## Source Record Format

Each source must follow this structure:

```json
{
  "title": "",
  "description": "",
  "ref": "",
  "url": ""
}
```

### Field Description

| Field         | Description                                             |
| ------------- | ------------------------------------------------------- |
| `title`       | Human-readable name of the source                       |
| `description` | Short explanation of what the source provides           |
| `ref`         | Reference or original website where the data comes from |
| `url`         | Direct URL to the JSON source consumed by Yamata launcher it should be a valid http reachable url|

---

## How to Contribute

1. Fork this repository
2. Add your source record:

   * To **`catalog-sources`** if it provides game metadata/catalogs
   * To **`download-sources`** if it provides download links
3. Commit your changes
4. Open a Pull Request

Please ensure:

* The JSON is valid
* The URL is publicly accessible

---

## Compiling Sources (Extracting Metadata)

After adding or modifying sources, additional metadata must be generated.

From the **root of the project**, run:

```bash
bun ./scripts/compile-sources.ts
```

This process will:

* Fetch and validate sources
* Extract additional metadata
* Populate the compiled source information used by Yamata

---

## Running the Project

1. Install dependencies:

```bash
bun install
```

2. Compile sources:

```bash
bun ./scripts/compile-sources.ts
```

After this step, the compiled sources will be ready for use.

---

## Disclaimer

This repository is **only a compilation of external sources**.

* It does **not host, distribute, or provide any copyrighted game files**
* All content is provided by **third-party external sources**
* Each source is responsible for its own content

If any source listed here has been taken down, violates your rights, or should be removed:

**Please contact us via email**, and it will be removed promptly.

We fully respect copyright and takedown requests.

---
