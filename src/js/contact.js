
function letterCounter() {
    var contactTextarea = document.querySelector("#contactTextarea");
    var textLength = document.querySelector("#textLength");
    var enteredText = contactTextarea.value;
    var letterCount =enteredText.length;
    if (letterCount > 100) {
        contactTextarea.value = enteredText.substring(0, 100);
        letterCount = 100;
    }
    textLength.textContent = letterCount;
}
