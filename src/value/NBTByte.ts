import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";

export class NBTByte extends NBTTag {

    private value: number;
    
    constructor(value: number) {
        super();

        this.value = value;
    }

    public getValue() {
        return this.value;
    }

    public getByteValue() {
        return this.value;
    }
    
    public setByteValue(value: number) {
        this.value = value;
    }
    
    public getType() {
        return NBTType.BYTE;
    }
    
    public toMSONString() {
        return this.getValue()+"b";
    }
    
    public clone() {
        return new NBTByte(this.value);
    }

}
