import { NBTTag } from "./NBTTag.js";
import { NBTType } from "./NBTType.js";

export class NBTShort extends NBTTag {
    private value: number;
    
    constructor(value: number) {
        super();

        this.value = value;
    }
    
    public getValue() {
        return this.value;
    }

    public getShortValue() {
        return this.value;
    }
    
    public setShortValue(value: number) {
        this.value = value;
    }
    
    public getType() {
        return NBTType.SHORT;
    }
    
    public toMSONString() {
        return this.value + "s";
    }
    
    public clone() {
        return new NBTShort(this.value);
    }

}
