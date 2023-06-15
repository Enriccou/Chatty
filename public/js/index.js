let textarea = document.querySelector("#writeMessage");
let detach = document.querySelector(".emojis");
let centerEmoji = document.querySelector(".emoji-center");
const containerProfile = document.querySelector('.container-profile');
const img = document.querySelector('#userImage');
const fileImage = document.querySelector('#file');
const labelImage = document.querySelector("#uploadBtn");


function colorName() {
  let color = Math.floor(Math.random() * 10000000).toString(16);
  return "#" + color
}

const color = colorName()
console.log(colorName())
//pegando o momento em que a mensagem foi enviada
function time() {
  let date = new Date();
  let hora = date.getHours();
  let minuto = date.getMinutes();

  if (hora < 10) {
    hora = "0" + hora;
  }
  if (date.getMinutes() < 10) {
    minuto = "0" + minuto;
  }
  let messageHour = hora + ":" + minuto;
  return messageHour;
}

function renderMessage(message) {
  $(".messages").append(
    `<div class='message'>` + `<img src=${(message.photo)}>` + "<p class='p-message'><strong style=color:" + `${message.color}>` + message.author +
    "</strong>: " +
    message.message +
    "</p>" +
    "<p class='hour'>" +
    time() +
    "</p></div>"
  );
}

textarea.value = "";
textarea.focus();

//resetando o valor da mensagem após o enter
textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (textarea.value.length === 1) {
      textarea.value = "";
    } else {
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      document.querySelector("button[type=submit]").dispatchEvent(clickEvent);
      textarea.value = "";
    }
  }
  if (e.key === "Escape") {
    if (centerEmoji.style.display == "flex") {
      centerEmoji.style.display = "none";
    } else {
      centerEmoji.style.display = "flex";
    }
  }
  scrollToEnd();
});

//mantendo a visualização na ultima msg
function scrollToEnd() {
  let janela = document.querySelector(".messages");
  janela.scrollTop = janela.scrollHeight;
}

//icones
detach.addEventListener("click", () => {
  if (centerEmoji.style.display == "flex") {
    centerEmoji.style.display = "none";
  } else {
    centerEmoji.style.display = "flex";
  }
});

centerEmoji.addEventListener("click", (e) => {
  let emoji = e.target.childNodes[0].data;
  textarea.value += emoji;
  textarea.focus();
});

//escolher imagem para usuário
fileImage.addEventListener('change', function () {
  const choosedFile = this.files[0];
  if (choosedFile) {
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      img.setAttribute('src', reader.result);
    });
    reader.readAsDataURL(choosedFile);
  }

});

document.querySelector('#enterChat').addEventListener('click', () => {
  document.querySelector('.principal').style.display = 'none';
  document.querySelector('.container').style.display = 'flex';
})