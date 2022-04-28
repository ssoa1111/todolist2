import React, {useRef, useState, useCallback} from 'react';
import TodoListHeader from './Components/TodoListHeader';
import TodoListWrap from './Components/TodoListWrap';
import TodoListTotal from './Components/TodoListTotal';
import TodoListAdd from './Components/TodoListAdd';

const App = () => {
  // todolist의 내용 기본 셋팅
  const [todoList, setTodoList] = useState([
    { id: 1, text: 'UI 구성 생각하기', check : true},
    { id: 2, text: '각각의 Components 만들기', check : true},
    { id: 3, text: 'Styled-Components로 꾸미기', check : true},
    { id: 4, text: '기능 구현하기', check : false},
  ]);

  // 다음 id값을 지정하기 위함
  const nextId = useRef(5)

  // 새로운 할 일 추가 기능
  // useCallback을 이용하여 todolist에 관해서만 렌더링
  // 새로운 list를 만들어(newList) 기존 리스트(setTodoList)와 합친다.
  const addList = useCallback(texts =>{
    const newList = {
      id : nextId.current,
      text : texts,
      check : false
    }
    setTodoList(todoList.concat(newList))
    nextId.current+= 1;
  }, [todoList])

  // 할일 삭제하는 기능
  // setTodoList에 todoList중 현재 id와 요소의 id가 같은지 각각 확인 후 같지 않은 것만 들어간다.  
  const onRemove = useCallback(id => {
      setTodoList(todoList.filter((todo) => todo.id !== id));
    },[todoList]
  );

  // 체크 버튼 토글의 기능
  // 현재의 id와 요소의 id가 같은지 각각 확인후 같으면 check를 제외한 모든 요소는 동일하게 사용하고 check는 기존의 상태의 반대가 되게 한다. id가 다르면 동일 값을 사용한다.
  const onToggle = useCallback(id => {
    setTodoList(todoList.map(todo => todo.id === id ? {...todo, check : !todo.check} : todo))
  },[todoList])

  return (
    <div>
      <TodoListWrap>
          <TodoListHeader todoList={todoList}></TodoListHeader>
          <TodoListTotal todoList={todoList}  onRemove={onRemove} onToggle={onToggle}></TodoListTotal>
          <TodoListAdd addList={addList}></TodoListAdd>
      </TodoListWrap>
    </div>
  );
};

export default App;