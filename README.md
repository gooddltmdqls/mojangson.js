# mojangson.js
A lightweight mojangson parser

## Usage
### Import
```js
// CommonJS
const { Parser } = require("mojangson.js");

// Web
const { Parser } = require("./mojangson/main");

// Or ESM, TypeScript?
import Parser from "mojangson.js";
```

### Web (Optional)
If you want to use it on the web, you need to download and compile this project.

Step 1, Download the source code.

Step 2, Download Node.JS and NPM.

Step 3, run `npm i typescript@4.8.4`.

Step 4, move the contents of dist.

### Use parser
```js
// input: string
Parser.parse(input); // -> NBTCompound
```