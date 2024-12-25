import React, { useState, useEffect, useCallback } from "react";
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
  Linking,
  AccessibilityInfo,
} from "react-native";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommentsModal from "../../components/Feeds/CommentsModal";
import CreatePostModal from "../../components/Feeds/CreatePostModal";
import { Heart, LeafyGreen } from "lucide-react-native";

interface Post {
  _id: string;
  type: "moment" | "knowledge" | "lostpet";
  content: string;
  title: string;
  description: string;
  image: string;
  location?: string;
  fbLink?: string;
  phoneNo?: string;
  likes: number;
  comments: number;
  userId: any;
  createdAt: string;
  updatedAt: string;
}

interface PostLikeResponse {
  result: {
    postId: string;
    likes: number;
  };
}

type TabType = "all_news" | "moment" | "knowledge" | "lostpet";

const tabs: Array<{ id: TabType; label: string }> = [
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
  const [refetch, setRefetch] = useState(false);
  const [postHasLikeList, setPostHasLikeList] = useState<string[]>([]);

  const fetchPosts = useCallback(async () => {
    const abortController = new AbortController();

    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("access_token");
      if (!token) throw new Error("No authentication token found");

      const url = `${API_URL}/posts${
        activeTab !== "all_news" ? `?type=${activeTab}` : ""
      }`;

      const response = await axios.get<Post[]>(url, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
        signal: abortController.signal,
      });

      setPosts(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert(
          "Error",
          error.response?.data?.message || "Failed to load posts"
        );
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }

    return () => abortController.abort();
  }, [activeTab]);

  useEffect(() => {
    const getLikeList = async () => {
      try {
        const response = await axios.get(
          "https://petcare-sdbq.onrender.com/api/v1/posts/likes",
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem(
                "access_token"
              )}`,
            },
          }
        );
        setPostHasLikeList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getLikeList();
  }, [refetch]);

  useEffect(() => {
    const fetchData = fetchPosts();
    return () => {
      fetchData.then((cleanup) => cleanup?.());
    };
  }, [fetchPosts, refetch]);

  const handleCreatePost = async (postData: Partial<Post>) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      await axios.post(`${API_URL}/posts`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      await fetchPosts();
      setIsCreatePostVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to create post");
    }
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const handleLike = async (postId: string) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await axios.post<PostLikeResponse>(
        `${API_URL}/posts/likes`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.result.postId) {
        setRefetch(!refetch);
      }
    } catch (error) {}
  };

  const handleExternalLink = async (
    url: string,
    type: "facebook" | "phone"
  ) => {
    try {
      const linkUrl =
        type === "phone" ? `tel:${url.replace(/[^\d]/g, "")}` : url;
      const canOpen = await Linking.canOpenURL(linkUrl);

      if (!canOpen) {
        throw new Error(`Unable to open ${type} link`);
      }

      Alert.alert(
        type === "phone" ? "Make a call" : "Open Facebook",
        type === "phone"
          ? `Do you want to call ${url}?`
          : "Do you want to open this Facebook profile?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: type === "phone" ? "Call" : "Open",
            onPress: () => Linking.openURL(linkUrl),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  const renderPost = ({ item: post }: { item: Post }) => {
    const PostHeader = () => (
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri:
                post.userId.avatar ||
                "https://static.vecteezy.com/system/resources/thumbnails/019/896/012/small_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
            }}
            style={styles.avatar}
            accessibilityLabel="User avatar"
          />
          <View>
            <Text style={styles.userName}>{post.userId.name || "User"}</Text>
            <Text style={styles.timeAgo}>{formatTimeAgo(post.createdAt)}</Text>
          </View>
        </View>
        {post.type !== "lostpet" && (
          <Text style={styles.postType}>{post.type}</Text>
        )}
      </View>
    );

    if (post.type === "lostpet") {
      return (
        <View style={styles.postContainer}>
          <PostHeader />
          {post.image && (
            <Image
              source={{ uri: post.image }}
              style={styles.postImage}
              accessibilityLabel="Lost pet image"
            />
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
              <TouchableOpacity
                style={styles.phoneButton}
                onPress={() => handleExternalLink(post.phoneNo!, "phone")}
                accessibilityLabel="Call phone number"
              >
                <Text style={styles.phoneButtonText}>📞</Text>
              </TouchableOpacity>
            )}
            {post.fbLink && (
              <TouchableOpacity
                style={styles.connectButton}
                onPress={() => handleExternalLink(post.fbLink!, "facebook")}
                accessibilityLabel="Open Facebook profile"
              >
                <Text style={styles.connectButtonText}>Connect</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.postContainer}>
        <PostHeader />
        <Text style={styles.postContent}>{post.content}</Text>
        {post.image && (
          <Image
            source={{ uri: post.image }}
            style={styles.postImage}
            accessibilityLabel="Post image"
          />
        )}
        <View style={styles.postActions}>
          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => handleLike(post._id)}
          >
            <Heart
              size={24}
              color={postHasLikeList.includes(post._id) ? "#FF69B4" : "#666"}
              fill={postHasLikeList.includes(post._id) ? "#FF69B4" : "none"}
            />
            <Text style={styles.likeCount}>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              setSelectedPostId(post._id);
              setIsCommentsVisible(true);
            }}
            accessibilityLabel={`View ${post.comments} comments`}
          >
            <Text style={styles.actionText}>{post.comments} Comments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={styles.tabButton}
            accessibilityLabel={`Switch to ${tab.label} tab`}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === tab.id }}
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
        accessibilityLabel="Create new post"
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
          accessibilityLabel="Add image to post"
        >
          <Text>🖼️</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator style={styles.loader} color="#ff4081" />
      ) : (
        <FlatList
          data={posts}
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
          refetch={() => setRefetch(!refetch)}
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
  },
  likeCount: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    paddingHorizontal: 10,
  },
  connectButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  connectButtonText: {
    color: "#666",
    fontWeight: 600,
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
    fontWeight: 600,
    fontSize: 14,
  },
  activeNavButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
});

export default FeedsScreen;
