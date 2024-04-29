import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default function App() {
  const [showAddFriendList, setShowAddFriendList] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  function handleShowAddFriend() {
    setShowAddFriendList((show) => !show);
  }
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriendList(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriendList && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriendList ? "Close" : "Add friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}
function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((c) => (
        <Friend friend={c} key={c.id} />
      ))}
    </ul>
  );
}
function Friend({ friend }) {
  return (
    <div>
      <li>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="red">
            you owe {friend.name} {Math.abs(friend.balance)}$
          </p>
        )}
        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owe you {friend.balance}$
          </p>
        )}
        {friend.balance === 0 && <p>you and {friend.name} are even</p>}
        <Button>Select</Button>
      </li>
    </div>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    if (!name || !imgUrl) return;
    const newFriend = {
      id,
      name,
      image: `${imgUrl}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setImgUrl("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <lable>👫 Friend name</lable>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄 Img URL</label>
      <input
        type="text"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>split your bill with x</h2>

      <labal>💰 Bill value</labal>
      <input type="text" />

      <labal>🧍🏼‍♂️ Your expences</labal>
      <input type="text" />

      <labal>👯‍♀️ x's expences</labal>
      <input type="text" disabled />

      <lable>🤑 Who will pay the bill</lable>
      <select>
        <option value="user">You</option>
        <option value="friens">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
