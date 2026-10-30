import type { IncomingMessage, ServerResponse } from 'node:http';
import morgan from 'morgan';

function jsonFormat(
  tokens: morgan.TokenIndexer,
  req: IncomingMessage,
  res: ServerResponse,
) {
  const status = tokens.status(req, res);
  const responseTime = tokens['response-time'](req, res);
  const contentLength = tokens.res(req, res, 'content-length');

  return JSON.stringify({
    timestamp: new Date().toISOString(),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: status ? Number(status) : undefined,
    responseTimeMs: responseTime ? Number(responseTime) : undefined,
    contentLength: contentLength ? Number(contentLength) : undefined,
  });
}

export const requestLogger = morgan(jsonFormat);
