import { Document, Model, FilterQuery, UpdateQuery } from "mongoose";

export interface IFilterOption {
  populate: string[];
}

export class BaseRepository<T extends Document> {
  private model: Model<T>;

  constructor(model: any) {
    this.model = model;
  }

  /**
   * Create a new document.
   * @param data - The data to create the document with.
   * @returns The created document.
   */
  async create(data: Partial<T>): Promise<T> {
    const document = new this.model({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return await document.save();
  }

  /**
   * Get a single document by filter.
   * @param filter - The filter to find the document.
   * @returns The found document or null.
   */
  async getOne(
    filter: FilterQuery<T>,
    options: IFilterOption = { populate: [] }
  ): Promise<T | null> {
    return await this.model.findOne(filter).populate(options.populate).exec();
  }

  /**
   * Get multiple documents by filter.
   * @param filter - The filter to find documents.
   * @param limit - Optional limit of documents to retrieve.
   * @param skip - Optional number of documents to skip.
   * @returns An array of found documents.
   */
  async getMany(
    filter: FilterQuery<T>,
    limit?: number,
    skip?: number,
    options: IFilterOption = {
      populate: [],
    }
  ): Promise<T[]> {
    const query = this.model.find(filter);

    if (options.populate?.length > 0) {
      query.populate(options.populate);
    }
    if (limit) query.limit(limit);
    if (skip) query.skip(skip);
    return await query.exec();
  }

  /**
   * Update a document by filter.
   * @param filter - The filter to find the document.
   * @param update - The data to update the document with.
   * @returns The updated document or null.
   */
  async updateOne(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>
  ): Promise<T | null> {
    return await this.model
      .findOneAndUpdate(
        filter,
        { ...update, updatedAt: new Date().toISOString() },
        { new: true }
      )
      .exec();
  }

  /**
   * Delete a document by filter.
   * @param filter - The filter to find the document.
   * @returns The deleted document or null.
   */
  async deleteOne(filter: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOneAndDelete(filter).exec();
  }
}
