import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export class NBTString extends NBTTag {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    getType() {
        return NBTType.STRING;
    }
    toMSONString() {
        return NBTString.toMSONString(this.value);
    }
    clone() {
        return new NBTString(this.value);
    }
    static toMSONString(str) {
        let output = '"';
        const chars = str.split("");
        for (const c of chars) {
            if ((c == '\\') || (c == '"')) {
                output += '\\';
            }
            output += c;
        }
        output += '"';
        return output;
    }
}
