import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);

  const navigate = useNavigate();

  // Fetch products when the component loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if the user is not logged in
    } else {
      // Fetch products only if token exists
      axios
        .get("http://localhost:5000/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setProducts(res.data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const addProduct = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return alert("You must be logged in to add a product.");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        newProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Make sure we update state using the previous state
      setProducts((prevProducts) => [...prevProducts, response.data]);

      // Clear form after submission
      setNewProduct({ name: "", price: "", description: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (productId, updatedFields) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return alert("You must be logged in to update a product.");
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        updatedFields,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Updated Product:", response.data); // Debugging

      // Update state using previous state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? response.data : product
        )
      );

      setEditingProductId(null); // Exit edit mode
      setNewProduct({ name: "", price: "", description: "" }); // Clear input
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return alert("You must be logged in to delete a product.");
    }

    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Deleted Product ID:", productId); // Debugging

      // Remove deleted product from state immediately
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };
  const code = `import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);

  const navigate = useNavigate();

  // Fetch products when the component loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if the user is not logged in
    } else {
      // Fetch products only if token exists
      axios
        .get("http://localhost:5000/api/products", {
          headers: { Authorization: Bearer {token} },
        })
        .then((res) => setProducts(res.data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const addProduct = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return alert("You must be logged in to add a product.");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        newProduct,
        {
          headers: { Authorization: Bearer {token} },
        }
      );

      // Make sure we update state using the previous state
      setProducts((prevProducts) => [...prevProducts, response.data]);

      // Clear form after submission
      setNewProduct({ name: "", price: "", description: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (productId, updatedFields) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return alert("You must be logged in to update a product.");
    }

    try {
      const response = await axios.put(
        http://localhost:5000/api/products/{productId},
        updatedFields,
        { headers: { Authorization: Bearer {token} } }
      );

      console.log("Updated Product:", response.data); // Debugging

      // Update state using previous state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? response.data : product
        )
      );

      setEditingProductId(null); // Exit edit mode
      setNewProduct({ name: "", price: "", description: "" }); // Clear input
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return alert("You must be logged in to delete a product.");
    }

    try {
      await axios.delete(http://localhost:5000/api/products/{productId}, {
        headers: { Authorization: Bearer {token} },
      });

      console.log("Deleted Product ID:", productId); // Debugging

      // Remove deleted product from state immediately
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };`;
  return (
    <>
      <div className="flex justify-between items-center bg-gray-900 p-4">
        <button
          onClick={() => setShowCode(!showCode)}
          className="ml-20 mx-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
        >
          {showCode ? "Hide Code" : "Show Code"}
        </button>

        {/* Conditionally render the code block */}

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2"
        >
          Logout
        </button>
      </div>
      <div className="bg-black mx-20">
        {showCode && (
          <pre className="mt-6 p-4 bg-gray-700 text-white rounded-lg whitespace-pre-wrap break-words">
            <code>{code}</code>
          </pre>
        )}
      </div>
      <div className="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
        <div className="bg-gray-800 text-white rounded-lg shadow-xl w-full max-w-4xl p-8">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Product Management
          </h2>

          <div className="space-y-4 mb-6">
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="w-full p-2 bg-gray-700 rounded-lg"
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-full p-2 bg-gray-700 rounded-lg"
            />
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Product Description"
              className="w-full p-2 bg-gray-700 rounded-lg"
            ></textarea>
            {!editingProductId && (
              <button
                onClick={addProduct}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition"
              >
                Add Product
              </button>
            )}

            {/* Update Product Button (Only shown when updating) */}
            {editingProductId && (
              <button
                onClick={() => {
                  console.log("Updating product:", editingProductId);
                  updateProduct(editingProductId, newProduct);
                  setEditingProductId(null); // Reset after update
                  setNewProduct({ name: "", price: "", description: "" }); // Clear input
                }}
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-400 transition"
              >
                Update Product
              </button>
            )}
          </div>

          {products.length > 0 ? (
            <ul className="space-y-4">
              {products.map((product, index) => (
                <li
                  key={product._id || index}
                  className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300 flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-medium">{product.name}</p>
                    <p className="text-sm text-gray-400">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        console.log("Editing product:", product._id);
                        setEditingProductId(product._id); // Set the product being edited
                        setNewProduct({
                          name: product.name,
                          price: product.price,
                          description: product.description,
                        });
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-400 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-400 transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400">Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
