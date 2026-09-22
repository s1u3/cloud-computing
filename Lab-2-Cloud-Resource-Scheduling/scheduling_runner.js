/**
 * Cloud Task Scheduling Algorithms (Best-Fit, First-Fit, Round-Robin)
 * Node.js Execution Runner
 */

class HostServer {
    constructor(serverId, totalCpu, totalRamGb) {
        this.serverId = serverId;
        this.totalCpu = totalCpu;
        this.totalRamGb = totalRamGb;
        this.usedCpu = 0;
        this.usedRamGb = 0;
        this.allocatedTasks = [];
    }

    get remainingCpu() { return this.totalCpu - this.usedCpu; }
    get remainingRamGb() { return this.totalRamGb - this.usedRamGb; }

    canAccommodate(reqCpu, reqRamGb) {
        return this.remainingCpu >= reqCpu && this.remainingRamGb >= reqRamGb;
    }

    assignTask(taskId, reqCpu, reqRamGb) {
        this.usedCpu += reqCpu;
        this.usedRamGb += reqRamGb;
        this.allocatedTasks.push(taskId);
    }
}

function generateSampleWorkload() {
    return {
        servers: [
            new HostServer("Node-1", 8, 16),
            new HostServer("Node-2", 16, 32),
            new HostServer("Node-3", 4, 8),
            new HostServer("Node-4", 8, 16),
        ],
        tasks: [
            { taskId: "VM-A", reqCpu: 2, reqRamGb: 4 },
            { taskId: "VM-B", reqCpu: 4, reqRamGb: 8 },
            { taskId: "VM-C", reqCpu: 8, reqRamGb: 16 },
            { taskId: "VM-D", reqCpu: 1, reqRamGb: 2 },
            { taskId: "VM-E", reqCpu: 3, reqRamGb: 6 },
            { taskId: "VM-F", reqCpu: 4, reqRamGb: 8 },
        ]
    };
}

// 1. Best-Fit (BF)
function bestFitSchedule(servers, tasks) {
    const allocations = {};
    const unassigned = [];

    for (const task of tasks) {
        let bestServer = null;
        let minScore = Infinity;

        for (const server of servers) {
            if (server.canAccommodate(task.reqCpu, task.reqRamGb)) {
                const remCpu = server.remainingCpu - task.reqCpu;
                const remRam = server.remainingRamGb - task.reqRamGb;
                const score = remCpu + remRam;
                if (score < minScore) {
                    minScore = score;
                    bestServer = server;
                }
            }
        }

        if (bestServer) {
            bestServer.assignTask(task.taskId, task.reqCpu, task.reqRamGb);
            allocations[task.taskId] = bestServer.serverId;
        } else {
            unassigned.push(task.taskId);
        }
    }
    return { allocations, unassigned };
}

// 2. First-Fit (FF)
function firstFitSchedule(servers, tasks) {
    const allocations = {};
    const unassigned = [];

    for (const task of tasks) {
        let assigned = false;
        for (const server of servers) {
            if (server.canAccommodate(task.reqCpu, task.reqRamGb)) {
                server.assignTask(task.taskId, task.reqCpu, task.reqRamGb);
                allocations[task.taskId] = server.serverId;
                assigned = true;
                break;
            }
        }
        if (!assigned) unassigned.push(task.taskId);
    }
    return { allocations, unassigned };
}

// 3. Round-Robin (RR)
function roundRobinSchedule(servers, tasks) {
    const allocations = {};
    const unassigned = [];
    let serverIndex = 0;
    const n = servers.length;

    for (const task of tasks) {
        let assigned = false;
        for (let i = 0; i < n; i++) {
            const idx = (serverIndex + i) % n;
            const target = servers[idx];
            if (target.canAccommodate(task.reqCpu, task.reqRamGb)) {
                target.assignTask(task.taskId, task.reqCpu, task.reqRamGb);
                allocations[task.taskId] = target.serverId;
                assigned = true;
                serverIndex = (idx + 1) % n;
                break;
            }
        }
        if (!assigned) unassigned.push(task.taskId);
    }
    return { allocations, unassigned };
}

function runBenchmark(algoName, algoFunc) {
    const { servers, tasks } = generateSampleWorkload();
    const { allocations, unassigned } = algoFunc(servers, tasks);

    const usedCpu = servers.reduce((acc, s) => acc + s.usedCpu, 0);
    const usedRam = servers.reduce((acc, s) => acc + s.usedRamGb, 0);
    const activeNodes = servers.filter(s => s.allocatedTasks.length > 0).length;

    console.log(`\n--- ${algoName} Results ---`);
    console.log(`  • Tasks Assigned   : ${Object.keys(allocations).length} / ${tasks.length}`);
    console.log(`  • Unassigned Tasks : ${unassigned.length ? unassigned.join(", ") : "None"}`);
    console.log(`  • Active Nodes     : ${activeNodes} / ${servers.length}`);
    console.log(`  • Total Allocated  : ${usedCpu} vCPUs, ${usedRam} GB RAM`);
    servers.forEach(s => {
        console.log(`    - ${s.serverId.padEnd(6)} | CPU: ${String(s.usedCpu).padStart(2)}/${String(s.totalCpu).padStart(2)} | RAM: ${String(s.usedRamGb).padStart(2)}/${String(s.totalRamGb).padStart(2)} GB | Tasks: [${s.allocatedTasks.join(", ")}]`);
    });

    return { algoName, assigned: Object.keys(allocations).length, activeNodes, usedCpu, usedRam };
}

console.log("=" .repeat(65));
console.log(" ⚡ CLOUD RESOURCE SCHEDULING ALGORITHMS (BF / FF / RR)");
console.log("=" .repeat(65));

const resBF = runBenchmark("Best-Fit (BF)", bestFitSchedule);
const resFF = runBenchmark("First-Fit (FF)", firstFitSchedule);
const resRR = runBenchmark("Round-Robin (RR)", roundRobinSchedule);

console.log("\n" + "=" .repeat(65));
console.log(" 📊 SUMMARY COMPARISON TABLE");
console.log("=" .repeat(65));
console.log(`${"Algorithm".padEnd(18)} | ${"Assigned Tasks".padEnd(15)} | ${"Active Nodes".padEnd(14)} | Allocated CPU/RAM`);
console.log("-" .repeat(65));
[resBF, resFF, resRR].forEach(r => {
    console.log(`${r.algoName.padEnd(18)} | ${String(r.assigned).padEnd(15)} | ${String(r.activeNodes).padEnd(14)} | ${r.usedCpu} vCPU / ${r.usedRam} GB`);
});
console.log("=" .repeat(65));
