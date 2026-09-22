# Lab 5: Cloud Security & IAM Policy Evaluation Engine

## Overview
Identity and Access Management (IAM) and Role-Based Access Control (RBAC) form the core security backbone of public cloud platforms (AWS, Azure, Google Cloud).

This experiment implements an IAM Policy Evaluation Engine following standard evaluation rules:
1. **Explicit Deny**: If any matching policy contains an explicit `Deny`, access is immediately **Denied** (highest priority).
2. **Explicit Allow**: If a matching policy contains `Allow` (and no explicit `Deny` exists), access is **Allowed**.
3. **Implicit Deny**: If no matching policies grant access, the request defaults to **Denied** (Principle of Least Privilege).

---

## 🛠️ Execution Instructions

Run the IAM policy evaluation engine:
```bash
node Lab-5-Cloud-Security-IAM/iam_policy_simulator.js
```
