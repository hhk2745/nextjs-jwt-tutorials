"use client"

import {useParams, useRouter} from "next/navigation";
import {useRef, useState} from "react";

export default function Control(){
    const params = useParams();
    const router = useRouter();

    const [selectedOption, setSelectedOption] = useState('todos');
    const [text, setText] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    return <form onSubmit={(e)=>{
        e.preventDefault();
        const element = document.querySelector('input[name=type]:checked');
        if(!element){
            return;
        }
        const value = element.value;
        const todos = {
            content: text,
            completed: false
        }
        const users = {
            name: text,
            role: "developer"
        }
        const body = selectedOption === 'todos' ? todos : users;
        const options = {
            method: params.id ? 'PUT' : 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        }
        fetch(`http://127.0.0.1:9999/${value}`, options).then(async (resp)=>{
            if(!resp.ok){
                console.log('ERROR');
                return;
            }
            const res = await resp.json();
            router.refresh();
            router.push(`/${value}/${res.id}`);
        });
    }}>
        <input type="radio" id={'todos'} name={'type'} value={'todos'} checked={selectedOption === 'todos'} onChange={handleOptionChange}/>
        <label htmlFor="todos">todos</label>
        <input type="radio" id={'users'} name={'type'} value={'users'} checked={selectedOption === 'users'} onChange={handleOptionChange}/>
        <label htmlFor="users">users</label>
        {
            selectedOption === 'todos' ?
                <input type="text" name={'content'} placeholder={'content'} value={text} onChange={handleTextChange}/>
                : <input type="text" name={'name'} placeholder={'name'} value={text} onChange={handleTextChange}/>
        }
        <input type="submit" value={params.id ? '수정' : '등록'} />
    </form>
}