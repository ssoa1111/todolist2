import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {IoMdAddCircle} from 'react-icons/io';
import {css} from 'styled-components'

// 할 일을 추가하는 용도
const TodoListAdd = ({addList}) => {
    // 추가 버튼에 따라 입력창이 열리고 닫히는 효과
    const [open, setOpen] = useState(false);

    const [inputText, setInputText] = useState('');
    // 입력한 값을 감지하는 함수
    const onChange = useCallback((e)=>{
        setInputText(e.target.value)
    },[])

    // 감지한 내용을 리스트에 추가하는 함수
    const onSubmit = useCallback((e)=>{
        addList(inputText)
        setInputText('')
        e.preventDefault()
    },[addList, inputText])

    return (
        <TodoAdd onSubmit={onSubmit}>
            { open && <InputBox>
                <input type="text" onChange={onChange} value={inputText}></input>
            </InputBox>}
            <TodoAddBtn onClick={()=>setOpen(!open)} open={open}></TodoAddBtn>
        </TodoAdd>
    );
};

const TodoAdd = styled.form`
    width: 100%;
    height: 120px;
    position: relative;
`;

const InputBox =styled.div`
    width: 100%;
    height: 120px;
    background: #ccc;
    text-align: center;
    input{
        width: 60%;
        height: 30px;
        margin-top: 15px;
    }
`;

const TodoAddBtn = styled(IoMdAddCircle)`
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 5px;
    font-size: 4rem;
    color: #219ebc;
    cursor: pointer;
    &:hover{
        color: #63e6be;
    }
    ${(props)=> props.open &&
    css`
    &:hover{
        color: #ff8787;
    }
    color: #ff8787; 
    transform: rotate(45deg)
    `}
`;
export default TodoListAdd;