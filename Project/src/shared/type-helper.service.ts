export class TypeHelperService {
    isString(value: unknown): value is string {
        return typeof value === "string";
    }
}