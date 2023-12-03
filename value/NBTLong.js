import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export class NBTLong extends NBTTag {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    getLongValue() {
        return this.value;
    }
    setLongValue(value) {
        this.value = value;
    }
    getType() {
        return NBTType.LONG;
    }
    toMSONString() {
        return String(this.value) + "L";
    }
    clone() {
        return new NBTLong(this.value);
    }
}
