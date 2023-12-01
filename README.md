# mojangson.js
A lightweight mojangson parser

## Usage
### Import
```js
// CommonJS
const { Parser } = require("mojangson.js");

// Web
import Parser from "./mojangson/main.js";

// Or ESM, TypeScript?
import Parser from "mojangson.js";
```

### Web (Optional)
If you want to use it on the web, you need to download and compile this project.

Step 1, Download files from [here](https://github.com/gooddltmdqls/mojangson.js/blob/web)

Step 2, Unzip it.

Step 3, Copy and paste into your static directory.

### Use parser
```js
// input: string
Parser.parse(input); // -> NBTCompound
```
