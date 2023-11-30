
import * as NBTByte_1 from "../value/NBTByte.js";
import * as NBTByteArray_1 from "../value/NBTByteArray.js";
import * as NBTCompound_1 from "../value/NBTCompound.js";
import * as NBTDouble_1 from "../value/NBTDouble.js";
import * as NBTFloat_1 from "../value/NBTFloat.js";
import * as NBTInt_1 from "../value/NBTInt.js";
import * as NBTIntArray_1 from "../value/NBTIntArray.js";
import * as NBTList_1 from "../value/NBTList.js";
import * as NBTLong_1 from "../value/NBTLong.js";
import * as NBTLongArray_1 from "../value/NBTLongArray.js";
import * as NBTShort_1 from "../value/NBTShort.js";
import * as NBTString_1 from "../value/NBTString.js";
import * as NBTType_1 from "../value/NBTType.js";
import * as ParserError_1 from "./ParserError.js";
class Parser {
    constructor(str) {
        this.str = str;
        this.index = 0;
    }
    static parse(mson) {
        return new Parser(mson).parseRootCompound();
    }
    parseRootCompound() {
        let result;
        this.skipWhitespace();
        if (!this.hasNext()) {
            throw this.parseException("Expected key");
        }
        result = this.parseCompound();
        this.expectNoTrail();
        return result;
    }
    parseCompoundKey() {
        this.skipWhitespace();
        if (!this.hasNext()) {
            throw this.parseException("Expected key");
        }
        return this.currentChar() == '"' ? this.parseQuotedString() : this.parseSimpleString();
    }
    parseStringOrLiteral() {
        this.skipWhitespace();
        if (this.currentChar() == '"')
            return new NBTString_1.NBTString(this.parseQuotedString());
        let str = this.parseSimpleString();
        if (!str.length)
            throw this.parseException("Expected value");
        return this.parseLiteral(str);
    }
    parseLiteral(str) {
        try {
            if (matchWithRegExp(str, Parser.FLOAT)) {
                return new NBTFloat_1.NBTFloat(parseInt(str.substring(0, str.length - 1)));
            }
            if (matchWithRegExp(str, Parser.BYTE)) {
                return new NBTByte_1.NBTByte(parseInt(str.substring(0, str.length - 1)));
            }
            if (matchWithRegExp(str, Parser.LONG)) {
                return new NBTLong_1.NBTLong(parseInt(str.substring(0, str.length - 1)));
            }
            if (matchWithRegExp(str, Parser.SHORT)) {
                return new NBTShort_1.NBTShort(parseInt(str.substring(0, str.length - 1)));
            }
            if (matchWithRegExp(str, Parser.INT)) {
                return new NBTInt_1.NBTInt(parseInt(str));
            }
            if (matchWithRegExp(str, Parser.DOUBLE_S)) {
                return new NBTDouble_1.NBTDouble(parseInt(str.substring(0, str.length - 1)));
            }
            if (matchWithRegExp(str, Parser.DOUBLE_NS)) {
                return new NBTDouble_1.NBTDouble(parseInt(str));
            }
            if (matchWithRegExp(str, /true/i)) {
                return new NBTByte_1.NBTByte(1);
            }
            if (matchWithRegExp(str, /false/i)) {
                return new NBTByte_1.NBTByte(0);
            }
        }
        catch (e) {
            return new NBTString_1.NBTString(str);
        }
        return new NBTString_1.NBTString(str);
    }
    parseQuotedString() {
        let j = ++this.index;
        let str = "";
        let escape = false;
        while (this.hasNext()) {
            let c = this.nextChar();
            if (escape) {
                if ((c != '\\') && (c != '"')) {
                    throw this.parseException("Invalid escape of '" + c + "'");
                }
                escape = false;
            }
            else {
                if (c == '\\') {
                    escape = true;
                    if (str != null) {
                        continue;
                    }
                    str = `${this.str.substring(j, this.index - 1)}`;
                    continue;
                }
                if (c == '"') {
                    return str == null ? this.str.substring(j, this.index - 1) : str.toString();
                }
            }
            if (str != null) {
                str += c;
            }
        }
        throw this.parseException("Missing termination quote");
    }
    parseSimpleString() {
        let j = this.index;
        while (this.hasNext() && Parser.isSimpleChar(this.currentChar())) {
            this.index += 1;
        }
        return this.str.substring(j, this.index);
    }
    parseAnything() {
        this.skipWhitespace();
        if (!this.hasNext())
            throw this.parseException("Expected value");
        let c = this.currentChar();
        if (c == '{')
            return this.parseCompound();
        else if (c == '[')
            return this.parseDetectedArray();
        else
            return this.parseStringOrLiteral();
    }
    parseDetectedArray() {
        if (this.hasCharsLeft(2) && this.getChar(1) != '"' && this.getChar(2) == ';') {
            return this.parseNumArray();
        }
        return this.parseList();
    }
    parseCompound() {
        this.expectChar('{');
        let compound = new NBTCompound_1.NBTCompound();
        this.skipWhitespace();
        while ((this.hasNext()) && (this.currentChar() != '}')) {
            let str = this.parseCompoundKey();
            if (!str.length) {
                throw this.parseException("Expected non-empty key");
            }
            this.expectChar(':');
            compound.put(str, this.parseAnything());
            if (!this.advanceToNextArrayElement()) {
                break;
            }
            if (!this.hasNext()) {
                throw this.parseException("Expected key");
            }
        }
        this.expectChar('}');
        return compound;
    }
    parseList() {
        this.expectChar('[');
        this.skipWhitespace();
        if (!this.hasNext()) {
            throw this.parseException("Expected value");
        }
        let list = new NBTList_1.NBTList();
        let listType = null;
        while (this.currentChar() != ']') {
            let element = this.parseAnything();
            let elementType = element.getType();
            if (listType == null) {
                listType = elementType;
            }
            else if (elementType != listType) {
                throw this.parseException("Unable to insert " + elementType + " into ListTag of type " + listType);
            }
            list.add(element);
            if (!this.advanceToNextArrayElement()) {
                break;
            }
            if (!this.hasNext()) {
                throw this.parseException("Expected value");
            }
        }
        this.expectChar(']');
        return list;
    }
    parseNumArray(arrayType, primType) {
        if (!arrayType) {
            this.expectChar('[');
            let arrayType1 = this.nextChar();
            this.expectChar(';');
            //nextChar(); semicolon ignored by Mojang
            this.skipWhitespace();
            if (!this.hasNext()) {
                throw this.parseException("Expected value");
            }
            if (arrayType1 == 'B')
                return this.parseNumArray(NBTType_1.NBTType.BYTE_ARRAY, NBTType_1.NBTType.BYTE);
            else if (arrayType1 == 'L')
                return this.parseNumArray(NBTType_1.NBTType.LONG_ARRAY, NBTType_1.NBTType.LONG);
            else if (arrayType1 == 'I')
                return this.parseNumArray(NBTType_1.NBTType.INT_ARRAY, NBTType_1.NBTType.INT);
            else
                throw this.parseException("Invalid array type '" + arrayType1 + "' found");
        }
        let result = [];
        while (this.currentChar() != ']') {
            let element = this.parseAnything();
            let elementType = element.getType();
            if (elementType != primType) {
                throw this.parseException("Unable to insert " + elementType + " into " + arrayType);
            }
            if (primType == NBTType_1.NBTType.BYTE) {
                result.push(element.getValue());
            }
            else if (primType == NBTType_1.NBTType.LONG) {
                result.push(element.getValue());
            }
            else {
                result.push(element.getValue());
            }
            if (!this.advanceToNextArrayElement()) {
                break;
            }
            if (!this.hasNext()) {
                throw this.parseException("Expected value");
            }
        }
        this.expectChar(']');
        if (arrayType == NBTType_1.NBTType.BYTE_ARRAY)
            return new NBTByteArray_1.NBTByteArray(result);
        else if (arrayType == NBTType_1.NBTType.LONG_ARRAY)
            return new NBTLongArray_1.NBTLongArray(result);
        else if (arrayType == NBTType_1.NBTType.INT_ARRAY)
            return new NBTIntArray_1.NBTIntArray(result);
        else
            throw this.parseException("Invalid array type '" + arrayType.getName() + "' found");
    }
    // CHARACTER NAVIGATION
    advanceToNextArrayElement() {
        this.skipWhitespace();
        if (this.hasNext() && this.currentChar() == ',') {
            this.index += 1;
            this.skipWhitespace();
            return true;
        }
        return false;
    }
    skipWhitespace() {
        while (this.hasNext() && isWhitespace(this.currentChar())) {
            this.index += 1;
        }
    }
    hasCharsLeft(paramInt) {
        return this.index + paramInt < this.str.length;
    }
    hasNext() {
        return this.hasCharsLeft(0);
    }
    getChar(offset) {
        return this.str.charAt(this.index + offset);
    }
    currentChar() {
        return this.getChar(0);
    }
    nextChar() {
        return this.str.charAt(this.index++);
    }
    expectChar(c) {
        this.skipWhitespace();
        let hasNext = this.hasNext();
        if (hasNext && this.currentChar() == c) {
            this.index += 1;
            return;
        }
        throw new ParserError_1.ParserError("Expected '" + c + "' but got '" + (hasNext ? this.currentChar() : "<EOF>") + "'", this.str, this.index + 1);
    }
    expectNoTrail() {
        this.skipWhitespace();
        if (this.hasNext()) {
            this.index++;
            throw this.parseException("Trailing data " + this.currentChar() + " found");
        }
    }
    parseException(paramString) {
        return new ParserError_1.ParserError(paramString, this.str, this.index);
    }
    static isSimpleChar(paramChar) {
        return (paramChar >= '0' && paramChar <= '9')
            || (paramChar >= 'A' && paramChar <= 'Z')
            || (paramChar >= 'a' && paramChar <= 'z')
            || paramChar == '_'
            || paramChar == '-'
            || paramChar == '.'
            || paramChar == '+';
    }
}
export { Parser }
Parser.DOUBLE_NS = /[-+]?(?:[0-9]+[.]|[0-9]*[.][0-9]+)(?:e[-+]?[0-9]+)?/i;
Parser.DOUBLE_S = /[-+]?(?:[0-9]+[.]?|[0-9]*[.][0-9]+)(?:e[-+]?[0-9]+)?d/i;
Parser.FLOAT = /[-+]?(?:[0-9]+[.]?|[0-9]*[.][0-9]+)(?:e[-+]?[0-9]+)?f/i;
Parser.BYTE = /[-+]?(?:0|[1-9][0-9]*)b/i;
Parser.LONG = /[-+]?(?:0|[1-9][0-9]*)l/i;
Parser.SHORT = /[-+]?(?:0|[1-9][0-9]*)s/i;
Parser.INT = /[-+]?(?:0|[1-9][0-9]*)/i;
function isWhitespace(c) {
    return c === ' '
        || c === '\n'
        || c === '\t'
        || c === '\r'
        || c === '\f'
        || c === '\v'
        || c === '\u00a0'
        || c === '\u1680'
        || c === '\u2000'
        || c === '\u200a'
        || c === '\u2028'
        || c === '\u2029'
        || c === '\u202f'
        || c === '\u205f'
        || c === '\u3000'
        || c === '\ufeff';
}
function matchWithRegExp(str, regexp) {
    const match = str.match(regexp);
    return match && match[0] == match.input;
}
