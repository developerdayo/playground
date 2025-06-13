import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import pino from "pino";
import { pinoHttp } from "pino-http";

const isProd = process.env.NEXT_PUBLIC_APP_ENV === 'prod'

const logger = pino({
  redact: {
    paths: [
      "req.body.password",
      "req.body.token",
      "user.password",
      "headers.authorization"
    ],
    censor: '[REDACTED]',
  },
  transport: isProd
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
    }
})

export const serverLogger = {
  error: (error: any) => logger.error(error),
}

export const requestLogger = pinoHttp({
  logger,
  customLogLevel: (response, error) => {
    if (!response.statusCode || response.statusCode >= 500 || error) return 'error'
    if (response.statusCode >= 400) return 'warn'
    return 'info'
  },
  serializers: {
    request(request) {
      return {
        method: request.method,
        url: request.url,
        headers: request.headers,
      }
    },
    response(response) {
      return {
        statusCode: response.statusCode,
      }
    }
  }
})

export const withLogger = (handler: NextApiHandler) => {
  return (request: NextApiRequest, response: NextApiResponse) => {
    requestLogger(request, response)
    return handler(request, response)
  }
}

export const withErrorHandler = (handler: NextApiHandler) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    try {
      await handler(request, response)
    } catch (error) {
      if ('log' in request && typeof request.log.error === 'function') {
        request.log.error(error)
      } else {
        console.log('An unhandled error occurred')
      }

      response.status(500).json({ error: 'An internal server error occurred' })
    }
  }
}

export default logger