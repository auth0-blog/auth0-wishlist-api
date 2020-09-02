const express = require("express");
const { checkJwt } = require("../authz/check-jwt");
const shortid = require("shortid");

const { db, collection } = require("../data/db");

const wishlistRouter = express.Router();

wishlistRouter.get("/items", async (request, response) => {
  const rows = db.get(collection);

  response.json({ items: rows });
});

wishlistRouter.get("/item", async (request, response) => {
  const id = request.body.id;

  const item = db.get(collection).filter({ id });

  response.json({ item });
});

wishlistRouter.use(checkJwt);

wishlistRouter.post("/item", async (request, response) => {
  const description = request.body.description;

  console.log(`Add to WishList:  ${description}`);

  db.get(collection)
    .push({
      id: shortid.generate(),
      description,
    })
    .write();

  response.status(200).send("added item to wish list");
});

wishlistRouter.put("/item", async (request, response) => {
  const id = request.body.id;
  const description = request.body.description;

  db.get(collection).find({ id }).assign({ description }).write();

  response.status(200).send("updated item in the wish list");
});

wishlistRouter.delete("/item", async (request, response) => {
  const id = request.body.id;

  db.get(collection).remove({ id }).write();

  response.status(200).send(`cleared item`);
});

wishlistRouter.delete("/items", async (request, response) => {
  db.get(collection).remove().write();

  response.status(200).send(`cleared items`);
});

module.exports = {
  wishlistRouter,
};
