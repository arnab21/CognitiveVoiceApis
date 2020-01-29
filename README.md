# CognitiveVoiceApis
Apis using natural language understanding interface with Microsoft Azure cognitive service


1. This app uses Microsoft Speaker recognition api to identify and authenticate a user based on their biometric voice finger print
2. Then it takes a voice command, which is sent to Microsoft Congnitive services for Language understanding. The LUIS services is used to decipher intent (api to invoke) and parameters from the voice command
3. The intended backend api is invoked with the authenticated user content and deciphered parameters. The Api response is narrated back to user using the browser's Web Speech Api
