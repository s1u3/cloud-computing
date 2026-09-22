"""
First-Fit (FF) Cloud Resource Allocation Algorithm
Allocates incoming tasks to the first server in the server list that has sufficient resources.
"""

from typing import List, Dict, Tuple
from best_fit import HostServer

def first_fit_schedule(servers: List[HostServer], tasks: List[Dict]) -> Tuple[Dict[str, str], List[str]]:
    """
    First-Fit Allocation Strategy:
    Iterate through the server list sequentially and assign the task to the 
    VERY FIRST server that can satisfy its resource demands.
    """
    allocations = {}
    unassigned_tasks = []

    for task in tasks:
        task_id = task["task_id"]
        req_cpu = task["req_cpu"]
        req_ram = task["req_ram_gb"]

        assigned = False
        for server in servers:
            if server.can_accommodate(req_cpu, req_ram):
                server.assign_task(task_id, req_cpu, req_ram)
                allocations[task_id] = server.server_id
                assigned = True
                break

        if not assigned:
            unassigned_tasks.append(task_id)

    return allocations, unassigned_tasks
