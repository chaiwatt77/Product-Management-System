import express from "express";
import cors from "cors";

let products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1000, stock: 5 },
  { id: 2, name: "Phone", category: "Electronics", price: 500, stock: 10 },
];

const app = express();

app.use(cors());

app.use(express.json());

app.get("/products", (req, res) => {
  res.json({
    data: products,
  });
});

app.get("/products/:id", (req, res) => {
  const data = products.find((item) => item.id === Number(req.params.id));
  //console.log(data)
  res.json({
    data,
  });
});

app.post("/products", (req, res) => {
  const { name, category, price, stock } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    category,
    price,
    stock,
  };
  products.push(newProduct);
  // console.log(products)
  res.json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const { name, category, price, stock } = req.body;
  const updateIndex = products.findIndex(
    (item) => item.id === Number(req.params.id)
  );
  if (updateIndex !== -1) {
    products[updateIndex].name = name;
    products[updateIndex].category = category;
    products[updateIndex].price = price;
    products[updateIndex].stock = stock;
  } else {
    return res.status(404).json({ msg: "product not found" });
  }

  res.json(products[updateIndex]);
});

app.delete("/products/:id", (req, res) => {
  products = products.filter((item) => item.id !== Number(req.params.id));
  res.json(products);
});

const PORT = 3000;

app.listen(PORT, console.log(`Server Run at port ${PORT}`));
