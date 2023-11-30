import { Parser } from "./parser/Parser.js";
import { NBTByte, NBTByteArray, NBTCompound, NBTDouble, NBTEnd, NBTFloat, NBTInt, NBTIntArray, NBTList, NBTLong, NBTLongArray, NBTNamedTag, NBTShort, NBTString, NBTTag, NBTType } from "./value";

export * from "./parser";
export * from "./value";

export default Parser;

// For web.
function getMojangson() {
    return {
        Parser,
        NBTByte,
        NBTByteArray,
        NBTCompound,
        NBTDouble,
        NBTEnd,
        NBTFloat,
        NBTInt,
        NBTIntArray,
        NBTList,
        NBTLong,
        NBTLongArray,
        NBTNamedTag,
        NBTShort,
        NBTString,
        NBTTag,
        NBTType
    }
}