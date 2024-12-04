import { Request, Response, NextFunction } from 'express';

export function catchError(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const res: Response = args[1];  // The second argument is `res` in Express (Request, Response)
    try {
      await originalMethod.apply(this, args);  // Execute the original method
    } catch (error: any) {
      console.error(`Error occurred in method ${propertyKey}:`, error);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message || error,
      });
    }
  };

  return descriptor;
}
