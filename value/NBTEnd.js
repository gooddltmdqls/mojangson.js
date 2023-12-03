import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";
export class NBTEnd extends NBTTag {
    static INSTANCE = new NBTEnd();
    NBTEnd() { }
    getValue() {
        return null;
    }
    getType() {
        return NBTType.END;
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
