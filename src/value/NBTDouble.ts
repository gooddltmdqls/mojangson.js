import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";

export class NBTDouble extends NBTTag {

    private value: number;
    
    constructor(value: number) {
        super();

        this.value = value;
    }
    
    public getValue() {
        return this.value;
    }

    public getDoubleValue() {
        return this.value;
    }
    
    public setDoubleValue(value: number) {
        this.value = value;
    }
    
    public getType() {
        return NBTType.DOUBLE;
    }
    
    public toMSONString() {
        return this.value + "d";
    }
    
    public clone() {
        return new NBTDouble(this.value);
    }

}