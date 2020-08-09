$(document).ready( onReady );
// Perform all of these functions on document load
function onReady () {
    clickListeners();
    getTasks();
}

// All click listeners collected in one place!
function clickListeners () {
    $('#submitButton').on('click', submitTask)
}



function submitTask () {
    
    getTasks();
}

function getTasks () {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        appendData(response);
    }).catch(function (error) {
        console.log('error in getTasks');
    })
}

function appendData (input) {
    $('#feedback').empty();
    let completed = '';
    if (input.completed = 'NULL') {
        completed = 'Not complete';
    } else {
        completed = input.completed;
    }
    for (let i=0; i<input.length; i++) {
        $('#feedback').append(`
        <tr data-id="">
        <td>${input[i].name}</td>
        <td>${input[i].description}</td>
        <td>${input[i].entered}</td>
        <td>${completed}</td>
        <td><button id="completeButton">Mark as Completed</button</td>
        <td><button id="deleteButton">Delete Task</button</td>
        </tr>
        `)
    }
    $('#taskInput').val('');
    $('#descriptionInput').val('');
}