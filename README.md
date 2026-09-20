# SecureNotes Portal — Full-Stack DevSecOps & K8s Architecture

[![DevSecOps CI Pipeline](https://github.com/Rahmatullah7866/devsecops-fullstack-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Rahmatullah7866/devsecops-fullstack-portfolio/actions/workflows/ci.yml)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-5.x-092E20?logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Coverage](https://img.shields.io/badge/Coverage-99%25-brightgreen)
![Security](https://img.shields.io/badge/Security-Shift--Left-red)

A secure, production-hardened full-stack application built with **React (TypeScript)**, **Django REST Framework**, **Docker**, and **Kubernetes**. Engineered with a strict **DevSecOps "Shift-Left" CI/CD pipeline** that automates static code analysis (SAST), software composition analysis (SCA), dynamic vulnerability testing (DAST), container scanning, and Infrastructure as Code (IaC) compliance.

---

## 🏛 Architecture & Security Pipeline

```text
[ Developer Commit / PR ]
           │
           ▼
┌────────────────────────────────────────────────────────────┐
│                    GitHub Actions CI/CD                    │
├──────────────────────────────┬─────────────────────────────┤
│ 1. Code Quality & Linters    │ Flake8, Black, ESLint       │
│ 2. SAST (Static Analysis)    │ Bandit (AST Inspection)     │
│ 3. SCA (Dependency Audit)    │ pip-audit (CVE Database)    │
│ 4. Unit & Coverage Testing   │ Pytest + Coverage.py (99%)  │
│ 5. IaC Security Enforcement  │ Checkov (CIS K8s Benchmarks)│
│ 6. Container Hardening       │ Multi-stage, Non-Root UIDs  │
│ 7. Dynamic Testing (DAST)    │ OWASP ZAP Baseline Scanner  │
└──────────────────────────────┴─────────────────────────────┘
           │
           ▼
[ Hardened Kubernetes Deployment (Zero-Trust NetworkPolicies) ]