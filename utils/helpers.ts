import { z } from 'zod/v4'
import type { ZodError, ZodSchema } from 'zod'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: ZodError }

export const validateResult = <T>(
  input: unknown,
  schema: ZodSchema<T>
): ValidationResult<T> => {
  const result = schema.safeParse(input)
  return result.success
    ? { success: true, data: result.data }
    : { success: false, error: result.error }
}

export const formatZodError = (error: ZodError) => {
  return error.flatten()
}

export const redirectAndRevalidateCache = (redirectUrl: string, invalidatePath: string, pathType: 'layout' | 'page') => {
  revalidatePath(invalidatePath, pathType)
  redirect(redirectUrl)
}

export const withErrorHandler = (handler: NextApiHandler) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    try {
      await handler(request, response)
    } catch (error) {
      if ('log' in request && typeof request.log.error === 'function') {
        request.log.error({ error })
      } else {
        console.error('Unhandled API error:', error)
      }

      response.status(500).json({
        error: 'Something went wrong. Please Try again later.',
      })
    }
  }
}

type HandlerWrapperType = (handler: NextApiHandler) => NextApiHandler;

/**
 * Function composer for easily chaining middleware wrappers.
 * @param wrappers 
 * accepts an array of functions where each one takes a NextApiHandler and returns NextApiHandler
 */
export const withApiMiddleware = (...wrappers: HandlerWrapperType[]) => {
  return (handler: NextApiHandler) => wrappers.reduceRight((acc, wrapper) => wrapper(acc), handler)
}
