import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Install: npm install react-native-sse

const API_BASE_URL = 'https://district-reader.vercel.app/'; // Change to your IP for physical devices
//const API_BASE_URL = 'http://localhost:5000'; // Change to your IP for physical devices

const ReadAndStoreMonitor = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/readandstore`);

      if (!response.ok) {
        throw new Error('Unable to call API');
      }

      const json = await response.json();
      setData(json);
      console.log('Process completed successfully:', json);
    } catch (err) {
      setError((err as Error).message);
      console.log('Process failed:', err);
    } finally {
      setLoading(false);
    }
  };


  // Cleanup on unmount
  useEffect(() => {

  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Read and Store Monitor</Text>

      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.startButton, loading && styles.buttonDisabled]}
          onPress={fetchData}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Running...' : 'Start Process'}
          </Text>
        </TouchableOpacity>
    </View>
      <View style={styles.logview}>
        {data && (
          <>
          <Text style={{ color: 'lightgreen' }}>Process completed successfully!</Text>
          <Text>Details: {JSON.stringify(data)}</Text>
          </>
        )}


        {error !== "" && (
          <Text style={{ color: 'red' }}>Error: {error}</Text>
        )}
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
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logview: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffffff',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  }

});

export default ReadAndStoreMonitor;