import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export class NBTIntArray extends NBTTag {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    length() {
        return this.value.length;
    }
    getValue() {
        return this.value;
    }
    getType() {
        return NBTType.BYTE_ARRAY;
    }
    equals(obj) {
        return obj instanceof NBTIntArray && obj.toMSONString() == this.toMSONString();
    }
    toMSONString() {
        let output = "[I;";
        for (let i = 0; i < this.value.length; i++) {
            if (i != 0) {
                output += ',';
            }
            output += String(this.value[i]);
        }
        return output += "]";
    }
}
