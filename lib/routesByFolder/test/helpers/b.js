module.exports.home = {
  method: ['POST', 'GET'],
  handler: async (request, h) => {
    return h.response({ message: 'Hello World !!' + request.payload?.name }).code(200);
  }
}