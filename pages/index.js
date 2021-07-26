import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 id="sample-text">Some sample text</h1>

        <p id="code-container" className={styles.codeContainer}>
          Nested code sample
          <code>console.log(&quot;Hello, world!&quot;)</code>
        </p>

        <ul id="engine-list">
          <li>
            <h2>
              <a href="https://google.com">Google Engine</a>
            </h2>
            <p>This is some sample text for the Google engine</p>
          </li>

          <li>
            <h2>
              <a href="https://bing.com">Bing Engine</a>
            </h2>
            <p>This is some sample text for the Bing engine</p>
          </li>

          <li>
            <h2>
              <a href="https://duckduckgo.com">DuckDuckGo Engine</a>
            </h2>
            <p>This is some sample text for the DuckDuckGo engine</p>
          </li>
        </ul>
      </main>
    </div>
  );
}
