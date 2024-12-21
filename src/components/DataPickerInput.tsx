import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";
import { Control, Controller } from "react-hook-form";

interface DatePickerFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  error?: string;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  control,
  name,
  label,
  error,
}) => {
  const [open, setOpen] = useState(false);

  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>

          <TouchableOpacity
            style={[styles.input, error ? styles.inputError : null]}
            onPress={() => setOpen(true)}
          >
            <Text style={value ? styles.dateText : styles.placeholderText}>
              {value ? formatDate(value) : "Select date"}
            </Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>

          <DatePicker
            modal
            mode="date"
            open={open}
            date={value ? new Date(value) : new Date()}
            onConfirm={(date) => {
              setOpen(false);
              onChange(date.toISOString().split("T")[0]);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            maximumDate={new Date()} // Không cho chọn ngày trong tương lai
            androidVariant="nativeAndroid"
          />

          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#FF69B4",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputError: {
    borderColor: "#FF0000",
  },
  dateText: {
    fontSize: 16,
    color: "#000000",
  },
  placeholderText: {
    fontSize: 16,
    color: "#999999",
  },
  calendarIcon: {
    fontSize: 16,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 4,
  },
});
