async function WebSocketTest() {
    let headsetValue;
    let headsetTime = new Date();

    const REQUEST_ACCESS_ID = 1;
    const CREATE_SESSION_ID = 5;
    const SUB_REQUEST_ID = 6;

    let ws = new WebSocket("wss://localhost:6868/");
    let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNvbS5qb2VwYi5maXJzdF90ZXN0IiwiYXBwVmVyc2lvbiI6IjEuMC4wIiwiZXhwIjoxNjcxMTM4Mzc3LCJuYmYiOjE2NzA4NzkxNzcsInVzZXJJZCI6ImYxYzViM2U4LWYyZDEtNGNlMy04Mjc0LWQ4ZTE3MTEwOWIyYSIsInVzZXJuYW1lIjoiam9lcGIiLCJ2ZXJzaW9uIjoiMi4wIn0.bmgUc0PoF2jOTPB2xBFonubt-DHiHQDbrQy2aIBxSMI";
    let sessionId = "";
    let requestAccessRequest = {
        "jsonrpc": "2.0",
        "method": "requestAccess",
        "params": {
            "clientId": "hpiGTc2dEjju8mBllnDbdgdQ9cqBjK57lDB8OIPM",
            "clientSecret": "o11FLk5BIkCuGWUyZQ5a3CERsWpJpkSaOFV50NXCwKMd5gTyfjS5rZrSNSHjIXqmlBlNZ3kycGxGuNhXeac2Ozxd1ICkekHyInlX8Jp7s99V1p1v2GyX4Ji65joGLWMd"
        },
        "id": REQUEST_ACCESS_ID
    };

    ws.onopen = await function () {
        // Web Socket is connected, send data using send()
        ws.send(JSON.stringify(requestAccessRequest));
        ws.onmessage = function (message) {
            // if(JSON.parse(data)['id']==6){
            document.write('requestAccessRequest RESULT --------------------------------');
            document.write(message.data.toString());
            document.write('\r\n');
            document.write("<br>");
            //}

            let createSessionRequest = {
                "jsonrpc": "2.0",
                "id": CREATE_SESSION_ID,
                "method": "createSession",
                "params": {
                    "cortexToken": authToken,
                    "headset": "INSIGHT-DB5F7AE5",
                    "status": "active"
                }
            }
            ws.send(JSON.stringify(createSessionRequest));
            ws.onmessage = function (message) {
                // if(JSON.parse(data)['id']==6){
                document.write('createSessionRequest RESULT --------------------------------');
                //document.write(message.data.toString());
                sessionId = JSON.parse(message.data)['result']['id'];
                document.write('\r\n');
                document.write("<br>");
                //}

                let subRequest = {
                    "jsonrpc": "2.0",
                    "method": "subscribe",
                    "params": {
                        "cortexToken": authToken,
                        "session": sessionId,
                        "streams": ["met"]
                    },
                    "id": SUB_REQUEST_ID
                };
                ws.send(JSON.stringify(subRequest));
                ws.onmessage = function (message) {
                    // if(JSON.parse(data)['id']==6){
                    document.write('subscribe RESULT --------------------------------');
                    document.write(message.data.toString());
                    document.write('\r\n');
                    document.write("<br>");
                    //}
                    ws.onmessage = function (message) {
                        // log stream data to file or console here
                        headsetValue = JSON.parse(message.data)["met"];
                        headsetTime = Date(JSON.parse(message.data)["time"] * 1000);
                        document.write("Values: " + headsetValue.toString());
                        document.write("<br>");
                        document.write("Time: " + headsetTime.toString());
                        document.write("<br>");
                    };
                };
            };
        };
    };
    ws.onclose = function () {
        // websocket is closed.
        alert("Connection is closed...");
    };
}
