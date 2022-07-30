export function routeDebug(ctx, route, routesMap) {
  // take first route
  route = route[0];
  ctx.type = 'text/html; charset=UTF-8';
  ctx.body = `
<h1>Debug</h1>
<div><a href="${route.path}?docs=1">ALL</a></div><br/>

<pre>
<b>METADATA</b>
path: <a href="${ctx.path}?doc=1">${ctx.path}</a>
method: ${ctx.method}
dataType:
${JSON.stringify(route.dataType || {}, 2, 2)}

<b>SERVER DATA</b>
body:
${JSON.stringify((ctx.request ?? {}).body, 2, 2)}
query: ${ctx.querystring}
${route ? "route: " + JSON.stringify(route): "route: NONE"}

<script type="application/javascript">
function __send(el) {
  var url = document.location.pathname + document.location.search.replace(/debug=\w*/,"");
  var data = {
    method: el.value,
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
  }
  if (el.value != 'GET') data.body = document.getElementById('json').value
  fetch(url, data)
  .then(r => r.text())
  .then(text => {
    document.getElementById('output').innerText = text
  });
}
</script>

<b>PLAY</b>
<textarea id="json" style="width: 500px; height: 150px">${ JSON.stringify(route.dataType || {}, 2, 2) }</textarea>
<input type="button" value="GET" onclick="__send(this)" /> <input type="button" value="POST" onclick="__send(this)" /> <input type="button" value="PUT" onclick="__send(this)" /> <input type="button" value="DELETE" onclick="__send(this)" />
</pre>
<pre id="output"></pre>
`;
}
