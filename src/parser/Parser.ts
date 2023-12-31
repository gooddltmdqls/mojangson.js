import { NBTByte } from "../value/NBTByte.js";
import { NBTByteArray } from "../value/NBTByteArray.js";
import { NBTCompound } from "../value/NBTCompound.js";
import { NBTDouble } from "../value/NBTDouble.js";
import { NBTFloat } from "../value/NBTFloat.js";
import { NBTInt } from "../value/NBTInt.js";
import { NBTIntArray } from "../value/NBTIntArray.js";
import { NBTList } from "../value/NBTList.js";
import { NBTLong } from "../value/NBTLong.js";
import { NBTLongArray } from "../value/NBTLongArray.js";
import { NBTShort } from "../value/NBTShort.js";
import { NBTString } from "../value/NBTString.js";
import { NBTType } from "../value/NBTType.js";
import { ParserError } from "./ParserError.js";

export class Parser {
    
    private static DOUBLE_NS = /[-+]?(?:[0-9]+[.]|[0-9]*[.][0-9]+)(?:e[-+]?[0-9]+)?/i;
    private static DOUBLE_S = /[-+]?(?:[0-9]+[.]?|[0-9]*[.][0-9]+)(?:e[-+]?[0-9]+)?d/i
    private static FLOAT = /[-+]?(?:[0-9]+[.]?|[0-9]*[.][0-9]+)(?:e[-+]?[0-9]+)?f/i
    private static BYTE = /[-+]?(?:0|[1-9][0-9]*)b/i
    private static LONG = /[-+]?(?:0|[1-9][0-9]*)l/i
    private static SHORT = /[-+]?(?:0|[1-9][0-9]*)s/i
    private static INT = /[-+]?(?:0|[1-9][0-9]*)/i
    
    
    private str: string;
    private index: number;
    
    public static parse(mson: string) {
        return new Parser(mson).parseRootCompound();
    }
    
    private constructor(str: string) {
        this.str = str;
        this.index = 0;
    }
    
    private parseRootCompound() {
        let result: NBTCompound;
        
        this.skipWhitespace();
        if (!this.hasNext()) {
            throw this.parseException("Expected key");
        }
        
        result = this.parseCompound();
        
        this.expectNoTrail();
        
        return result;
    }
    
    private parseCompoundKey() {
        this.skipWhitespace();
        if (!this.hasNext()) {
            throw this.parseException("Expected key");
        }
        return this.currentChar() == '"' ? this.parseQuotedString() : this.parseSimpleString();
    }
    
    private parseStringOrLiteral() {
        this.skipWhitespace();
        if (this.currentChar() == '"')
            return new NBTString(this.parseQuotedString());
        let str = this.parseSimpleString();
        if (!str.length)
            throw this.parseException("Expected value");
        return this.parseLiteral(str);
    }
    
    private parseLiteral(str: string) {
        try {
            if (matchWithRegExp(str, Parser.FLOAT)) {
                return new NBTFloat(parseInt(str.substring(0, str.length - 1)));
            }
            if (matchWithRegExp(str, Parser.BYTE)) {
                return new NBTByte(parseInt(str.substring(0, str.length - 1)));
            }
            if (matchWithRegExp(str, Parser.LONG)) {
                return new NBTLong(parseInt(str.substring(0, str.length - 1)));
            }
            if (matchWithRegExp(str, Parser.SHORT)) {
                return new NBTShort(parseInt(str.substring(0, str.length - 1)));
            }
            if (matchWithRegExp(str, Parser.INT)) {
                return new NBTInt(parseInt(str));
            }
            if (matchWithRegExp(str, Parser.DOUBLE_S)) {
                return new NBTDouble(parseInt(str.substring(0, str.length - 1)));
            }
            if (matchWithRegExp(str, Parser.DOUBLE_NS)) {
                return new NBTDouble(parseInt(str));
            }
            if (matchWithRegExp(str, /true/i)) {
                return new NBTByte(1);
            }
            if (matchWithRegExp(str, /false/i)) {
                return new NBTByte(0);
            }
        } catch (e) {
            return new NBTString(str);
        }
        return new NBTString(str);
    }
    
