import { body, ValidationChain } from 'express-validator';

export function bodyField(path: string, optional: boolean): ValidationChain {
  const chain = body(path);
  return optional ? chain.optional() : chain;
}
