const router = require("express").Router();
const AddItems = require("../models/addItems.model");

//AddItems is the schema
//CRUD Operations:
//
//GET all items
router.route("/").get((req, res) => {
  AddItems.find()
    .then((items) => {
      res.json(items);
      console.log(items, "serveeeer");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//POST(CREATE) new item
// router.route('/add').post((req, res) => {
//   const itemName = req.body.itemName;
//   const category = req.body.category;
//   const description = req.body.description;
//   const phoneNumber = req.body.phoneNumber;
//   const image = req.body.image;
//   const type = req.body.type;

//   const newItem = new AddItems ({
//     itemName,
//     category,
//     description,
//     phoneNumber,
//     image,
//     type
//   });

//   newItem.save()
//   .then(() => res.json("Item Added!"))
//   .catch(err => res.status(400).json("Error: " + err));
// });

router.route("/add").post((req, res) => {
  const itemName = req.body.itemName;
  const category = req.body.category;
  const description = req.body.description;
  const phoneNumber = req.body.phoneNumber;
  const image = req.body.image;
  const type = req.body.type;
  console.log(image, "i am the image in post request in server side");

  const newItem = new AddItems({
    itemName,
    category,
    description,
    phoneNumber,
    image,
    type,
  });

  newItem
    .save()
    .then(() => res.json("Item Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//GET item by ID
router.route("/:id").get((req, res) => {
  AddItems.findById(req.params.id)
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

//DELETE item by ID
router.route("/:id").delete((req, res) => {
  AddItems.findByIdAndDelete(req.params.id)
    .then(() => res.json("Item is deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//UPDATE item by ID
router.route("/update/:id").post((req, res) => {
  AddItems.findById(req.params.id)
    .then((items) => {
      items.itemName = req.body.itemName;
      items.category = req.body.category;
      items.description = req.body.description;
      items.phoneNumber = req.body.phoneNumber;
      items.type = req.body.type;
      //items.image = req.body.url;

      items
        .save()
        console.log("updaaaaaaaaaaaaattttttttttttttttttt....  B")
        .then(() => res.json("Item is updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
