# Lab 4: Containerization & Microservice Orchestration

## Overview
Containerization provides OS-level virtualization, allowing microservice applications to run in isolated user-space containers sharing the host OS kernel.

This lab demonstrates:
1. **Docker Containerization**: Building lightweight, multi-stage container images.
2. **Container Orchestration**: Linking microservices using `docker-compose` (Node.js REST API + Redis In-Memory Cache).

---

## 🏗️ Microservice Architecture

```
                      +-----------------------------+
                      |   Client / HTTP Request     |
                      +--------------+--------------+
                                     |
                                     v
                      +--------------+--------------+
                      |    Node.js Express App      |
                      |   Container (Port 3000)     |
                      +--------------+--------------+
                                     |
                                     v
                      +--------------+--------------+
                      |      Redis Cache Store      |
                      |   Container (Port 6379)     |
                      +-----------------------------+
```

---

## 🛠️ Execution Instructions

### Local Node.js Execution
```bash
node Lab-4-Containerization-Microservices/app.js
```

### Docker Compose Orchestration
```bash
cd Lab-4-Containerization-Microservices
docker-compose up --build
```
