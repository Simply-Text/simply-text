const CloudVisionApiJson =  require('./keys/keys');
const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const app = express();
var axios = require('axios');

app.use(cors({ origin: true }));

exports.callCloudVision = functions.region('northamerica-northeast1').https.onCall(async (data, context) => {
    const CloudVisionApi = JSON.parse(CloudVisionApiJson);
    let googleVisionRes = await axios.post(CloudVisionApi.api + CloudVisionApi.apiKey, {
        "requests": [
            {
                "image": {
                    "content": data.image
                },
                features: [
                  { type: "DOCUMENT_TEXT_DETECTION"}
                ]
            }
        ],
      });
    
    return {response: googleVisionRes.data};
});