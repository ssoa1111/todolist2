import React from 'react';
import { BsCircle, BsCheckCircle, BsDashCircleFill } from 'react-icons/bs'
import  styled  from 'styled-components';
import {css} from 'styled-components'

// 낱개의 할 일을 나타내는 용도
// app.js > TodoListTotal.js에서 전달받은 인자를 이용한다.
const TodoListItem = ({todo, onRemove, onToggle}) => {
    // todo의 key값을 비구조할당으로 꺼내서 이용한다.
    const {id, text, check} = todo;
    return (
        <TodoItem>
            { check ? <CheckBtn onClick={()=>onToggle(id)}></CheckBtn> : <CircleBtn onClick={()=>onToggle(id)}></CircleBtn>}
            <TodoText check={check}>{text}</TodoText>
            <RemoveBtn onClick={() => onRemove(id)}>버리기</RemoveBtn>
        </TodoItem>
    );
};

const CheckBtn = styled(BsCheckCircle)`
    font-size: 1.5rem;
    color: #219ebc;
    cursor: pointer;
`;
const CircleBtn = styled(BsCircle)`
    font-size: 1.5rem;
    color: #888;
    cursor: pointer;
`;
const RemoveBtn = styled(BsDashCircleFill)`
    font-size: 1.5rem;
    color: #ff8787;
    display: none;
    cursor: pointer;
`;
const TodoItem = styled.div`
    width: 100%;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    &:hover {
        background: #ddd;
        ${RemoveBtn}{
            display: initial;
        }
    }
`;
const TodoText = styled.div`
    flex: 1;
    padding-left: 10px;
    color: #333;
    ${props=> props.check && 
    css` 
    color: #888; 
    text-decoration: line-through;
    `}
`;


export default TodoListItem;