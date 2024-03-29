import { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Item from "../../components/Item/Item";

const Home = () => {
  const [products, setProducts] = useState([]);

  const getData = () => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setProducts(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteProduct = (id) => {
    if (confirm("คุณแน่ใจว่าจะลบสินค้า?")) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          getData();
        })
        .then(() => {
          alert("ลบสินค้าสำเร็จ");
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Link to="/create-product">
        <button style={{ margin: "14px" }}>Create Product</button>
      </Link>
      <div className="container">
        {products.length > 0
          ? products.map((item) => (
              <Item key={item.id} {...item} deleteProduct={deleteProduct} />
            ))
          : null}
      </div>
    </>
  );
};

export default Home;
