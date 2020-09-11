import "reflect-metadata";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { Methods } from './Methods';
import { MetaDataKeys } from './MetaDataKeys'
import { AppRouter } from "../../AppRouter";

function bodyValidators(keys: string): RequestHandler {
    return function(req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            res.status(422).send('Invalid request');
            return;
        }
        for (let key of keys) {
            if(!req.body[key]) {
                res.status(422).send(`Missing property ${key}`);
                return;
            }
        }
        next();
    }
}

export function controller (routePrefix: string): Function {
    return function(target: Function) {
        const router = AppRouter.getInstance();
        for(let key in target.prototype) {
            const handler = target.prototype[key];

            const path = Reflect.getMetadata(MetaDataKeys.path, 
                target.prototype, 
                key);

            const method: Methods = Reflect.getMetadata(MetaDataKeys.method, 
                target.prototype, 
                key);

            const middlewares = Reflect.getMetadata(
                MetaDataKeys.middleware,
                target.prototype,
                key
            ) || [];
            const requireBodyProps = Reflect.getMetadata(MetaDataKeys.validator, 
                target.prototype, 
                key) || [];
            
            const validator = bodyValidators(requireBodyProps);

            if (path) {
                router[method](`${routePrefix}${path}`, ...middlewares, validator,handler);
            }
        }
    }
}