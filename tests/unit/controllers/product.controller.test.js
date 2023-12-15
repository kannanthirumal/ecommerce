const db = require("../../../models");
const ProductModel = db.product;

const ProductController = require("../../../controllers/product.controller");
const { mockRequest, mockResponse } = require("../interceptor");

let req, res;

beforeEach(() => {
  req = mockRequest();
  res = mockResponse();
});

const testPayload = {
  name: "Sony Bravia",
  description: "This is an amazing Tv",
  cost: 120000,
  categoryId: 1,
};

describe("Product controller create method", () => {
  it("should return success message with product details", async () => {
    const spy = jest.spyOn(ProductModel, "create").mockImplementation(
      (testPayload) =>
        new Promise(function (resolve, reject) {
          resolve(testPayload);
        })
    );
    req.body = testPayload;
    await ProductController.create(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(testPayload);
  });

  it("should return with an error when called for creating a product", async () => {
    const spy = jest.spyOn(ProductModel, "create").mockImplementation(
      (testPayload) =>
        new Promise(function (resolve, reject) {
          reject(new Error("This is an Error"));
        })
    );
    req.body = testPayload;
    await ProductController.create(req, res);
    await expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Some internal server error while creating the product",
    });
  });
});
