import React from 'react';
import  styled  from 'styled-components';

// 전체를 감싸는 용도
// app.js에서 <TodoListWrap></TodoListWrap>사이에 들어오면 모두 {children}에 위치하게 될 것이다.
const TodoListWrap = ({children}) => {
    return (
        <TodoListWrapper>
            {children}
        </TodoListWrapper>
    );
};

const TodoListWrapper = styled.div`
    width: 350px;
    height: 550px;
    margin: 6rem auto 0;
    background: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export default TodoListWrap;