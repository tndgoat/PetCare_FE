import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
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
  Alert,
} from "react-native";

// API configuration
const API_BASE_URL = "https://petcare-sdbq.onrender.com/api/v1";

// API functions
const getCommentsForPost = async (postId: string, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

const addComment = async (postId: string, content: string, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/comments`, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        content,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add comment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

interface User {
  _id: string;
  name: string;
  avatar: string;
}

interface Comment {
  _id: string;
  content: string;
  userId: User;
  postId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const commentDate = new Date(dateString);
  const diffInMinutes = Math.floor(
    (now.getTime() - commentDate.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};
interface CommentsModalProps {
  isVisible: boolean;
  onClose: () => void;
  postId: string;
  refetch: () => void;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  isVisible,
  onClose,
  postId,
  refetch = () => {},
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isVisible) {
      console.log("Hell minhhieu");
      fetchComments();
    }
  }, [isVisible]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("access_token");
      const response = await getCommentsForPost(postId, token);
      setComments(response || []);

      console.log(response);
    } catch (error) {
      Alert.alert("Error", "Failed to load comments");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendComment = async () => {
    if (commentText.trim()) {
      try {
        setIsLoading(true);
        const token = await AsyncStorage.getItem("access_token");
        await addComment(postId, commentText.trim(), token);
        setCommentText("");
        await fetchComments();
      } catch (error) {
        Alert.alert("Error", "Failed to add comment");
      } finally {
        setIsLoading(false);
        refetch();
      }
    }
  };

  // Updated render function to use the new type
  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <Image source={{ uri: item.userId.avatar }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.userName}>{item.userId.name}</Text>
          <Text style={styles.timeAgo}>{formatTimeAgo(item.createdAt)}</Text>
        </View>
        <Text style={styles.commentText}>{item.content}</Text>
      </View>
    </View>
  );

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
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.commentsList}
          refreshing={isLoading}
          onRefresh={fetchComments}
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
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={handleSendComment}
              disabled={isLoading || !commentText.trim()}
            >
              <Text
                style={[
                  styles.sendButton,
                  (!commentText.trim() || isLoading) && { opacity: 0.5 },
                ]}
              >
                ➤
              </Text>
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
