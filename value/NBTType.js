
class NBTType {
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

NBTType.END = new NBTType("TAG_End", false, false, false);
NBTType.BYTE = new NBTType("TAG_Byte", true, true, false);
NBTType.SHORT = new NBTType("TAG_Short", true, true, false);
NBTType.INT = new NBTType("TAG_Int", true, true, false);
NBTType.LONG = new NBTType("TAG_Long", true, true, false);
NBTType.FLOAT = new NBTType("TAG_Float", true, true, false);
NBTType.DOUBLE = new NBTType("TAG_Double", true, true, false);
NBTType.BYTE_ARRAY = new NBTType("TAG_Byte_Array", false, false, true);
NBTType.STRING = new NBTType("TAG_String", true, false, false);
NBTType.LIST = new NBTType("TAG_List", false, false, false);
NBTType.COMPOUND = new NBTType("TAG_Compound", false, false, false);
NBTType.INT_ARRAY = new NBTType("TAG_Int_Array", false, false, true);
NBTType.LONG_ARRAY = new NBTType("TAG_Long_Array", false, false, true);

export { NBTType }