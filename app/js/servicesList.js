'use strict';

function computePriceForFourRanges(priceList, qty) {
    var low = priceList[0];
    var medium = priceList[1];
    var high = priceList[2];
    var veryHigh = priceList[3];

    if(!qty){
        return 0;
    }

    if (qty <= 50) {
        return qty * low;
    } else  if (qty > 50 && qty <= 200) {
        return qty * medium;
    } else if (qty > 200 && qty <= 500) {
        return qty * high;
    } else if (qty > 500) {
        return qty * veryHigh;
    }
}

function computePriceForTwoRanges(priceList, boundary, qty){
    var low = priceList[0];
    var high = priceList[1];

    if(!qty){
        return 0;
    } else if (qty <= boundary) {
        return qty * low;
    } else {
        return qty * high;
    }
}

var  services = {
    generalClean: {
        qty: 0,
        name: 'Генеральная уборка',
        unit: 'кв. м.',
        getPrice: function () {
            var qty = this.qty;
            var priceList = [22, 18, 15, 12];

            return computePriceForFourRanges(priceList, qty);
        }
    },

    afterConstructionClean: {
        qty: 0,
        name: 'Уборка после ремонта и строительства',
        unit: 'кв. м.',
        getPrice: function () {
            var qty = this.qty;
            var priceList = [23, 19, 16, 13];

            return computePriceForFourRanges(priceList, qty);
        }
    },

    windowInClean: {
        qty: 0,
        name: 'Мойка окон с середины',
        unit: 'кв. м.',
        getPrice: function () {
            var qty = this.qty;
            var priceList = [6, 5];
            var boundary = 50;

            return computePriceForTwoRanges(priceList, boundary, qty);
        }
    },

    windowOutClean: {
        qty: 0,
        name: 'Мойка окон снаружи',
        unit: 'кв. м.',
        getPrice: function () {
            var qty = this.qty;
            var priceList = [8, 7];
            var boundary = 50;

            return computePriceForTwoRanges(priceList, boundary, qty);
        }
    },

    shopWindowClean: {
        qty: 0,
        name: 'Мойка витрин',
        unit: 'кв. м.',
        getPrice: function () {
            var qty = this.qty;
            var priceList = [7, 6];
            var boundary = 50;

            return computePriceForTwoRanges(priceList, boundary, qty);
        }
    },

    carpetDryClean: {
        qty: 0,
        name: 'Химическая чистка ковровых покрытий',
        unit: 'кв. м.',
        getPrice: function () {
            var qty = this.qty;
            var priceList = [8, 7];
            var boundary = 500;

            return computePriceForTwoRanges(priceList, boundary, qty);
        }
    },

    sofaDryClean: {
        qty: 0,
        name: 'Химическая чистка диванов',
        unit: 'посад. мест(а)',
        getPrice: function () {
            var qty = this.qty;
            var priceList = [45, 35];
            var boundary = 5;

            return computePriceForTwoRanges(priceList, boundary, qty);
        }
    },

    armchairDryClean: {
        qty: 0,
        name: 'Химическая чистка кресел',
        unit: 'шт.',
        getPrice: function () {
            var qty = this.qty;
            var priceList = [45, 40];
            var boundary = 5;

            return computePriceForTwoRanges(priceList, boundary, qty);
        }
    },

    chairDryClean: {
        qty: 0,
        name: 'Химическая чистка стульев',
        unit: 'шт.',
        getPrice: function () {
            var qty = this.qty;
            var priceList = [20, 15];
            var boundary = 70;

            return computePriceForTwoRanges(priceList, boundary, qty);
        }
    },

    mattressDryClean: {
        qty: 0,
        name: 'Химическая чистка матрасов',
        unit: 'шт.',
        getPrice: function () {
            var qty = this.qty;
            var constPrice = 150;

            return qty * constPrice;
        }
    },

    floorDryClean: {
        qty: 0,
        name: 'Химическая чистка пола (ламинат, кафель, паркет)',
        unit: 'кв. м.',
        getPrice: function () {
            var qty = this.qty;
            var priceList = [7, 6];
            var boundary = 500;

            return computePriceForTwoRanges(priceList, boundary, qty);
        }
    },

    marblePolishing: {
        qty: 0,
        name: 'Шлифовка / полировка мрамора и гранита',
        unit: 'кв. м.',
        getPrice: function () {
            var qty = this.qty;
            var constPrice = 130;

            return qty * constPrice;
        }
    },

    highRiseCleaning: {
        qty: 0,
        name: 'Высотно-верхолазные работы',
        unit: 'кв. м.',
        getPrice: function () {
            var qty = this.qty;
            var constPrice = 8;

            return qty * constPrice;
        }
    }
};

module.exports = services;

