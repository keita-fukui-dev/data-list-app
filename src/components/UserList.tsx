import axios from "axios";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export const UserList = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 画面に表示されたあと、1回だけデータを取得する
  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((e) => {
        setErrorMessage(e.message);
      });
  }, []);

  // 入力された文字が「名前」に含まれているユーザーだけに絞り込む
  const filteredUserList = userList.filter((user) =>
    user.name.includes(searchText),
  );

  return (
    <div className="d-inline-block">
      <input
        type="text"
        className="form-control mb-3"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        autoFocus
      />
      {errorMessage !== "" && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">名前</th>
            <th scope="col">メールアドレス</th>
          </tr>
        </thead>
        <tbody>
          {filteredUserList.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
