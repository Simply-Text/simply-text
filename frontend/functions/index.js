const functions = require("firebase-functions");
const { defineSecret } = require('firebase-functions/params');
const express = require('express');
const cors = require('cors');

const visionApiKey = defineSecret('VISION_API_KEY');

const app = express();
var axios = require('axios');

app.use(cors({ origin: true }));

exports.callCloudVision = functions.region('northamerica-northeast1').runWith({secrets: [visionApiKey]}).https.onCall(async (data, context) => {

    let googleVisionRes = await axios.post("https://vision.googleapis.com/v1/images:annotate?key=" + visionApiKey.value(), {
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