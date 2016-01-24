/* Connect to our Socket.IO server. */
var socket = io.connect('http://127.0.0.1:1337/');
var app = app || {};

/* Shortcut for document.ready. */
$(function () {
    /* Setup jQuery selectors. */
    var $logsTable = $('#logs'),
        $logsTableTbody = $logsTable.children('tbody'),
        $logsTableTbodyLastChild = $logsTableTbody.last(),
        $clearAllPosts = $('#clearAllPosts');

    /* Wait on blast event. */
    socket.on("log", function (data) {
        console.log(data);
        /* Append row to table. */
        $logsTableTbodyLastChild.append('<tr><td>' + data.id + '</td><td>' + data.event + '</td></tr>');
    });

    /* Clears all logs (rows) of our table. */
    $clearAllPosts.click(function (e) {
        $logsTableTbody.empty();
    });
});
