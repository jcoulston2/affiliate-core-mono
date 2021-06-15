import BatchPipe from '../server/batch/';
import dummyDataOne from './dummyData/batchOne';
import dummyDataTwo from './dummyData/batchTwo';

function init() {
  const Batch = new BatchPipe(dummyDataOne, dummyDataTwo);
  return Batch.processBatch();
}

init();
