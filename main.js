var btnTranslate = document.getElementById("btn-translate");
var txtInput = document.querySelector("#txt-input");
var outputDiv = document.querySelector("#output");
var copyBtn = document.querySelector("#copy-btn");
var audioBtn = document.getElementById("play-audio");

var apiUrl = "https://lessonfourapi.tanaypratap.repl.co/translate/yoda.json"

// var apiUrl = "https://api.funtranslations.com/translate/minion.json"

var audioUrl = "http://api.funtranslations.com/translate/morse/audio.json"

function getTranslationURL(input) {
    return apiUrl + "?" + "text=" + input
}

function getAudioURL(input) {
    return audioUrl + "?" + "text=" + input
}
// function to handle  error
function errorHandler(error) {
    console.log("error occured", error);
    alert("something wrong with server! try again after some time")
}


function clickHandler() {
    // getting text
    console.log("clicked");
    var inputText = txtInput.value;

    // api Call
    fetch(getTranslationURL(inputText))
        .then(response => response.json())
        .then(json => {
            var translatedText = json.contents.translated;
            outputDiv.innerText = translatedText; // output
        })
        .catch(errorHandler)
};

// console.log(btnTranslate);
btnTranslate.addEventListener("click", clickHandler)


// for copying the text

copyBtn.addEventListener("click", () => {
    console.log("clicked");
    var outputDiv = document.getElementById("output")

    outputDiv.select();
    outputDiv.setSelectionRange(0, 99999);
    document.execCommand("copy");
    // alert("Copied the text: "+outputDiv);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + outputDiv.value;
});





copyBtn.addEventListener('mouseover', () => {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
});


audioBtn.addEventListener("click", () => {
    console.log("clicked audio");
    //get audio  
    var inputText = txtInput.value;
    fetch(getAudioURL(inputText))
        .then(response => response.json())
        .then(json => {
            var audioData = json.contents.translated.audio;
            // console.log(audioData);
            var audio = document.getElementById('audio');
            audio.src = audioData;
            var myAudio = document.getElementById('myAudio');
            myAudio.play();
            // audio.load(); 
            // audio.play();
        })
        .catch(errorHandler)

    // var base64string;

});

function playing()
{
    console.log("audio is playing");
}