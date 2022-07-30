import knex from '../lib/knex.mjs'
import c2k from 'koa-connect'

// A generic Express-style middleware function
function connectMiddlware(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('From the Connect middleware');
  next();
}

export const _ = {
  handler: c2k(connectMiddlware)
}