const port = process.env.PORT || 5000;

const documentation = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MOSIP Fingerprint Capture API",
            version: "1.0.0",
            description: "Background server to register and verify fingerprints"
        },
        servers: [
            {
                url: "http://127.0.0.1:" + port
            }
        ],
        tags: [
            {
                name: "Auth",
                description: "Authentication Routes"
            },
            {
                name: "Register",
                description: "Registration Routes"
            }
        ],
        paths: {
            "/data/testCapture": {
                get: {
                    tags: ["Auth"],
                }
            },
            "/data/getInfo": {
                get: {
                    tags: ["Auth"],
                }
            },
            "/data/testDevice": {
                post: {
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
            }
        }
    },
    apis: ["./routes/*.js"]
}

module.exports = documentation;