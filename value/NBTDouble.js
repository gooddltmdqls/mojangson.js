
import * as NBTTag_1 from "./NBTTag.js";
import * as NBTType_1 from "./NBTType.js";
class NBTDouble extends NBTTag_1.NBTTag {
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
        return NBTType_1.NBTType.DOUBLE;
    }
    toMSONString() {
        return this.value + "d";
    }
    clone() {
        return new NBTDouble(this.value);
    }
}
export { NBTDouble }