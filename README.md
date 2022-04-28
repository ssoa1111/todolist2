# 투두리스트 만들기
컴포넌트를 활용하여 만드는 투두리스트
[만드는 과정 확인하기(blog)](https://flowerofashes.tistory.com/40)

## 사용한 hook과 기능

### useState()
useState()는 데이터 값이 자주 변경되는 곳에 상태 관리를 할 수 있게 합니다.    

##### app.js에서는 기본적인 할 일을 담고 있고 이 할 일의 구성은 변화하는 값들 입니다.
```javascript
const [todoList, setTodoList] = useState([
    { id: 1, text: 'UI 구성 생각하기', check : true},
    { id: 2, text: '각각의 Components 만들기', check : true},
    { id: 3, text: 'Styled-Components로 꾸미기', check : true},
    { id: 4, text: '기능 구현하기', check : false},
  ]);
```
##### TodoListHeader.js에서는 오늘의 날짜에 맞게 시간의 값이 업데이트 되어야 합니다.
```javascript
const [time, setTime] = useState(new Date());
```

##### TodoListAdd.js에서는 버튼에 따라서 input상자가 보이는 상태를, input의 값이 변화되는 상태를 감지하여야 합니다.
```javascript
const [open, setOpen] = useState(false);

const [inputText, setInputText] = useState('');
```


### useRef()
useRef()는 불필요한 렌더링을 발생시키지 않는 값을 관리할 경우 사용합니다.

##### app.js에서는 업데이트 되면 값이 초기화 되지 않으면서도 변경된 값이 화면에 반영하지 않아도 될 id에 이용하였습니다.
```javascript
// 다음 id값을 지정하기 위함
const nextId = useRef(5)
```


### useEffect()
useEffect() 의존성 배열인 해당되는 부분이 렌더링 될 때마다 특정작업을 실행시킵니다.

##### TodoListHeader.js에서는 오늘의 시간이 TodoListHeader.js가 마운트 될 때만 실행됩니다.
```javascript
useEffect(()=>{
    setInterval(()=>{
        setTime(new Date())
    },1000)
},[])
```


### useCallback()
의존성배열이 변할 때만 내용을 재선언합니다. 컴포넌트를 최적화 하는 기능입니다.

##### app.js에서는 list를 추가하고 삭제하고 상태를 변화시키는 등의 작업에서 이용하였습니다.
예시
```javascript
const addList = useCallback(texts =>{
    const newList = {
        id : nextId.current,
        text : texts,
        check : false
    }
    setTodoList(todoList.concat(newList))
    nextId.current+= 1;
    }, [todoList])
);
```

##### TodoListAdd.js에서는 입력이 될 때와 추가버튼을 눌렀을 때에 이용하였습니다.
예시
```javascript
const onSubmit = useCallback((e)=>{
    addList(inputText)
    setInputText('')
    e.preventDefault()
},[addList, inputText])
```


##### REACT에서 map 함수를 사용할 때에는 key의 값이 필요합니다.
```javascript
{todoList.map(todo=>(<TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}></TodoListItem>))}
```

##### filter()는 내용의 값이 true인 것만 얻을 수 있습니다.
```javascript
setTodoList(todoList.filter((todo) => todo.id !== id));
```


##### concat()은 배열을 합쳐서 새로운 배열을 만들 수 있습니다.
```javacript
setTodoList(todoList.concat(newList))
```

##### 삼항연산자를 통해 값이 true일 때만 컴포넌트가 작동할 수 있게 할 수 있습니다.
```javascript
{ open && 
    <InputBox >
        <input type="text" onChange={onChange} value={inputText}></input>
    </InputBox>}
```


## styled-components
styled-components를 이용할 때에는 규칙이 있습니다.     
시멘틱태그를 사용할 때 : const 변수 = styled.시멘틱태그` css내용 `;     
시멘틱태그 외 사용할 때 : const 변수 = styled(사용자지정)` css내용 `;      

##### hover기능
css내용 내에서 &:hover를 이용하면 hover효과를 사용할 수 있습니다.
```javascript
const TodoAddBtn = styled(IoMdAddCircle)`
    &:hover{
        color: #63e6be;
    }
`;
```

##### props로 전달받기
props의 값에 따라 css를 나타낼 수도 있습니다.     
props값이 컴포넌트의 속성에 인자 값으로 들어가 있어야 합니다.
```javascript
<TodoAddBtn open={open}></TodoAddBtn>
```
```javascript
const TodoAddBtn = styled(IoMdAddCircle)`
    ${(props)=> props.open &&
    css`
    &:hover{
        color: #ff8787;
    }
    color: #ff8787; 
    transform: rotate(45deg)
    `}
`;
```


##### 다른 컴포넌트와 연결해서 사용하기
css내용 내에 ${다른컴포넌트}를 작성하면 이벤트를 통해 다른컴포넌트의 상태를 변화시킬 수 있습니다.
```javascript
const TodoItem = styled.div`
    &:hover {
        ${RemoveBtn}{
            display: initial;
        }
    }
`;
```