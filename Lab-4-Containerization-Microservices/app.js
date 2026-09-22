/**
 * Cloud Microservice Container App
 * Demonstrates HTTP API endpoint with in-memory caching simulation.
 */

const http = require('http');

const PORT = process.env.PORT || 3000;
const cacheStore = new Map();

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/health') {
        res.writeHead(200);
        return res.end(JSON.stringify({ status: "UP", service: "Cloud Microservice API", timestamp: new Date() }));
    }

    if (req.url.startsWith('/api/compute')) {
        const queryKey = req.url;
        
        if (cacheStore.has(queryKey)) {
            res.writeHead(200);
            return res.end(JSON.stringify({
                source: "CACHE_HIT",
                key: queryKey,
                data: cacheStore.get(queryKey)
            }));
        }

        // Simulate expensive cloud compute operation
        const computeResult = {
            message: "Computed result from Cloud Microservice",
            allocated_nodes: ["Node-1", "Node-2"],
            timestamp: new Date().toISOString()
        };

        cacheStore.set(queryKey, computeResult);
        res.writeHead(200);
        return res.end(JSON.stringify({
            source: "CACHE_MISS_COMPUTED",
            key: queryKey,
            data: computeResult
        }));
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Endpoint not found" }));
});

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`🚀 Cloud Microservice running on http://localhost:${PORT}`);
    });
}

module.exports = server;
