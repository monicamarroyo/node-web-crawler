class Product {
    constructor(
      id,
      name,
      listPrice,
      description,
      product_dimensions,
      imageURLs,
      weight,
      sourceURL
    ) {
      this.id = id;
      this.name = name;
      this.listPrice = listPrice;
      this.description = description;
      this.product_dimensions = product_dimensions;
      this.imageURLs = imageURLs;
      this.weight = weight;
      this.sourceURL = sourceURL;
    }
  }

  exports.Product = Product