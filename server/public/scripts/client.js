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
    })catch(function (error) {
        console.log('error in getTasks');
    })
}

function appendData (input) {
    $('#feedback').empty();
    if (input.completed = 'NULL') {
        const completed = 'Not complete'
    }
    for (let i=0; i<input.length; i++) {
        $('#feedback').append(`
        <tr data-id="">
        <td>${input.name}</td>
        <td>${input.description}</td>
        <td>${input.entered}</td>
        <td>${completed}</td>
        <td><button id="completeButton"></button</td>
        <td><button id="deleteButton"></button</td>
        </tr>
        `)
    }
    $('#taskInput').val('');
    $('#descriptionInput').val('');
}