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

function incompleteEntry() {
    $.ajax({
        method: 'PUT',
        url: `/tasks/incomplete/${$(this).closest('tr').data('id')}`
    }).then(function (response) {
        console.log('task is now marked incomplete');
        getTasks();        
    })
}

function completeEntry () {
    
    // $(this).closest('tr').toggleClass("green")
    $.ajax({
        method: 'PUT',
        url: `/tasks/complete/${$(this).closest('tr').data('id')}`
    }).then(function (response) {
        console.log('successfully completed task');
        getTasks();
    }).catch(function (error) {
        console.log('error in incompleteEntry()', error);
    });

}

function deleteAll () {
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
        console.log('please complete all fields');
    } else {
        $.ajax({
            method: 'POST',
            url: '/tasks',
            data: sendData
        }).then(function (response) {
            console.log(response);
            getTasks();
        }).catch(function (error) {
            console.log('error in submitTask()', error);
        });
        $('#taskInput').val('');
        $('#descriptionInput').val('');
    }

}

function packageObject() {

    if (($('#taskInput').val() == '') || ($('#descriptionInput').val() == '')) {
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
        if (input[i].completed == null) {
            completeClass = ''
            completeButton = '<button class="completeButton">Mark as Completed</button>';
            taskCompleted = 'Not complete';
        } else {
            completeClass = 'green'
            completeButton = '<button class="incompleteButton">Mark as Incomplete</button>';
            taskCompleted = input[i].completed;
        }
        $('#feedback').append(`
        <tr class="${completeClass}" data-id="${input[i].id}">
        <td>${input[i].name}</td>
        <td>${input[i].description}</td>
        <td>${input[i].entered}</td>
        <td>${taskCompleted}</td>
        <td>${completeButton}</td>
        <td><button class="deleteButton">Delete Task</button></td>
        </tr>
        `)
    }
}