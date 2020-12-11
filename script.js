const rootElement = document.getElementById("root");

const App = () => {
  const [todos, setTodos] = React.useState([{id:0, completed: false, title: "add a todo here"}]);
  const [editItem, setEditItem] = React.useState("");
  const [item, setItem] = React.useState("");
  const [leftTodos, setLeftTodos] = React.useState(1);
  const [layout, setLayout] = React.useState("all");
  const [id, setId] = React.useState(1);
  
  const addTodo = (event) => {
    if(event.keyCode == 13){
      setId(id + 1);
      setTodos(prevTodos => [...prevTodos, {id: id, title: item, completed: false, edit: false}])
      setItem("");
      setLeftTodos(leftTodos + 1)
    }
  };

  const changeInput = (event) => {
    todos.map(items => items.id === parseInt(event.target.value) && (items.completed = event.target.checked));
    setTodos([...todos], todos);
    if(event.target.checked){
      setLeftTodos(leftTodos - 1)
    }else{
      setLeftTodos(leftTodos + 1)
    }
  }
    
  const textOnChange = (event) => {
    setItem(event.target.value);
  };

  const editOnChange = (event) => {
    setEditItem(event.target.value);
  };
    
  const onldEdit = (event) => {
    setEditItem(event.target.defaultValue)
  }

  const onEdit = (event) => {
    setTodos(todos.map((data) => data.id == event.target.name ? { ...data, edit: true } : data));
    let def = todos.filter((data) => data.id == event.target.name)
    setEditItem(def[0].title)
  }
      
  const editTodo = (event) => {
    if(event.keyCode == 13){
      setTodos(todos.map((data) => data.id == event.target.name? { ...data, title: editItem, edit: false } : data));
      setEditItem("");
      setItem("");
    }
  }
    
  const deleteTodo = (event) => {
    setTodos(todos.filter((item) => item.id != event.target.name))
    setLeftTodos(leftTodos - 1)
  }

  const layoutAll = () => {
    setLayout("all")
  }

  const layoutActive = () => {
    setLayout("active")
  }

  const layoutCompleted = () => {
    setLayout("completed")
  }

  const clearCompleted = () => {
    setTodos(todos.filter((item) => item.completed == false))
  }

  return (
    <div className="row">
      <div className="col-lg-6 offset-lg-3 text-center mt-5 mb-5">
        <h1 className="text-weight-bold" style={{color: "white"}}>Todo List</h1>
        <div className="col-12 bg-white border rounded p-3">
          <input type="text" className="pl-3" autoFocus value={item} onChange={textOnChange} onKeyDown={addTodo} placeholder="type your task here" style={{width: '100%', height: '40px'}} />
          {layout == 'all' || layout == 'active'? 
            todos.filter((item) => item.completed == false).map((items) => {
              if(items.edit == true){
                return(
                  <div className="mt-3 text-left" key={items.id}>
                    <div className="col-12 pl-3 pr-3">
                      <input type="text" className="pl-3" autoFocus value={editItem} onSelect={onldEdit} onChange={editOnChange} onKeyDown={editTodo} defaultValue={items.title} name={items.id} style={{width: '100%', height: '40px'}} />
                    </div>
                  </div>
                );
              }
              else{
                return (
                  <div className="mt-3 text-left dame" key={items.id}>
                    <div className="form-check" style={{userSelect: 'none'}}>
                      <input className="form-check-input m-0 position-relative" onChange={changeInput} checked={items.completed} value="text" type="checkbox" value={items.id} name={items.id} id={items.id} style={{height:'25px', width:'25px', top: "4px"}} />
                      <label className="form-check-label ml-3" style={{fontSize: "1.6rem"}} htmlFor={items.id}>
                          {items.title}
                      </label>
                      <button type="button" className="ed-buttons" name={items.id} onClick={deleteTodo}> &#10060;</button>
                      <button type="button" className="ed-buttons" name={items.id} onClick={onEdit}> &#9998;</button>
                    </div>
                  </div>
                );
              }
            })
            : null
          }
          {layout == 'all' || layout == 'completed'?
            todos.filter((item) => item.completed == true).map((items) => {
              if(items.edit == true){
                return(
                  <div className="mt-3 text-left" key={items.id}>
                    <div className="col-12 pl-3 pr-3">
                      <input type="text" className="pl-3" autoFocus value={editItem} onSelect={onldEdit} onChange={editOnChange} onKeyDown={editTodo} defaultValue={items.title} name={items.id} style={{width: '100%', height: '40px'}} />
                    </div>
                  </div>
                );
              }
              else{
                return (
                  <div className="mt-3 text-left dame" key={items.id}>
                    <div className="form-check" style={{userSelect: 'none'}}>
                      <input className="form-check-input m-0 position-relative" onChange={changeInput} checked={items.completed} value="text" type="checkbox" value={items.id} name={items.id} id={items.id} style={{height:'25px', width:'25px', top: "4px"}} />
                      <label className="form-check-label ml-3 disabled" style={{fontSize: "1.6rem"}} htmlFor={items.id}>
                        <s><em>
                          {items.title}
                        </em></s>
                      </label>
                      <button type="button" className="ed-buttons" name={items.id} onClick={deleteTodo}> &#10060;</button>
                      <button type="button" className="ed-buttons" name={items.id} onClick={onEdit}> &#9998;</button>
                    </div>
                  </div>
                );
              }
            })
            : null
          }
        </div>
          <div className="col-12 bg-light border rounded mt-1 text-center">
            <div className="ft-elem col-sm-3">
              {leftTodos} todos left
            </div>
            <div className="ft-elem col-sm-6">
              <a href="#" className="badge badge-light border m-1 p-1"onClick={layoutAll}>All</a>
              <a href="#" className="badge badge-light border m-1 p-1"onClick={layoutActive}>Active</a>
              <a href="#" className="badge badge-light border m-1 p-1"onClick={layoutCompleted}>Completed</a>
            </div>
            <div className="ft-elem col-sm-3">
              <a href="#" className="badge badge-light border m-1 p-1"onClick={clearCompleted}>Clear completed</a>
            </div>
          </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, rootElement);
