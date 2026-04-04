import { Request, Response } from 'express';
import { TopupService } from './topup.service';

const topupService = new TopupService();

export const renderListTopup = async (req: Request, res: Response) => {
    const ownerId = req.session.user!.id;
    const topupList = await topupService.findAll(ownerId);
    res.render('web/topup/topupList.html', { topupList });
};

export const renderCreateTopupForm = async (req: Request, res: Response) => {
    res.render('web/topup/topupCreate.html');
};

export const handleCreateTopup = async (req: Request, res: Response) => {
    if (!req.session.user) {
        req.flash('danger', 'Please Login');
        return res.render('web/topup/topupCreate.html', { error: 'Please Login' });
    }

    if (!req.body.price) {
        req.flash('danger', 'Price is required (float)');
        return res.render('web/topup/topupCreate.html', { error: 'Price is required (float)' });
    }

    if (!req.file) {
        req.flash('danger', 'File is required (image)');
        return res.render('web/topup/topupCreate.html', { error: 'File is required (image)' });
    }

    const ownerId = req.session.user.id;
    const price = Number(req.body.price);
    const image = req.file.filename;

    const topup = await topupService.create(ownerId, price, image);
    req.flash('success', 'Created top-up request successfully');
    res.redirect('/topup');
};
