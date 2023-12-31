import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";

export class NBTEnd extends NBTTag {
    
    public static INSTANCE = new NBTEnd();
    
    private NBTEnd() {}
    
    public getValue() {
        return null;
    }
    
    public getType() {
        return NBTType.END;
    }

    public equals(obj: any) {
        return obj instanceof NBTEnd;
    }

    public toMSONString() {
        return "END";
    }
    
    public clone() {
        return new NBTEnd();
    }
    
}
