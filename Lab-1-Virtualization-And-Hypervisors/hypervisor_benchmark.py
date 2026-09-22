"""
Hypervisor Performance Benchmarking Utility
Simulates & measures CPU prime number computation speed, memory allocation throughput,
and latency metrics across virtualized guest environments.
"""

import time
import math
import sys

def benchmark_cpu(prime_limit: int = 20000) -> dict:
    """Computes prime numbers up to prime_limit to measure vCPU computation latency."""
    start_time = time.perf_counter()
    primes = []
    
    for num in range(2, prime_limit):
        is_prime = True
        for i in range(2, int(math.isqrt(num)) + 1):
            if num % i == 0:
                is_prime = False
                break
        if is_prime:
            primes.append(num)
            
    end_time = time.perf_counter()
    elapsed_time = end_time - start_time
    events_per_sec = len(primes) / elapsed_time if elapsed_time > 0 else 0
    
    return {
        "prime_limit": prime_limit,
        "primes_found": len(primes),
        "execution_time_sec": round(elapsed_time, 4),
        "throughput_events_sec": round(events_per_sec, 2),
        "avg_latency_ms": round((elapsed_time / len(primes)) * 1000, 4) if primes else 0
    }

def benchmark_memory(block_size_mb: int = 64, iterations: int = 50) -> dict:
    """Allocates and writes to memory blocks to benchmark RAM access bandwidth."""
    start_time = time.perf_counter()
    total_bytes = 0
    
    for _ in range(iterations):
        # Create a block of memory
        data = bytearray(block_size_mb * 1024 * 1024)
        total_bytes += len(data)
        del data
        
    end_time = time.perf_counter()
    elapsed_time = end_time - start_time
    mb_processed = total_bytes / (1024 * 1024)
    bandwidth_mb_sec = mb_processed / elapsed_time if elapsed_time > 0 else 0
    
    return {
        "total_mb_processed": mb_processed,
        "execution_time_sec": round(elapsed_time, 4),
        "memory_bandwidth_mb_sec": round(bandwidth_mb_sec, 2)
    }

if __name__ == "__main__":
    print("=" * 60)
    print(" 🖥️  CLOUD VIRTUALIZATION BENCHMARK SUITE")
    print("=" * 60)
    
    print("\n[1/2] Running CPU Prime Computation Benchmark...")
    cpu_res = benchmark_cpu(prime_limit=25000)
    print(f"  • Execution Time    : {cpu_res['execution_time_sec']} s")
    print(f"  • Primes Found      : {cpu_res['primes_found']}")
    print(f"  • Throughput        : {cpu_res['throughput_events_sec']} events/sec")
    print(f"  • Average Latency   : {cpu_res['avg_latency_ms']} ms")
    
    print("\n[2/2] Running Memory Allocation Throughput Benchmark...")
    mem_res = benchmark_memory(block_size_mb=32, iterations=40)
    print(f"  • Total Processed   : {mem_res['total_mb_processed']} MB")
    print(f"  • Execution Time    : {mem_res['execution_time_sec']} s")
    print(f"  • RAM Bandwidth     : {mem_res['memory_bandwidth_mb_sec']} MB/sec")
    print("\n=" * 60)
