var context = require.context('.', true, /\.spec\.js$/);
context.keys().forEach(context);

console.log('KEYS:::...', context.keys());
