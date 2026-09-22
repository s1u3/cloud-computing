# Lab 1: Performance Analysis of Type-1 vs Type-2 Hypervisors

## Overview
Virtualization is the foundational technology of Cloud Computing. Hypervisors (Virtual Machine Monitors) enable multiple isolated Guest Operating Systems to share underlying hardware resources.

This experiment investigates:
1. **Type-1 Hypervisors (Bare-Metal)**: e.g., Proxmox VE, VMware ESXi, KVM. Runs directly on server hardware.
2. **Type-2 Hypervisors (Hosted)**: e.g., Oracle VirtualBox, VMware Workstation. Runs on top of a conventional Host OS.

---

## 📊 Comparison Matrix

| Metric | Type-1 (Bare-Metal / Proxmox) | Type-2 (Hosted / VirtualBox) |
| :--- | :--- | :--- |
| **Architecture** | Direct Hardware Access | Host OS Layer Overhead |
| **Virtualization Overhead** | Minimal (< 3%) | Moderate (5% - 15%) |
| **CPU Latency** | Low latency | Higher scheduling jitter |
| **I/O Throughput** | Near-native disk/net speeds | Translated through Host OS I/O |
| **Target Environment** | Enterprise Data Centers & Cloud Providers | Local Development & Desktop Testing |

---

## 🛠️ Execution Instructions

### 1. Simulated CPU & Memory Virtualization Benchmark
Run the automated Python benchmark suite:
```bash
python hypervisor_benchmark.py
```

### 2. Sysbench Latency Output Analyzer
Parse raw `sysbench` CPU benchmark logs and extract performance statistics:
```bash
python sysbench_analyzer.py
```
