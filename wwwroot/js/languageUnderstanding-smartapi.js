
var luisGetIntentButton = document.getElementById("luisGetIntentButton");
//var phraseDiv = document.getElementById("phraseDiv");
var utteranceInput = document.getElementById("utterance");
var recognizedAccountNumberTxt = document.getElementById("recognizedAccountNumber");
var recognizedPersonTxt = document.getElementById("recognizedPerson");

var recognizeIntentsAndEntities = function (e) {

    e.preventDefault();

    // Set or get variables needed for HTTP call
    var region = "westus";
    var predictionresource = qs['luisPredictionResource'];
    var appid = qs['luisAppid'];
    var endpointkey = qs['luisEndpointKey'];
    var utterance = encodeURIComponent($("#utterance").val().toLowerCase());

    var params = $.param({
        // These are optional request parameters.
        "verbose": "true",
        "show-all-intents": "true",
        "log": "true",
    });

    // Endpoint URL
    //var url = `https://${region}.api.cognitive.microsoft.com/luis/v2.0/apps/${appid}?subscription-key=${endpointkey}&q=${utterance}&${params}`;
    var luisUrl = `https://${predictionresource}.cognitiveservices.azure.com/luis/prediction/v3.0/apps/${appid}/slots/production/predict?subscription-key=${endpointkey}&query=${utterance}&${params}`;

    $.ajax({
        url: luisUrl,
        type: "GET",
        cache: false,
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", endpointkey);
        },
        success: function (returnhtml) {
            // show response
            var luisResponse = JSON.stringify(returnhtml);
            var luisResponseObj = $.parseJSON(luisResponse);
            var personName = '';
            var accountNumber = 0;

            $("#luisPrediction").append("<p>" + luisResponse + "<p>");
            $("#topIntent").val(luisResponseObj.prediction.topIntent);
            if (luisResponseObj.prediction.entities.personName!=null) {
                personName = luisResponseObj.prediction.entities.personName[0];
            }
            if (luisResponseObj.prediction.entities.number!=null) {
                accountNumber = luisResponseObj.prediction.entities.number[0];
            }

            $("#recognizedAccountNumber").val(accountNumber);
            recognizedAccountNumberTxt.dispatchEvent(new Event('change'));
            $("#recognizedPerson").val(personName);
            recognizedPersonTxt.dispatchEvent(new Event('change'));
           
            
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // show error
            console.log(xhr.status);
            console.log(thrownError);
        }
    });

};
    
// Function called when the luisGetIntentButton is clicked
luisGetIntentButton.onclick = recognizeIntentsAndEntities
//phraseDiv.addEventListener('DOMSubtreeModified', recognizeIntentsAndEntities);
utteranceInput.onchange = recognizeIntentsAndEntities;

