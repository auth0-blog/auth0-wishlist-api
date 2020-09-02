const low = require("lowdb");
const Memory = require("lowdb/adapters/Memory");
const shortid = require("shortid");

const db = low(new Memory());

db.defaults({ items: [] }).write();
const collection = "items";

db.get(collection)
  .push(
    { id: shortid.generate(), description: "toilet paper" },
    { id: shortid.generate(), description: "face mask" },
    { id: shortid.generate(), description: "hand sanitizer" }
  )
  .write();

module.exports = {
  db,
  collection,
};
