import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [items, setItems] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("grocery"));
        if (saved) setItems(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem("grocery", JSON.stringify(items));
    }, [items]);

    const addItem = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setItems([{ id: Date.now(), name: text, done: false }, ...items]);
        setText("");
    };

    const toggleItem = (id) => {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        );
    };

    const deleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <div className="container">
            <h1>🛒 Grocery Bud</h1>

            <form onSubmit={addItem}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add grocery item..."
                />
                <button>Add</button>
            </form>

            {items.length === 0 && <p className="empty">List is empty</p>}

            <ul>
                {items.map((item) => (
                    <li key={item.id} className={item.done ? "done" : ""}>
                        <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => toggleItem(item.id)}
                        />
                        <span>{item.name}</span>
                        <button onClick={() => deleteItem(item.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;