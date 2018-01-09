(function($) {

    var localData = $(document.getElementById('dataJson')).data('microsite');

    function lookbookActions() {
        var products = [];
        //tworzę tablicę, ktora zawiera obiekty zawierające sety i ich SKU
        localData.products.each(function (data) {
            if (data.product) {
                $.each(data.product, function (pos, skuData) {
                    if (Array.isArray(skuData)) {
                        skuData.forEach(function (sku) {
                            products.push(sku);
                            if (data.set) { //to jest to co wpisuję w tablicy jako set-1, set-2 itd
                                $('.' + data.set).append('<li class=sku-' + sku + ' data-sku=' + sku + '/>');
                            }
                        });
                    }
                });
            }
        });
        // tablicę products uzupełniam wszystkimi SKU jakie występują na stronie
        if (products.length) {
            var response = Librarian.checkProducts({"products": products});
            if (response && response.status) {
                if (response.content.products) {
                    buildList(localData.products, response.content.products);
                }
            }
        }
    }

    var buildList = function (localData, products) {
        products.each(function (product) {
            generateHtml(product);
        });
    };

    var generateHtml = function (product) {
        var html = '',
            old = product.promo_price > 0 ? "old" : "";

        //stworzenie ceny lub/i ceny promocyjnej
        function makePrice() {
            if (product.promo_price) {
                //wydzielenie ceny po i przed przecinkiem
                var promoPrice = product.promo_price.toString(),
                    promoPriceArray = [],
                    promoPriceString = promoPrice.split('.');
                for (var i = 0; i < promoPriceString.length; i++) {
                    promoPriceArray.push(promoPriceString[i]);
                }
                html += '<span class="priceProductPromo"> ' + promoPriceArray[0] + '<sup>.' + promoPriceArray[1] + '</sup></span>';
            }
            //wydzielenie ceny po i przed przecinkiem
            var regularPrice = product.price.toString(),
                priceArray = [],
                priceString = regularPrice.split('.');
            for (var j = 0; j < priceString.length; j++) {
                priceArray.push(priceString[j]);
            }

            html += ' <span class="priceProduct ' + old + '">' + priceArray[0] + '<sup>.' + priceArray[1] + '</sup></span>';
            html += ' <span class="currencyProduct">' + product.currency + '</span>';

        }

        if (!!localData.isCommercial) {
            var available = '';

            //sprawdzenie czy produkt jest dostępny
            if (product.avv) {
                available = ' available';
            } else {
                available = ' not-available';
            }

            //ustawienie linku i nazwy
            html += '<a class="linkProduct' + available + '" href="' + product.url + '" target="_blank">';
            html += '&nbsp;<span class="nameProduct">' + product.name + ' </span>';

            //sprawdzenie czy kod kraju jest różny od re/en/
            if ($('#dataJson').data('microsite').cc !== 'ZZ') {
                makePrice();
            }
            html += '</a> /&nbsp;';
        } else {
            //ustawienie linku i nazwy
            html += '<a class="linkProduct" href="' + product.url + '" target="_blank">';
            html += '&nbsp;<span class="nameProduct">' + product.name + ' </span>';
            if ($('#dataJson').data('microsite').cc !== 'ZZ') {
                makePrice();
            }
            html += '</a> /&nbsp;';
        }
        //dołączenie ciągu htmla
        var elem = '.listProduct .sku-' + product.sku;
        $(elem).addClass('buyProduct').append(html);
        $(elem).removeClass('sku-' + product.sku);
    };

    $(document).ready(function () {
        lookbookActions();

        $('.unavailable').on('click', function (event) {
            event.preventDefault();
        });
    });
})(jQuery);

// LOADER
jQuery(window).load(function () {
jQuery('.wait').fadeOut();
})
