"""
Cloud Task Scheduling Benchmark Suite
Compares Best-Fit (BF), First-Fit (FF), and Round-Robin (RR) resource scheduling algorithms.
"""

import copy
import unittest
from best_fit import HostServer, best_fit_schedule
from first_fit import first_fit_schedule
from round_robin import round_robin_schedule

def generate_sample_workload():
    """Generates host servers and virtual machine task allocation requests."""
    servers = [
        HostServer("Node-1", total_cpu=8, total_ram_gb=16),
        HostServer("Node-2", total_cpu=16, total_ram_gb=32),
        HostServer("Node-3", total_cpu=4, total_ram_gb=8),
        HostServer("Node-4", total_cpu=8, total_ram_gb=16),
    ]

    tasks = [
        {"task_id": "VM-A", "req_cpu": 2, "req_ram_gb": 4},
        {"task_id": "VM-B", "req_cpu": 4, "req_ram_gb": 8},
        {"task_id": "VM-C", "req_cpu": 8, "req_ram_gb": 16},
        {"task_id": "VM-D", "req_cpu": 1, "req_ram_gb": 2},
        {"task_id": "VM-E", "req_cpu": 3, "req_ram_gb": 6},
        {"task_id": "VM-F", "req_cpu": 4, "req_ram_gb": 8},
    ]

    return servers, tasks


def evaluate_scheduling(algo_name: str, schedule_func):
    servers, tasks = generate_sample_workload()
    allocations, unassigned = schedule_func(servers, tasks)

    total_allocated_cpu = sum(s.used_cpu for s in servers)
    total_allocated_ram = sum(s.used_ram_gb for s in servers)
    active_servers = sum(1 for s in servers if len(s.allocated_tasks) > 0)

    print(f"\n--- {algo_name} Results ---")
    print(f"  • Tasks Assigned   : {len(allocations)} / {len(tasks)}")
    print(f"  • Unassigned Tasks : {unassigned if unassigned else 'None'}")
    print(f"  • Active Nodes     : {active_servers} / {len(servers)}")
    print(f"  • Total Allocated  : {total_allocated_cpu} vCPUs, {total_allocated_ram} GB RAM")

    for s in servers:
        print(f"    - {s.server_id:6s} | CPU: {s.used_cpu:2d}/{s.total_cpu:2d} | RAM: {s.used_ram_gb:2d}/{s.total_ram_gb:2d} GB | Tasks: {s.allocated_tasks}")

    return {
        "algo": algo_name,
        "assigned": len(allocations),
        "active_nodes": active_servers,
        "used_cpu": total_allocated_cpu,
        "used_ram": total_allocated_ram
    }


class TestCloudScheduling(unittest.TestCase):
    def test_best_fit(self):
        servers, tasks = generate_sample_workload()
        allocs, unassigned = best_fit_schedule(servers, tasks)
        self.assertGreater(len(allocs), 0)

    def test_first_fit(self):
        servers, tasks = generate_sample_workload()
        allocs, unassigned = first_fit_schedule(servers, tasks)
        self.assertGreater(len(allocs), 0)

    def test_round_robin(self):
        servers, tasks = generate_sample_workload()
        allocs, unassigned = round_robin_schedule(servers, tasks)
        self.assertGreater(len(allocs), 0)


if __name__ == "__main__":
    print("=" * 65)
    print(" ⚡ CLOUD TASK SCHEDULING ALGORITHM BENCHMARK (BF / FF / RR)")
    print("=" * 65)

    res_bf = evaluate_scheduling("Best-Fit (BF)", best_fit_schedule)
    res_ff = evaluate_scheduling("First-Fit (FF)", first_fit_schedule)
    res_rr = evaluate_scheduling("Round-Robin (RR)", round_robin_schedule)

    print("\n" + "=" * 65)
    print(" 📊 SUMMARY COMPARISON TABLE")
    print("=" * 65)
    print(f"{'Algorithm':<18} | {'Assigned Tasks':<15} | {'Active Nodes':<14} | {'Allocated CPU/RAM'}")
    print("-" * 65)
    for res in [res_bf, res_ff, res_rr]:
        print(f"{res['algo']:<18} | {res['assigned']:<15} | {res['active_nodes']:<14} | {res['used_cpu']} vCPU / {res['used_ram']} GB")
    print("=" * 65)

    print("\nRunning Unit Tests...")
    unittest.main(exit=False)
