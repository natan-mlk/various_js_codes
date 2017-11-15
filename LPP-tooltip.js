
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
 prodDescription = "<span id='spanName'>" + name + "</span>",
 prodPrice;

 if (oldPrice > promoPrice && promoPrice !== 0) {
            prodPrice = "<span class='promo-price'> " + promoPrice + " </span> <span class='old-price'>" + oldPrice + "</span>";
 } else {
            prodPrice = " <span>" + oldPrice + "</span>";
 }
        jQuery(this).attr("href", url);
 jQuery('.product-description').html(prodDescription);
 jQuery('.product-price').html(prodPrice);
 jQuery('.re-tooltip').css('width', (jQuery('#spanName').width()) + 25 + 'px');
 }
});

$svgLink.mouseleave(function () {
    jQuery('.re-tooltip').css('width', '');
});

//------------ CSS DO TEGO:

.absolute-svg {
position: absolute;
 top: 0;
 width: 100%;
}

.re-svg {
width: 100%;
 height: 100%;
 display: block;
}

.re-tooltip {
position: absolute // lub fixed - w zależności od miejsca zastosowania. Aktualnie "fixed" naprawia błąd występujący na bannerach wkładanych w kategorie. 
 overflow: hidden;
 height: auto;
 width: 0;
 background-color: white;
 z-index: 100;
 margin: 20px;
 color: black;
 font-size: 15px;
 display: flex;
 flex-direction: column;
 white-space: nowrap;
 text-transform: lowercase;
 box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.5);
 -webkit-transition: width 500ms ease-in-out;
 transition: width 500ms ease-in-out;
}

.product-description {
padding: 10px 10px 5px 10px;
 width: 230px;
 text-overflow: ellipsis;
 white-space: nowrap;
 overflow: hidden;
 &:first-letter {
text-transform: uppercase;
 }
}

.product-price {
padding: 0 10px 10px 10px;
}

.old-price {
text-decoration: line-through;
 color: grey;
}

// -------------- HTML DO TEGO:

<!--[if IE]>
<style>
 svg { display: none; }
</style>
<![endif]-->

<div class="re-tooltip">
    <div class="product-description"></div>
    <div class="product-price"></div>
</div>

<div class="absolute-svg"> 
<svg class="re-svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" 
  viewBox="0 0 370.41666 123.29583" 
  height="123.29583mm" 
  width="370.41666mm"> 
    <g transform="translate(0.75594729,-193.01875)"> 
      <a target="_blank" tooltipSku="SD821-MLC" class="svgLink"> 
        <path d="m 16.082033,315.78004 -1.870887,-35.01231 29.266014,-12.02712 80.7154,-6.1472 10.55714,52.91936 z" 
                  style="fill:rgba(0,0,0,0);stroke:none;stroke-width:0"></path> 
      </a> 
    </g> 
</svg> 
</div>
