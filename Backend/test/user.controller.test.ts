import { expect } from "chai";
const sinon = require("sinon");
const chai = require("chai");
import { Context } from "hono"; // Ensure Hono types are correctly imported
import {
  fetchAllUserController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../src/users/users.controller";
import { fetchAllUserService } from "../src/users/users.service";
// import sinon from "sinon"; // Import the 'sinon' package

chai.describe("fetchAllUserController", () => {
  chai.it("should return all users if no limit is provided", async () => {
    // Mock the fetchAllUserService to return an array of users
    const mockUsers = [{ id: 1 }, { id: 2 }];
    const stubbedService = sinon
      .stub(fetchAllUserService, "fetch")
      .resolves(mockUsers);

    // Mock a minimal Context object for Hono
    const mockContext: Context<any, any, any> = {
      req: { query: {} },
      json: sinon.stub(), // Ensure the json method is correctly stubbed
      env: {}, // Add env since Hono requires it
      finalized: false,
      error: null,
      event: {},
    } as unknown as Context;

    // Call the controller
    await fetchAllUserController(mockContext);

    // Assert that the service and context were called correctly
    expect(stubbedService.calledOnce).to.be.true;
    // expect(mockContext.json.calledOnceWith(mockUsers, 200)).to.be.true;
    // @ts-ignore
    expect(mockContext.json.calledOnceWith(mockUsers, 200)).to.be.true;
    expect(mockContext.finalized).to.be.true;

    // Restore the stub
    stubbedService.restore();
  });

  chai.it("should return limited users if a limit is provided", async () => {
    const mockUsers = [{ id: 1 }];
    const stubbedService = sinon
      .stub(fetchAllUserService, "call")
      .resolves(mockUsers);

    const mockContext = {
      req: { query: { limit: "1" } }, // Ensure the limit is passed as a string
      json: sinon.stub(),
      env: {},
      finalized: false,
      error: null,
      event: {},
    } as unknown as Context;

    await fetchAllUserController(mockContext);

    expect(stubbedService.calledOnceWith(1)).to.be.true;
    // @ts-ignore
    expect(mockContext.json.calledOnceWith(mockUsers, 200)).to.be.true;

    stubbedService.restore();
  });

  chai.it("should return 404 if no users are found", async () => {
    const stubbedService = sinon
      .stub(fetchAllUserService, "call")
      .resolves(null);

    const mockContext = {
      req: { query: {} },
      text: sinon.stub(),
      env: {},
      finalized: false,
      error: null,
      event: {},
    } as unknown as Context;

    await fetchAllUserController(mockContext);

    expect(stubbedService.calledOnce).to.be.true;
    // @ts-ignore
    expect(mockContext.text.calledOnceWith("User not found", 404)).to.be.true;

    stubbedService.restore();
  });
});
