# mojangson.js
A lightweight mojangson parser

## Usage
### Import
```js
// CommonJS
const { Parser } = require("mojangson.js");

// Or ESM, TypeScript?
import Parser from "mojangson.js";
```

```html
<script src="">
```

### Use parser
```js
// input: string
Parser.parse(input); // -> NBTCompound
```