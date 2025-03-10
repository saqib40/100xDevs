import './app.css'
import { useState } from 'react'
function App() {
  interface ListInt {
    id : number,
    task : string,
    check: boolean
  }
  const [task, setTask] = useState<string>("");
  const [list, setList] = useState<ListInt[]>([]);

  // update the task
  function handleChange(e : React.ChangeEvent<HTMLInputElement>) : void {
    setTask(e.target.value);
  }
  // update the list
  function handleSubmit(e : React.FormEvent<HTMLFormElement>) : void {
    e.preventDefault();
    setList(prevList => [...prevList, {id : Date.now(), task, check: false}]);
    setTask("");
  }
  function handleClick(e : React.MouseEvent<HTMLDivElement, MouseEvent>) : void {
    // since we have bubbling nature
    // handling deletion => update the list
    const targetElement = e.target as HTMLElement;
    if(targetElement.matches(".delete")) {
      let id : number = Number(targetElement.dataset.id);
      setList(list.filter((item) => item.id != id));
    }
    // handling checking-unchecking => update the check
    if(targetElement.matches(".box")) {
      let id : number = Number(targetElement.dataset.id);
      setList(prevList =>
        prevList.map(item =>
          item.id === id ? { ...item, check: !item.check } : item
        )
      );
    }
  }
  return (
    <>
      <h1>To Do List</h1>
      <form className = 'taskGenerator' onSubmit={(e) => handleSubmit(e)}>
      <input 
        type = 'text'
        placeholder="new task"
        className = 'textTask'
        /* onChange={(e) => handleChange(e)}*/
        onChange={handleChange}
        value={task}
      />
      <button type="submit">Add</button>
      </form>
      <div className = 'taskList' onClick={(e) => handleClick(e)}>
        {/* rended the list over here */}
        {list?.map((item : ListInt) => {
          return (
            <div className="task" key={item.id}>
              <span className="delete" data-id={item.id}>x</span>
              <input className="box" type="checkbox" checked={item.check} data-id={item.id} readOnly/>
              <span id={item.check ? 'tasktodo' : 'bullshit'}>{item.task}</span>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default App
