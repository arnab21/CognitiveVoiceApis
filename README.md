# CognitiveVoiceApis
Apis using natural language understanding interface with Microsoft Azure cognitive service


1. This app uses Microsoft Speaker recognition api to identify and authenticate a user based on their biometric voice finger print
2. Then it takes a voice command, which is sent to Microsoft Congnitive services for Language understanding. The LUIS services is used to decipher intent (api to invoke) and parameters from the voice command
3. The intended backend api is invoked with the authenticated user content and deciphered parameters. The Api response is narrated back to user using the browser's Web Speech Api


Attributions:
==========================
Thanks to owners of the following github projects/repos, which have been proven very useful while pulling together this demo
1. https://github.com/rposbo/speaker-recognition-api
2. https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/quickstart/javascript/browser
3. https://github.com/Azure-Samples/cognitive-services-language-understanding/tree/master/documentation-samples/quickstarts/analyze-text/javascript


Setup Instructions:
========================
WIP