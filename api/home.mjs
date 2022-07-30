export const _ = {
  path: '/',
  handler: async (ctx) => {
    ctx.body = { message: 'Hello World!!!', permit1: process.env.PERMIT1_URL, method: ctx.method };
  }
}
