
const postCapture = {
    tags: ["Authentication"],
    description: "The capture request would be used to capture a biometric from MOSIP-compliant devices by the applications. The captured call will respond with success to only one call at a time. So, in case of a parallel call, the device info details are sent with the status 'Busy'.",
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        deviceSubId: {
                            type: "string",
                            description: "Specific device Sub Id",
                            example: "2"
                        },
                    },
                    required: ["deviceSubId"]
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
                        example: {
                            "env": "Target environment",
                            "purpose": "Auth or Registration",
                            "specVersion": "Expected version of the MDS spec",
                            "timeout": "Timeout for capture",
                            "captureTime": "Capture request time in ISO format",
                            "domainUri": "URI of the auth server",
                            "transactionId": "Transaction Id for the current capture",
                            "bio": [
                              {
                                "type": "Type of the biometric data",
                                "count":  "Finger/Iris count, in case of face max, is set to 1",
                                "bioSubType": ["Array of subtypes"],
                                "requestedScore": "Expected quality score that should match to complete a successful capture",
                                "deviceId": "Internal Id",
                                "deviceSubId": "Specific Device Sub Id",
                                "previousHash": "Hash of the previous block"
                              }
                            ],
                            "customOpts": {
                              //Max of 50 key-value pairs. This is so that vendor-specific parameters can be sent if necessary. The values cannot be hardcoded and have to be configured by the apps server and should be modifiable upon need by the applications. Vendors are free to include additional parameters and fine-tuning parameters. None of these values should go undocumented by the vendor. No sensitive data should be available in the customOpts.
                            }
                        }
                    }
                }
            }
        },
        400: {
            description: "Bad Request"
        }
    }
}


const authDocs = {
    "/auth/capture": {
        post: postCapture
    },
}

module.exports = authDocs;




