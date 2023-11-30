
import * as NBTTag_1 from "./NBTTag.js";
import * as NBTType_1 from "./NBTType.js";
class NBTEnd extends NBTTag_1.NBTTag {
    NBTEnd() { }
    getValue() {
        return null;
    }
    getType() {
        return NBTType_1.NBTType.END;
    }
    equals(obj) {
        return obj instanceof NBTEnd;
    }
    toMSONString() {
        return "END";
    }
    clone() {
        return new NBTEnd();
    }
}
export { NBTEnd }
NBTEnd.INSTANCE = new NBTEnd();
