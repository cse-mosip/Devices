
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
                        env: {
                            type: "string",
                            description: "Target environment (Staging, Development, Pre-production, or Production)",
                            example: "Staging"
                        },
                        purpose: {
                            type: "string",
                            description: "Auth or Registration",
                            example: "Auth"
                        },
                        specVersion: {
                            type: "string",
                            description: "Expected version of the MDS spec",
                            example: "0.9.5"
                        },
                        timeout: {
                            type: "integer",
                            description: "Timeout for capture",
                            example: 10000
                        },
                        captureTime: {
                            type: "string",
                            description: "Capture request time in ISO format",
                            example: "2023-07-22T14:44:22Z"
                        },
                        transactionId: {
                            type: "string",
                            description: "Transaction Id for the current capture",
                            example: "Trans123456"
                        },
                        bio: {
                            type: "array",
                            description: "Array of biometric data",
                            items: {
                                type: "object",
                                properties: {
                                    type: {
                                        type: "string",
                                        description: "Type of the biometric data",
                                        example: "Finger"
                                    },
                                    count: {
                                        type: "string",
                                        description: "Finger/Iris count, in case of face max, is set to 1",
                                        example: 1
                                    },
                                    bioSubType: {
                                        type: "array",
                                        description: "Array of subtypes",
                                        items: {
                                            type: "string",
                                            example: "Left IndexFinger"
                                        }
                                    },
                                    exception: {
                                        type: "string",
                                        description: "",
                                        example: null
                                    },
                                    requestedScore: {
                                        type: "string",
                                        description: "Expected quality score that should match to complete a successful capture",
                                        example: "40"
                                    },
                                    deviceId: {
                                        type: "string",
                                        description: "Internal Id",
                                        example: "4857034"
                                    },
                                    deviceSubId: {
                                        type: "string",
                                        description: "Specific device Sub Id",
                                        example: "0"
                                    },
                                    previousHash: {
                                        type: "string",
                                        description: "Hash of the previous block",
                                        example: ""
                                    }
                                },
                                required: ["type", "count", "bioSubType", "requestedScore", "deviceId"]
                            }
                        },
                        customerOpts: {
                            type: "object",
                            description: "Custom options (if any)",
                            example: null
                        },
                        domainUri: {
                            type: "string",
                            description: "URI of the auth server",
                            example: "http://mosip.com"
                        }
                    },
                    required: ["env", "purpose", "specVersion", "timeout", "captureTime", "domainUri", "transactionId", "bio"]
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




