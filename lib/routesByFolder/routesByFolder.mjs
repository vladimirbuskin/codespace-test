import { readdir, stat } from 'fs/promises';
import { join } from 'path'

export const loadModule = async (path, routeFile) => {
  let st = await import(join(path, routeFile));
  let keys = Object.keys(st);
  // if (keys.length > 1) {
  //   throw new Error(`File, "${routeFile}" has more than one exported objects ${keys.join(",")}.`);
  // }
  // take single module
  let modules = keys.map(key => {
    let module = st[key];
    if (module == null) return;
    // skip modules without handlers, we have nothing to do with them, may be this is not a module at all
    if (module.handler == null) return;
    let type = typeof(module);
    
    // skip wrong values
    if (Array.isArray(module)) {
      //console.warn(`Skipping "${routeFile}" => "${key}" can't be an array`);
      return
    }
    if (type=="string") {
      //console.warn(`Skipping "${routeFile}" => "${key}" can't be a string`);
      return
    }
    if (type=="number") {
      //console.warn(`Skipping "${routeFile}" => "${key}" can't be a number`);
      return
    }
    // we skip, default key in .js files. because it kinda makes dup
    if (routeFile.match(/\.js$/) && key == "default" && keys.length > 1) {
      return
    }

    if (module.path == null) {
      let defPath = routeFile.replace(/\.m?js$/, '');
      module.path = defPath;
    }
    // set path
    if (module.path == null) {
      let defPath = routeFile.replace(/\.m?js$/, '');
      module.path = defPath;
    }
    return module;
  }).filter(x => x);
  return modules
}

export const routesByFolder = async (path, sub = "", routes = []) => {
  const routeFiles = await routeFilesByFolder(path, sub = "", routes);
  const outRoutes = []
  for (const routeFile of routeFiles) {
    try {
      let rt = await loadModule(path, routeFile);
      rt.forEach(r => outRoutes.push(r));
    } catch (e) {
      console.error('ERROR', routeFile, e)
    }
  }
  return outRoutes
}

export const routeFilesByFolder = async (path, sub = "", routes = []) => {
  if (path == null) return routes;
  const fullPath = join(path, sub);
  const files = await readdir(fullPath);
  for (const file of files) {
    if (
      // this is .js or .mjs
      file.match(/\.m?js/) &&
      // this is not .test.js or .test.mjs
      !file.match(/\.test.m?js/)
    ) {
      routes.push("/"+join(sub,file));
    }
    
    let st = await stat(join(fullPath,file));
    if (st.isDirectory()) {
      await routeFilesByFolder(path, join(sub, file), routes);
    }
  }
  return routes
}