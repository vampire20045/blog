import { useState } from 'react';

function AddCategory() {
  const [title, setTitle] = useState("");

  const Add = async () => {
    const url = "http://localhost:7000/Admin/category";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Category added successfully!");
      setTitle("");
    } else {
      alert("Failed to add category.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
          onClick={Add}
        >
          Add Category
        </button>
      </div>
    </div>
  );
}

export default AddCategory;