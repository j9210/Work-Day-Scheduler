
$("#currentDay").text(moment().format('dddd MMMM Do'));

var tasks = {
    "9": [],
    "10": [],
    "11": [],
    "12": [],
    "13": [],
    "14": [],
    "15": [],
    "16": [],
    "17": []
};

// set color of task-input based of the current time
var setColor = function(){
    for (i = 9; i < 18; i++){
        if (moment().hour() < i){
            $("#" + i).addClass("future");
        }
        else if (moment().hour() > i){
            $("#" + i).addClass("past");
        }
        else if (moment().hour() === i){
            $("#" + i).addClass("present");
        }
    }
};

// create function to save tasks
var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("saved");
};

// create function to load tasks 
var loadTasks = function(){
    tasks = JSON.parse(localStorage.getItem("tasks"));
    // loop over task array and show saved tasks 
    for (i = 9; i < 18; i++){
        $("#" + i)
            .text(tasks[i])
    }
}

// onclick function to save tasks
$(".saveBtn").on("click", function(event){
    event.preventDefault();

    // find nearest txtare id and value to set tasks
    let textArea = $(event.target).closest(".row").find("textarea");
    let time = textArea.attr("id");
    let text = textArea.val().trim();

    tasks[time] = [text];
    saveTasks(tasks);
})

//call function to change colors, load every 5 min
setColor();
setInterval(setColor, 300000);

loadTasks();