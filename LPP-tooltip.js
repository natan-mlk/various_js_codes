
// samo przesuwanie tooltipa za kursorem
jQuery(document).bind('mousemove', function (e) {
    jQuery('.re-tooltip').css({
        left: e.pageX + 8,
 top: e.pageY + 10
 });
});


//zmienna $svgLink przechowuje mi wszytkie linki o klasie svgLink
var $svgLink = jQuery('.svgLink'),
 allTooltipProducts = [],
 allProductsMap,
 tooltipSku;


//ta funkcja dla każdego elementu znajdującego się pod zmienną $svgLink wyciąga z niego zawartość atrybutu tooltipSku i wkłada 
//go do zdeklarowanej wcześniej tablicy allTooltipProducts
(function () {
    $svgLink.each(function () {
        allTooltipProducts.push(jQuery(this).attr("tooltipSku"))
    });
    
 // wywołujemy metodę zawartą w obiektcie Librarian dzięki której otrzymujemy JSONA w ktróeym pos adresem 
 // .content.products, jest tablica w której są obiekty np:
 // products : [{…}, {…}]  gdzie 0 to jest {id: 1881455, name: "Błyszcząca koszulka", sku: "SI634-59X", price: 59.99, promo_price: 0, …}
 // następnie tę tablicę poddaje metodzie reduce, która .....
 allProductsMap = Librarian.checkProducts({"products": allTooltipProducts}).content.products.reduce(
        function (previousObj, arrayItem) {
        previousObj[arrayItem.sku] = arrayItem;
 return previousObj;
 }, {});
})();

//na mouseover dla dowolnego elementu przechowywanego przez zmienną $svgLink...
$svgLink.mouseover(function () {

//bierz zawartość atrybutu tooltipSku TEGO nad czym mam mouseover
 tooltipSku = jQuery(this).attr("tooltipSku");
 
 //
 var outcome = allProductsMap[tooltipSku],
 url = outcome.url;
 
 if (url !== undefined) {
 $svgLink.attr("href");
 var name = outcome.name,
 oldPrice = outcome.price,
 promoPrice = outcome.promo_price,
 prodDescription = "<span>" + name + "</span>",
 prodPrice;

 if (oldPrice > promoPrice && promoPrice !== 0) {
            prodPrice = "<span class='promo-price'> " + promoPrice + " </span> <span class='old-price'>" + oldPrice + "</span>";
 } else {
            prodPrice = " <span>" + oldPrice + "</span>";
 }
        jQuery(this).attr("href", url);
 jQuery('.product-description').html(prodDescription);
 jQuery('.product-price').html(prodPrice);
 jQuery('.re-tooltip').css('width', (name.length * 10) + 'px').css('max-width', '250px');
 }
});

$svgLink.mouseleave(function () {
    jQuery('.re-tooltip').css('width', '');
});
