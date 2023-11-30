export declare class NBTType {
    static END: NBTType;
    static BYTE: NBTType;
    static SHORT: NBTType;
    static INT: NBTType;
    static LONG: NBTType;
    static FLOAT: NBTType;
    static DOUBLE: NBTType;
    static BYTE_ARRAY: NBTType;
    static STRING: NBTType;
    static LIST: NBTType;
    static COMPOUND: NBTType;
    static INT_ARRAY: NBTType;
    static LONG_ARRAY: NBTType;
    private name;
    private primitive;
    private numeric;
    private array;
    constructor(name: string, primitive: boolean, numeric: boolean, array: boolean);
    getName(): string;
    isPrimitive(): boolean;
    isNumeric(): boolean;
    isArray(): boolean;
    toString(): string;
}
