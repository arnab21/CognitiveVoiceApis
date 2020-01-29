var synth = window.speechSynthesis;

//await new Promise(r => setTimeout(r, 1000));

var playApiResponse = document.querySelector('#playApiResponse');
var inputTxt = document.querySelector('#apiResponseToSpeech');
//var voiceSelect = document.querySelector('select');
var voiceSelect = document.querySelector('#voiceSelector');


var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');
var voices = [];



// Fetch account data via API when invokeBackendApiButton is clicked
var invokeBackendApiButton = document.getElementById("invokeBackendApiButton");
var topIntentInput = document.querySelector('#topIntent');
var authenticatedSpeakerInput = document.querySelector('#speakerName');
var recognizedAccountNumberInput = document.querySelector('#recognizedAccountNumber');
var recognizedPersonInput = document.querySelector('#recognizedPerson');




function populateVoiceList() {
    //Web speech api object does not initialize, until a user initiated action on the page; like button click
    //window.alert('populating voices');
    voices = synth.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
        if (aname < bname) return -1;
        else if (aname == bname) return 0;
        else return +1;
    });
    var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = '';
    for (i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

        if (voices[i].default) {
            option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
    }
    voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();


if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}


function speak() {
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt.value !== '') {
        var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
        utterThis.onend = function (event) {
            console.log('SpeechSynthesisUtterance.onend');
        }
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
        for (i = 0; i < voices.length; i++) {
            if (voices[i].name === selectedOption) {
                utterThis.voice = voices[i];
            }
        }
        utterThis.pitch = pitch.value;
        utterThis.rate = rate.value;
        synth.speak(utterThis);
    }
}


inputTxt.addEventListener("change", speak);

playApiResponse.onclick = function (event) {
    event.preventDefault();

    speak();

    inputTxt.blur();
}

pitch.onchange = function () {
    pitchValue.textContent = pitch.value;
}

rate.onchange = function () {
    rateValue.textContent = rate.value;
}

voiceSelect.onchange = function () {
    speak();
}


bootstrap_alert = function () { }
bootstrap_alert.warning = function (message) {
    $('#userAuthAlertPlaceholder').html('<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times;</button><span>' + message + '</span></div>')
}

//var getAccountDetailsFromGraphQL = function (e) {
function getAccountDetailsFromGraphQL(e) {
    e.preventDefault();

    populateVoiceList();
    voiceSelect.selectedIndex = 9;

    var topIntent = topIntentInput.value;
    var recognizedAccountNumber = recognizedAccountNumberInput.value;
    var recognizedPerson = recognizedPersonInput.value;
    var authenticatedSpeaker = authenticatedSpeakerInput.value;

    var accountInformationByAccountIdQuery;
    var graphQlQuery;

    // Endpoint URL
    //var graphqlApiUrl = `http://localhost:63067/BackendApi/${topIntent}/${recognizedAccountNumber}`;
    var graphqlApiUrl = `https://accountbalancegraph.azurewebsites.net/api/graphql`;

    if (authenticatedSpeaker == null || authenticatedSpeaker == "") {
        bootstrap_alert.warning('Please authenticate with your voice fingerprint, before proceeding');
        return;
    }

    if (recognizedAccountNumber != null && recognizedAccountNumber != "") {
        accountInformationByAccountIdQuery = (acctId, acctName) => `{ accountInformationByAccountId(accountId:"${acctId}", accountHolderName:"${acctName}") { accountId textInfo accountHolderName availableBalance minimumBalance accountTransactions{payeeAccount transactionAmount transactionType trasactionDate} } }`;
        graphQlQuery = JSON.stringify({ query: accountInformationByAccountIdQuery(recognizedAccountNumber, authenticatedSpeaker) });
    }
    else {
        accountInformationByAccountIdQuery = acctId => `{ accountInformationByAccountId(accountId:"${acctId}") { accountId textInfo accountHolderName availableBalance minimumBalance accountTransactions{payeeAccount transactionAmount transactionType trasactionDate} } }`;
        graphQlQuery = JSON.stringify({ query: accountInformationByAccountIdQuery(recognizedAccountNumber) });
    }
  

    $.ajax({
        url: graphqlApiUrl,        
        type: "POST",
        data: graphQlQuery,
        cache: false,
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Accept", "application/json");
        },
        success: function (responseData) {
            // show response
            var apiResponse = JSON.stringify(responseData);
           // var apiResponseObj = $.parseJSON(apiResponse);
            var apiResponseObj = $.parseJSON(responseData);

            $("#backendApiResponse").append("<p>" + apiResponse + "<p>");   

            inputTxt.value = apiResponseObj.data.accountInformationByAccountId.textInfo;
            inputTxt.dispatchEvent(new Event('change'))
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // show error
            console.log(xhr.status);
            console.log(thrownError);
        }
    });

}



// Function called when the invokeBackendApiButton is clicked
invokeBackendApiButton.addEventListener("click", getAccountDetailsFromGraphQL);
recognizedAccountNumberInput.addEventListener("change", getAccountDetailsFromGraphQL);