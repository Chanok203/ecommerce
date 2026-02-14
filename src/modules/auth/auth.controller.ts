import { Request, Response } from 'express';
import { login } from './auth.service';

export const renderLoginForm = (req: Request, res: Response) => {
    res.render('auth/login.html');
};

export const handleLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await login(username, password);
        const nextPage = req.query.next ? `${req.query.next}` : '/';
        req.session.user = user;
        req.session.save(() => {
            res.redirect(nextPage);
        });
    } catch (error) {
        res.render('auth/login.html', {
            error: error,
        });
    }
};
