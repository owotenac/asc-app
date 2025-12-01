import React, { useEffect, useRef, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Install: npm install react-native-sse
import EventSource from 'react-native-sse';

const API_BASE_URL = 'https://district-reader.onrender.com'; // Change to your IP for physical devices
//const API_BASE_URL = 'http://localhost:5000'; // Change to your IP for physical devices

const ReadAndStoreMonitor = () => {
  interface LogEntry {
    message: string;
    timestamp: string;
    isError?: boolean;
  }

  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

const addLog = (message: string, isError = false): void => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev: LogEntry[]) => [
        ...prev,
        { message, timestamp, isError },
    ]);
};

  const startProcess = () => {
    // Clear previous logs
    setLogs([]);
    setIsRunning(true);
    addLog('Starting process...');

    // Create EventSource connection
    const eventSource = new EventSource(`${API_BASE_URL}/readandstore`);

    eventSource.addEventListener('message', (event) => {
      try {
        const raw = event.data;
        if (!raw) {
          addLog('Received empty message from SSE', true);
          return;
        }
        const data = JSON.parse(raw);
        addLog(data.status || data.message || JSON.stringify(data));

        // Check if completed
        if (data.status === 'completed' || data.status === 'Read and Store OK') {
          addLog('✅ Process completed successfully!');
          stopProcess();
        }
      } catch (error: any) {
        console.error('Error parsing SSE data:', error);
        addLog(`Error: ${error?.message || String(error)}`, true);
      }
    });

    eventSource.addEventListener('error', (error) => {
      console.error('SSE Error:', error);
      addLog('❌ Connection error', true);
      stopProcess();
    });

    eventSource.addEventListener('open', () => {
      addLog('✅ Connected to server');
    });

    eventSourceRef.current = eventSource;
  };

  const stopProcess = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setIsRunning(false);
    addLog('Connection closed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Read and Store Monitor</Text>

      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.startButton, isRunning && styles.buttonDisabled]}
          onPress={startProcess}
          disabled={isRunning}
        >
          <Text style={styles.buttonText}>
            {isRunning ? 'Running...' : 'Start Process'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.stopButton, !isRunning && styles.buttonDisabled]}
          onPress={stopProcess}
          disabled={!isRunning}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>

      {/* Logs Display */}
      <View style={styles.logsContainer}>
        <Text style={styles.logsTitle}>Logs:</Text>
        <ScrollView
          ref={scrollViewRef}
          style={styles.logsList}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {logs.length === 0 ? (
            <Text style={styles.emptyText}>No logs yet. Click "Start Process" to begin.</Text>
          ) : (
            logs.map((log, index) => (
              <View key={index} style={[styles.logItem, log.isError && styles.logItemError]}>
                <Text style={styles.timestamp}>[{log.timestamp}]</Text>
                <Text style={[styles.logText, log.isError && styles.logTextError]}>
                  {log.message}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    //backgroundColor: '#fff',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: "white"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  startButton: {
    backgroundColor: '#007bff',
  },
  stopButton: {
    backgroundColor: '#dc3545',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logsContainer: {
    flex: 1,
  },
  logsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"white"
  },
  logsList: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  logItem: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#007bff',
  },
  logItemError: {
    borderLeftColor: '#dc3545',
    backgroundColor: '#fff5f5',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  logText: {
    fontSize: 14,
    color: '#333',
  },
  logTextError: {
    color: '#dc3545',
  },
});

export default ReadAndStoreMonitor;