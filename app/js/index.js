'use strict';

var calculator = require('./calculatorViewModel.js');

function ready(fn) {
    if (document.readyState !== 'loading'){
        fn();
    } else {
        window.onload = fn;
    }
}

function main(){
    calculator.init();
}

ready(main);
