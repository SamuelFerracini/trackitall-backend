class BaseTransformer {
  transform(entity: any): any {
    return entity;
  }

  transformCollection(entities: any[]): any[] {
    return entities.map(this.transform);
  }
}

export default BaseTransformer;
