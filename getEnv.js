'use strict'

const fs = require('fs')

const dotEnvExists = fs.existsSync('.env')
if (dotEnvExists) {
    console.log('getEnv.js: .env exists')
    process.exit()
}

//On Google Cloud Platform authentification is handled for us
const gcs = require('@google-cloud/storage')()

const bucketName = 'envvars_planeat'
console.log(`Downloading .env from bucket "${bucketName}"`)
gcs
    .bucket(bucketName)
    .file('.env')
    .download({ destination: '.env' })
    .then(() => {
        console.info('getEnv.js: .env downloaded successfully')
    })
    .catch(e => {
        console.error(`getEnv.js: There was an error: ${JSON.stringify(e, undefined, 2)}`)
    })