"""
Round-Robin (RR) Cloud Load Balancing Algorithm
Distributes incoming requests/tasks across active host servers in cyclic round-robin order.
"""

from typing import List, Dict, Tuple
from best_fit import HostServer

def round_robin_schedule(servers: List[HostServer], tasks: List[Dict]) -> Tuple[Dict[str, str], List[str]]:
    """
    Round-Robin Strategy:
    Cycles sequentially through host servers (0, 1, ..., N-1, 0, 1...).
    """
    allocations = {}
    unassigned_tasks = []
    num_servers = len(servers)
    
    if num_servers == 0:
        return allocations, [t["task_id"] for t in tasks]

    server_index = 0

    for task in tasks:
        task_id = task["task_id"]
        req_cpu = task["req_cpu"]
        req_ram = task["req_ram_gb"]

        assigned = False
        # Try up to num_servers starting from current server_index
        for attempt in range(num_servers):
            target_server = servers[(server_index + attempt) % num_servers]
            if target_server.can_accommodate(req_cpu, req_ram):
                target_server.assign_task(task_id, req_cpu, req_ram)
                allocations[task_id] = target_server.server_id
                assigned = True
                # Move to next server index for subsequent task
                server_index = (server_index + attempt + 1) % num_servers
                break

        if not assigned:
            unassigned_tasks.append(task_id)

    return allocations, unassigned_tasks
