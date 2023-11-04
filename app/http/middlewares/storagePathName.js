function storagePathName(pathname){
    return function (req, res, next){
        try {
            req.newStoragePathname = pathname;
            next();
        } catch (error) {
            next(error)
        }
    };
}

module.exports = {storagePathName};