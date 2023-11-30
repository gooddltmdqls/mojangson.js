
import * as NBTTag_1 from "./NBTTag.js";
import * as NBTType_1 from "./NBTType.js";
class NBTLong extends NBTTag_1.NBTTag {
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
        return NBTType_1.NBTType.LONG;
    }
    toMSONString() {
        return String(this.value) + "L";
    }
    clone() {
        return new NBTLong(this.value);
    }
}
export { NBTLong }