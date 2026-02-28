import { Request, Response } from 'express';
import { UserService } from '../../users/users.service';
import { register } from '../../auth/auth.service';

const userService = new UserService();

export const renderAllUsers = async (req: Request, res: Response) => {
    const { error } = req.query;

    const users = await userService.findAll(true);
    res.render('admin/users/userList.html', {
        users,
        error,
    });
};

export const renderCreateUserForm = async (req: Request, res: Response) => {
    res.render('admin/users/userCreate.html');
};

export const handleCreateUser = async (req: Request, res: Response) => {
    const { name, username, password, password2 } = req.body;
    try {
        const user = await register(name, null, username, password, password2);
        res.redirect('/admin/users');
    } catch (error) {
        res.render('admin/users/userCreate.html', {
            error: error,
        });
    }
};

export const renderUpdateUserForm = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (Array.isArray(id)) {
        throw new Error('Error');
    }

    try {
        const thisUser = await userService.findOne(id, false);
        res.render('admin/users/userUpdate.html', {
            thisUser,
        });
    } catch (error: any) {
        if (error.statusCode == 404) {
            let message = `Cannot update because ${error.message}`;
            return res.redirect(`/admin/users?error=${message}`);
        }
        throw error;
    }
};

export const handleUpdateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    if (Array.isArray(id)) {
        throw new Error(`Error`);
    }

    await userService.update(id, { name: name });

    res.redirect('/admin/users')
};

export const handleDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (Array.isArray(id)) {
        throw new Error(`ERROR`);
    }
    if (req.session.user!.id == id) {
        let error = 'Cannot delete yourself';
        return res.redirect(`/admin/users?error=${error}`);
    }

    await userService.delete(id);
    return res.redirect(`/admin/users`);
};
