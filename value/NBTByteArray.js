
import * as NBTTag_1 from "./NBTTag.js";
import * as NBTType_1 from "./NBTType.js";
class NBTByteArray extends NBTTag_1.NBTTag {
    constructor(value) {
        super();
        this.value = value;
    }
    length() {
        return this.value.length;
    }
    getValue() {
        return this.value;
    }
    getType() {
        return NBTType_1.NBTType.BYTE_ARRAY;
    }
    equals(obj) {
        return obj instanceof NBTByteArray && obj.toMSONString() == this.toMSONString();
    }
    toMSONString() {
        let output = "[B;";
        for (let i = 0; i < this.value.length; i++) {
            if (i != 0) {
                output += ',';
            }
            output += this.value[i] + 'b';
        }
        return output += "]";
    }
}
export {NBTByteArray}
