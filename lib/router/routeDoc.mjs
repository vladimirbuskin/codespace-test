// ?doc=1
export function routeDoc(ctx, route) {
  ctx.type = 'text/html; charset=UTF-8';
  ctx.body = route.map(r => `
  <h1>Service</h1>
  <div><a href="${r.path}?docs=1">ALL</a>, <a href="${r.path}?debug=1">DEBUG</a></div><br/>
  <div>path: <a href="${r.path}">${r.path}</a></div>
  <div>methods: ${(Array.isArray(r.method) ? r.method : [r.method]).join(", ")}</div><br/>
  <div>dataType:</div>
  <pre>${JSON.stringify(r.dataType || {}, 2, 2)}</pre>
  `).join("\n")
}