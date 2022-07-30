import test from 'ava';
import { routesMiddlewareFactory } from '../router.mjs'

test('router fails', async t => {
  let routeMiddleware = await routesMiddlewareFactory([
    { 
      method: 'GET', 
      path: '/about',
      handler: async ctx => {
        ctx.body = "respond"
      } 
    }
  ]);
  
  // fail
  let ctx2 = { path: '/about2' };
  await routeMiddleware(ctx2);
  t.deepEqual(ctx2.body, undefined);
});

test('router works', async t => {
  let routeMiddleware = await routesMiddlewareFactory([
    { 
      method: 'GET', 
      path: '/about',
      handler: async ctx => {
        ctx.body = "respond"
      } 
    }
  ]);
  
  // success
  let ctx = { path: '/about' };
  await routeMiddleware(ctx);
  t.deepEqual(ctx.body, "respond");
});

test('router close /', async t => {
  let routeMiddleware = await routesMiddlewareFactory([
    { 
      method: 'GET', 
      path: '/about',
      handler: async ctx => {
        ctx.body = "respond"
      } 
    }
  ]);
  
  // success
  let ctx = { path: '/about/' };
  await routeMiddleware(ctx);
  t.deepEqual(ctx.body, "respond");
});

test('root route', async t => {
  let routeMiddleware = await routesMiddlewareFactory([
    { 
      method: 'GET', 
      path: '/',
      handler: async ctx => {
        ctx.body = "respond"
      } 
    }
  ]);
  
  // success
  let ctx = { path: '/' };
  await routeMiddleware(ctx);
  t.deepEqual(ctx.body, "respond");
});

test('route subpathes /path/one/two/three => /path', async t => {
  let routeMiddleware = await routesMiddlewareFactory([
    { 
      method: 'GET', 
      path: '/path',
      handler: async ctx => {
        ctx.body = "pathRespond"
      }
    }
  ]);
  
  // success
  let ctx = { path: '/path/one/two/three' };
  await routeMiddleware(ctx);
  t.deepEqual(ctx.body, "pathRespond");
  t.deepEqual(ctx.pathArgs, ['path','one','two','three']);
});

test('router debug', async t => {
  let routeMiddleware = await routesMiddlewareFactory([
    { 
      method: 'GET', 
      path: '/about',
      handler: async ctx => {
        ctx.body = "respond"
      }
    }
  ]);
  
  // success
  let ctx2 = { path: '/about', query: { debug: true } };
  await routeMiddleware(ctx2);
  t.regex(ctx2.body, new RegExp("<h1>Debug</h1>"), 'should respond with debug');
});
