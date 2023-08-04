const getInfo = {
    tags: ["Data"],
    description: "The device information API would be used to identify the MOSIP-compliant devices and their status by the applications.",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "array",
                        example: [
                            {
                              "deviceInfo": {
                                "deviceStatus": "Current status",
                                "deviceId": "Internal ID",
                                "firmware": "Firmware version",
                                "certification": "Certification level",
                                "serviceVersion": "Device service version",
                                "deviceSubId": ["Array of supported device sub Ids"],
                                "callbackId": "Baseurl to reach the device",
                                "digitalId": "Signed digital id as described in the digital id section of this document.",
                                "deviceCode": "Same as serialNo in digital ID",
                                "env": "Target environment",
                                "purpose": "Auth or Registration",
                                "specVersion": ["Array of supported MDS specification version"],
                              },
                              "error": {
                                "errorCode": "101",
                                "errorInfo": "Invalid JSON Value "
                              }
                            },
                          ]
                    }
                }
            }
        },
        400: {
            description: "Bad Request"
        },
        500: {
            description: "Custom Error Code"
        }
    }
}

const postDiscover = {
    tags: ["Data"],
    description: "Discovery will return the appId of the discovered items. Users will be given a choice to choose one of the discovered SBI app. The selected app responds back to the intent using the default intent callback functionality.",
    parameters: [
        {
          name: "port",
          in: "query",
          type: "integer",
          required: true,
          example: 4501,
          description: "Should be either 4501(for L0 devices) or 4502(for L1 devices)"
        }
    ],
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        type: {
                            type: "string",
                            description: "type of the device",
                            example: "Biometric Device"
                        }
                    }
                }
            }
        }
    },
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
            description: "Bad Request"
        }
    }
}

const dataDocs = {
    "/info": {
        get: getInfo
    },
    "/discover": {
        post: postDiscover
    },
}

module.exports = dataDocs;




