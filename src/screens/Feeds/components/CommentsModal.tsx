import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Image,
} from "react-native";

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  timeAgo: string;
  content: string;
}

interface CommentsModalProps {
  isVisible: boolean;
  onClose: () => void;
  postId: string;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  isVisible,
  onClose,
  postId,
}) => {
  const [commentText, setCommentText] = useState("");

  // Sample comments data
  const comments: Comment[] = [
    {
      id: "1",
      user: {
        name: "Nathan-nguyen",
        avatar: "https://via.placeholder.com/40",
      },
      timeAgo: "3 min",
      content:
        "Everything you need to know about Pet in 10 minutes, everything you need to know about Pet in 10 minutes",
    },
    {
      id: "2",
      user: {
        name: "Peonit-nguyen",
        avatar: "https://via.placeholder.com/40",
      },
      timeAgo: "15 min",
      content:
        "Everything you need to know about Pet in 10 minutes, everything you need to know about Pet in 10 minutes",
    },
  ];

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.timeAgo}>{item.timeAgo}</Text>
        </View>
        <Text style={styles.commentText}>{item.content}</Text>
      </View>
    </View>
  );

  const handleSendComment = () => {
    if (commentText.trim()) {
      // Handle sending comment
      console.log("Sending comment:", commentText);
      setCommentText("");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Comments</Text>
        </View>

        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.commentsList}
        />

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={commentText}
              onChangeText={setCommentText}
              placeholder="comment message"
              placeholderTextColor="#999"
              multiline
            />
            <TouchableOpacity onPress={handleSendComment}>
              <Text style={styles.sendButton}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 16,
    color: "#ff4081",
    fontWeight: "600",
  },
  backButton: {
    fontSize: 14,
    paddingHorizontal: 8,
  },
  headerRight: {
    width: 40,
  },
  tabContainer: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    marginRight: 24,
    color: "#666",
    fontSize: 14,
  },
  activeTab: {
    color: "#ff4081",
    fontWeight: "600",
  },
  commentsList: {
    padding: 16,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
  },
  timeAgo: {
    fontSize: 12,
    color: "#666",
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    maxHeight: 100,
    padding: 0,
  },
  sendButton: {
    fontSize: 20,
    color: "#ff4081",
    marginLeft: 8,
  },
  keyboard: {
    height: 280,
    backgroundColor: "#d1d5db",
    marginTop: 16,
    borderRadius: 8,
  },
});

export default CommentsModal;
