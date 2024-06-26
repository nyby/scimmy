import {ErrorMessage} from "./messages/error.js";
import {ListResponse} from "./messages/listresponse.js";
import {PatchOp} from "./messages/patchop.js";
import {BulkRequest} from "./messages/bulkrequest.js";
import {BulkResponse} from "./messages/bulkresponse.js";
import {SearchRequest} from "./messages/searchrequest.js";

/**
 * SCIMMY Messages Container Class
 * @namespace SCIMMY.Messages
 * @description
 * SCIMMY provides a singleton class, `SCIMMY.Messages`, that includes tools for constructing and
 * consuming SCIM-compliant data messages to be sent to, or received from, a SCIM service provider.
 */
export default class Messages {
    static Error = ErrorMessage;
    static ListResponse = ListResponse;
    static PatchOp = PatchOp;
    static BulkRequest = BulkRequest;
    static BulkResponse = BulkResponse;
    static SearchRequest = SearchRequest;
}