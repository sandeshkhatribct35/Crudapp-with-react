import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("groceryItems"));
    if (saved) setItems(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("groceryItems", JSON.stringify(items));
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newItem = {
      id: Date.now(),
      name: input,
      completed: false,
    };

    setItems([newItem, ...items]);
    setInput("");
  };

  const toggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const clearAll = () => setItems([]);
  const clearCompleted = () =>
    setItems(items.filter((item) => !item.completed));

  const filteredItems = items.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "incomplete") return !item.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Grocery Bud</h1>

      <form onSubmit={addItem} className="form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter item"
        />
        <button>Add</button>
      </form>

      {items.length === 0 && (
        <div className="notice">Your list is empty 🛒</div>
      )}

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("incomplete")}>
          Incomplete
        </button>
        <button onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>

      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
            />

            <span
              style={{
                textDecoration: item.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {item.name}
            </span>

            <button onClick={() => deleteItem(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="actions">
        <button onClick={clearAll}>Clear All</button>
        <button onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default App;