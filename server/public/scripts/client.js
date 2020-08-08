console.log('js');

$(document).ready( onReady );

function onReady () {
    clickListeners();
}

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
        </tr>
    `);
    $('#taskInput').val('')
    $('#descriptionInput').val('')
}