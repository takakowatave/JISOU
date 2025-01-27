import "./App.css";
import { useState } from "react";
import RecordsList from "./components/RecordsList";

//全体

const App = () => {
  const [text, setText] = useState(""); // 入力値を追跡する状態
  const [time, setTime] = useState("0"); // 入力値を追跡する状態
  const [records, setRecords] = useState([]);
  const onChangeText = (event) => setText(event.target.value);
  const onChangeTime = (event) => setTime(parseInt(event.target.value, 10) || 0);
  const [error, setError] = useState("");
  const total = records.reduce((acc, record) => acc + Number(record.time), 0);

  const onClickAdd = () => {
    const newRecords = [...records, {text, time}];
    if (text === "") {
      setError("学習内容を入力してください");
      return;
    }
    if (time === "") {
      setError("学習内容を入力してください");
      return;
    }
    setRecords(newRecords);
    setText("");
    setError("");
    setTime("");
  }

  return (
    <>
    <div>
      <h1>テストフォーム</h1>
      学習内容：
      <input
        type="text"
        value={text}
        onChange={onChangeText} // 状態を更新
        placeholder="テキストを入力"
      />
      学習時間：
      <input
        type="number"
        min="0"
        value={time}
        onChange={onChangeTime} // 状態を更新
        placeholder="0"
      />
      <button type="submit" onClick={onClickAdd}>登録</button>
      <p style={{ color: "red" }}>{error}</p>
      <p>記入内容： {text}勉強した内容： {time}時間</p>
      <p>累計の学習時間：{total}時間</p>
    </div>
    <div>
      <ul>
        {records.map((record, index)=> (
          <li key={record}>内容:{record.text}時間:{record.time}</li>
        ))}  
      </ul>
    </div>
    </>
  );
};

export default App;
