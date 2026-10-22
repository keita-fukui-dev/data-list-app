import axios from "axios";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export const PostList = () => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 画面に表示されたあと、1回だけデータを取得する
  useEffect(() => {
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPostList(res.data);
      })
      .catch((e) => {
        setErrorMessage(e.message);
      });
  }, []);

  // 入力された文字が「内容」に含まれている投稿だけに絞り込む
  const filteredPostList = postList.filter((post) =>
    post.body.includes(searchText),
  );

  return (
    <div>
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
            <th scope="col">ユーザーID</th>
            <th scope="col">タイトル</th>
            <th scope="col">内容</th>
          </tr>
        </thead>
        <tbody>
          {filteredPostList.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.userId}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
