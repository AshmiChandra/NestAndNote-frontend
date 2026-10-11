import { useState } from "react";
import { Link } from "react-router-dom";

function EverydayLists() {
  const [lists, setLists] = useState([
    { id: 1, name: "Today", items: [{ id: 1, text: "Drink water", done: false }] },
  ]);
  const [activeId, setActiveId] = useState(1);
  const [newList, setNewList] = useState("");
  const [newItem, setNewItem] = useState("");

  const activeList = lists.find((l) => l.id === activeId);

  const addList = (e) => {
    e.preventDefault();
    if (newList.trim() === "") return;
    const list = { id: Date.now(), name: newList, items: [] };
    setLists([...lists, list]);
    setActiveId(list.id);
    setNewList("");
  };

  const deleteList = (id) => {
    const remaining = lists.filter((l) => l.id !== id);
    setLists(remaining);
    if (id === activeId) {
      setActiveId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const addItem = (e) => {
    e.preventDefault();
    if (newItem.trim() === "" || !activeList) return;
    const item = { id: Date.now(), text: newItem, done: false };
    setLists(
      lists.map((l) =>
        l.id === activeId ? { ...l, items: [...l.items, item] } : l
      )
    );
    setNewItem("");
  };

  const toggleItem = (itemId) => {
    setLists(
      lists.map((l) =>
        l.id === activeId
          ? {
              ...l,
              items: l.items.map((i) =>
                i.id === itemId ? { ...i, done: !i.done } : i
              ),
            }
          : l
      )
    );
  };

  const deleteItem = (itemId) => {
    setLists(
      lists.map((l) =>
        l.id === activeId
          ? { ...l, items: l.items.filter((i) => i.id !== itemId) }
          : l
      )
    );
  };

  return (
    <div className="home">
      <Link to="/home" className="back-link">← Back</Link>
      <h2>Everyday Lists</h2>
      <p className="subtitle">Your tasks, in as many lists as you need.</p>

      <div className="lists-layout">
        <div className="lists-sidebar">
          {lists.map((l) => (
            <div
              key={l.id}
              className={l.id === activeId ? "list-tab active" : "list-tab"}
              onClick={() => setActiveId(l.id)}
            >
              <span>{l.name}</span>
              <button
                className="small-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteList(l.id);
                }}
              >
                ✕
              </button>
            </div>
          ))}
          <form onSubmit={addList} className="inline-form">
            <input
              placeholder="New list..."
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
            />
            <button type="submit">+</button>
          </form>
        </div>

        <div className="lists-main">
          {activeList ? (
            <>
              <h3>{activeList.name}</h3>
              <form onSubmit={addItem} className="inline-form">
                <input
                  placeholder="Add a task..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <button type="submit">Add</button>
              </form>
              {activeList.items.length === 0 && (
                <p className="subtitle">Nothing here yet. Add your first task.</p>
              )}
              {activeList.items.map((i) => (
                <div key={i.id} className="item-row">
                  <label className={i.done ? "item-text done" : "item-text"}>
                    <input
                      type="checkbox"
                      checked={i.done}
                      onChange={() => toggleItem(i.id)}
                    />
                    {i.text}
                  </label>
                  <button className="small-btn" onClick={() => deleteItem(i.id)}>✕</button>
                </div>
              ))}
            </>
          ) : (
            <p className="subtitle">Create a list to get started.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EverydayLists;