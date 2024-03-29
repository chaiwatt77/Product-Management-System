import "./CreateProduct.css"; // Make sure to import your CSS file
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const { name, category, price, stock } = formData;

  const addProduct = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("เพิ่มสินค้าสำเร็จ");
        setFormData({
          name: "",
          category: "",
          price: "",
          stock: "",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const validatePrice = (price) => {
    if (price.startsWith(".")) {
      price = "0" + price;
    }
    if (price.indexOf(".") >= 0) {
      price = price.slice(0, price.indexOf(".") + 3);
    }
    return price;
  };

  return (
    <div className="form-container">
      <Link to="/">
        <button style={{ margin: "14px" }}>Back</button>
      </Link>
      <form className="form-design" onSubmit={addProduct}>
        <label htmlFor="name">Name of Product</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />

        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          required
        />
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => {
            let validatedPrice = validatePrice(e.target.value);
            setFormData((prev) => ({ ...prev, price: validatedPrice }));
          }}
          step="any"
          required
        />
        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, stock: e.target.value }));
          }}
          required
          onKeyDown={(e) => {
            if (e.key === ".") {
              e.preventDefault();
            }
          }}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default CreateProduct;
