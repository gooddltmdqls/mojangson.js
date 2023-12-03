import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export class NBTShort extends NBTTag {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    getShortValue() {
        return this.value;
    }
    setShortValue(value) {
        this.value = value;
    }
    getType() {
        return NBTType.SHORT;
    }
    toMSONString() {
        return this.value + "s";
    }
    clone() {
        return new NBTShort(this.value);
    }
}
