import autocannon from 'autocannon';

const runBenchmark = async (title, url) => {
    console.log(`\n🚀 Running Benchmark: ${title}`);
    
    const result = await autocannon({
        url: url,
        connections: 50,  // Simulate 50 concurrent users
        duration: 20,      // Run test for 20 seconds
    });

    console.log(`\n📊 ${title} - Requests per Second:`, result.requests.average);
    console.log(`⏳ ${title} - Latency (ms):`, result.latency.average);
    console.log(`✅ ${title} - Total Requests:`, result.requests.total);
};

const main = async () => {
    console.log("\n🔥 Starting benchmark after Redis caching...");

    await runBenchmark("Courses API (All Courses)", "http://localhost:3000/api/courses");
    await runBenchmark("Course Details API (Single Course)", "http://localhost:3000/api/courses/67ba4ab04b8227b941eb5f1b"); 
    await runBenchmark("Enrolled Courses API", "http://localhost:3000/api/courses/enrolledCourses");
};

main();
