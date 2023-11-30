import { NBTType } from "./NBTType.js";

export abstract class NBTTag {
    public abstract getValue(): any;

    public abstract getType(): NBTType;
    
    public abstract toMSONString(): string;
    
    public equals(obj: any): boolean {
        if (obj instanceof NBTTag) {
            return this.getType() == obj.getType()
                && this.getValue() == obj.getValue();
        }
        return false;
    }
    
    public toString(): String {
        return this.toMSONString();
    }
    
}
