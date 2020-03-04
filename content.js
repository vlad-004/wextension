$(document).ready(function () {
    chrome.storage.sync.get(['status'], function (result) {
       if (result.status === true) {
           let elements = $('.search-result-gridview-items > li');
           elements.each(function () {
               let parentBlock = $(this).find('.product-price-with-fulfillment').parent();
               $.ajax({
                   url: 'https://www.walmart.com' + $(this).find('.product-title-link').attr('href'),
                   dataType: "html",
                   type: "GET"
               }).done(function (html) {
                   showBrand(html, parentBlock);
                   let jsonFromScript = JSON.parse($(html).find('script#item').text());
                   let images = jsonFromScript.item.product.buyBox.products[0].images;
                   parentBlock.append("<p style='color: red'>photo count:" + images.length + " </p>");
                   parentBlock.css('height', 'auto')
               });
           });
       }
    });

    function showBrand(html, parentBlock) {
        let brandName = $(html).find('.prod-brandName > span').text();
        if (brandName.length > 0) {
            parentBlock.append("<p style='color: red'>Brand:" + brandName + " </p>");
        } else {
            parentBlock.append("<p style='color: red'>Brand: -- </p>");
        }
    }
});