'use strict';

const http    = require('http')
const util    = require('util')
const url     = require('url')
const fs      = require('fs')
const _static = require('node-static')

let srv = new _static.Server('./dist')
let app   = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname
  return req
    .addListener('end', () => { srv.serve(req, res) })
    .resume()
})

app.listen(process.env.PORT || 9000, () => {
  console.log('Server running', `http://127.0.0.1:${process.env.PORT||9000}`)
})
