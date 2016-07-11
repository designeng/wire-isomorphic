import page from './page.js';

console.log("TEST");

if (module.hot) {
    module.hot.accept('./page.js', () => {
        require('./page.js');
    })
}