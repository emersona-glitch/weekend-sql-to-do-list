$(document).ready(onReady);
// Perform all of these functions on document load
function onReady() {
    clickListeners();
    getTasks();
}

// All click listeners collected in one place!
function clickListeners() {
    $('#submitButton').on('click', submitTask)
    $('#deleteAllButton').on('click', deleteAll)
    $('#feedback').on('click', '.deleteButton', deleteEntry)
    $('#feedback').on('click', '.completeButton', completeEntry)
    $('#feedback').on('click', '.incompleteButton', incompleteEntry)
}

// completeEntry() is called when we push our "Mark as Complete" button
// it sends a PUT request to our router which then updates
// the information stored for the item with the same id as the one
// associated with our mark as complete button
function completeEntry() {
    $.ajax({
        method: 'PUT',
        url: `/tasks/complete/${$(this).closest('tr').data('id')}`
    }).then(function (response) {
        console.log('successfully completed task');
        getTasks();
    }).catch(function (error) {
        console.log('error in completeEntry()', error);
    });
}

// incompleteEntry() toggles our task back to incomplete after we've
// already marked it for complete.
function incompleteEntry() {
    $.ajax({
        method: 'PUT',
        url: `/tasks/incomplete/${$(this).closest('tr').data('id')}`
    }).then(function (response) {
        console.log('task is now marked incomplete');
        getTasks();
    }).catch(function (error) {
        console.log('error in incompleteEntry()', error);
    });
}

// This function will send a request to our router to ask our database
// to delete all entries that do not have a .completed property of NULL
function deleteAll() {
    $.ajax({
        method: 'DELETE',
        url: '/delete/completed'
    }).then(function (response) {
        console.log('tasks succssfully deleted');
        getTasks();
    }).catch(function (error) {
        console.log('error in deleteAll()', error);
    })
}

function deleteEntry() {
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${$(this).closest('tr').data('id')}`
        // specify which item we want to delete by sending the row's
        // id in the url. We "unpack" this important information
        // in our router.delete
    }).then(function (response) {
        console.log('task successfully deleted');
        getTasks();
    }).catch(function (error) {
        console.log('error in deleteEntry()', error);
    })
}

// Called when our submit button is clicked
function submitTask() {
    const sendData = packageObject();
    if (sendData === false) {
        // packageObject() is set up to return false if the DOM's
        // inputs aren't completed, and submitTask() will check that
        // here and console log a notification if the inputs aren't
        // filled.
        console.log('please complete all fields');
    } else {
        $.ajax({
            method: 'POST',
            url: '/tasks',
            data: sendData
        }).then(function (response) {
            console.log(response);
            getTasks();
            // emptying out our inputs once our "handshake"
            // has been verified and we know we can ditch
            // the information that was stored in them.
            $('#taskInput').val('');
            $('#descriptionInput').val('');
        }).catch(function (error) {
            console.log('error in submitTask()', error);
        });
    }
}

function packageObject() {
    // conveniently package up our inputs' values into
    // an object, or return false to let us know that
    // not everything is filled out.
    if (($('#taskInput').val() == '') || (
         $('#descriptionInput').val() == '')) {
        return false;
    } else {
        return {
            name: $('#taskInput').val(),
            description: $('#descriptionInput').val(),
        };
    }

}

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        // once we've retrieved the info from our database,
        // we'll feed it into our appendData function which will
        // sort through the data and visualize it more intuitively
        // to the DOM
        appendData(response);
    }).catch(function (error) {
        console.log('error in getTasks');
    })
}

function appendData(input) {
    $('#feedback').empty();
    for (let i = 0; i < input.length; i++) {
        let taskCompleted = '';
        let completeClass = '';
        let completeButton = '';
        // Here we'll check to see if the item in our input array has
        // been completed or not, and if it has we'll update the
        // button that we append to the table so that we can switch
        // it back to incomplete.
        if (input[i].completed == null) {
            completeClass = ''
            completeButton = '<button class="completeButton">Mark as Completed</button>';
            taskCompleted = 'Not complete';
        } else {
            completeClass = 'green'
            completeButton = '<button class="incompleteButton">Mark as Incomplete</button>';
            taskCompleted = input[i].completed.substring(0, 9);
        }
        $('#feedback').append(`
        <tr class="${completeClass}" data-id="${input[i].id}">
        <td>${input[i].name}</td>
        <td>${input[i].description}</td>
        <td>${input[i].entered.substring(0, 9)}</td>
        <td>${taskCompleted}</td>
        <td>${completeButton}</td>
        <td><button class="deleteButton">Delete Task</button></td>
        </tr>
        `)
    }
}