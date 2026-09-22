# Cloud Computing Lab Repository ☁️

A comprehensive, production-grade repository containing original implementations, benchmarking suites, and lab experiment manuals for Cloud Computing & Distributed Systems.

---

## 📌 Repository Structure & Lab Manual Index

| Lab Module | Topic | Core Focus / Algorithms |
| :--- | :--- | :--- |
| **[Lab 1](./Lab-1-Virtualization-And-Hypervisors)** | Virtualization & Hypervisors | Type-1 (Proxmox/KVM) vs Type-2 (VirtualBox) performance benchmark & Sysbench log parsing |
| **[Lab 2](./Lab-2-Cloud-Resource-Scheduling)** | Cloud Resource Allocation | **Best-Fit (BF)**, **First-Fit (FF)**, and Round-Robin (RR) scheduling & fragmentation analysis |
| **[Lab 3](./Lab-3-MapReduce-Cloud-Analytics)** | Distributed MapReduce | Pure Python Map-Shuffle-Reduce framework & Web Server Log Traffic Analyzer |
| **[Lab 4](./Lab-4-Containerization-Microservices)** | Containerization & Orchestration | Flask microservice with Multi-stage Dockerfile & Redis Docker Compose deployment |
| **[Lab 5](./Lab-5-Cloud-Security-IAM)** | Cloud Security & Policy Evaluation | Role-Based Access Control (RBAC) & AWS IAM JSON Policy Engine Simulator |

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Docker & Docker Compose (Optional for Lab 4)

### Running Lab Experiments

```bash
# 1. Run Cloud Resource Scheduling Algorithms (Lab 2)
python Lab-2-Cloud-Resource-Scheduling/test_scheduling.py

# 2. Run MapReduce Analytics (Lab 3)
python Lab-3-MapReduce-Cloud-Analytics/mapreduce_wordcount.py
python Lab-3-MapReduce-Cloud-Analytics/cloud_log_analyzer.py

# 3. Run IAM Policy Evaluation Simulator (Lab 5)
python Lab-5-Cloud-Security-IAM/iam_policy_simulator.py
```

---

## 📜 License
This repository is licensed under the MIT License. Created for educational and research purposes.
