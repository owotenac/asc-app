import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Note: In a real React Native app, you would import from:
// import { initializeApp } from 'firebase/app';

import { firestoreRealtimeDB } from "@/hooks/firebase";
import { off, onValue, ref } from 'firebase/database';

// For this demo, we'll simulate the Firebase setup
const FirebaseStatusMonitor = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [logs, setLogs] = useState<any[] | null>([]);
  const [statusMessage, setStatusMessage] = useState<string>('Ready to start');
  const [result, setResult] = useState(null);

  const unsubscribeRef = useRef<() => void | null>(null);

  useEffect(() => {

    // Cleanup on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour12: false });
  };

  const addLog = ( message: string, isComplete = false, isError = false) => {
    const newLog = {
      id: Date.now(),
      timestamp: formatTime(),
      message,
      isComplete,
      isError
    };
     setLogs(prev => prev ? [...prev, newLog] : [newLog]);
  };

  const clearLogs = () => {
    setLogs([]);
    setResult(null);
    setStatusMessage('Ready to start');
  };

  const updateStatus = (statusData: string) => {
    const   message  = statusData;

    // Update progress
    setStatusMessage(message);

    // Add to logs
    const isComplete =  message.toLowerCase().includes('completed');
    const isError = message.toLowerCase().includes('error');
    addLog( message, isComplete, isError);


    // Stop running when complete or error
    if (isComplete || isError) {
      setIsRunning(false);
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    }
  };

  const startALLComputation = async () => {
    startComputation('https://district-reader.onrender.com/api/readandstore')
  }
  const startFALExtractionComputation = async () => {
    startComputation('https://district-reader.onrender.com//api/extractfalurl')
  }




  const startComputation = async (url: string) => {
    if (isRunning)
      return
    try {
      setIsRunning(true);
      clearLogs();
      addLog('Sending request to server...', false, false);

      // Call your Flask API
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const newSessionId = result.session_id;
      setSessionId(newSessionId);

      addLog(`Session started: ${newSessionId}`, false, false);

      // Listen to status as a single value
      const statusRef = ref(firestoreRealtimeDB, 'status');
      
      const unsubscribe = onValue(statusRef, (snapshot) => {
        const statusString = snapshot.val();
        
        if (statusString) {
          try {
            const statusData = JSON.parse(statusString);
            console.log("Parsed status:", statusData);
            
            updateStatus(statusData.message);
          } 
          catch (error: any) {
            //console.error("Error parsing status:", error);
            addLog(`Error parsing status: ${error.message}`, false, true);
          }
        }
      }, (error : any) => {
        //console.error('Error listening to status:', error);
        addLog(`Error: ${error.message}`, false, true);
        setIsRunning(false);
      });
      
      unsubscribeRef.current = () => off(statusRef, 'value', unsubscribe);

    } 
    catch (error: string | any) {
      addLog(`Error: ${error.message}`, false, true);
      setIsRunning(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Firebase Status Monitor</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <Text style={styles.statusMessage}>{statusMessage}</Text>
      </View>

      {/* Start Button */}
      <TouchableOpacity
        style={[styles.button, isRunning && styles.buttonDisabled]}
        onPress={startALLComputation}
        disabled={isRunning}
      >
        <Text style={styles.buttonText}>
          {isRunning ? 'Running...' : 'Start Read And Store'}
        </Text>
        {isRunning && <ActivityIndicator color="#fff" style={styles.spinner} />}
      </TouchableOpacity>

      {/* Start Button */}
      <TouchableOpacity
        style={[styles.button, isRunning && styles.buttonDisabled]}
        onPress={startFALExtractionComputation}
        disabled={isRunning}
      >
        <Text style={styles.buttonText}>
          {isRunning ? 'Running...' : 'Start FAL Extraction'}
        </Text>
        {isRunning && <ActivityIndicator color="#fff" style={styles.spinner} />}
      </TouchableOpacity>

      {/* Logs */}
      <View style={styles.logsSection}>
        <Text style={styles.sectionTitle}>Logs</Text>
        <ScrollView style={styles.logsContainer}>
          {logs?.map((log) => (
            <View
              key={log.id}
              style={[
                styles.logEntry,
                log.isComplete && styles.logComplete,
                log.isError && styles.logError
              ]}
            >
              <Text style={styles.logTimestamp}>{log.timestamp}</Text>
              <Text style={styles.logMessage}>{log.message}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Result */}
      {result && (
        <View style={styles.resultSection}>
          <Text style={styles.sectionTitle}>Result</Text>
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              {JSON.stringify(result, null, 2)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b6b3b3ff',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  progressSection: {
    marginBottom: 20,
  },
  progressText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#90CAF9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spinner: {
    marginLeft: 10,
  },
  logsSection: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  logsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    maxHeight: 300,
  },
  logEntry: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  logComplete: {
    borderLeftColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  logError: {
    borderLeftColor: '#f44336',
    backgroundColor: '#FFEBEE',
  },
  logTimestamp: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  logProgress: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2196F3',
    marginRight: 8,
  },
  logMessage: {
    flex: 1,
    fontSize: 12,
    color: '#333',
  },
  resultSection: {
    marginTop: 10,
  },
  resultContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  resultText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#333',
  },
});

export default FirebaseStatusMonitor;