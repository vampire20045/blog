import  { useState, useEffect } from 'react';
import Cart from './Cart'; // Ensure you have the Cart component imported correctly

function Category() {
  const [categories, setCategories] = useState([]); // Initialize as an array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:7000/User/category";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {categories.map((cat) => (
        <Cart key={cat._id} Title={cat.title} /> 
      ))}
    </div>
  );
}

export default Category;
