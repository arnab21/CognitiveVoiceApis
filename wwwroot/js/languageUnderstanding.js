
var inputForm = document.querySelector('form');
// Function called when the form is submitted
inputForm.onsubmit = function (e) {

    e.preventDefault();

    // Set or get variables needed for HTTP call
    var region = "westus";
    var predictionresource = "nextgenapiintentrecognition";
    var appid = $("#appid").val();
    var endpointkey = $("#endpointkey").val();
    var utterance = encodeURIComponent($("#utterance").val().toLowerCase());

    var params = $.param({
        // These are optional request parameters.
        "verbose": "true",
        "show-all-intents": "true",
        "log": "true",
    });

    // Endpoint URL
    //var url = `https://${region}.api.cognitive.microsoft.com/luis/v2.0/apps/${appid}?subscription-key=${endpointkey}&q=${utterance}&${params}`;
    var url = `https://${predictionresource}.cognitiveservices.azure.com/luis/prediction/v3.0/apps/${appid}/slots/production/predict?subscription-key=${endpointkey}&query=${utterance}&${params}`;

    $.ajax({
        url: url,
        type: "GET",
        cache: false,
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", endpointkey);
        },
        success: function (returnhtml) {
            // show response
            $("#prediction").append("<p>" + JSON.stringify(returnhtml) + "<p>");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // show error
            console.log(xhr.status);
            console.log(thrownError);
        }
    });

};