const fs = require('fs');
const createHttpError = require('http-errors');
const multer = require('multer');
const path = require('path');

function createRoute(req){
    const storagePathname = "" + req.newStoragePathname;
    console.log(storagePathname);
    const date = new Date();
    const year = "" + date.getFullYear();
    const month = "" + date.getMonth();
    const day = "" + date.getDate();
    const directory = path.join(__dirname, "..", "..", 'public', 'uploads', storagePathname, year, month, day);
    req.body.fileUploadPath = path.join('uploads', storagePathname, year, month, day)
    fs.mkdirSync(directory, {recursive: true});
    return directory;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file?.originalname){
            const filePath = createRoute(req);
            return cb(null, filePath);
        } else {
            return cb(null, null);
        };
    },
    filename: (req, file, cb) => {
        if(file.originalname){
            const ext = path.extname(file.originalname);
            const fileName = String(new Date().getTime() + ext) 
            req.body.filename = fileName;
            return cb(null, fileName)
        } else {
            return cb(null, null);
        };
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

function videoFilter(req, file, cb){
    const ext = path.extname(file.originalname);
    const mimeType = ['.mp4', '.mpg', '.avi', '.mov', '.mkv'];
    if(mimeType.includes(ext)){
        return cb(null, true);
    } else {
        cb(createHttpError.BadRequest('فرمت ارسال شده ویدئو صحیح نمی باشد'));
    };
};

const pictureMaxSize = 1 * 1000 * 1000
const videomaxSize = 300 * 1000 * 1000

const uploadFile = multer({ storage, fileFilter, limits: { fileSize: pictureMaxSize }});
const uploadVideo = multer({ storage, videoFilter, limits: { fileSize: videomaxSize }});

module.exports = {
    uploadFile,
    uploadVideo,
};