'use strict';

var services = require('./servicesList');
var calculatorModule = (function () {
    function init(){
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
              isCalculationDisabled: function () {
                  var services = this.services;
                  var key;

                  for(key in services){
                      if(services.hasOwnProperty(key)){
                          if(parseInt(services[key].qty, 10)){
                              return false;
                          }
                      }
                  }

                  return true;
              }
            },

            methods: {
                toggleGeneralCleanInfo: function () {
                    this.generalCleanShow = !this.generalCleanShow;
                },

                toggleAfterConstructInfo: function () {
                    this.afterConstructShow = !this.afterConstructShow
                },

                redirectToOrder: function () {
                    closeModalBtn.click();
                    orderCallModal.click();
                },

                calculate: function () {
                    var services = this.services;
                    var key;
                    var result = [];
                    var wholePrice = 0;
                    var currentService;
                    var currentPrice;

                    for(key in services){
                        if(services.hasOwnProperty(key)){
                            currentService =  services[key];
                            if(currentService.qty){
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
        })
    }

    return {
        init: init
    };
})();

module.exports = calculatorModule;