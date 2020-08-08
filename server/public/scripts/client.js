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
        appendData
    })catch(function (error) {
        console.log('error in getTasks');
    })
}

function appendData () {

}