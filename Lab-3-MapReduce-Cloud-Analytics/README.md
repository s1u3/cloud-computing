# Lab 3: MapReduce Distributed Data Analytics

## Overview
MapReduce is a programming model and software framework originally introduced by Google for processing and generating large datasets across distributed clusters of cloud nodes.

The processing model consists of three core phases:
1. **Map Phase**: Transforms raw input records into intermediate key-value pairs `(K1, V1) -> List(K2, V2)`.
2. **Shuffle & Sort Phase**: Groups all intermediate values associated with the same key `(K2, List(V2))`.
3. **Reduce Phase**: Aggregates the grouped values to produce final summary statistics `(K2, List(V2)) -> List(K3, V3)`.

---

## 🚀 Execution Instructions

Run the MapReduce Distributed Analytics engine:
```bash
node Lab-3-MapReduce-Cloud-Analytics/mapreduce_runner.js
```
