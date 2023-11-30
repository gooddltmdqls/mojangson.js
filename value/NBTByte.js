
import * as NBTTag_1 from "./NBTTag.js";
import * as NBTType_1 from "./NBTType.js";
class NBTByte extends NBTTag_1.NBTTag {
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
        return NBTType_1.NBTType.BYTE;
    }
    toMSONString() {
        return this.getValue() + "b";
    }
    clone() {
        return new NBTByte(this.value);
    }
}
export {NBTByte}