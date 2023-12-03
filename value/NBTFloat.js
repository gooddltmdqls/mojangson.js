import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export class NBTFloat extends NBTTag {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    getFloatValue() {
        return this.value;
    }
    setFloatValue(value) {
        this.value = value;
    }
    getType() {
        return NBTType.FLOAT;
    }
    toMSONString() {
        return this.value + "f";
    }
    clone() {
        return new NBTFloat(this.value);
    }
}
