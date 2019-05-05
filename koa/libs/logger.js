// logger

module.exports = (format) => {
    format = format || ':method :status :remote :url :param';

    return async (ctx, next) => {
        let str = format; 

        str = str.replace(/:remote/g, ctx.host);
        str = str.replace(/:method/g, ctx.method);
        str = str.replace(/:url/g, ctx.url);
        str = str.replace(/:param/g, JSON.stringify(ctx.query));
        str = str.replace(/:status/g, ctx.status);
        
        await next();
        
        console.log(str);
    }
}