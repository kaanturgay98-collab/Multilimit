import "reflect-metadata";
import { getDataSource } from "../lib/typeorm/data-source";

async function test() {
  console.log("Testing TypeORM DataSource initialization...");
  try {
    const ds = getDataSource();
    await ds.initialize();
    console.log("SUCCESS: DataSource initialized.");
    
    // Test a repository
    const productRepo = ds.getRepository("Product");
    const count = await productRepo.count();
    console.log(`SUCCESS: Product count is ${count}`);
    
    await ds.destroy();
  } catch (error: any) {
    console.error("FAILURE: DataSource initialization failed!");
    console.error(error);
    process.exit(1);
  }
}

test();
