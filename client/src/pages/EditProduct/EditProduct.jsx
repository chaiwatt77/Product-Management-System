import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const getProductDetail = () => {
    fetch(`http://localhost:3000/products/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setProduct(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const { name, category, price, stock } = product;

  useEffect(() => {
    getProductDetail();
  }, []);

  const updateProductDetail = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/products/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("product not found");
          }
          throw new Error("Error When Fetching");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        alert("แก้ไขสินค้าสำเร็จ");
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
      <form className="form-design" onSubmit={updateProductDetail}>
        <label htmlFor="name">Name of Product</label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />

        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, category: e.target.value }))
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
            setProduct((prev) => ({ ...prev, price: validatedPrice }));
          }}
          step="any"
          required
        />
        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, stock: e.target.value }))
          }
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

export default EditProduct;
