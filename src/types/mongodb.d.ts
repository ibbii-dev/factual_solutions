declare module "mongodb" {
  export class MongoClient {
    constructor(url: string, options?: any);
    connect(): Promise<this>;
    close(): Promise<void>;
    db(dbName?: string): any;
  }
}
