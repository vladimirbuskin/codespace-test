import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { routesByFolder } from '../lib/routesByFolder/routesByFolder.mjs'
import { routesMiddlewareFactory } from '../lib/router/router.mjs'
import { rootDir } from '../lib/utils.js'


const app = new Koa();

export const applyMiddlewares = async app => {
    // body parser
    app.use(bodyParser());

    // router middleware
    let routes = await routesByFolder(rootDir("./api"));
    app.use(routesMiddlewareFactory(await routes));
}

// for unit tests
export const init = async () => {
    await applyMiddlewares(app);
};

// for running
export const start = async () => {
    console.log(process.env);
    const LISTEN_PORT = process.env.NODE_PORT ?? 3000;
    await applyMiddlewares(app);
    app.listen(LISTEN_PORT);
    console.log(`listenting on port ${LISTEN_PORT}`)
};
