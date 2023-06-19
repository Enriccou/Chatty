var socket = io('https://web-chatty.onrender.com');

function EmitJoin() {
    var username = document.getElementById("username").value;
    socket.emit("join", username);
}

socket.on('UsersOnline', (UsersOnline) => {

    var users = document.querySelector(".active-users");
    users.innerHTML = UsersOnline.map(user => `<li>${user}</li>`).join('');

});

socket.on('ExitUser', (UsersOnline) => {

    var users = document.querySelector(".active-users");
    users.innerHTML = UsersOnline.map(user => `<li>${user}</li>`).join('');
    console.log(UsersOnline);

});

socket.on("receivedMessage", function (message) {
    renderMessage(message);
});

$("#chatty").submit(function (event) {
    event.preventDefault();
    if (textarea.value.length === 1) {
        textarea.value = "";
    } else {
        var photo = img.getAttribute('src')
        var author = $("input[name=username]").val();
        if (author == "") {
            author = "Sem Nome";
        }

        var message = $("textarea[name=message]").val();

        if (author.length && message.length) {
            var messageObject = {
                author: author,
                message: message,
                photo: photo,
                color: color
            };
            renderMessage(messageObject);


            socket.emit("sendMessage", messageObject);
        }
    }
});