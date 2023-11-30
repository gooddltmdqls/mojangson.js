export declare class ParserError extends Error {
    constructor(msg: string, content: string, index: number);
    private static printErrorLoc;
}
