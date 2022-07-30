import test from 'ava';
import { loadModule, routesByFolder, routeFilesByFolder } from '../routesByFolder.mjs'

import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


test('routeFilesByFolder', async t => {
  let routes = await routeFilesByFolder(__dirname + "/helpers");
  t.deepEqual(routes, [ 
    '/a.mjs',
    '/b.js',
    '/b2.js',
    '/empty.js',
    '/skip.js',
    '/sub/c.mjs'
  ])
});

test('routeFilesByFolder no test files included', async t => {
  let routes = await routeFilesByFolder(__dirname);
  t.deepEqual(routes[0], '/helpers/a.mjs')
});

test('routesByFolder', async t => {
  let routes = await routesByFolder(__dirname);
  t.deepEqual(routes.map(x => x.path + "_" + JSON.stringify(x.method)), [
    '/helpers/a_"DELETE"',
    '/helpers/a_["POST","GET"]',
    '/helpers/a_"PUT"',
    '/data/aaa_"GET"', 
    '/helpers/b_["POST","GET"]',
    '/helpers/b2_["POST","GET"]',
    '/helpers/sub/c_undefined'
  ])
});

test('loadModule', async t => {
  let data = await loadModule(__dirname, "/helpers/a.mjs");
  let ma = data.map(x => { 
    let { handler, ...rest } = x;
    return rest;
  });
  t.deepEqual(ma, [
    {
      method: 'DELETE',
      path: '/helpers/a'
    },
    {
      method: [ 'POST', 'GET' ],
      path: '/helpers/a'
    },
    { method: 'PUT', path: '/helpers/a' },
    {
      method: 'GET',
      path: '/data/aaa'
    }
  ]);
})

test('loadModule2', async t => {
  let data = await loadModule(__dirname, "/helpers/sub/c.mjs");
  let ctx = {};
  await data[0].handler(ctx);
  t.is(ctx.body, 'sub/c')
})

test('commonjs1', async t => {
  let data = await loadModule(__dirname, "/helpers/b.js");
  t.is(data.length, 1)
  t.deepEqual(data[0].method, [ 'POST', 'GET' ])
})

test('commonjs2', async t => {
  let data = await loadModule(__dirname, "/helpers/b2.js");
  t.is(data.length, 1)
  t.deepEqual(data[0].method, [ 'POST', 'GET' ])
})
