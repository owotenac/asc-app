import React, { useState } from 'react';

import {
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Conditionally import DateTimePicker only for native platforms
let DateTimePicker: any = null;
if (Platform.OS !== 'web') {
  DateTimePicker = require('@react-native-community/datetimepicker').default;
}

interface DatePickerProps {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
}

const DatePickerCP: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  mode = 'date',
  minimumDate,
  maximumDate,
  disabled = false,
}) => {
  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState(value);

  const formatDate = (date: Date): string => {
    if (mode === 'time') {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (mode === 'datetime') {
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatForInput = (date: Date): string => {
    if (mode === 'time') {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else if (mode === 'datetime') {
      const dateStr = date.toISOString().slice(0, 16);
      return dateStr;
    }
    return date.toISOString().slice(0, 10);
  };

  const handleWebChange = (event: any) => {
    const newDate = new Date(event.target.value);
    if (!isNaN(newDate.getTime())) {
      onChange(newDate);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
      if (event.type === 'set' && selectedDate) {
        onChange(selectedDate);
      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const handleIOSConfirm = () => {
    onChange(tempDate);
    setShow(false);
  };

  const handleIOSCancel = () => {
    setTempDate(value);
    setShow(false);
  };

  // Web version
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <input style={styles.web}
          type="date"
          value={formatForInput(value)}
          onChange={handleWebChange}
          disabled={disabled}
          min={minimumDate ? formatForInput(minimumDate) : undefined}
          max={maximumDate ? formatForInput(maximumDate) : undefined}
        />
         <style>{`
            .date-picker-input::-webkit-calendar-picker-indicator {
              cursor: pointer;
              color:'black'
            }
            .date-picker-input::-webkit-calendar-picker-indicator:hover {
              opacity: 1;
            }
            .date-picker-input:disabled::-webkit-calendar-picker-indicator {
              opacity: 0.3;
              cursor: not-allowed;
            }
          `}</style>        
      </View>
    );
  }

  // Native version (iOS/Android)
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.input, disabled && styles.inputDisabled]}
        onPress={() => !disabled && setShow(true)}
        disabled={disabled}
      >
        <Text style={[styles.inputText, disabled && styles.inputTextDisabled]}>
          {formatDate(value)}
        </Text>
      </TouchableOpacity>

      {Platform.OS === 'ios' ? (
        <Modal
          visible={show}
          transparent
          animationType="slide"
          onRequestClose={() => setShow(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={handleIOSCancel}>
                  <Text style={styles.modalButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleIOSConfirm}>
                  <Text style={[styles.modalButton, styles.modalButtonConfirm]}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempDate}
                mode={mode}
                display="spinner"
                onChange={handleDateChange}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
              />
            </View>
          </View>
        </Modal>
      ) : (
        show && (
          <DateTimePicker
            value={value}
            mode={mode}
            display="default"
            onChange={handleDateChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  webInput: {
    fontSize: 16,
    //color: '#333',
    outlineStyle: 'solid',
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
  },
  inputText: {
    fontSize: 16,
    //color: '#333',
  },
  inputTextDisabled: {
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  modalButtonConfirm: {
    fontWeight: '600',
  },
  web: {
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            padding: 12,
            backgroundColor:'#fff',
            fontSize: 16,
            color: '#333',
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
  }
});

export default DatePickerCP;