$(document).ready( onReady );
// Perform all of these functions on document load
function onReady () {
    clickListeners();
}

// All click listeners collected in one place!
function clickListeners () {
    $('#submitButton').on('click', submitTask)
}

function submitTask () {
    $('#feedback').append(`
        <tr>
        <td>${$('#taskInput').val()}</td>
        <td>${$('#descriptionInput').val()}</td>
        <td>hi</td>
        <td>no</td>
        <td><button id="deleteButton">delete</button></td>
        <td><button id="completeButton">complete</button></td>
        </tr>
    `);
    $('#taskInput').val('')
    $('#descriptionInput').val('')
}