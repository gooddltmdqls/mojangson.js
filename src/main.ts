import { Parser } from "./parser/Parser.js";

export * from "./parser";
export * from "./value";

export default Parser;

// For web.
function getParser() {
    return Parser;
}