
import * as NBTTag_1 from "./NBTTag.js";
import * as NBTType_1 from "./NBTType.js";
class NBTInt extends NBTTag_1.NBTTag {
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
        return NBTType_1.NBTType.INT;
    }
    toMSONString() {
        return String(this.value);
    }
    clone() {
        return new NBTInt(this.value);
    }
}
export {NBTInt}