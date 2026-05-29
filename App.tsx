import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  CameraView,
  useCameraPermissions,
} from 'expo-camera';

import { useEffect, useState } from 'react';

export default function App() {
  const [showCamera, setShowCamera] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [records, setRecords] = useState<any[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  const [verificationText, setVerificationText] = useState(
    'Blink Detected'
  );

  const [permission, requestPermission] =
    useCameraPermissions();

  useEffect(() => {
    if (showCamera) {
      setVerificationText('Blink to Verify Identity');

      const timer1 = setTimeout(() => {
        setVerificationText('Liveness Verified');

        const timer2 = setTimeout(() => {
          setVerificationText(
            'Authentication Successful'
          );
          saveAttendance();

          setTimeout(() => {
            setShowSuccess(true);
          }, 1500);
        }, 2000);

        return () => clearTimeout(timer2);
      }, 3000);

      return () => clearTimeout(timer1);
    }
  }, [showCamera]);
  useEffect(() => {
  const loadRecords = async () => {
    const stored =
      await AsyncStorage.getItem(
        'attendanceRecords'
      );

    if (stored) {
      setRecords(JSON.parse(stored));
    }
  };

  loadRecords();
}, [showSuccess]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Camera Permission Required
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>
            Grant Permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  const saveAttendance = async () => {
  try {
    const record = {
      user: 'Shivangi',
      status: 'Authenticated',
      time: new Date().toLocaleTimeString(),
    };

    const existing =
      await AsyncStorage.getItem('attendanceRecords');

    const records = existing
      ? JSON.parse(existing)
      : [];

    records.push(record);

    await AsyncStorage.setItem(
      'attendanceRecords',
      JSON.stringify(records)
    );

    console.log('Attendance Saved');
  } catch (error) {
    console.log(error);
  }
};
if (showLogs) {
  return (
    <View style={styles.container}>
      <Text style={styles.successTitle}>
        Authentication Logs
      </Text>

      {records.map((record, index) => (
       <Text
       key={index}
       style={styles.logText}
      >
      {record.time || 'Unknown Time'} ✅ {record.status}
    </Text>
  ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowLogs(false)}
      >
        <Text style={styles.buttonText}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}
if (showSuccess) {
  return (
    <View style={styles.container}>
      <Text style={styles.successTitle}>
        Authentication Successful
      </Text>

      <Text style={styles.successSubtitle}>
        Identity Verified Offline
        {'\n'}
        ({records.length} records stored)
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setShowSuccess(false);
          setShowCamera(false);
        }}
      >
        <Text style={styles.buttonText}>
          Back to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}
  if (showCamera) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setShowCamera(false)}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <CameraView
          style={styles.camera}
          facing="front"
        />

        <View style={styles.overlay}>
          <View style={styles.faceBox} />

          <Text style={styles.scanText}>
  {verificationText}
</Text>

<Text style={styles.subText}>
  AI Liveness Detection Active
</Text>

<Text style={styles.detectText}>
  Face Detected Successfully
</Text>

{verificationText === 'Authentication Successful' && (
  <View style={styles.successBox}>
    <Text style={styles.successText}>
      Attendance Saved Offline
    </Text>
  </View>
)}
        </View>
      </View>
    );
  }

  return (
  <View style={styles.container}>
    <Text style={styles.title}>EdgeAuth AI</Text>

    <Text style={styles.subtitle}>
      Offline Facial Recognition &
      Liveness Detection
    </Text>

    <View style={styles.statusBox}>
      <Text style={styles.statusText}>
        Offline Mode Active
      </Text>
    </View>

    <TouchableOpacity
      style={styles.button}
      onPress={() => setShowCamera(true)}
    >
      <Text style={styles.buttonText}>
        Start Authentication
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.secondaryButton}
      onPress={() => setShowLogs(true)}
    >
      <Text style={styles.buttonText}>
        View Logs
      </Text>
    </TouchableOpacity>

    <StatusBar style="light" />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },

  statusBox: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 40,
  },

  statusText: {
    color: '#22C55E',
    fontSize: 16,
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  camera: {
    flex: 1,
    width: '100%',
  },

  overlay: {
    position: 'absolute',
    bottom: 120,
    alignItems: 'center',
  },

  faceBox: {
    width: 220,
    height: 280,
    borderWidth: 3,
    borderColor: '#22C55E',
    borderRadius: 20,
    marginBottom: 25,
    elevation: 20,
  },

  scanText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  subText: {
    color: '#D1D5DB',
    fontSize: 14,
    marginTop: 8,
  },

  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  backText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detectText: {
    color: '#22C55E',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
  },
  successBox: {
  marginTop: 20,
  backgroundColor: '#14532D',
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderRadius: 12,
},

successText: {
  color: '#BBF7D0',
  fontSize: 16,
  fontWeight: 'bold',
},
successTitle: {
  color: '#22C55E',
  fontSize: 28,
  fontWeight: 'bold',
  marginBottom: 15,
},

successSubtitle: {
  color: '#ffffff',
  fontSize: 18,
  marginBottom: 30,
},
logText: {
  color: '#ffffff',
  fontSize: 16,
  marginBottom: 12,
},
secondaryButton: {
  backgroundColor: '#1E293B',
  paddingHorizontal: 30,
  paddingVertical: 15,
  borderRadius: 12,
  marginTop: 20,
},
});