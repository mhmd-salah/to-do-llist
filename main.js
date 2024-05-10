let input = document.querySelector( ".input" );
let submit = document.querySelector( ".add" );
let tasksDiv = document.querySelector( ".tasks" );

//empty array to store the tasks 
let arrayOfTasks = [];
//----trigger function get data from local storage
getDataFromLocalStorage()

if ( window.localStorage.getItem( "tasks" ) )
{
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
} 

// check if input is empty  ----> [1]
submit.addEventListener( "click", () =>
{
  if ( input.value !== "" )
  {
    addTaskToArry( input.value ); // add current task to array of tasks
    input.value = "" // reset input field
  }
} );

//click on on task element 
tasksDiv.addEventListener( "click", ( e ) =>
{
  if ( e.target.classList.contains( "del" ) )
  {
    //remove task from local storage 
    deletTaskWith(e.target.parentElement.getAttribute("data-id"))
    //remove element from page
    e.target.parentElement.remove()
  }
})



//  add tasks to array from task text input
function addTaskToArry ( taskText )
{
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  }
  arrayOfTasks.push(task)
  //add tasks for page
  addElementToPageFrom( arrayOfTasks )
  //add tasks to local storage
  addDataToLocalStorageFrom( arrayOfTasks )
}


//---------------------------- add element to page from array of tasks
function addElementToPageFrom ( arrayOfTasks )
{
  //empty the tasks div
  tasksDiv.innerHTML = "";
  //looping on arry of tasks
  arrayOfTasks.forEach( ( task ) =>
  {
    let div = document.createElement( "div" )
    div.className = "task"
    //check if task is done
    if ( task.completed )
    {
      div.className="task done"
    }
    div.setAttribute( "data-id", task.id )
    div.appendChild(document.createTextNode(task.title))
    let span = document.createElement("span")
    span.className = "del";
    span.appendChild(document.createTextNode("delete"))
    div.appendChild(span)
    tasksDiv.appendChild( div )
  })
}


//------------------------
function addDataToLocalStorageFrom ( arrayOfTasks )
{
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}
//-------------------------




function getDataFromLocalStorage () // get data from local storage
{
  let data = window.localStorage.getItem("tasks")
  if ( data )
  {
    let tasks = JSON.parse(data)
    addElementToPageFrom(tasks)
  }
}


function deletTaskWith ( taskId )
{
  arrayOfTasks = arrayOfTasks.filter( ( task ) => task.id != taskId )
  addDataToLocalStorageFrom(arrayOfTasks)
}