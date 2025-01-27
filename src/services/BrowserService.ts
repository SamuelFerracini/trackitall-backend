import puppeteer, { Page, Browser } from "puppeteer";

interface Cookie {
  name: string;
  value: string;
  domain: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

class BrowserService {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private userAgents: string[] = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 11; SM-G996U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Mobile Safari/537.36",
    "Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/537.36",
  ];

  /**
   * Selects a random User-Agent from the list.
   */
  getRandomUserAgent(): string {
    const randomIndex = Math.floor(Math.random() * this.userAgents.length);
    return this.userAgents[randomIndex];
  }

  /**
   * Launches a new browser instance.
   */
  async initialize(): Promise<void> {
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
      });

      this.page = await this.browser.newPage();

      // Set default User-Agent and Viewport
      await this.page.setUserAgent(this.getRandomUserAgent());
      await this.page.setViewport({
        width: Math.floor(1024 + Math.random() * 400),
        height: Math.floor(768 + Math.random() * 300),
      });

      // Set default headers
      await this.page.setExtraHTTPHeaders({
        "Accept-Language": "en-US,en;q=0.9",
      });
    } catch (error) {
      console.error("Error initializing browser:", error);
      throw new Error("Failed to initialize browser.");
    }
  }

  /**
   * Sets up a listener for network responses based on a URL/pattern and executes a callback.
   * @param {string|RegExp} urlPattern - The URL or pattern to match responses.
   * @param {Function} callback - The callback to execute if the URL matches.
   */
  setupResponseListener(
    urlPattern: string | RegExp,
    callback: (body: any, response: any) => void
  ): void {
    if (!this.page) {
      throw new Error("Browser is not initialized. Call initialize() first.");
    }

    this.page.on("response", async (response: any) => {
      try {
        const url = response.url();
        const matches =
          typeof urlPattern === "string"
            ? url === urlPattern
            : urlPattern instanceof RegExp && urlPattern.test(url);

        if (matches) {
          const responseBody = await response
            .json()
            .catch(() => response.text()); // Handle both JSON and plain text responses
          await callback(responseBody, response);
        }
      } catch (error) {
        console.error("Error processing response:", error);
      }
    });
  }

  /**
   * Fetches page content from a URL.
   * @param {string} url - The URL to fetch.
   * @param {string} [desiredContent] - A CSS selector to wait for specific content.
   * @returns {Promise<Buffer>} - The response content as a buffer.
   */
  async getPageContent(url: string): Promise<Buffer> {
    if (!this.page) {
      throw new Error("Browser is not initialized. Call initialize() first.");
    }

    try {
      const response = (await this.page.goto(url, {
        waitUntil: "networkidle2",
      })) as any;

      return response.buffer();
    } catch (error) {
      console.error("Error fetching page content:", error);
      throw new Error(`Failed to fetch content from ${url}`);
    }
  }

  /**
   * Sets a cookie in the browser.
   * @param {Cookie} cookie - The cookie object.
   */
  async setCookie(cookie: Cookie): Promise<void> {
    if (!this.page) {
      throw new Error("Browser is not initialized. Call initialize() first.");
    }

    try {
      await this.page.setCookie(cookie);
    } catch (error) {
      console.error("Error setting cookie:", error);
      throw new Error("Failed to set cookie.");
    }
  }

  /**
   * Closes the browser instance.
   */
  async close(): Promise<void> {
    if (this.browser) {
      try {
        await this.browser.close();
      } catch (error) {
        console.error("Error closing browser:", error);
      }
    }
  }
}

export default BrowserService;
