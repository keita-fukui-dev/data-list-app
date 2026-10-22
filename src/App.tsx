import { useState } from "react";
import { UserList } from "./components/UserList";
import { PostList } from "./components/PostList";

// 表示中のタブを、決まった2つの文字列だけに限定する型
type Tab = "userList" | "postList";

function App() {
  const [tab, setTab] = useState<Tab>("postList");

  return (
    <div className="container text-center py-5">
      {/* Bootstrap のトグルボタン（ラジオボタン＋ラベル） */}
      <div>
        <div className="btn-group mb-3" role="group">
          <input
            type="radio"
            className="btn-check"
            name="tab"
            id="userListTab"
            checked={tab === "userList"}
            onChange={() => setTab("userList")}
          />
          <label className="btn btn-outline-primary" htmlFor="userListTab">
            ユーザー一覧
          </label>

          <input
            type="radio"
            className="btn-check"
            name="tab"
            id="postListTab"
            checked={tab === "postList"}
            onChange={() => setTab("postList")}
          />
          <label className="btn btn-outline-primary" htmlFor="postListTab">
            投稿一覧
          </label>
        </div>
      </div>

      {/* tab の値によって、表示するコンポーネントを切り替える */}
      {tab === "postList" ? <PostList /> : <UserList />}
    </div>
  );
}

export default App;
