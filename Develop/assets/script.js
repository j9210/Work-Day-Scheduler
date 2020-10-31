
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

// create task function
// save task local storage
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("saved");
};
// function to load saved tasks
var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    // if local storage is empty, create new object to track tasks
    if (!tasks) {
        tasks  = {
            toDo: [],
            inProgress: [],
            inReview: [],
            done: []
        };
    };

    // loop over obj properties
    $.each(tasks, function(hour, task) {
        var timeBlock = $("#" + hour);
        createTask(task, timeBlock);   
    });
    checkTasks();
};

// save task in local storage
$(".saveBtn").on("click", function() {
    let taskGroup = $(this).closest(".task-group");
    let textArea = taskGroup.find("textarea");
    let time = taskGroup.attr("id");
    let text = textArea.val().trim();

    tasks[time] = [text];
    saveTasks();
});

// check tasks to update background color based on current time
var checkTasks = function() {
    var currentTime = moment().hour();
    $(".task-group").each(function() {
        var taskTime = parseInt($(this).attr("id"));
        if (taskTime < currentTime) {
            $(this).removeClass("present future").addClass("past");
        } else if (taskTime === currentTime) {
            $(this).removeClass("past future").addClass("present");
        } else {
            $(this).removeClass("past present").addClass("future");
        }
    });
};

//interval to change task background color
setInterval(function() {
    checkTasks();
}, 600000);

loadTasks();