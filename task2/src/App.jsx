
import "./App.css";
import { supabase } from "./supabaseClient.js";
import { useState, useEffect } from "react";

// 全体
const App = () => {
  const [text, setText] = useState(""); // 入力値を追跡する状態
  const [time, setTime] = useState(0); // 初期値を数値に変更
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] =useState(true);

  const total = records.reduce((acc, record) => acc + Number(record.time), 0);
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("study-record").select("*");
      if (error) {
        setLoading(false);
        return;
      }
      setRecords(data);
      setLoading(false);
    };

  useEffect(() => {
    fetchData();
  }, []); // 👈 依存配列を空にする
    
  const onChangeText = (event) => setText(event.target.value);
  const onChangeTime = (event) => setTime(parseInt(event.target.value, 10) || 0);

  const onClickAdd = async () => {
    if (text === "") {
      setError("学習内容を入力してください");
      return;
    }
    if (time <= 0) {
      setError("学習時間を1以上にしてください");
      return;
    }
    setError(""); // エラーリセット
    
  // Supabase にデータを追加
    const { error } = await supabase.from("study-record").insert([{ text, time }]);
    if (error) {
      console.error("データ追加エラー:", error);
      return;
    }
  
    // 最新データを取得
    await fetchData();
    setText("");
    setTime(0); 
  };
  
    // データを削除
  const deleteData = async (id) => {
    const {error} = await supabase
    .from('study-record').delete().eq('id', id);
    if (error) {
      console.error("データ削除エラー:", error);
      return;
    }
  await fetchData(); // 削除後にデータを更新
    };

  return (
    <>
      <div>
        <h1>渡部貴子の学習記録</h1>
        学習内容：
        <input
          type="text"
          value={text}
          onChange={onChangeText} // 状態更新
          placeholder="テキストを入力"
        />
        学習時間：
        <input
          type="number"
          min="0"
          value={time}
          onChange={onChangeTime} // 状態更新
          placeholder="0"
        />
        <button type="submit" onClick={onClickAdd}>登録</button>
        <p style={{ color: "red" }}>{error}</p>
        <p>記入内容： {text} 勉強した内容： {time}時間</p>
        <p>累計の学習時間：{total}時間</p>
      </div>
      <div>
        {loading ? <p>Loading...</p> : ( 
          <ul>
            {records.length > 0 ? (
              records.map((record) => (
                <li key={record.id}>
                  内容: {record.text} 
                  時間: {record.time}
                  <span onClick={() => deleteData(record.id)}>✖️</span>
                </li>
              ))
            ) : (
              <li>データがありません</li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default App;

