export const requiredCategories = (req, res, next) => {
  if (
    req.body.title === undefined ||
    typeof req.body.title !== "string" ||
    req.body.description === undefined ||
    typeof req.body.description !== "string" ||
    req.body.code === undefined ||
    typeof req.body.code !== "string" ||
    req.body.price === undefined ||
    typeof req.body.price !== "number" ||
    // req.body.status === undefined ||
    // typeof req.body.status !== "boolean" ||
    req.body.stock === undefined ||
    typeof req.body.stock !== "number" ||
    req.body.category === undefined ||
    typeof req.body.category !== "string"
  )
    res.status(500).json({ message: "campo o campos invalidos" });
  return next();
};

//PLANTILLA PRODUCTO
/* 
  {
    "title":"",
    "description":"",
    "code":"",
    "price":,
    "stock":,
    "category":"",
  }
*/