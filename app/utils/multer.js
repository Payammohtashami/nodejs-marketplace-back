const fs = require('fs');
const createHttpError = require('http-errors');
const multer = require('multer');
const path = require('path');

function createRoute(req){
    const date = new Date();
    const year = "" + date.getFullYear();
    const month = "" + date.getMonth();
    const day = "" + date.getDate();
    const directory = path.join(__dirname, "..", "..", 'public', 'uploads', 'blogs', year, month, day);
    req.body.fileUploadPath = path.join('uploads', 'blogs', year, month, day)
    fs.mkdirSync(directory, {recursive: true});
    return directory;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const filePath = createRoute(req);
        cb(null, filePath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = String(new Date().getTime() + ext) 
        req.body.filename = fileName;
        cb(null, fileName)
    },
});

function fileFilter(req, file, cb){
    const ext = path.extname(file.originalname);
    const mimeType = ['.png', '.jpg', '.jpeg', '.webp'];
    if(mimeType.includes(ext)){
        return cb(null, true);
    } else {
        cb(createHttpError.BadRequest('فرمت ارسال شده تصویر صحیح نمی باشد'));
    };
};

const uploadFile = multer({ storage, fileFilter });

module.exports = {
    uploadFile,
};