import React, {useEffect, useState} from 'react';
import  styled  from 'styled-components';

// 오늘의 날짜와 남은 할일을 보여주는 용도
const TodoListHeader = ({todoList}) => {
    // todoList에서 각 요소의 check가 true가 아닌 것만 반환한다.
    const nonCheck = todoList.filter(todo=> todo.check !== true)
    
    // 시간의 상태 변화를 렌더링 할 useState
    const [time, setTime] = useState(new Date());

    // 문서가 마운트 되었을 때 실행된다.
    // setInterval함수로 1초마다 새로운 시간을 받는다.
    useEffect(()=>{
        setInterval(()=>{
            setTime(new Date())
        },1000)
    },[])

    return (
        <TodoHeader>
            <h1>{time.toLocaleDateString()}</h1>
            <p>할일이 {nonCheck.length}개 남았습니다.</p>
        </TodoHeader>
    );
};

const TodoHeader = styled.div`
    width: 100%;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    h1{
        margin-top: 10px;
    }
    p{
        margin-top: 1rem;
        color: #219ebc;
    }
`;

export default TodoListHeader;