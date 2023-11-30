
import * as NBTTag_1 from "./NBTTag.js";
import * as NBTType_1 from "./NBTType.js";
class NBTFloat extends NBTTag_1.NBTTag {
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
        return NBTType_1.NBTType.FLOAT;
    }
    toMSONString() {
        return this.value + "f";
    }
    clone() {
        return new NBTFloat(this.value);
    }
}
export { NBTFloat}