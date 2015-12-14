(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var services = require('./servicesList');
var calculatorModule = (function () {
    function init() {
        var modalLink = document.querySelector('[data-popup-id="3"]');
        var closeModalBtn = document.querySelector('.js-close-result');
        var orderCallModal = document.querySelector('a[data-popup-id="2"]');

        var vm = new Vue({
            el: '.js-calculator',
            data: {
                generalCleanShow: false,
                afterConstructShow: false,
                services: services,
                result: null,
                wholePrice: null
            },

            computed: {
                isCalculationDisabled: function isCalculationDisabled() {
                    var services = this.services;
                    var key;

                    for (key in services) {
                        if (services.hasOwnProperty(key)) {
                            if (parseInt(services[key].qty, 10)) {
                                return false;
                            }
                        }
                    }

                    return true;
                }
            },

            methods: {
                toggleGeneralCleanInfo: function toggleGeneralCleanInfo() {
                    this.generalCleanShow = !this.generalCleanShow;
                },

                toggleAfterConstructInfo: function toggleAfterConstructInfo() {
                    this.afterConstructShow = !this.afterConstructShow;
                },

                redirectToOrder: function redirectToOrder() {
                    closeModalBtn.click();
                    orderCallModal.click();
                },

                calculate: function calculate() {
                    var services = this.services;
                    var key;
                    var result = [];
                    var wholePrice = 0;
                    var currentService;
                    var currentPrice;

                    for (key in services) {
                        if (services.hasOwnProperty(key)) {
                            currentService = services[key];
                            if (currentService.qty) {
                                currentPrice = currentService.getPrice();

                                result.push({
                                    qty: currentService.qty,
                                    unit: currentService.unit,
                                    name: currentService.name,
                                    price: currentPrice
                                });

                                wholePrice += currentPrice;
                                currentService.qty = '';
                            }
                        }
                    }

                    this.result = result;
                    this.wholePrice = wholePrice;

                    modalLink.click();
                    return result;
                }
            }
        });
    }

    return {
        init: init
    };
})();

module.exports = calculatorModule;

},{"./servicesList":3}],2:[function(require,module,exports){
'use strict';

var calculator = require('./calculatorViewModel.js');

function ready(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        window.onload = fn;
    }
}

function main() {
    calculator.init();
}

ready(main);

},{"./calculatorViewModel.js":1}],3:[function(require,module,exports){
'use strict';

function getPriceForFour(coefList, qty) {
    var low = coefList[0];
    var medium = coefList[1];
    var high = coefList[2];
    var veryHigh = coefList[3];

    if (!qty) {
        return 0;
    }

    if (qty <= 50) {
        return qty * low;
    }

    if (qty > 50 && qty <= 200) {
        return qty * medium;
    }

    if (qty > 200 && qty <= 500) {
        return qty * high;
    }

    if (qty > 500) {
        return qty * veryHigh;
    }
}

function getPriceForTwo(coefList, boundary, qty) {
    var low = coefList[0];
    var high = coefList[1];

    if (!qty) {
        return 0;
    }

    if (qty <= boundary) {
        return qty * low;
    } else {
        return qty * high;
    }
}

var services = {
    generalClean: {
        qty: 0,
        name: 'Генеральная уборка',
        unit: 'кв. м.',
        getPrice: function getPrice() {
            var qty = this.qty;
            var coefList = [22, 18, 15, 12];

            return getPriceForFour(coefList, qty);
        }
    },

    afterConstructionClean: {
        qty: 0,
        name: 'Уборка после ремонта и строительства',
        unit: 'кв. м.',
        getPrice: function getPrice() {
            var qty = this.qty;
            var coefList = [23, 19, 16, 13];

            return getPriceForFour(coefList, qty);
        }
    },

    windowInClean: {
        qty: 0,
        name: 'Мойка окон с середины',
        unit: 'кв. м.',
        getPrice: function getPrice() {
            var qty = this.qty;
            var coefList = [6, 5];
            var boundary = 50;

            return getPriceForTwo(coefList, boundary, qty);
        }
    },

    windowOutClean: {
        qty: 0,
        name: 'Мойка окон снаружи',
        unit: 'кв. м.',
        getPrice: function getPrice() {
            var qty = this.qty;
            var coefList = [8, 7];
            var boundary = 50;

            return getPriceForTwo(coefList, boundary, qty);
        }
    },

    shopWindowClean: {
        qty: 0,
        name: 'Мойка витрин',
        unit: 'кв. м.',
        getPrice: function getPrice() {
            var qty = this.qty;
            var coefList = [7, 6];
            var boundary = 50;

            return getPriceForTwo(coefList, boundary, qty);
        }
    },

    carpetDryClean: {
        qty: 0,
        name: 'Химическая чистка ковровых покрытий',
        unit: 'кв. м.',
        getPrice: function getPrice() {
            var qty = this.qty;
            var coefList = [8, 7];
            var boundary = 500;

            return getPriceForTwo(coefList, boundary, qty);
        }
    },

    sofaDryClean: {
        qty: 0,
        name: 'Химическая чистка диванов',
        unit: 'мест(а)',
        getPrice: function getPrice() {
            var qty = this.qty;
            var coefList = [45, 35];
            var boundary = 5;

            return getPriceForTwo(coefList, boundary, qty);
        }
    },

    armchairDryClean: {
        qty: 0,
        name: 'Химическая чистка кресел',
        unit: 'шт.',
        getPrice: function getPrice() {
            var qty = this.qty;
            var coefList = [45, 40];
            var boundary = 5;

            return getPriceForTwo(coefList, boundary, qty);
        }
    },

    chairDryClean: {
        qty: 0,
        name: 'Химическая чистка стульев',
        unit: 'шт.',
        getPrice: function getPrice() {
            var qty = this.qty;
            var coefList = [20, 15];
            var boundary = 70;

            return getPriceForTwo(coefList, boundary, qty);
        }
    },

    mattressDryClean: {
        qty: 0,
        name: 'Химическая чистка матрасов',
        unit: 'шт.',
        getPrice: function getPrice() {
            var qty = this.qty;
            var constPrice = 150;

            return qty * constPrice;
        }
    },

    floorDryClean: {
        qty: 0,
        name: 'Химическая чистка пола (ламинат, кафель, паркет)',
        unit: 'кв. м.',
        getPrice: function getPrice() {
            var qty = this.qty;
            var coefList = [7, 6];
            var boundary = 500;

            return getPriceForTwo(coefList, boundary, qty);
        }
    },

    floorDryCleanWithCoating: {
        qty: 0,
        name: 'Химическая чистка пола с нанесением защитного полимерного покрытия',
        unit: 'кв. м.',
        getPrice: function getPrice() {
            var qty = this.qty;
            var coefList = [35, 30];
            var boundary = 500;

            return getPriceForTwo(coefList, boundary, qty);
        }
    },

    marblePolishing: {
        qty: 0,
        name: 'Шлифовка / полировка мрамора и гранита',
        unit: 'кв. м.',
        getPrice: function getPrice() {
            var qty = this.qty;
            var constPrice = 130;

            return qty * constPrice;
        }
    },

    highRiseCleaning: {
        qty: 0,
        name: 'Высотно-верхолазные работы',
        unit: 'кв. м.',
        getPrice: function getPrice() {
            var qty = this.qty;
            var constPrice = 8;

            return qty * constPrice;
        }
    }
};

module.exports = services;

},{}]},{},[2])


//# sourceMappingURL=calculator.js.map
