# API Rate Limiter Project

## Overview

This project implements an Express.js API with a custom rate limiting solution using Redis. It features basic authentication, different rate limits for public and private routes, and the ability to handle high concurrency.

## Features

- **Basic Authentication Middleware**: Secure routes with a simple token-based authentication system.

- **Public and Private Routes**: Separate handling for public (unauthenticated) and private (authenticated) API endpoints.

- **Custom Rate Limiter**: A Redis-backed rate limiter that differentiates between public IP-based and private token-based rate limiting.

- **Configurable Rate Limits**: Set different rate limits for public and private routes via environment variables.

- **Scalability**: Support for scaling the API service to handle high loads.

- **Load Testing**: Integration with Grafana/k6 for conducting load tests to evaluate the API's performance under stress.

## Getting Started

### Prerequisites

- Docker and Docker Compose

- Bash (for running scripts)

### Setup

1\. **Clone the Repository**:

```bash
git clone git@github.com:torocatala/customratelimitertask.git
cd customratelimitertask
```

2\. **Build and Run the Services**:

```bash
./start.sh [scale]
```

Use the optional `scale` parameter to specify the number of API instances.

3\. **Environment Configuration**:

Set the following environment variables for rate limiting configuration (in `.env` file or directly in `docker-compose.yml`):

- `PUBLIC_MAX_REQUESTS`: Max requests per hour for public routes.

- `PRIVATE_MAX_REQUESTS`: Max requests per hour for private routes.

- `PUBLIC_WINDOW_SECONDS`: Time window for rate limit calculation in public routes.

- `PRIVATE_WINDOW_SECONDS`: Time window for rate limit calculation in private routes.

### Running the Load Test

1\. **Run Load Test Script**:

```bash
./run_load_test.sh
```

This script executes the k6 load test within the Docker network.

2\. **Load Test Configuration**:

Modify `k6script.js` to adjust the virtual users and test duration.

## API Endpoints

- **Public Routes**: Accessible without authentication.

  - `GET /public/resource/one`

  - ...

- **Private Routes**: Require a valid token in the `authorization` header.

  - `GET /private/resource/four`

  - ...

## Load Testing

The project is set up for load testing with Grafana/k6. The `k6script.js` contains the load test configuration. Adjust the script for custom test scenarios.

## Scaling the API

Use the `start.sh` script with a scale parameter to launch multiple instances of the API service, which are automatically load-balanced.

## Docker Compose Round Robin Load Balancing
Docker Compose's default networking setup uses an internal DNS server to provide service discovery. When you have a scaled service and another service (or an external container on the same network) tries to connect to it using its service name, Docker performs internal load balancing. It uses a simple round-robin algorithm to distribute incoming requests across all running instances of the service.

For example, if you have api scaled to 3 instances and a request is made to http://api:3000, Docker will forward the request to one of the api instances. The next request to the same address will go to the next instance, and so on, cycling through all available instances.