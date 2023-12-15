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

describe("Product controller findone method", () => {
  it("should return product details", async () => {
    const spy = jest.spyOn(ProductModel, "findByPk").mockImplementation(
      () =>
        new Promise(function (resolve, reject) {
          resolve(testPayload);
        })
    );
    req.params.id = 1;
    await ProductController.findOne(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(testPayload);
  });

  it("should return error", async () => {
    const spy = jest.spyOn(ProductModel, "findByPk").mockImplementation(
      () =>
        new Promise(function (resolve, reject) {
          reject(new Error("This is an error"));
        })
    );
    req.params.id = 1;
    await ProductController.findOne(req, res);

    await expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Some internal server while fetching the product",
    });
  });
});

describe("Product controller update method", () => {
  it("should return product details", async () => {
    const spy1 = jest.spyOn(ProductModel, "findByPk").mockImplementation(() => {
      return new Promise(function (resolve, reject) {
        resolve(testPayload);
      });
    });

    const spy2 = jest.spyOn(ProductModel, "update").mockImplementation(() => {
      return new Promise(function (resolve, reject) {
        resolve(testPayload);
      });
    });

    req.params.id = 1;
    await ProductController.update(req, res);

    await expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(testPayload);
  });

  it("should return error - update method", async () => {
    const spy1 = jest.spyOn(ProductModel, "update").mockImplementation(() => {
      return new Promise(function (resolve, reject) {
        reject(new Error("This is an error"));
      });
    });

    const spy2 = jest.spyOn(ProductModel, "findByPk").mockImplementation(() => {
      return new Promise(function (resolve, reject) {
        resolve(testPayload);
      });
    });

    req.params.id = 1;
    await ProductController.update(req, res);

    await expect(spy1).toHaveBeenCalled();
    await expect(spy2).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Some interval server error while updating the product",
    });
  });

  it("should return error - findByPk method", async () => {
    const spy1 = jest.spyOn(ProductModel, "update").mockImplementation(() => {
      return new Promise(function (resolve, reject) {
        resolve(testPayload);
      });
    });

    const spy2 = jest.spyOn(ProductModel, "findByPk").mockImplementation(() => {
      return new Promise(function (resolve, reject) {
        reject(new Error("This is an error"));
      });
    });

    req.params.id = 1;
    await ProductController.update(req, res);

    await expect(spy1).toHaveBeenCalled();
    await expect(spy2).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Some internal server error while fetching the product",
    });
  });
});

describe("Product controller delete method", () => {
  it("should return success message", async () => {
    const spy = jest.spyOn(ProductModel, "destroy").mockImplementation(() => {
      return new Promise(function (resolve, reject) {
        resolve();
      });
    });

    req.params.id = 1;
    await ProductController.delete(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Product deleted successfully",
    });
  });

  it("should return error", async () => {
    const spy = jest.spyOn(ProductModel, "destroy").mockImplementation(() => {
      return new Promise(function (resolve, reject) {
        reject(new Error("This is an error"));
      });
    });

    req.params.id = 1;
    await ProductController.delete(req, res);

    await expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message:
        "Some internal server error while deleting the category based on id",
    });
  });
});
