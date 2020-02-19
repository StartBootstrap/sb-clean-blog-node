// https://www.fastify.io/docs/latest/Validation-and-Serialization/

import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from 'http';

interface ServerResponseLogObject {
    statusCode: number;
}

interface IncomingMessageLogObject {
    method?: string;
    url?: string;
    headers: IncomingHttpHeaders;
}

export function responseSerializer(res: ServerResponse): ServerResponseLogObject {
    return {
        statusCode: res.statusCode,
    };
}

export function requestSerializer(req: IncomingMessage): IncomingMessageLogObject {
    return {
        method: req.method,
        url: req.url,
        // Including the headers in the log could be in violation
        // of privacy laws, e.g. GDPR. You should use the "redact" option to
        // remove sensitive fields. It could also leak authentication data in
        // the logs.
        headers: req.headers,
    };
}
