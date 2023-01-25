export = NodeUtils;
declare class NodeUtils {
    static clone: (obj: any) => any;
    static flatten: (arrays: any) => any;
    static present: (data: any) => boolean;
    static indexBy: (array: any, key: any) => {};
    static only: (object: any, keys: any) => {};
    static except: (object: any, keys: any) => any;
    static pluck: (array: any, key: any) => any;
    static compact: (array: any) => any;
    static parseCSV: (csv_content: any, { delimeter, isHeader }: {
        delimeter?: string;
        isHeader?: boolean;
    }) => any;
    static uniq: (data: any) => any;
    static timeStamp: (date?: any) => number;
    static getUUID: () => string;
    static getClass: (field: any) => any;
    static stripObject: (input: any) => any;
    static toString(value: any, minDigit?: number): any;
    static encodeBase64: (value: any) => string;
    static decodeBase64: (value: any) => string;
    static sleep: (seconds: any) => Promise<any>;
}
