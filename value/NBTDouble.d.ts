import { NBTTag } from "./NBTTag";
import { NBTType } from "./NBTType";
export declare class NBTDouble extends NBTTag {
    private value;
    constructor(value: number);
    getValue(): number;
    getDoubleValue(): number;
    setDoubleValue(value: number): void;
    getType(): NBTType;
    toMSONString(): string;
    clone(): NBTDouble;
}
