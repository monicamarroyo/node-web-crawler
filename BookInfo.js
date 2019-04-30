class BookInfo {
  static getDescription($) {
    let description = $("#bookDescription_feature_div > noscript").text();

    description = $("<textarea/>")
      .html(description)
      .text()
      .replace(/<[^>]*>/g, "")
      .trim()
      .replace(/\n|\r/g, "");
    return description ? description : "N/A";
  }

  static getPrice($) {
    let price;
    if ($("tr.print-list-price")) {
      $("tr.print-list-price")
        .children("td")
        .each(function() {
          if (
            $(this)
              .text()
              .includes("$")
          )
            return (price = $(this)
              .text()
              .trim(""));
          else return;
        });
    }
    if (price === undefined) {
      if ($("span.a-text-strike")) price = $("span.a-text-strike").text();
    }
    return price ? price : "N/A";
  }
  static getImgUrls($) {
    let imgUrl = [];
    $("#imgThumbs > div > img").each(function() {
      imgUrl.push({ img: $(this).attr("src") });
    });
    return imgUrl;
  }
  static getDimandWeight($, type) {
    let text;
    $("#productDetailsTable > tbody > tr > td > div > ul > li > b").each(
      function() {
        if (
          $(this)
            .text()
            .includes(type)
        ) {
          if (type === "Dimension") {
            text = $(this)
              .parent()
              .text()
              .replace("Product", "")
              .replace("Dimensions:", "")
              .replace("Package", "")
              .trim();
          } else {
            text = $(this)
              .parent()
              .text()
              .replace("Shipping Weight:", "")
              .replace("(View shipping rates and policies)", "")
              .trim("");
          }
        }
      }
    );

    return text ? text : "N/A";
  }
}

exports.BookInfo = BookInfo;
