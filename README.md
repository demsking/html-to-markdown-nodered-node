# HTML to Markdown NodeRED Node

[![Buy me a beer](https://img.shields.io/badge/Buy%20me-a%20beer-1f425f.svg)](https://www.buymeacoffee.com/demsking)

A Node-RED node that converts HTML content into Markdown format.

## Features

- Converts HTML tags like `<h1>` to `#`, `<p>` to paragraph text, `<ul>/<ol>`
  to lists, and `<a>` to Markdown links.
- Useful for transforming rich text content into Markdown for storage, APIs,
  or display in Markdown renderers.

## Install

From your Node-RED user directory (`~/.node-red`):

```bash
npm install node-red-contrib-to-markdown
```

## Usage

Add the `to-markdown` node to your flow. Pass HTML content to the `payload`
property, and the node will output the corresponding Markdown.

### Example Input

```json
{
  "payload": "<h1>Title</h1><p>This is a paragraph.</p><ul><li>Item 1</li><li>Item 2</li></ul><a href='https://example.com'>Link</a>"
}
```

### Example Output

```markdown
# Title

This is a paragraph.

- Item 1
- Item 2

[Link](https://example.com)
```

## Node Properties

This node does not require any configuration. It simply reads the incoming
`msg.payload` as HTML and outputs Markdown.

## Compatibility

- Requires Node.js 20+
- Compatible with Node-RED 3.x+

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License.
You may obtain a copy of the License at
[LICENSE](https://gitlab.com/demsking/oremi-weather-agent/blob/main/LICENSE).
