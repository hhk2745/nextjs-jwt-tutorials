"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Control() {
  const params = useParams();
  const router = useRouter();
  const pathName = usePathname();

  const [text, setText] = useState("");

  useEffect(() => {
    if (!params.id) {
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/${pathName}`).then(async (resp) => {
      if (!resp.ok) {
        console.log("ERROR");
        return;
      }
      const res = await resp.json();

      setText(pathName.startsWith("/todos") ? res.content : res.name);
    });
  }, [params.id]);
  const handleTextChange = (event: any) => {
    setText(event.target.value);
  };

  const handleDeleteItem = () => {
    console.log(pathName);
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify({id:params.id}),
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/${pathName}`, options).then(async (resp) => {
      if (!resp.ok) {
        console.log("ERROR");
        return;
      }
      router.refresh();
      router.push(`/`);
    });
  };

  const onSubmit = (e:any) => {
    e.preventDefault();
    const todos = {
      content: text,
      completed: false,
    };
    const users = {
      name: text,
      role: "developer",
    };
    const body = pathName.startsWith('/todos') ? todos : users;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/${pathName}`, options).then(async (resp) => {
      if (!resp.ok) {
        console.log("ERROR");
        return;
      }
      router.refresh();
    });
  };
  return (
    <>
      {
        !params.id &&
          <p>
            <Link href={"/create"}>CREATE</Link>
          </p>
      }
      {
          params.id &&
          <form onSubmit={onSubmit}>
            {pathName.startsWith('/todos') ? (
                <input
                    type="text"
                    name={"content"}
                    placeholder={"content"}
                    value={text}
                    onChange={handleTextChange}
                />
            ) : (
                <input
                    type="text"
                    name={"name"}
                    placeholder={"name"}
                    value={text}
                    onChange={handleTextChange}
                />
            )}
            <input type="submit" value={"수정"} />
            <input type="button" value={"삭제"} onClick={handleDeleteItem} />
          </form>
      }
    </>
  );
}
