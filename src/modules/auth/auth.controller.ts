import { Request, Response } from 'express';
import { login, register } from './auth.service';

export const renderLoginForm = (req: Request, res: Response) => {
    res.render('auth/login.html');
};

export const handleLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await login(username, password);
        const nextPage = req.query.next ? `${req.query.next}` : '/';
        req.session.user = user;
        req.session.save((err) => {
            console.log(`save err: ${err}`);
            res.redirect(nextPage);
        });
    } catch (error) {
        res.render('auth/login.html', {
            error: error,
        });
    }
};

export const handleLogout = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            throw new Error('Cannot destory session');
        }
        res.clearCookie('connect.sid');
        return res.redirect('/');
    });
};

export const renderRegisterForm = (req: Request, res: Response) => {
    res.render('auth/register.html');
};

export const handleRegister = async (req: Request, res: Response) => {
    const { name, username, password, password2 } = req.body;
    const avatarPath = res.locals.avatarPath;

    try {
        const user = await register(name, avatarPath, username, password, password2);
        res.redirect('/auth/login');
    } catch (error) {
        res.render('auth/register.html', {
            error: error,
        });
    }
};
