"""
Sysbench Log Analyzer & Report Generator
Parses standard terminal outputs from Sysbench CPU benchmarks and prints structured metrics tables.
"""

import re
import json

SAMPLE_SYSBENCH_LOG = """
sysbench 1.0.20 (using system OpenSSL 3.0.2 15 Mar 2022)

Running the test with following options:
Number of threads: 2
Prime numbers limit: 20000

Initializing random number generator from current time


Prime numbers limit: 20000

Execution time:
    total time:                          10.0006s
    total number of events:              16903

Latency (ms):
         min:                                    0.57
         avg:                                    0.59
         max:                                    1.09
         95th percentile:                        0.65
         sum:                                 10000.12

Threads fairness:
    events (avg/stddev):           8451.5000/12.50
    execution time (avg/stddev):   10.0001/0.00
"""

def parse_sysbench_output(log_text: str) -> dict:
    """Parses raw sysbench stdout text into a clean Python dictionary."""
    metrics = {}
    
    # Extract total execution time
    time_match = re.search(r"total time:\s+([\d\.]+)s", log_text)
    if time_match:
        metrics["total_time_sec"] = float(time_match.group(1))
        
    # Extract total events
    events_match = re.search(r"total number of events:\s+(\d+)", log_text)
    if events_match:
        metrics["total_events"] = int(events_match.group(1))
        
    # Extract latencies
    min_lat = re.search(r"min:\s+([\d\.]+)", log_text)
    avg_lat = re.search(r"avg:\s+([\d\.]+)", log_text)
    max_lat = re.search(r"max:\s+([\d\.]+)", log_text)
    p95_lat = re.search(r"95th percentile:\s+([\d\.]+)", log_text)
    
    if min_lat and avg_lat and max_lat and p95_lat:
        metrics["latency_ms"] = {
            "min": float(min_lat.group(1)),
            "avg": float(avg_lat.group(1)),
            "max": float(max_lat.group(1)),
            "p95": float(p95_lat.group(1))
        }
        
    if "total_events" in metrics and "total_time_sec" in metrics:
        metrics["events_per_second"] = round(metrics["total_events"] / metrics["total_time_sec"], 2)
        
    return metrics

if __name__ == "__main__":
    print("Parsing Sysbench Output Log...")
    parsed_data = parse_sysbench_output(SAMPLE_SYSBENCH_LOG)
    print("\nParsed Metrics JSON:")
    print(json.dumps(parsed_data, indent=2))
