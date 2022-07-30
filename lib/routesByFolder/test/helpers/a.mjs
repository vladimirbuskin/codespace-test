// this exports as /data/a
export const home = {
  method: ['POST', 'GET'],
  handler: async (request, h) => {
    return h.response({ message: 'Hello World !!' + request.payload?.name }).code(200);
  }
}

// this exports as /data/a
export const home2 = {
  method: 'PUT',
  handler: async (request, h) => {
    return h.response({ 
      message: 'Hello'
    }).code(200);
  }
}

// this exports as /data/a
export const homeDataAaa = {
  method: 'GET',
  path: "/data/aaa",
  handler: async (request, h) => {
    return h.response({
      message: 'Hello'
    }).code(200);
  }
}

// this exports as /data/a as well
const homeDelete = {
  method: 'DELETE',
  handler: async (request, h) => {
    return h.response({ 
      message: 'Hello'
    }).code(200);
  }
}
// export default works as well
export default homeDelete;

// this one will be skipped, because string
export const str = "asdf"

// this one will be skipped, because number
export const num = 123

// array
export const array = [1,2,3]