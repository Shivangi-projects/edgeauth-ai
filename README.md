# EdgeAuth AI

An offline facial recognition and liveness detection system designed for remote and zero-network environments for NHAI Hackathon 7.0.

## Problem Statement
Develop a lightweight, secure, and fully offline facial recognition and liveness detection system compatible with React Native applications on Android and iOS devices.

## Key Features
- Offline facial recognition
- Offline liveness detection
- React Native integration
- Lightweight AI model (<20MB target)
- Fast inference (<1 second)
- Local secure storage
- Offline-to-online sync mechanism
- AWS sync support

## Proposed Tech Stack
### Frontend
- React Native
- TypeScript

### AI/ML
- TensorFlow Lite
- MobileFaceNet
- MediaPipe Face Mesh

### Storage
- SQLite
- Async Storage

## Workflow
1. User face enrollment
2. Face embedding generation
3. Offline liveness verification
4. Facial authentication
5. Local attendance storage
6. AWS sync after connectivity restoration

## Objective
To provide secure and reliable field authentication in low-connectivity and remote highway environments.

## Status
Proposal Phase 🚀
