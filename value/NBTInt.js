import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export class NBTInt extends NBTTag {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    getIntValue() {
        return this.value;
    }
    setIntValue(value) {
        this.value = value;
    }
    getType() {
        return NBTType.INT;
    }
    toMSONString() {
        return String(this.value);
    }
    clone() {
        return new NBTInt(this.value);
    }
}
