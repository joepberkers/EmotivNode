async function WebSocketTest() {

    let headsetValue;
    let headsetTime;

    if ("WebSocket" in window) {
        //alert("WebSocket is supported by your Browser!");
        // Let us open a web socket
        const REQUEST_ACCESS_ID=1;
        const CREATE_SESSION_ID = 5;
        const SUB_REQUEST_ID = 6;


        let ws = new WebSocket("wss://localhost:6868/");
        let authToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNvbS5qb2VwYi5maXJzdF90ZXN0IiwiYXBwVmVyc2lvbiI6IjEuMC4wIiwiZXhwIjoxNjcxMTM4Mzc3LCJuYmYiOjE2NzA4NzkxNzcsInVzZXJJZCI6ImYxYzViM2U4LWYyZDEtNGNlMy04Mjc0LWQ4ZTE3MTEwOWIyYSIsInVzZXJuYW1lIjoiam9lcGIiLCJ2ZXJzaW9uIjoiMi4wIn0.bmgUc0PoF2jOTPB2xBFonubt-DHiHQDbrQy2aIBxSMI";
        let sessionId="";


        let requestAccessRequest = {
            "jsonrpc": "2.0",
            "method": "requestAccess",
            "params": {
                "clientId": "hpiGTc2dEjju8mBllnDbdgdQ9cqBjK57lDB8OIPM",
                "clientSecret": "o11FLk5BIkCuGWUyZQ5a3CERsWpJpkSaOFV50NXCwKMd5gTyfjS5rZrSNSHjIXqmlBlNZ3kycGxGuNhXeac2Ozxd1ICkekHyInlX8Jp7s99V1p1v2GyX4Ji65joGLWMd"
            },
            "id": REQUEST_ACCESS_ID
        };


        ws.onopen=await function() {


            // Web Socket is connected, send data using send()
            //ws.send();
            //alert("Message is sent...");
            ws.send(JSON.stringify(requestAccessRequest));
            ws.onmessage = function (data) {
                // if(JSON.parse(data)['id']==6){
                document.write('requestAccessRequest RESULT --------------------------------');
                document.write(data.data.toString());
                document.write('\r\n');
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
                ws.onmessage = function (data) {
                    // if(JSON.parse(data)['id']==6){
                    document.write('createSessionRequest RESULT --------------------------------');
                    document.write(data.data.toString());
                    sessionId = JSON.parse(data.data)['result']['id'];
                    document.write('\r\n');
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
                    ws.onmessage = function (data) {
                        // if(JSON.parse(data)['id']==6){
                        document.write('subscribe RESULT --------------------------------');
                        document.write(data.data.toString());
                        document.write('\r\n');
                        //}
                        ws.onmessage = function (data) {
                            // log stream data to file or console here

                            headsetValue=JSON.parse(data.data)["met"];
                            headsetTime=JSON.parse(data.data)["time"];
                            document.writeln("Values: " + headsetValue.toString());
                            document.writeln("Time: " + headsetTime.toString());
                        };
                    };
                };
            };

        };




        ws.onclose = function() {

            // websocket is closed.
            alert("Connection is closed...");
        };
    } else {

        // The browser doesn't support WebSocket
        alert("WebSocket NOT supported by your Browser!");
    }
}