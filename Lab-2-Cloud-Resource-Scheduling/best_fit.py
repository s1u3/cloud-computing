"""
Best-Fit (BF) Cloud Resource Allocation Algorithm
Allocates incoming tasks to the server with the tightest fit (minimal remaining leftover capacity).
"""

from typing import List, Dict, Tuple

class HostServer:
    def __init__(self, server_id: str, total_cpu: int, total_ram_gb: int):
        self.server_id = server_id
        self.total_cpu = total_cpu
        self.total_ram_gb = total_ram_gb
        self.used_cpu = 0
        self.used_ram_gb = 0
        self.allocated_tasks: List[str] = []

    @property
    def remaining_cpu(self) -> int:
        return self.total_cpu - self.used_cpu

    @property
    def remaining_ram_gb(self) -> int:
        return self.total_ram_gb - self.used_ram_gb

    def can_accommodate(self, req_cpu: int, req_ram_gb: int) -> bool:
        return self.remaining_cpu >= req_cpu and self.remaining_ram_gb >= req_ram_gb

    def assign_task(self, task_id: str, req_cpu: int, req_ram_gb: int):
        self.used_cpu += req_cpu
        self.used_ram_gb += req_ram_gb
        self.allocated_tasks.append(task_id)


def best_fit_schedule(servers: List[HostServer], tasks: List[Dict]) -> Tuple[Dict[str, str], List[str]]:
    """
    Best-Fit Allocation Strategy:
    For each task, find the server that can accommodate the task AND leaves the 
    smallest remaining capacity after allocation.
    """
    allocations = {}
    unassigned_tasks = []

    for task in tasks:
        task_id = task["task_id"]
        req_cpu = task["req_cpu"]
        req_ram = task["req_ram_gb"]

        best_server = None
        min_remaining_score = float('inf')

        for server in servers:
            if server.can_accommodate(req_cpu, req_ram):
                # Score = leftover capacity after assigning task (tightest fit minimizes score)
                rem_cpu = server.remaining_cpu - req_cpu
                rem_ram = server.remaining_ram_gb - req_ram
                tightness_score = rem_cpu + rem_ram

                if tightness_score < min_remaining_score:
                    min_remaining_score = tightness_score
                    best_server = server

        if best_server:
            best_server.assign_task(task_id, req_cpu, req_ram)
            allocations[task_id] = best_server.server_id
        else:
            unassigned_tasks.append(task_id)

    return allocations, unassigned_tasks
