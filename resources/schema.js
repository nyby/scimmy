import {Resource, Error as SCIMError} from "../types.js";
import {ListResponse} from "../messages.js";
import Schemas from "../schemas.js";

/**
 * SCIM Schema Resource
 * @extends {Resource}
 */
export class Schema extends Resource {
    /** @implements {Resource~endpoint} */
    static get endpoint() {
        return "/Schemas";
    }
    
    /** @implements {Resource~#basepath} */
    static #basepath;
    /** @implements {Resource~basepath} */
    static basepath(path) {
        if (path === undefined) return Schema.#basepath;
        else if (Schema.#basepath === undefined)
            Schema.#basepath = (path.endsWith(Schema.endpoint) ? path : `${path}${Schema.endpoint}`);
        
        return Schema;
    }
    
    /**
     * @override {Resource~extend}
     * @throws {TypeError} SCIM 'Schema' resource does not support extension
     */
    static extend() {
        throw new TypeError("SCIM 'Schema' resource does not support extension");
    }
    
    /**
     * Instantiate a new SCIM Schema resource and parse any supplied parameters
     * @implements {Resource#constructor}
     */
    constructor(params, ...rest) {
        // Bail out if a resource is requested by filter
        if (!!(typeof params === "string" ? rest[0] ?? {} : params ?? {}).filter)
            throw new SCIMError(403, null, "Schema does not support retrieval by filter");
        
        super(params, ...rest);
    }
    
    /** @implements {Resource#read} */
    async read() {
        if (!this.id) {
            return new ListResponse(Object.entries(Schemas.declared())
                .map(([, S]) => S.describe(Schema.basepath())));
        } else {
            try {
                return Schemas.declared(this.id).describe(Schema.basepath());
            } catch (ex) {
                throw new SCIMError(404, null, `Schema ${this.id} not found`);
            }
        }
    }
}