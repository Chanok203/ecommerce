import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import multer, { Options } from 'multer';
import path from 'path';
import sharp from 'sharp';

const uploadPath = 'uploads/avatars';

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const fileFilter: Options['fileFilter'] = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files allowed'));
    }
};

export const avatarUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
});

export const resizeAvatar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            const error: any = new Error('Avatar not found');
            error.statusCode = 400;
            throw error;
        }

        const ext = '.png';
        const filename = crypto.randomUUID() + ext;
        const filepath = path.join(uploadPath, filename);

        await sharp(req.file.buffer).resize(32, 32).png().toFile(filepath);
        res.locals.avatarPath = filename;
        next();

    } catch (error) {
        next(error);
    }
};
