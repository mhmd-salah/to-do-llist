let input = document.querySelector( ".input" );
let submit = document.querySelector( ".add" );
let tasksDiv = document.querySelector( ".tasks" );

//empty array to store the tasks 
let arrayOfTasks = []


// check if input is empty  ----> [1]
submit.addEventListener( "click", () =>
{
  if ( input.value !== "" )
  {
    addTaskToArry( input.value ); // add current task to array of tasks
    input.value = "" // reset input field
  }
} );


function addTaskToArry ( taskText )
{
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  }
  arrayOfTasks.push(task)
  //add tasks for page
  addElementToPageFrom(arrayOfTasks)
}