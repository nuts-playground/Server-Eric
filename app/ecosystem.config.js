const dotenv = require('dotenv');
const path = require('path');
const result = dotenv.config({ path: `./.${process.env.NODE_ENV}.env` });

if (result.error) {
  throw result.error;
}

module.exports = [
  {
    script: 'dist/main.js',
    name: 'server',
    exec_mode: 'cluster',
    instances: 2,
    env: {
      NODE_ENV: process.env.NODE_ENV || 'production', // 기본값 설정
      ...result.parsed,
    },
  },
];