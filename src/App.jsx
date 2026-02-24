import { useEffect, useState } from "react";

export default function App() {
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

        setItems([
            { id: Date.now(), name: text, done: false },
            ...items,
        ]);
        setText("");
    };

    const toggle = (id) => {
        setItems(
            items.map((i) =>
                i.id === id ? { ...i, done: !i.done } : i
            )
        );
    };

    const remove = (id) => {
        setItems(items.filter((i) => i.id !== id));
    };

    const clearAll = () => setItems([]);

    return (
        <div className="app">
            <h1>🛒 Grocery Bud</h1>

            <form onSubmit={addItem}>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add grocery item..."
                />
                <button>Add</button>
            </form>

            {items.length === 0 && (
                <p className="empty">Your list is empty</p>
            )}

            <ul>
                {items.map((item) => (
                    <li key={item.id} className={item.done ? "done" : ""}>
                        <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => toggle(item.id)}
                        />
                        <span>{item.name}</span>
                        <button onClick={() => remove(item.id)}>✖</button>
                    </li>
                ))}
            </ul>

            {items.length > 0 && (
                <button className="clear" onClick={clearAll}>
                    Clear All
                </button>
            )}
        </div>
    );
}