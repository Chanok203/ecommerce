import { Request, Response } from 'express';
import { UserService } from './users.service';

const userService = new UserService();

export const renderUpdateMeForm = (req: Request, res: Response) => {
    res.render('web/users/updateMe.html');
};

export const handleUpdateMe = async (req: Request, res: Response) => {
    const { name } = req.body;
    const updateData: any = {
        name,
    };

    if (res.locals.avatarPath) {
        updateData.avatar = res.locals.avatarPath;
    }

    await userService.update(res.locals.user.id, updateData);
    res.redirect('/');
};

export const renderChangePasswordForm = (req: Request, res: Response) => {
    res.render('web/users/changePassword.html');
};

export const handleChangePassword = async (req: Request, res: Response) => {
    const { currentPassword, newPassword, newPassword2 } = req.body;
    await userService.changePassword(res.locals.user.id, currentPassword, newPassword, newPassword2);

    req.session.destroy((err) => {
        if (err) {
            throw new Error('Cannot destory session');
        }
        res.clearCookie('connect.sid');
        return res.redirect('/');
    });
};

export const handleDeleteMe = async (req: Request, res: Response) => {
    await userService.delete(res.locals.user.id);

    req.session.destroy((err) => {
        if (err) {
            throw new Error('Cannot destory session');
        }
        res.clearCookie('connect.sid');
        return res.redirect('/');
    });
};
