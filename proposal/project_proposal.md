# EdgeAuth AI
## Offline Facial Recognition and Liveness Detection System

### Hackathon
NHAI Hackathon 7.0

---

# Problem Statement

Develop a secure, lightweight, and fully offline facial recognition and liveness detection system that can function efficiently in remote and zero-network zones on standard mid-range mobile devices.

---

# Proposed Solution

EdgeAuth AI is an offline-first authentication system designed for field personnel working in remote highway and infrastructure environments.

The system uses lightweight on-device AI models for:
- Facial recognition
- Liveness verification
- Offline attendance logging
- Secure local storage
- Offline-to-online synchronization

The solution is optimized for Android and iOS devices using React Native.

---

# Key Features

## 1. Offline Facial Recognition
- No internet dependency
- Fast face matching
- On-device inference

## 2. Offline Liveness Detection
The application prevents spoofing using:
- Blink detection
- Smile detection
- Head movement verification

## 3. Lightweight AI Model
- TensorFlow Lite optimized
- Target model size under 20MB
- Fast inference time (<1 second)

## 4. Cross Platform Support
- Android support
- iOS support
- React Native compatibility

## 5. Secure Local Storage
- Face embeddings stored locally
- Attendance logs stored securely offline

## 6. Sync and Purge Mechanism
- Local data syncs to AWS server after connectivity restoration
- Local records are purged after successful sync

---

# Proposed Technology Stack

## Frontend
- React Native
- TypeScript

## AI/ML
- TensorFlow Lite
- MobileFaceNet
- MediaPipe Face Mesh

## Local Storage
- SQLite
- Async Storage

## Backend (Future Scope)
- AWS Sync Services

---

# System Workflow

1. User enrollment
2. Face image capture
3. Face embedding generation
4. Offline liveness verification
5. Facial authentication
6. Local attendance storage
7. Cloud synchronization after internet restoration

---

# Innovation Highlights

- Fully offline edge AI system
- Lightweight optimized mobile inference
- Real-time liveness verification
- Designed specifically for low-connectivity environments
- Privacy-focused on-device processing

---

# Expected Outcomes

- Authentication speed below 1 second
- Recognition accuracy above 95%
- Reliable performance in outdoor conditions
- Efficient operation on mid-range devices

---

# Future Scope

- Advanced anti-spoofing
- Face mask detection
- Aadhaar integration
- GPS tagging
- Voice-assisted verification

---

# Conclusion

EdgeAuth AI aims to provide a reliable, lightweight, and secure offline authentication solution for field operations in remote and zero-network zones while maintaining fast performance and high usability.
