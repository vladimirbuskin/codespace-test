export default async function timeout(ms) {
  await new Promise((res, rej) => {
      setTimeout(function () {
          res()
      }, ms)
  })
}