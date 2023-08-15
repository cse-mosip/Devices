const dataRouteDocs = require('./data.doc');
const authRouteDocs = require('./auth.doc');
const regRouteDocs = require('./reg.doc');

const port = process.env.PORT || 7291;

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
                name: "Data",
                description: "Device Data Routes"
            },
            {
                name: "Registration",
                description: "Registration Routes"
            },
            {
                name: "Authentication",
                description: "Authentication Routes"
            },
        ],
        paths: {
            ...dataRouteDocs,
            ...authRouteDocs,
            ...regRouteDocs
        }
    },
    apis: ["./routes/*.js"]
}

module.exports = documentation;