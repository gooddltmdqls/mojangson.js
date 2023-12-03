import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export class NBTByte extends NBTTag {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    getByteValue() {
        return this.value;
    }
    setByteValue(value) {
        this.value = value;
    }
    getType() {
        return NBTType.BYTE;
    }
    toMSONString() {
        return this.getValue() + "b";
    }
    clone() {
        return new NBTByte(this.value);
    }
}
