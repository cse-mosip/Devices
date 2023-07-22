const authRouteDocs = require('./auth.doc');

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
            ...authRouteDocs,
        }
    },
    apis: ["./routes/*.js"]
}

module.exports = documentation;