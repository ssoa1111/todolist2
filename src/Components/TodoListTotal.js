import React from 'react';
import  styled  from 'styled-components';
import TodoListItem from './TodoListItem';

const TodoListTotal = ({todoList, onRemove, onToggle}) => {
    return (
        <TodoTotal>
            {/* {todoList.map(todo=>(<TodoListItem check={todo.check} text={todo.text} key={todo.id}></TodoListItem>))} */}
            {todoList.map(todo=>(<TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}></TodoListItem>))}
        </TodoTotal>
    );
};

const TodoTotal = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: 10px;
`;

export default TodoListTotal;