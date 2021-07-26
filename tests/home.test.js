import { Selector } from "testcafe";

function findEnginePointingTo(engineList, url) {
  return engineList.find("li > h2 > a").withAttribute("href", url);
}

fixture`Home tests`.page`http://localhost:3000`;

test("Assert header text", async (t) => {
  const sampleTextHeader = Selector("#sample-text");

  await t.expect(sampleTextHeader.innerText).eql("Some sample text");
});

test("Assert nested code content", async (t) => {
  const codeContainer = Selector("#code-container");

  await t
    .expect(codeContainer.textContent)
    .eql("Nested code sample" + 'console.log("Hello, world!")');
});

test("Assert browsers by name", async (t) => {
  const engineList = Selector("#engine-list");
  const googleEngine = findEnginePointingTo(engineList, "https://google.com");
  const bingEngine = findEnginePointingTo(engineList, "https://bing.com");
  const duckDuckGoEngine = findEnginePointingTo(
    engineList,
    "https://duckduckgo.com"
  );

  await t.expect(googleEngine.innerText).eql("Google Engine");
  await t.expect(bingEngine.innerText).eql("Bing Engine");
  await t.expect(duckDuckGoEngine.innerText).eql("DuckDuckGo Engine");
});
