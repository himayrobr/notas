const semver = ("semver");

module.esports = (version) => {
    return function (res, res, next) {
        if(req.headers['x-version']){
            if (semver.eq(req.headers['x-version'], version)) {
                return next();
            }
            return next('route');
        }else{
            return next('route');
        }
    };
}