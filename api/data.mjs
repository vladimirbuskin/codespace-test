import knex from '../lib/knex.mjs'


export function dataLoad(tablename, select, where, options = null) {

}

export function dataFetch(entity, select) {

}

export function dataSave(entity) {
  // must fill
}

export function dataDelete(entity) {

}

export function dataGraph(entity) {

}


// minimum example entity
const entityExample = {
  __table: "project",
  id: 12
}

/*

== LOAD / FETCH ==
dataLoad("project", ["*", "projectdetails.text1", "attachmententity.attachment.attachmentversion.*"], 2) // tableName, select, id
dataLoad("project", ["*", "projectdetails.text1", "attachmententity.attachment.attachmentversion.*"], { "id": 2 }) // tableName, select, where
dataLoad("project", ["*", "projectdetails.text1", "attachmententity.attachment.attachmentversion.*"], { "projecttypeid": 1203 }, { limit: 100, offset: 100 }) // tableName, select, where, options

dataFetch({ "__table": "project", "id": 2, "description": "text1" }, ["attachmententity.attachment.attachmentversion.*"]) // tableName, select, where, options
dataFetch([
  [ { "__table": "project", "id": 2 }, ["*", "projectdetails.*"] ],
  [ { "__table": "project", "id": 3 }, ["*", "projectdetails.*"] ]
])

// all load/fetch results objects, must return "__table" property, so we can take that object or subset of objects and send to dataSave function
// dataLoad mainly root load,
// fetch, to further load currently loaded records, 

== SAVE ==
// we allow to save only M1 linkages, others no sence really
// or they will be saved recursively
dataSave([{
  "__table": "project", 
  "id": 32,
  "description": "asdf",
  "projectdetails.id": 231,
  "projectdetails.text1": "data1",
  "projectdetails.text2": "data2"
  // this one recursively getting saved
  "attachmententity": [
    {
      "__table": "attachmententity",
      "type": 1,
      "refid": 1234,
      "attachmentid": 434,
      "attachment.originalname": "hello.png",
    }
  ]
}])
// May be we will need "__dirty" field to be here to make saving easier, so you just send the whole graph into dataSave and it will save whatever needed and clear out __dirty field.
// All save(s), must put data to auditLog table
// when only some columns are sent to dataSave, only those to be saved, others are not getting updated

== DELETE ==
dataDelete({ "__table": "project", "id": 2}) // delete object
dataDelete([{ "__table": "project", "id": 2}, { "__table": "project", "id": 3}]) // delete multiple objects
dataDelete(null, { "table": "project", "id": [1, 2, 3, 4] }) // delete by where statement
dataDelete(null, [{ "table": "project", "id": [1, 2, 3, 4] }]) // delete by multiple where statement

== GRAPH ==
dataGraph("project")
returns: 
{
  name: "project",
  columns: [
    // this is autogenerated portion from database data
    //{ name: "id", type: "integer" },
    //{ name: "description", type: "string", length: 4000 },
    // ...
  ],
  links: [
    // manually configured
    { name: "projectdetails", type: "m1", col: "projectDetailId" }, // many to 1
    { name: "projectcontact", type: "1m", col: "refId" }, // 1 to many
    { name: "attachmententity", type: "1m", col: "refId", discriminator: { "type":2 } }, // 1 to many
    // ... all other linkages
  ]
}

== RESULT ==:
// LOAD and FETCH has same RESULT response
// same result we should be able to send to server then
[{
  "__table": "project",
  "id": 2,
  "description": "new constr",
  "projectdetails.id": 223,
  "projectdetails.number1": 412,
  "projectdetails.text1": "t1",
  "attachmententity": [
    {
      "__table": "attachmententity",
      "type": 1,
      "refid": 1234,
      "attachmentid": 434,
      "attachment.originalname": "hello.png",
      "attachment.downloadId": "asdf223-234s-asdsd-fffs",
      "attachmentversion": [
        {
          "__table": "attachmentversion",
          "type": 1,
          "number": 1,
          "attachmentid": 434,
          "extension": ".png",
          "originalfilename": "hello1.png",
        },
        {
          "__table": "attachmentversion",
          "type": 1,
          "number": 2,
          "attachmentid": 434,
          "extension": ".png",
          "originalfilename": "hello2.png",
        }
      ]
    }
  ]
}]
*/

export const _ = {
  method: 'GET',
  handler: async ctx => {
    ctx.body = await knex('Account').where({ ID: 2 }).select('id','userID')
  }
}


// https://mskocik.github.io/svelecte/#basic-example
