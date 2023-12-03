import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export class NBTDouble extends NBTTag {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    getDoubleValue() {
        return this.value;
    }
    setDoubleValue(value) {
        this.value = value;
    }
    getType() {
        return NBTType.DOUBLE;
    }
    toMSONString() {
        return this.value + "d";
    }
    clone() {
        return new NBTDouble(this.value);
    }
}
