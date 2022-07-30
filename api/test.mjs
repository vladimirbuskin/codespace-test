import knex from '../lib/knex.mjs'

export const _ = {
  method: 'GET',
  dataType: {
    text1: "string",
    number1: "number"
  },
  handler: async ctx => {
    ctx.request.body.some = "123"
    ctx.body = ctx.request.body
  }
}
