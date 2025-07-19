export class NodeUtils {
    clone: (obj: any) => any;
    flatten: (arrays: any) => any;
    present: (data: any) => boolean;
    indexBy: (array: any, key: any) => {};
    only: (object: any, keys: any) => {};
    except: (object: any, keys: any) => any;
    pluck: (array: any, key: any) => any;
    compact: (array: any) => any;
    parseCSV: (csv_content: any, { delimeter, isHeader }: {
        delimeter?: string;
        isHeader?: boolean;
    }) => any;
    uniq: (data: any) => any;
    timeStamp: (date?: any) => number;
    getUUID: () => string;
    getClass: (field: any) => any;
    stripObject: (input: any) => any;
    toString(value: any, minDigit?: number): any;
    encodeBase64: (value: any) => string;
    decodeBase64: (value: any) => string;
    sleep: (seconds: any) => Promise<any>;
    toFormData(payload: any): FormData;
}
import FormData = require("form-data");
