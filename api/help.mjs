import path from 'path';
import { readFile } from 'fs/promises';
import { markdown } from 'markdown';

export const _ = {
  method: 'GET',
  dataType: {
  },
  handler: async ctx => {
    let url = (ctx.request.query.page || "index")+".md";
    url = url.replace(new RegExp(/\.\./), '_');
    let articlePath = path.resolve(`./help/${url}`);
    // for safety reason do not allow to use ".."
    // do not allow to use .., 
    let content = await readFile(articlePath, 'utf8');
    ctx.type = "text/html; charset=UTF-8"
    ctx.body = markdown.toHTML(content);
  }
}
