import { t, RequestLogger, Selector, RequestMock } from "testcafe";

function submitNameForm(firstName, lastName) {
  const nameForm = Selector("#name-form");
  const firstNameField = nameForm.find("div > input").nth(0);
  const lastNameField = nameForm.find("div > input").nth(1);
  const submitButton = nameForm.child("input").withAttribute("type", "submit");
  return t
    .typeText(firstNameField, firstName)
    .typeText(lastNameField, lastName)
    .click(submitButton);
}

const logger = RequestLogger("http://localhost:3000/test", {
  logResponseBody: true,
});
const mock = RequestMock()
  .onRequestTo("http://localhost:3000/test")
  .respond((req, res) => {
    const requestBody = JSON.parse(req.body.toString());
    const responseBody = JSON.stringify({ success: true, data: requestBody });
    res.statusCode = "200";
    res.setBody(responseBody);
  });

fixture`Form tests`.page`http://localhost:3000/form`.requestHooks(logger, mock);

test("Assert form error box exists", async (t) => {
  const nameForm = Selector("#name-form");
  const submitButton = nameForm.child("input").withAttribute("type", "submit");

  await t
    .click(submitButton)
    .expect(Selector("#error-box").innerText)
    .eql("Missing required field(s): firstName, lastName");
});

test("Assert form error box doesn't exist", async (t) => {
  await submitNameForm("John", "Doe")
    .expect(Selector("#error-box").exists)
    .eql(false);
});

test("Assert data was submitted to IO", async (t) => {
  // Submit form with placeholder data
  await submitNameForm("John", "Doe");

  // Check if request body was logged
  const { log } = await t.getBrowserConsoleMessages();
  const body = { firstName: "John", lastName: "Doe" };

  await t.expect(log).contains("Form data: " + JSON.stringify(body));

  // Check if the request body was posted to the mock API
  const mockURL = "http://localhost:3000/test";
  const mockBody = JSON.stringify({ success: true, data: body });

  await t
    .expect(logger.contains((record) => record.request.url === mockURL))
    .ok()
    .expect(
      logger.contains(
        (record) =>
          record.request.url === mockURL &&
          record.response.body.toString() === mockBody
      )
    )
    .ok();
});
