const CategoryController = require("../../../controllers/category.controller");
const db = require("../../../models");
const categoryModel = require("../../../models/category.model");

const CategoryModel = db.category;
const { mockRequest, mockResponse } = require("../interceptor");

const categoryPayload = require("../../mock-data/categoryPayload.json");

let req, res;

beforeEach(() => {
  req = mockRequest();
  res = mockResponse();
});

describe("category controller create", () => {
  test("should call CategoryController.create and create a new category", async () => {
    const spy = jest.spyOn(CategoryModel, "create").mockImplementation(
      (categoryPayload) =>
        new Promise(function (resolve, reject) {
          resolve(categoryPayload);
        })
    );

    req.body = categoryPayload;

    await CategoryController.create(req, res);

    await expect(spy).toHaveBeenCalled();
    expect(CategoryModel.create).toHaveBeenCalledWith(categoryPayload);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(categoryPayload);
  });

  test("should call CategoryController.create and ends with an error", async () => {
    // const spy = jest.spyOn(CategoryModel, "create").mockImplementation(
    //   (categoryPayload) =>
    //     new Promise(function (resolve, reject) {
    //       reject(Error("This is an error"));
    //     })
    // );
    const spy = jest
      .spyOn(CategoryModel, "create")
      .mockImplementation((categoryPayload) =>
        Promise.reject(Error("This is an error"))
      );

    req.body = categoryPayload;

    await CategoryController.create(req, res);
    await expect(spy).toHaveBeenCalled();
    expect(CategoryModel.create).toHaveBeenCalledWith(categoryPayload);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Some internal error while creating the category!",
    });
  });
});
