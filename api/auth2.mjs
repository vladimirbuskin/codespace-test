import knex from '../lib/knex.mjs'
import c2k from 'koa-connect'

export const _ = {
  handler: async (ctx) => {
    ctx.body = { as: 122 };
  }
}