    private parseQuotedString() {
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
            } else {
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
    
    private parseSimpleString() {
        let j = this.index;
        while (this.hasNext() && Parser.isSimpleChar(this.currentChar())) {
            this.index += 1;
        }
        return this.str.substring(j, this.index);
    }
    
    private parseAnything() {
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
    
    private parseDetectedArray() {
        if (this.hasCharsLeft(2) && this.getChar(1) != '"' && this.getChar(2) == ';') {
            return this.parseNumArray();
        }
        return this.parseList();
    }
    
    private parseCompound() {
        this.expectChar('{');
    
        let compound = new NBTCompound();
        
        this.skipWhitespace();
        while ((this.hasNext()) && (this.currentChar() != '}'))
        {
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
    
    private parseList() {
        this.expectChar('[');
        
        this.skipWhitespace();
        if (!this.hasNext()) {
            throw this.parseException("Expected value");
        }
        let list = new NBTList();
        let listType = null;
        
        while (this.currentChar() != ']') {
            let element = this.parseAnything();
            let elementType = element.getType();
            
            if (listType == null) {
                listType = elementType;
            } else if (elementType != listType) {
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
    
    private parseNumArray(arrayType?: NBTType, primType?: NBTType): NBTByteArray | NBTLongArray | NBTIntArray {
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
                return this.parseNumArray(NBTType.BYTE_ARRAY, NBTType.BYTE);
            else if (arrayType1 == 'L')
                return this.parseNumArray(NBTType.LONG_ARRAY, NBTType.LONG);
            else if (arrayType1 == 'I')
                return this.parseNumArray(NBTType.INT_ARRAY, NBTType.INT);
            else throw this.parseException("Invalid array type '" + arrayType1 + "' found");
        }

        let result: number[] = [];
        while (this.currentChar() != ']') {
            let element = this.parseAnything();
            let elementType = element.getType();
            
            if (elementType != primType) {
                throw this.parseException("Unable to insert " + elementType + " into " + arrayType);
            }
            if (primType == NBTType.BYTE) {
                result.push((element as NBTByte).getValue());
            } else if (primType == NBTType.LONG) {
                result.push((element as NBTLong).getValue());
            } else {
                result.push((element as NBTInt).getValue());
            }
            if (!this.advanceToNextArrayElement()) {
                break;
            }
            if (!this.hasNext()) {
                throw this.parseException("Expected value");
            }
        }
        this.expectChar(']');
        
        if (arrayType == NBTType.BYTE_ARRAY)
            return new NBTByteArray(result);
        else if (arrayType == NBTType.LONG_ARRAY)
            return new NBTLongArray(result);
        else if (arrayType == NBTType.INT_ARRAY)
            return new NBTIntArray(result);
        else throw this.parseException("Invalid array type '" + arrayType.getName() + "' found");
    }
    
    // CHARACTER NAVIGATION
    
    private advanceToNextArrayElement() {
        this.skipWhitespace();
        if (this.hasNext() && this.currentChar() == ',') {
            this.index += 1;
            this.skipWhitespace();
            return true;
        }
        return false;
    }
    
    private skipWhitespace() {
        while (this.hasNext() && isWhitespace(this.currentChar())) {
            this.index += 1;
        }
    }
    
    private hasCharsLeft(paramInt: number) {
        return this.index + paramInt < this.str.length;
    }
    
    private hasNext() {
        return this.hasCharsLeft(0);
    }

    private getChar(offset: number) {
        return this.str.charAt(this.index + offset);
    }
    
    private currentChar() {
        return this.getChar(0);
    }
    
    private nextChar() {
        return this.str.charAt(this.index++);
    }
    
    private expectChar(c: string) {
        this.skipWhitespace();
        
        let hasNext = this.hasNext();
        if (hasNext && this.currentChar() == c) {
            this.index += 1;
            return;
        }
        throw new ParserError("Expected '" + c + "' but got '" + (hasNext ? this.currentChar() : "<EOF>") + "'", this.str, this.index + 1);
    }
    
    private expectNoTrail() {
        this.skipWhitespace();
        if (this.hasNext()) {
            this.index++;
            throw this.parseException("Trailing data " + this.currentChar() + " found");
        }
    }
    
    private parseException(paramString: string) {
        return new ParserError(paramString, this.str, this.index);
    }
    
    private static isSimpleChar(paramChar: string) {
        return (paramChar >= '0' && paramChar <= '9')
            || (paramChar >= 'A' && paramChar <= 'Z')
            || (paramChar >= 'a' && paramChar <= 'z')
            || paramChar == '_'
            || paramChar == '-'
            || paramChar == '.'
            || paramChar == '+';
    }
    
}

function isWhitespace(c: string) {
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
        || c === '\ufeff'
}

function matchWithRegExp(str: string, regexp: RegExp) {
    const match = str.match(regexp);

    return match && match[0] == match.input;
}