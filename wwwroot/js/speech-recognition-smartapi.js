//    <!-- Speech SDK Authorization token -->
// Note: Replace the URL with a valid endpoint to retrieve
//       authorization tokens for your subscription.
//var authorizationEndpoint = "token.php";
var authorizationEndpoint = "SpeechApiToken";

function RequestAuthorizationToken() {
    if (authorizationEndpoint) {
        var a = new XMLHttpRequest();
        a.open("GET", authorizationEndpoint);
        a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        a.send("");
        a.onload = function () {
            var token = JSON.parse(atob(this.responseText.split(".")[1]));
            serviceRegion.value = token.region;
            authorizationToken = this.responseText;
            subscriptionKey.disabled = true;
            subscriptionKey.value = "using authorization token (hit F5 to refresh)";
            console.log("Got an authorization token: " + token);
        }
    }
}

//    < !--Speech SDK USAGE-- >

// status fields and start button in UI
var phraseDiv;
var startRecognizeOnceAsyncButton;
var utterance;

// subscription key and region for speech services.
var subscriptionKey, serviceRegion;
var authorizationToken;
var SpeechSDK;
var recognizer;

document.addEventListener("DOMContentLoaded", function () {
    startRecognizeOnceAsyncButton = document.getElementById("startRecognizeOnceAsyncButton");
    //subscriptionKey = document.getElementById("subscriptionKey");
    //serviceRegion = document.getElementById("serviceRegion");
    subscriptionKey = qs['subscriptionKey'];
    serviceRegion = qs['serviceRegion'];
    //window.alert(subscriptionKey + ' : ' + serviceRegion)
    phraseDiv = document.getElementById("phraseDiv");
    utterance = document.getElementById("utterance");

    startRecognizeOnceAsyncButton.addEventListener("click", function () {
        startRecognizeOnceAsyncButton.disabled = true;
        phraseDiv.innerHTML = "";

        // if we got an authorization token, use the token. Otherwise use the provided subscription key
        var speechConfig;
        if (authorizationToken) {
            speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authorizationToken, serviceRegion);
        } else {
            if (subscriptionKey === "" || subscriptionKey === "subscription") {
                alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
                return;
            }
            speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
        }

        speechConfig.speechRecognitionLanguage = "en-US";
        var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync(
            function (result) {
                startRecognizeOnceAsyncButton.disabled = false;
                window.console.log(result);
                phraseDiv.innerHTML += result.text;
                utterance.value = result.text;
                utterance.dispatchEvent(new Event('change'));                

                recognizer.close();
                recognizer = undefined;
            },
            function (err) {
                startRecognizeOnceAsyncButton.disabled = false;
                phraseDiv.innerHTML += err;
                window.console.log(err);

                recognizer.close();
                recognizer = undefined;
            });
    });

    if (!!window.SpeechSDK) {
        SpeechSDK = window.SpeechSDK;
        startRecognizeOnceAsyncButton.disabled = false;

        document.getElementById('speechRecognitionContent').style.display = 'block';
        document.getElementById('speechRecognitionWarning').style.display = 'none';

        // in case we have a function for getting an authorization token, call it.
        if (typeof RequestAuthorizationToken === "function") {
            RequestAuthorizationToken();
        }
    }
});
