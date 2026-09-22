# Lab 2: Cloud Resource Allocation & Task Scheduling Algorithms

## Overview
In Cloud Data Centers, Cloud Service Providers (CSPs) like AWS, Azure, and GCP need to allocate incoming virtual machines (VMs) or container workloads across physical host servers (Nodes). 

Efficient allocation reduces resource fragmentation, minimizes host power consumption, and maximizes CPU/RAM utilization.

This experiment implements three fundamental cloud scheduling heuristics:
1. **Best-Fit (BF)**: Assigns a task to the server that leaves the *smallest sufficient remaining capacity* (minimizes leftover space per server, minimizing waste).
2. **First-Fit (FF)**: Assigns a task to the *first available server* with sufficient capacity (fast execution time, simple lookup).
3. **Round-Robin (RR)**: Distributes tasks sequentially across all active host servers in cyclic order (equal load balancing).

---

## 📈 Performance Comparison Matrix

| Algorithm | Computational Complexity | Resource Fragmentation | Execution Speed | Primary Cloud Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Best-Fit (BF)** | $O(N \log N)$ or $O(N \cdot M)$ | Very Low | Moderate | Host Bin-Packing & Server Consolidation |
| **First-Fit (FF)** | $O(N \cdot M)$ (worst-case) | Low to Moderate | Fast | Real-time VM Provisioning |
| **Round-Robin (RR)** | $O(1)$ per task | High (Scattered) | Extremely Fast | HTTP Load Balancers (e.g. NGINX, AWS ALB) |

---

## 🛠️ How to Run
Execute the scheduling test suite to compare Best-Fit, First-Fit, and Round-Robin on synthetic cloud workloads:
```bash
python test_scheduling.py
```
