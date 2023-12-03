export class NBTType {
    static END = new NBTType("TAG_End", false, false, false);
    static BYTE = new NBTType("TAG_Byte", true, true, false);
    static SHORT = new NBTType("TAG_Short", true, true, false);
    static INT = new NBTType("TAG_Int", true, true, false);
    static LONG = new NBTType("TAG_Long", true, true, false);
    static FLOAT = new NBTType("TAG_Float", true, true, false);
    static DOUBLE = new NBTType("TAG_Double", true, true, false);
    static BYTE_ARRAY = new NBTType("TAG_Byte_Array", false, false, true);
    static STRING = new NBTType("TAG_String", true, false, false);
    static LIST = new NBTType("TAG_List", false, false, false);
    static COMPOUND = new NBTType("TAG_Compound", false, false, false);
    static INT_ARRAY = new NBTType("TAG_Int_Array", false, false, true);
    static LONG_ARRAY = new NBTType("TAG_Long_Array", false, false, true);
    name;
    primitive;
    numeric;
    array;
    constructor(name, primitive, numeric, array) {
        this.name = name;
        this.primitive = primitive;
        this.numeric = numeric;
        this.array = array;
    }
    getName() {
        return this.name;
    }
    isPrimitive() {
        return this.primitive;
    }
    isNumeric() {
        return this.numeric;
    }
    isArray() {
        return this.array;
    }
    toString() {
        return this.name;
    }
}
