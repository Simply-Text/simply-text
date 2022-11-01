const CloudVisionConfig = {
    "type": "service_account",
    "project_id": "simply-text-vision",
    "private_key_id": "0823891a7ab26412eeb9c9f2ff4ed2621c334a37",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDO9pC6Zans+1bl\nC+LLu2pomrbsHyxjSslCO0164iforacWCZbUql7ulp2owHI+OZv9KF6+gAvYHd3Z\ntEF0I+bLK5yrZeWdFNyQQi6EXYPaaw4ZnLPBTpSVdVbqm8A4vvie6/bUyCBOOeen\nPRMdNs1udmq8RgTMSimutyvTPgJMVTkpCfIQM3b41Q1LnT1MwTGWL1Ff1rN1KSrN\nI7n1iPTFOPTcV92mG69o3tt7ysRE7g6ZWbm2tmoYq4t2jbseqT382fXtryGDpyhA\nNXfhYAnxGP08/r8RW3y+joqHueBEYq8j8mgzDzC9lDvcfG7AM0JHUWUD92eg9nLM\ncqX4KAInAgMBAAECggEAX8vzO8QY/m9sTkLNLJ5IZ7jNWMgpJKCWPcjzWSDbdjEC\n+QlhPnjJzkf7HARQHQtPb8PC7wyX7uYMLVvpPBfuGTbLou5cdPQWD9QCchRTFsOc\n2DAXaC+2SOPyYk/Ljrienfj83IrxoSPeXSPA+DHIrwuy5gjG6cSePJfeej3mlGu9\nByoDB8wgjbpkdxAeb/zaizc2QWbnOp+aozUI/eXxwbugjEnCe2dvhgYAYIE80ioH\nQWLJsl33jWefwXQJYOZ10HgLf10yG8lJAF05G3/tPF88yboXZoNs7aF4onDooYYd\n/MZIG5aYxlYuZF9QKyQYlKukbaGM4YnPHyxogu7HOQKBgQDs6IHi9X5COIU7hDYY\n0n76HD3r9HsOOY9nm0+xB0qswdI4iSuwLYsc2tz/0zT5s81GLJ/JgYn3uz72Pgya\nu/RlZBRcI6vHTLCO9WwhkfVnDvGG50DhhM7s1sm/pgdd/qKc2H6aqh2WrtmarFey\nAQsENmoEnFGesParZQQisoqslQKBgQDfpEgBLnIPx9+ph237fOxG4rMT8XIJmDRJ\n4DMbqn6oW1M0iDfXpwOj4n68hb5L0z3AM5fgnpBbnlG+xjCtkntEvpA3HaFYXd9k\noG7XOmt3LMB0Ci/8e00QCSIvjWcsJdgcMdiKlrO01dmR1SoB1XFPfH3yNHB4h27S\nzAVws/qIywKBgQC596YF9/mdl+qWFqm0gIAma0b8UtTKDMsSZGuBJp0q0ZboxFyk\nFowuIWv78dqS7N6FaIAh2OrpqXW6LGkOid5GPPJyhZnRf9TU07iG/aFqveNAp4VZ\nwjwA1HZYV8dOtJUHlDaFyGYjo6uza/gHBiSUsPY2GlNDw9xOHKTLa+XJpQKBgH5Z\ncBzKwsJLp/89dlOZFlxOA+KGjGkDRrdeJUHCJ2Cyh+Wr9/CseRAEDJox7XslU0Pd\nYjcTHnfEkGZ5zlKh6WbDSvL4mIk2L9nIEhci+EgSToDAqK+6caVXo6q99sYoc1oq\nhy51Sf4mu476oYr7rdK8gONv4QMXcPNDNOehpy/VAoGBAJP9X7oladvFYe7y4Sut\nRDWAd1N652OJ7seR2go2GwRHGa9rRTN5oCcHAc72i8+IwX5l4tfH51WMbH4xM6Bs\n70kJ3nqX7/+W/QxVfLaP+oKJ3M3NCt+7YhH282EdSed5rObowzmomk9QfAjjk6NA\nX+9RREDEgStHqhC/Fz1E8e/V\n-----END PRIVATE KEY-----\n",
    "client_email": "simply-text-vision-service@simply-text-vision.iam.gserviceaccount.com",
    "client_id": "103448876396766225143",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/simply-text-vision-service%40simply-text-vision.iam.gserviceaccount.com"
}

const CloudVisionApi = {
    api: "https://vision.googleapis.com/v1/images:annotate?key=",
    apiKey: "AIzaSyDLCp6IMcXDHsA_ELk6KXkfBZLitvWZYrE"
}

export {CloudVisionConfig, CloudVisionApi};