import { useState, useEffect, useCallback, } from 'react';
import Header from 'components/Header';
import uniqid from 'uniqid';
import axios from 'axios';
import 'App.css';

export default function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  const getData = useCallback(function() {
    axios.get("https://random-data-api.com/api/name/random_name?size=5")
      .then(res => setData(res.data));
  }, []);

  // Won't be loading on startup 
  // useEffect(() => getData(), [getData]);

  const addItem = function() {
    if (!text) return;
    setData([...data, { name: text, "uid": uniqid() }]);
    setText("");
  };

  const deleteItem = function(uid) {
    setData(data.filter(item => item.uid !== uid));
  };

  const textChanged = function(event) {
    setText(event.target.value);
  };

  const itemList = data.map((item) => {
    return <li key={item.uid} onClick={() => deleteItem(item.uid)} >{item.name}</li>;
  });

  return (
    <div className="App">

      <Header text="My Friends" />
      <div className='input-form'>
        <input value={text} onChange={textChanged} />
        <button onClick={addItem}>Add Item</button>
      </div>

      <button type="button" onClick={getData}>Get New Friends</button>

      <ul>{itemList}</ul>
    </div>
  );
};