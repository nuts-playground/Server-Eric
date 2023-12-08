module.exports = [
  {
    script: 'dist/app.js',
    name: 'nest-app',
    exec_mode: 'cluster',
    instances: 2,
  },
];
