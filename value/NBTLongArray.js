import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export class NBTLongArray extends NBTTag {
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
        return obj instanceof NBTLongArray && obj.toMSONString() == this.toMSONString();
    }
    toMSONString() {
        let output = "[L;";
        for (let i = 0; i < this.value.length; i++) {
            if (i != 0) {
                output += ',';
            }
            output += this.value[i] + "L";
        }
        return output += "]";
    }
}
