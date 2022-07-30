import { routeDebug } from './routeDebug.mjs'
import { routeDoc } from './routeDoc.mjs'
import { routeDocs } from './routeDocs.mjs'

// load routes
export function routesMiddlewareFactory(routes) {
  // routes map where key is URL = route.path
  // so we route fast, may be enhance later
  let routesMap = {}
  for (let route of routes) {
    routesMap[route.path] = routesMap[route.path] ?? []
    routesMap[route.path].push(route)
  }
  // return middleware
  return async (...args) => {
    let [ ctx ] = args;
    let path = ctx.path;
    // remove ending slash, /about/ => /about
    if (path !== "/") path = path.replace(new RegExp('/$'), "")
    
    // search for the route
    let route = routesMap[path]
    
    // if null, we are trying to search for subroutes
    // /route/first/second/third
    // /route/first/second
    // /route/first
    // /route
    if (route == null) {
      let parts = path.split("/").slice(1);
      let i = 1;
      // [1,2,3]
      while (i < parts.length) {
        let subpath = '/' + parts.slice(0, parts.length-i).join('/');
        route = routesMap[subpath];
        if (route != null) {
          ctx.pathArgs = parts
          break; // we found route
        }
        i++;
      }
    }
    
    // debug
    if (ctx.query && !!ctx.query.debug) {
      return routeDebug(ctx, route, routesMap);
    }
    // documentation all routes
    if (ctx.query && !!ctx.query.docs) {
      return routeDocs(ctx, routes);
    }
    // documentation current route
    if (ctx.query && !!ctx.query.doc) {
      return routeDoc(ctx, route);
    }
    // process found route
    if (route) {
      // validate dataType
      if (ctx.method != "GET" && route.dataType) {
        let isValid = validateRequestBody(ctx, route.dataType)
        if (!isValid) return
      }

      // take first route with the URL, may be later we will find out something smarter
      let start = new Date();
      console.log(`== ROUTE ${path} start`);
      await route[0].handler(...args);
      console.log(`== ROUTE ${path} end`, new Date() - start + "ms");
    }
  }
}

function validateRequestBody(ctx, route) {
  if (route.dataType && ctx.request.body) {
    // if propTypes are not valid
    if (!propTypes.checkPropTypes(route.dataType, ctx.request.body)) {

    }
  }
}