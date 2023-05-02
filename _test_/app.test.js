import { handleSubmit } from "../src/client/js/app.js";

describe("Testing handleSubmit function", () => {
  test("Testing handleSubmit function, is it defined?", async () => {
    expect(handleSubmit).toBeDefined();
  });

  test("Testing the handleSubmit(), is it function?", async () => {
    expect(typeof handleSubmit).toBe("function");
  });
});
