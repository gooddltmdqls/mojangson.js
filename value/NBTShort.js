
import * as NBTTag_1 from "./NBTTag.js";
import * as NBTType_1 from "./NBTType.js";
class NBTShort extends NBTTag_1.NBTTag {
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
        return NBTType_1.NBTType.SHORT;
    }
    toMSONString() {
        return this.value + "s";
    }
    clone() {
        return new NBTShort(this.value);
    }
}
export { NBTShort }