var PHPFPM = require('node-phpfpm');

// we are redirecting all /php/* queries to our server FPM

var phpfpm = new PHPFPM(
{
    host: '127.0.0.1',
    port: 9000,
    documentRoot: "/var/www/html/php/"
});
 
function proxyUrl(url) {
  let [ _1, _2, ...rest ] = url.split('/');
  return rest.join('/');
}

module.exports.data = {
  handler: async ctx => {
    let url = proxyUrl(ctx.url);
    // /php/dev?a=1 => dev.php?a=1
    // url = dev.php?a=1

    ctx.body = await new Promise((res, rej) => {
      phpfpm.run(url, function(err, output, phpErrors)
      {
          if (err == 99) rej('PHPFPM server error');
          res(output);
          if (phpErrors) rej(phpErrors);
      });
    })
  }
}