import { useEffect, useState } from 'react'



function TodoMain(){

    const [inputValue,setInputValue]=useState("");
    const [todos,setTodos] = useState(()=>{
        const previousTodos=localStorage.getItem("TODOS");
        if(previousTodos==null) return [];
        return JSON.parse(previousTodos);   
    });
    const [empty,setEmpty]=useState("hidden");
    const [emptyMb,setEmptyMb]=useState("hidden");
    const [removingId,setRemovingID] = useState(null);
    const [filter,setFilter]=useState("all");



    useEffect(()=>{
        localStorage.setItem("TODOS",JSON.stringify(todos));
    },[todos]);

    useEffect(()=>{
        if(todos.length!==0){
            setEmpty("");
            setEmptyMb("");
        }else{
            setEmpty("hidden");
            setEmptyMb("hidden");
        }
    },[todos]);

    const visibleTodos = todos.filter(todo => {
        let array=[];
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
      });

    function handleSumbit(e){
        e.preventDefault();
        if(inputValue!==""){
            setTodos((currentTodos)=>{
                return [...todos,{id:crypto.randomUUID(),title:inputValue,completed:false}]
            })
        }
        setInputValue("");
    }

    function deleteItem(id){
        setRemovingID(id);
        setTimeout(() => {
            setTodos((todos) => todos.filter((todo) => todo.id !== id));
            setRemovingID(null);
        }, 500);
    }

    function changeState(id,completed){
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
              if (todo.id === id) {
                return { ...todo, completed }
              }
      
              return todo
            })
          })
    }

    function clearCompleted(){
        const completedIds = todos.filter(todo => todo.completed).map(todo => todo.id);

        if(completedIds.length===0) return;

        setRemovingID(completedIds);

        setTimeout(() => {
            setTodos((todos) => todos.filter((todo) => !completedIds.includes(todo.id)));
            setRemovingID(null);
        }, 500);
        
    }

    return(
        <>
            <div className="todo-input-container">
                <form onSubmit={(e)=>{handleSumbit(e)}}>
                    <button type="submit" className="new-todo-button"></button>
                    <input type="text" placeholder="Create a new todo..." value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
                </form>
            </div>
            <div className={"todo-list-container " + (empty)} >
                <ul className="list">
                    {visibleTodos.map((todo) =>{
                        return <li key={todo.id} className={"todo-li " + (removingId && removingId.includes(todo.id)?"remove-animation":"")}>
                                <label className="checkbox-item-container">
                                    <input type="checkbox" checked={todo.completed} onChange={(e)=>changeState(todo.id,e.target.checked)}/>
                                    <span className="custom-checkbox"></span>
                                    <span className="todo-name">{todo.title}</span>
                                </label>
                                <img src={`${import.meta.env.BASE_URL}images/icon-cross.svg`} alt="" className="delete-button" onClick={()=>{deleteItem(todo.id)}}/>
                        </li>
                        })}
                </ul>
                <div className="footer-container">
                    <span className="items-left">{todos.filter(todo=>{return !todo.completed}).length} items left</span>
                    <div className="filter-buttons-container">
                        <button className={"footer-button filter-btn " +(filter==="all"?"filter-btn-clicked":"")} onClick={()=>{setFilter("all")}}>All</button>
                        <button className={"footer-button filter-btn " +(filter==="active"?"filter-btn-clicked":"")} onClick={()=>{setFilter("active")}}>Active</button>
                        <button className={"footer-button filter-btn " +(filter==="completed"?"filter-btn-clicked":"")} onClick={()=>{setFilter("completed")}}>Completed</button>
                    </div>
                    <button className="footer-button clear-btn" onClick={()=>clearCompleted()} >Clear Completed</button>
                </div>
            </div>
            <div className={ (emptyMb) +" wrapper-mb"  }>
                <div className="footer-container-mb">
                    <div>
                        <button className={"footer-button filter-btn " +(filter==="all"?"filter-btn-clicked":"")} onClick={()=>{setFilter("all")}}>All</button>
                        <button className={"footer-button filter-btn " +(filter==="active"?"filter-btn-clicked":"")} onClick={()=>{setFilter("active")}}>Active</button>
                        <button className={"footer-button filter-btn " +(filter==="completed"?"filter-btn-clicked":"")} onClick={()=>{setFilter("completed")}}>Completed</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoMain