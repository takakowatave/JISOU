export const RecordsList = ({ records, onClickDelete }) => (
    <ul>
      {records.map((todo, index) => (
        <li key={index}>
          {todo.text} - {todo.time}時間
          <button onClick={() => onClickDelete(index)}>削除</button>
        </li>
      ))}
    </ul>
  );
  
  export default RecordsList;
  