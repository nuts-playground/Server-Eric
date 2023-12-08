module.exports = [
  {
    script: 'dist/main.js',
    name: 'server',
    exec_mode: 'cluster',
    instances: 2,
  },
];
