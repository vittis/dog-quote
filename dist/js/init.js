var imagensDogs = [];
var imgDog;
var loading;
var botaoDogo;
var quote;
//var author;
var quoteContainer;
//var authorContainer;
(function($){
  $(function(){

    imagensDogs = document.getElementsByClassName("dogPrincipal");
    imgDog =  document.getElementById("dogInicial");
    loading = document.getElementById("loadingDog");
    botaoDogo = document.getElementById("botaoDogo");
    quote = document.getElementById("quote");
    //author = document.getElementById("author");
    quoteContainer = document.getElementById("quoteContainer");
    //authorContainer = document.getElementById("authorContainer");

    /* botaoDogo.style.marginBottom = (botaoDogo.parentElement.clientHeight-50)+"px"; */

    trocaImagem();
    getOneQuote();
    getQuotes();
    pega10Dogs();
  }); // end of document ready
})(jQuery); // end of jQuery name space

var dogs = [];
var jaPegouDogs = false;
var jaPegouQuotes = false;

var indexDog=0;
var primeiraVez = true;
var quotes = [];

function getOneQuote() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://talaikis.com/api/quotes/random", true)

  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        var responseJson = JSON.parse(xhr.responseText);
        quote.innerHTML = responseJson.quote;
    }
  }
}


function getQuotes() {
  
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://talaikis.com/api/quotes/", true)

  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        var responseJson = JSON.parse(xhr.responseText);
        quotes = responseJson;
        jaPegouQuotes = true;

    }
  }


}


function pega10Dogs() {
  dogs = [];
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://dog.ceo/api/breeds/image/random/10", true)

  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {

        var responseJson = JSON.parse(xhr.responseText);
        if (responseJson.status == "success") {
          for (let i = 0; i < 10; i++) {
            if (i < imagensDogs.length && primeiraVez) {
              imagensDogs[i].src = responseJson.message[i];
            }
            else {
              dogs.push(responseJson.message[i]);
            }
          }
          

          jaPegouDogs = true;
        }

    }
  }
}


function get1Dog() {

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://dog.ceo/api/breeds/image/random", true)

  xhr.send();

  xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {

          var responseJson = JSON.parse(xhr.responseText);
          if (responseJson.status == "success") {
            return responseJson.message;
          }
          else {
            return null;
          }
      }
  }
}


function trocaImagem() {

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://dog.ceo/api/breeds/image/random", true)

  xhr.send();

  var imgDog = document.getElementById("dogInicial");
  var loading = document.getElementById("loadingDog");

  
  imgDog.classList.add("hide");
  quoteContainer.classList.add("hide");
  //authorContainer.classList.add("hide");

  loading.classList.remove("hide");

  xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
       
          var responseJson = JSON.parse(xhr.responseText);
          if (responseJson.status == "success") {
            imgDog.src = responseJson.message;
            
            setTimeout(toggleLoadingDog, 1000);

          }
          else {
            trocaImagem();
          }
      }
  }
}

function toggleLoadingDog() {
    if (jaPegouQuotes) {
        imgDog.classList.remove("hide");
        quoteContainer.classList.remove("hide");
        //authorContainer.classList.remove("hide");
        loading.classList.add("hide");

        botaoDogo.classList.add("pulse");
        botaoDogo.classList.remove("disabled");
            
        botaoDogo.style.marginBottom = (botaoDogo.parentElement.clientHeight-75)+"px";
    }
    else {
        setTimeout(toggleLoadingDog, 1000);
    }
}
var podeClicar = true;
var indexQuote=0;
function resetBotao() {
  podeClicar = true;
  botaoDogo.classList.add("pulse");
  botaoDogo.classList.remove("disabled");
}
function onClickBotao() {
  if (!podeClicar && jaPegouQuotes){
    return;
  }
  podeClicar = false;
  botaoDogo.classList.remove("pulse");
  botaoDogo.classList.add("disabled");
  setTimeout(resetBotao, 750);

  var newQuote = quoteContainer.cloneNode(true);
  quoteContainer.parentNode.replaceChild(newQuote, quoteContainer);
  quoteContainer = document.getElementById("quoteContainer");

  /* var newAuthor = authorContainer.cloneNode(true);
  authorContainer.parentNode.replaceChild(newAuthor, authorContainer);
  authorContainer = document.getElementById("authorContainer"); */

  //let randomIndex = Math.floor(Math.random()*quotes.length);
  var quoteToGo=quotes[indexQuote].quote;
  //while (quoteToGo.length > 200) {
    //quoteToGo = quotes[Math.floor(Math.random()*quotes.length)].quote
  //}
  quoteContainer.children[0].innerHTML = quoteToGo;
  //authorContainer.children[0].innerHTML = quotes[indexQuote].author;
  indexQuote++;
  if (indexQuote >=100) {
    indexQuote=0;
    getQuotes();
    jaPegouQuotes=false;
  }

  imagensDogs[indexDog].classList.add("hide");
  imagensDogs[indexDog].src = dogs[indexDog];

  if (indexDog < 4) {
    imagensDogs[indexDog+1].classList.remove("hide");
    indexDog++;
  }
  else {
    indexDog = 0;
    imagensDogs[indexDog].classList.remove("hide");
    primeiraVez=false;
    pega10Dogs();
  }
  
}