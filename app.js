//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".text_new");//Add a new task.
// console.log(taskInput.value)
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.querySelector(".task-list_now");//ul of #incompleteTasks
var completedTasksHolder=document.querySelector(".task-list_completed");//completed-tasks



//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    listItem.className="task task-list__task"

    label.innerText=taskString;
    label.className='task__deal deal';
    // console.log(label)

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className="task__checkbox checkbox"
    editInput.type="text";
    editInput.className="deal__text text text_now";
    // editInput.className=""

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    // editButton.className="";
    editButton.className="button task__button";

    deleteButton.className="button-delete button button-delete task__button-delete";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.className="button-delete__img img-delete"
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    console.log(listItem)
    return listItem;
}



var addTask=function(){
    // console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);
    console.log(listItem)

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    // console.log("Edit Task...");
    // console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    
    var label=listItem.querySelector("label");
    var editInput=listItem.querySelector('input[type=text]');
    var editBtn=listItem.querySelector(".button");
    var containsClass=listItem.classList.contains("task_edit");
    // console.log(label)
    // console.log(editInput)
    // console.log(editBtn)

    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("task_edit");
    editInput.classList.toggle("text_edit");
    label.classList.toggle("deal_edit")
};


//Delete task.
var deleteTask=function(){
    // console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    // console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    
    // console.log(listItem)
    listItem.querySelector(".deal").classList.add("deal_completed")
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    // console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    listItem.querySelector(".deal").classList.remove("deal_completed")
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    // console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    // console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".checkbox");
    var editButton=taskListItem.querySelector("button.button");
    var deleteButton=taskListItem.querySelector("button.button-delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length; i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.


console.log('Самооценка - 45 баллов\nОтзыв по пунктам ТЗ:\nВыполненные пункты:\n1) Правило 1.1 Отступы из html-and-css выполняется во всем проекте: табуляция не используется, все отступы выполнены пробельным символом\n2) Правило 1.2 Нижний регистр написания из html-and-css выполняется во всем проекте: все HTML теги, атрибуты из значения, селекторы и их значения записаны в нижнем регистре\n3) Правило 1.3 Кавычки в HTML/CSS документе из html-and-css выполняется во всем проекте: в HTML и СSS файлах используются только двойные кавычки\n4) Правило 2.1 Форматирование из html-and-css выполняется во всем проекте: все блочные, табличные и списочные элементы перенесены на отдельную строку и выделены отступами в соответствии с лестничной иерархией вложенности.\n5) Правило 2.2 Тип документа / Document Type из html-and-css выполняется во всем проекте: doctype присутствует первым тегом в html документе и соответствует типу html5\n6) Правило 2.3 Символы-мнемоники из html-and-css выполняется во всем проекте: символы-мнемоники не используются в html файлах\n7) Правило 2.4 Атрибут из html-and-css выполняется во всем проекте: CSS-стили и JS-скрипты подключены без использования данного атрибута\n8) Правило 3.1 Единый стиль именования селекторов (классов / id) из html-and-css выполняется во всем проекте: все селекторы именованы в едином стиле, при этом или в соответствии с БЭМ, или все слова в нижнем регистре и разделены между собой дефисом\n9) Правило 3.2 Значимые названия идентификаторов и классов из html-and-css выполняется во всем проекте: все имена классов и идентификаторов имеют или осмысленные имена в соответствии с их функциональным значением (!но НЕ ВНЕШНИМ ВИДОМ!), или шаблонное имя (также соответствующее назначению элемента)\n10) Правило 3.3 Лаконичность названий идентификаторов и классов из html-and-css выполняется во всем проекте: все имена id и классов понятны, достаточно длинные для понимания их назначения и при этом лаконичны\n11) Правило 3.4 Теговые селекторы из html-and-css выполняется во всем проекте: теговые селекторы не используются (за исключением намеренного сброса дефолтных стилей)\n12) Правило 3.5 Отступы в блоках из html-and-css выполняется во всем проекте: содержимое всех блоков отделены отступами\n13) Правило 3.6 Пробел после названий свойств из html-and-css выполняется во всем проекте: значения CSS-свойств отделены пробелами после двоеточия\n14) Правило 3.7 Точка с запятой после свойств из html-and-css выполняется во всем проекте: после каждого CSS-правила стоит точка с запятой\n15) Правило 3.8 Разделение селекторов и свойств из html-and-css выполняется во всем проекте: каждый селектор в групповом перечислении CSS-блока отделен переносом строки\n16) Правило 1.1 Семантика из html-and-css-extended соблюдено: все html-теги используются в соответствии с их назначением. При этом использование div-элементов сведено к минимуму, где возможно они заменены на семантические html5 элементы\n17) Правило 1.2 Альтернатива для мультимедиа из html-and-css-extended соблюдено: каждый мультимедиа элемент (в данном задании img) имеет alt-атрибут с осмысленным содержанием, соответствующим контенту элементы. При этом чисто декоративные картинки имеют alt с пустым значением.\n18) Правило 2.1 БЭМ из html-and-css-extended соблюдено: все классы именованы согласно БЭМ нотации\nP.S. Правило 2.1 БЭМ, 3.1 Единый стиль именования селекторов (классов / id), 3.2 Значимые названия идентификаторов и классов, 3.3 Лаконичность названий идентификаторов и классов, 3.4 Теговые селекторы перекрывают друг друга, оформлены одним коммитом.')