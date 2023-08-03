const postRCapture = {
    tags: ["Registration"],
    description: "The registration client application will discover the device. Once the device is discovered the status of the device is obtained with the device info API. During the registration, the registration client sends the RCAPTURE API and the response will provide the actual biometric data in a digitally signed non-encrypted form. When the Device Registration Capture API is called the frames should not be added to the stream. The device is expected to send the images in ISO format.\n\tThe requestedScore is on a scale of 1-100 (NFIQ v2.0 for fingerprints). So, in cases where you have four fingers the average of all will be considered for the capture threshold. The device would always send the best frame during the capture time even if the requested score is not met.\n\tThe API is used by devices that are compatible with the registration module. This API should not be supported by devices that are compatible with authentication.",
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
                        description: "This is the decoded capture information for reference. NOT the actual returned value from the request",
                        type: "array",
                        example: [
                            {
                                "specVersion": "MDS Spec version",
                                "data": {
                                    "digitalId": "Digital id of the device as per the Digital Id definition..",
                                    "bioType": "Biometric type",
                                    "deviceCode": "Same as serialNo in digital ID",
                                    "deviceServiceVersion": "MDS version",
                                    "bioSubType": "Left IndexFinger",
                                    "purpose": "Auth or Registration",
                                    "env": "Target environment",
                                    "bioValue": "base64urlencoded biometrics (ISO format)",
                                    "transactionId": "Unique transaction id sent in request",
                                    "timestamp": "2019-02-15T10:01:57Z",
                                    "requestedScore": "Floating point number to represent the minimum required score for the capture. This ranges from 0-100.",
                                    "qualityScore": "Floating point number representing the score for the current capture. This ranges from 0-100."
                                },
                                "hash": "sha256 in hex format in upper case (previous 'hash' + sha256 hash of the current biometric ISO data)",    
                                "error": {
                                    "errorCode": "101",
                                    "errorInfo": "Invalid JSON Value Type For Discovery.. ex: {type: 'Biometric Device' or 'Finger' or 'Face' or 'Iris' } "
                                }
                            },
                            {
                                "specVersion": "MDS Spec version",
                                "data": {
                                    "deviceCode": "Same as serialNo in digital ID",
                                    "bioType": "Finger",
                                    "digitalId": "Digital id of the device as per the Digital Id definition.",
                                    "deviceServiceVersion": "MDS version",
                                    "bioSubType": "Left MiddleFinger",
                                    "purpose": "Auth or Registration",
                                    "env": "Target environment",
                                    "bioValue": "base64urlencoded extracted biometric (ISO format)",
                                    "transactionId": "Unique transaction id sent in request",
                                    "timestamp": "2019-02-15T10:01:57Z",
                                    "requestedScore": "Floating point number to represent the minimum required score for the capture. This ranges from 0-100",
                                    "qualityScore": "Floating point number representing the score for the current capture. This ranges from 0-100"
                                },
                                "hash": "sha256 in hex format in upper case (previous 'hash' + sha256 hash of the current biometric ISO data)",
                                "error": {
                                    "errorCode": "101",
                                    "errorInfo": "Invalid JSON Value Type For Discovery.. ex: {type: 'Biometric Device' or 'Finger' or 'Face' or 'Iris' }"
                                }
                            }
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

const regDocs = {
    "/reg/rcapture": {
        post: postRCapture
    },
}

module.exports = regDocs;