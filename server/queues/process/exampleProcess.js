// --- Write all your logic here after that export and use ---
const exampleProcess = async (job, done) => {
  // --- Show Progress ---
  job.progress();

  // --- Log data ---
  console.log(job.data);

  // --- Call this function when the process is completed ---
  done();
};

module.exports = exampleProcess;
