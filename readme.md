# Permit2

## Project structure
api - we put regular api services in there, everything in api folder is autoloaded into the app
lib - ability to add some sophisticated utilities which will automate a lot with test coverage please if something complicated
      for ex: i've added "routesByFolder" functionality to load routes automatically, and put test coverage within.
      this way it is nice and modular, we can run those tests separately by go to the folder and run "lab" from within test folder
      Please as low deps as possible, in libs folders, one from another, we may use some of code frontend and backend

## Run tests
npm run test

install "ava-test-runner" for vscode, run test from editor, open test click Run near the test.

## Phase 1
- Describe all tables with links in data.graph.mjs
- Implement AUTH
- Implement in data.js, server
  dataSave, 
  dataLoad, 
  dataFetch, 
  dataDelete
  dataGraph
- We should have library on client, which allows us to work with database on a client
  db.dataSave, 
  db.dataLoad, 
  db.dataFetch, 
  db.dataDelete,
  db.dataGraph
- Deploy:
  mesacounty.maintstar.co  => h9.maintstar.co/mesacounty
  waukegan.maintstar.co  => h9.maintstar.co/waukegan

# Phase 2
- Implement AuditLog functionality, it will schedule logs in dataSave, dataDelete
- Make listeners functionality which will allow us to subscribe on change events,
  // database events
  msev.on("before_add", function (entities) { })
  msev.on("before_update", function (entities) { })
  // "save" is getting called always, with "add" or "update".
  msev.on("before_save", function (entities) { })
  msev.on("before_delete", function (entities) { })
  msev.on("after_*", function (entities) { })

# Make 
Whole project UI will consist out of widgets
In edit mode we will be able to 
We will be able to add tree nodes, rearrange tree nodes

We make a tree view, for a setup, we will be able to add widget for each
We make tree view SETUP to edit everything in our system, specific node in a tree will particular page connected.
We implement widgets, 
http://golden-layout.com/tutorials/getting-started.html
DND
https://github.com/isaacHagoel/svelte-dnd-action

## Ideas
- citizens enhance based on ED’s proposal with making views for owners and citizens (Yaroslav)
- credentials fix/enh
- portal test coverage
- portal drawings engineering
- query, views designer, copy/save with v_q_<name>
- AR app
+ YouTrack to handle projects
- move everything to S3
- privileges like in linux, group on project and groups in users
- status block in WF should control privileges.
- editor based on my editor
- Node.js back because asynchronous 



Can we make gradual schedule?
Pages constructor tables, forms, multiforms

Make rules for services
Make sure we can update database later, api to be covered with integration tests. We can easily update database 
Make sure every component can be developed separately so it is fast to debug, no global deps. But we may have one global store in context 

Сделать мапинг на базу, с покрытием тестами, этот маппинг позволит делать запросы как у нас были в c#, просто указывать селект с точками и 
Project.ProjectDetails.Text1
Project->Activities.Data1
Помечать секретные поля
Функция которая получит метадату по любому полю или объекту



https://mskocik.github.io/svelecte/#basic-example