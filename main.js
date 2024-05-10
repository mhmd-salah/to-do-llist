let log = console.log;

let input = document.querySelector( ".form .input" );
let addTask = document.querySelector( ".form .add" );
let divTasks = document.querySelector(".tasks")
  
  
let arrayOfTasks = [];

if ( window.localStorage.getItem( "tasks" ) )
{
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
}
getDataFromLocalStorage()

addTask.addEventListener( "click", () =>
{
  if ( input.value != "" )
  {
    addTaskToArray( input.value );
    // empty input
    input.value = "";
  }
} );

divTasks.addEventListener( "click", ( e ) =>
{
  if ( e.target.classList.contains( "task" ) )
  {
    toggleStateTask( e.target.getAttribute("data-id") )
    log(e.target.getAttribute("data-id"))
    e.target.classList.toggle("done")
  }
  if ( e.target.classList.contains( "del" ) )
  {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
    e.target.parentElement.remove()
  }
})

function addTaskToArray ( taskText )
{
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push( task );
  addElementToPageFrom( arrayOfTasks )
  addTaskToLocalStorageFrom(arrayOfTasks)
}

function addElementToPageFrom ( arrayOfTasks )
{
  divTasks.innerHTML = ""
  arrayOfTasks.forEach(task => {
    let div = document.createElement( "div" )
    div.setAttribute("data-id", task.id)
    div.className = "task";
    div.appendChild(document.createTextNode(task.title))
    if ( task.completed )
    {
      div.className = "task done"
    }
    let del = document.createElement( "span" )
    del.className = "del"
    del.appendChild(document.createTextNode("delete"))
    div.appendChild(del)
    divTasks.appendChild( div )
  });
  
}




function getDataFromLocalStorage ()
{
  let data = window.localStorage.getItem( "tasks" )
  if ( data )
  {
    let tasks = JSON.parse( data )
    addElementToPageFrom(tasks)
  }
}

function addTaskToLocalStorageFrom ( arrayOfTasks )
{
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}


function toggleStateTask ( taskId )
{
  for ( let i = 0 ; i < arrayOfTasks.length; i++ )
  {
    if ( arrayOfTasks[ i ].id == taskId )
    {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
    }
  }
  addTaskToLocalStorageFrom(arrayOfTasks)
}

function deleteTaskWith ( taskId )
{
  arrayOfTasks = arrayOfTasks.filter( ( task ) => task.id != taskId )
  addTaskToLocalStorageFrom(arrayOfTasks)
}