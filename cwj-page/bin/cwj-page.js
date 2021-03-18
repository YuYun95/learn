#!/usr/bin/env node
const config = require('../lib')
const webpack = require('webpack')
const compiler = webpack(config, (err, state) => {
  if (err) throw err
  console.log('编译成功')
})
