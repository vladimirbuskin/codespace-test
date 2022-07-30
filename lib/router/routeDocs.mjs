// ?docs=1
export function routeDocs(ctx, route) {
  ctx.type = 'text/html; charset=UTF-8';
  ctx.body = `
  <h1>Services</h1>
  <table border="1" cellpadding="5">${
    // map routes
    route.map(r => { return `
    <tr>
      <td><a href="${r.path}?doc=1">${r.path}</a></td>
      <td>${(Array.isArray(r.method) ? r.method : [r.method]).join(" ")}</td>
    </tr>`;
    }).join("\n")
  }
  </table>`;
}