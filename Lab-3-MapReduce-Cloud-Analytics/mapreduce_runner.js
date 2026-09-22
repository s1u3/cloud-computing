/**
 * MapReduce Distributed Framework Simulator
 * 1. WordCount Engine
 * 2. Cloud Web Server Access Log Analyzer
 */

class MapReduceEngine {
    constructor(mapper, reducer) {
        this.mapper = mapper;
        this.reducer = reducer;
    }

    execute(inputData) {
        // Phase 1: Map Phase
        const intermediateKV = [];
        for (const record of inputData) {
            const mapped = this.mapper(record);
            intermediateKV.push(...mapped);
        }

        // Phase 2: Shuffle & Sort (Grouping by Key)
        const groupedData = {};
        for (const { key, value } of intermediateKV) {
            if (!groupedData[key]) {
                groupedData[key] = [];
            }
            groupedData[key].push(value);
        }

        // Phase 3: Reduce Phase
        const finalResults = {};
        for (const [key, values] of Object.entries(groupedData)) {
            finalResults[key] = this.reducer(key, values);
        }

        return finalResults;
    }
}

// -------------------------------------------------------------
// Experiment A: MapReduce WordCount
// -------------------------------------------------------------
const sampleDocuments = [
    "cloud computing virtualization hypervisor proxmox container docker",
    "docker container microservice kubernetes cloud scheduling load balancer",
    "best fit first fit round robin scheduling algorithm cloud datacenter"
];

function wordCountMapper(documentText) {
    const words = documentText.toLowerCase().split(/\s+/);
    return words.map(w => ({ key: w, value: 1 }));
}

function wordCountReducer(key, values) {
    return values.reduce((sum, count) => sum + count, 0);
}

// -------------------------------------------------------------
// Experiment B: Cloud Server Log HTTP Status Analyzer
// -------------------------------------------------------------
const sampleAccessLogs = [
    "192.168.1.10 - [22/Sep/2026] GET /api/v1/resource HTTP/1.1 200 1024",
    "192.168.1.11 - [22/Sep/2026] POST /api/v1/login HTTP/1.1 401 512",
    "192.168.1.12 - [22/Sep/2026] GET /index.html HTTP/1.1 200 4096",
    "192.168.1.10 - [22/Sep/2026] GET /dashboard HTTP/1.1 500 256",
    "192.168.1.13 - [22/Sep/2026] GET /api/v1/resource HTTP/1.1 200 2048",
    "192.168.1.11 - [22/Sep/2026] GET /favicon.ico HTTP/1.1 404 128"
];

function logStatusMapper(logLine) {
    const match = logLine.match(/HTTP\/1\.[01]\s+(\d{3})\s+(\d+)/);
    if (match) {
        const statusCode = match[1];
        const bytesSent = parseInt(match[2], 10);
        return [{ key: `HTTP_${statusCode}`, value: bytesSent }];
    }
    return [];
}

function logStatusReducer(key, bytesList) {
    return {
        total_requests: bytesList.length,
        total_bytes_transferred: bytesList.reduce((a, b) => a + b, 0)
    };
}


console.log("=" .repeat(65));
console.log(" 🌐 MAPREDUCE DISTRIBUTED ANALYTICS ENGINE");
console.log("=" .repeat(65));

console.log("\n[1] Running MapReduce WordCount...");
const wordCountEngine = new MapReduceEngine(wordCountMapper, wordCountReducer);
const wordCountResults = wordCountEngine.execute(sampleDocuments);
console.log(wordCountResults);

console.log("\n[2] Running Cloud Web Server Log Analyzer...");
const logEngine = new MapReduceEngine(logStatusMapper, logStatusReducer);
const logResults = logEngine.execute(sampleAccessLogs);
console.log(JSON.stringify(logResults, null, 2));
console.log("=" .repeat(65));
