import { NextFunction, Request, Response } from "express";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
        return next();
    }

    return res.redirect(`/auth/login?next=${req.originalUrl}`);
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    requireAuth(req, res, () => {
        if (req.session.user?.isAdmin === true) {
            return next();
        }
        return res.send('Forbidden')
    })
}