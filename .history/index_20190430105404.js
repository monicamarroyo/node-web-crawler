var axios = require("axios");
var cheerio = require("cheerio");
var fs = require("fs");
const { Book } = require("./BookData");
const { Product } = require("./ProductData");
const { BookInfo } = require("./BookInfo");
const baseURL = "https://www.amazon.com";
const searchURL =
  "/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-koeywords=";
const url = baseURL + searchURL;

async function getBookLinks(url) {
  try {
    let response = await axios.get(url);
    let $ = await cheerio.load(response.data);
    let bookListData = [];
    $("a.acs_product-image").map((cv, i) => {
      let name = $(i).attr("title");
      let sourceURL = baseURL + $(i).attr("href");
      let book = new Book(name, sourceURL);
      bookListData.push(book);
    });
    return bookListData;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getBookData(url) {
  let data = await getBookLinks(url);
  let array = [];
  let product;
  for (let i = 0; i < data.length; i++) {
    let url = data[i].sourceURL;
    await axios
      .get(url)
      .then(response => {
        let $ = cheerio.load(response.data);
        let id = i + 1;
        let name = data[i].name;
        let description = BookInfo.getDescription($);
        let listPrice = BookInfo.getPrice($);
        let imageURLs = BookInfo.getImgUrls($);
        let product_dimensions = BookInfo.getDimandWeight($, "Dimension");
        let weight = BookInfo.getDimandWeight($, "Weight");
        let sourceURL = data[i].sourceURL;
        product = new Product(
          id,
          name,
          listPrice,
          description,
          product_dimensions,
          imageURLs,
          weight,
          sourceURL
        );
      })
      .catch(error => {
        return error;
      });
    array.push({product});
  }
  let content = JSON.stringify(array,null,2);

  fs.writeFile("output.json", content, "utf8", function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

getBookData(url);


