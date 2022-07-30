import httpProxy from 'http-proxy'
import c2k from 'koa-connect';

let proxy = httpProxy.createProxyServer({
  changeOrigin: true,
});

function connectMiddlware(req, res, next) {
  console.log('CONNECT MIDDLEWARE');
  // proxy query
  proxy.web(
    req,
    res,
    {
      target: process.env.PERMIT1_URL 
    },
    e => {
      console.log('CALLBACK');
    }
  );
  // done
  proxy.once('proxyRes', function (proxyRes, req, res) {
    setTimeout(next);
  });
}
 
export const _ = {
  handler: async (...args) => {

    // == CHANGE PATH ==
    // remove first slash, then remove ["" "_", "", ""]
    let [ ctx ] = args;
    let [ _1, _2, ...rest ] = ctx.path.split('/');
    ctx.path = '/' + rest.join('/');

    // ROUTE
    await c2k(connectMiddlware)(...args);
  }
}
