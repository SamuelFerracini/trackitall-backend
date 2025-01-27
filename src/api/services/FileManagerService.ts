import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

class FileManager {
  static async ensureDirectories(filePath: string): Promise<void> {
    const dir = path.dirname(filePath);
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (error: any) {
      console.error(`Error creating directory ${dir}:`, error.message);
      throw error;
    }
  }

  static escapeFileName(url: string): string {
    if (!url || typeof url !== "string") {
      console.error("Invalid URL provided for escaping.");
      return "invalid_url";
    }

    try {
      return encodeURIComponent(url);
    } catch (error: any) {
      console.error("Error escaping URL:", error.message);
      return "invalid_url";
    }
  }

  static generateFileName(url: string, extension: string = "html"): string {
    if (!url || typeof url !== "string") {
      console.error("Invalid URL provided for generating file name.");
      return `invalid_url.${extension}`;
    }

    const hash = crypto.createHash("sha256").update(url).digest("hex");
    return `${hash}.${extension}`;
  }

  static getStoragePath(...paths: string[]): string {
    return path.join("storage", ...paths);
  }

  static getResultsPath(...paths: string[]): string {
    return this.getStoragePath("results", ...paths);
  }

  static getCacheFilePath(url: string, cacheDirName: string = "cache"): string {
    const cacheFileName = this.generateFileName(url);
    return this.getStoragePath(cacheDirName, cacheFileName);
  }

  static async readFile(filePath: string): Promise<string | null> {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return data;
    } catch (error: any) {
      if (error.code === "ENOENT") {
        console.warn(`File not found: ${filePath}`);
        return null;
      }
      console.error(`Error reading file ${filePath}:`, error.message);
      throw error;
    }
  }

  static async saveFile(filePath: string, content: string): Promise<void> {
    try {
      await this.ensureDirectories(filePath);
      await fs.writeFile(filePath, content);
      console.log(`File saved successfully: ${filePath}`);
    } catch (error: any) {
      console.error(`Error saving file ${filePath}:`, error.message);
      throw error;
    }
  }

  static async checkFileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return false;
      }
      console.error(
        `Error checking file existence for ${filePath}:`,
        error.message
      );
      throw error;
    }
  }
}

export default FileManager;
