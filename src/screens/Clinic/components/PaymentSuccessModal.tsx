import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

interface PaymentSuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

const PaymentSuccessModal = ({
  visible,
  onClose,
}: PaymentSuccessModalProps) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.checkmarkContainer}>
            <Text style={styles.checkmark}>✓</Text>
          </View>

          <Text style={styles.title}>Payment Success</Text>

          <Text style={styles.message}>
            Your payment has been successful,{"\n"}
            you can have a consultation session{"\n"}
            with your trusted doctor.
          </Text>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  checkmarkContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e8f5e9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  checkmark: {
    color: "#4caf50",
    fontSize: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  message: {
    textAlign: "center",
    color: "#666",
    lineHeight: 20,
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: "#e91e63",
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default PaymentSuccessModal;
