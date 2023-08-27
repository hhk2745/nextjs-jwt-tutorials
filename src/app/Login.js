"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 상태 메시지
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 토큰 유효성을 확인
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      const decodedToken = jwt_decode(token); // 토큰 해석
      const currentTime = Date.now() / 1000; // 현재 시간
      if (decodedToken.exp < currentTime) {
        // 토큰 만료 시 로그아웃 처리
        setErrorMessage("토큰이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem("token");
      }
      getUser(token);
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }, []);
  const getUser = (token) => {
    if (user) {
      return;
    }
    const option = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`http://${process.env.NEXT_PUBLIC_API_HOST}/api/user`, option)
      .then((resp) => resp.json())
      .then((res) => {
        /*{
            "userId": 1,
            "username": "admin",
            "nickname": "admin",
        }*/
        setUser(!res.error ? res : null);
        setErrorMessage("");
      });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };
    fetch(`http://${process.env.NEXT_PUBLIC_API_HOST}/api/authenticate`, option)
      .then((resp) => resp.json())
      .then((res) => {
        if (res.error) {
          setErrorMessage(`${res.status}, ${res.error}`);
          return;
        }
        localStorage.setItem("token", res.token); // 토큰을 로컬 스토리지에 저장
        getUser(res.token);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 제거
    setUser(null);
    router.push("/");
  };

  return (
    <>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
      {/* 상태 메시지 표시 */}
      <form onSubmit={onSubmit}>
        {user === null && (
          <>
            <input
              type="text"
              name="id"
              placeholder={"id"}
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <input
              type="text"
              name="pw"
              placeholder={"password"}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <input type="submit" value={"로그인"} />
          </>
        )}
        {user !== null && (
          <>
            {user.nickname}님, 안녕하세요!
            <input type="button" value={"로그아웃"} onClick={handleLogout} />
          </>
        )}
      </form>
    </>
  );
}
