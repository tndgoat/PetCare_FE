import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommentsModal from "../../components/Feeds/CommentsModal";
import CreatePostModal from "../../components/Feeds/CreatePostModal";

interface Post {
  _id: string;
  type: string;
  content: string;
  title: string;
  description: string;
  image: string;
  location?: string;
  fbLink?: string;
  phoneNo?: string;
  likes: number;
  comments: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

type TabType = "all_news" | "moment" | "knowledge" | "lostpet";

const tabs: { id: TabType; label: string }[] = [
  { id: "all_news", label: "All news" },
  { id: "moment", label: "Moments" },
  { id: "knowledge", label: "Knowledge" },
  { id: "lostpet", label: "Lost pet" },
];

const API_URL = "https://petcare-sdbq.onrender.com/api/v1";

const FeedsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all_news");
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("access_token");

      let url = `${API_URL}/posts`;
      if (activeTab !== "all_news") {
        const type = activeTab === "moment" ? "moment" : activeTab;
        url += `?type=${type}`;
      }

      const response = await axios.get(url, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(response.data);

      console.log(response.data.length);
    } catch (error) {
      console.error("Error fetching posts:", error);
      Alert.alert("Error", "Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

  const handleCreatePost = async (postData: any) => {
    try {
      await fetchPosts(); // Refresh posts after creating new one
      setIsCreatePostVisible(false);
    } catch (error) {
      console.error("Error refreshing posts:", error);
      Alert.alert("Error", "Failed to refresh posts");
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const renderRegularPost = (post: Post) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/019/896/012/small_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>User</Text>
            <Text style={styles.timeAgo}>{formatTimeAgo(post.createdAt)}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.postType}>{post.type}</Text>
        </View>
      </View>
      <Text style={styles.postContent}>{post.content}</Text>
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>{post.likes} likes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            setSelectedPostId(post._id);
            setIsCommentsVisible(true);
          }}
        >
          <Text style={styles.actionText}>{post.comments} comments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLostPetPost = (post: Post) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/019/896/012/small_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>User</Text>
            <Text style={styles.timeAgo}>{formatTimeAgo(post.createdAt)}</Text>
          </View>
        </View>
      </View>

      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      <View style={styles.lostPetInfo}>
        <Text style={styles.infoLabel}>Description:</Text>
        <Text style={styles.infoText}>{post.description}</Text>

        {post.phoneNo && (
          <>
            <Text style={styles.infoLabel}>Phone number:</Text>
            <Text style={styles.infoText}>{post.phoneNo}</Text>
          </>
        )}

        {post.location && (
          <>
            <Text style={styles.infoLabel}>Lost location:</Text>
            <Text style={styles.infoText}>{post.location}</Text>
          </>
        )}
      </View>

      <View style={styles.lostPetActions}>
        {post.phoneNo && (
          <TouchableOpacity style={styles.phoneButton}>
            <Text style={styles.phoneButtonText}>📞</Text>
          </TouchableOpacity>
        )}
        {post.fbLink && (
          <TouchableOpacity style={styles.connectButton}>
            <Text style={styles.connectButtonText}>Connect</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPost = ({ item }: { item: Post }) => {
    return item.type === "lostpet"
      ? renderLostPetPost(item)
      : renderRegularPost(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={styles.tabButton}
          >
            <Text
              style={[styles.tabText, activeTab === tab.id && styles.activeTab]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => setIsCreatePostVisible(true)}
      >
        <TextInput
          style={styles.searchInput}
          placeholder={`Share your ${activeTab.replace("_", " ")}...`}
          placeholderTextColor="#666"
          editable={false}
        />
        <TouchableOpacity
          style={styles.imageButton}
          onPress={() => setIsCreatePostVisible(true)}
        >
          <Text>🖼️</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator style={styles.loader} color="#ff4081" />
      ) : (
        <FlatList
          data={posts.reverse()}
          renderItem={renderPost}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          onRefresh={fetchPosts}
          refreshing={isLoading}
        />
      )}

      <CreatePostModal
        isVisible={isCreatePostVisible}
        onClose={() => setIsCreatePostVisible(false)}
        onSubmit={handleCreatePost}
      />

      {selectedPostId && (
        <CommentsModal
          isVisible={isCommentsVisible}
          onClose={() => {
            setIsCommentsVisible(false);
            setSelectedPostId(null);
          }}
          postId={selectedPostId}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabs: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: 10,
    width: "100%",
  },
  tabButton: {
    width: "25%",
  },
  postType: {
    color: "#666",
    textAlign: "center",
    textTransform: "capitalize",
  },
  tabText: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
    width: "100%",
  },
  activeTab: {
    color: "#ff4081",
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  imageButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
  },
  timeAgo: {
    fontSize: 14,
    color: "#666",
  },
  closeButton: {
    fontSize: 18,
    color: "#666",
  },
  postContent: {
    fontSize: 14,
    marginBottom: 12,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  actionText: {
    fontSize: 14,
    color: "#666",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  navButton: {
    padding: 8,
  }, // Lost pet specific styles
  lostPetInfo: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    paddingLeft: 10,
  },
  lostPetActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  connectButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  connectButtonText: {
    color: "#666",
    fontSize: 14,
  },
  phoneButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneButtonText: {
    color: "#666",
    fontSize: 14,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  shareButtonText: {
    color: "#666",
    fontSize: 14,
  },
  activeNavButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
});

export default FeedsScreen;
