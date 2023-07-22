const getInfo = {
    tags: ["Auth"],
}

const getCapture = {
    tags: ["Auth"],
}

const postDiscover = {
    tags: ["Auth"],
    description: "Discovery will return the appId of the discovered items. Users will be given a choice to choose one of the discovered SBI app. The selected app responds back to the intent using the default intent callback functionality.",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "array",
                        example: [
                            {
                                "deviceId": "Internal ID",
                                "deviceStatus": "Device status",
                                "certification": "Certification level",
                                "serviceVersion": "Device service version",
                                "deviceSubId": ["Array of supported device sub Ids"],
                                "callbackId": "Base URL to reach the device",
                                "digitalId": "Unsigned Digital ID of the device",
                                "deviceCode": "Same as serialNo in digital ID",
                                "specVersion": ["Array of supported MDS specification version"],
                                "purpose": "Auth or Registration or empty if not registered",
                                "error": {
                                  "errorCode": "101",
                                  "errorInfo": "Invalid JSON Value Type For Discovery.."
                                }
                              },
                        ]
                    }
                }
            }
        },
        400: {
            description: ""
        }
    }
}

const authDocs = {
    "/auth/info": {
        get: getInfo
    },
    "/auth/capture": {
        get: getCapture
    },
    "/auth/discover": {
        post: postDiscover
    },
}

module.exports = authDocs;




