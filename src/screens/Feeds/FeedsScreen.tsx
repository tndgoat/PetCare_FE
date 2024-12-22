import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
import CommentsModal from "./components/CommentsModal";
import CreatePostModal from "./components/CreatePostModal";
interface Post {
  id: string;
  type: "regular" | "lost";
  user: {
    name: string;
    avatar: string;
  };
  timeAgo: string;
  content?: string;
  image: string;
  likes?: number;
  comments?: number;
  lostPetInfo?: {
    description: string;
    lostDate: string;
    location: string;
    contactNumber: string;
  };
}

const posts = [
  {
    id: "1",
    type: "regular",
    category: "moments",
    user: {
      name: "Nathan-nguyen",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/019/896/012/small_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    },
    timeAgo: "3d ago",
    content: "PetCare, accompanying you in a world of world of healthy pets",
    image:
      "https://media.istockphoto.com/id/1370365587/photo/big-eyed-naughty-obese-cat-looking-at-the-target.webp?a=1&b=1&s=612x612&w=0&k=20&c=-DLMf4LkybC-FODZc7mG4DZwPQLLekw1gACS3Zb4DeY=",
    likes: 12,
    comments: 3,
  },
  {
    id: "2",
    type: "regular",
    category: "knowledge",
    user: {
      name: "Nathan-nguyen",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT05xWs0JhUIni-FTckotyQExS9Na-OEz_SIm1EWLH5IPfCttMOWNDyc465PYSGtkWKxls&usqp=CAU",
    },
    timeAgo: "3d ago",
    content: "PetCare, accompanying you in a world of world of healthy pets",
    image:
      "https://images.unsplash.com/photo-1494256997604-768d1f608cac?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 8,
    comments: 2,
  },
  {
    id: "3",
    type: "lost",
    category: "lost_pet",
    user: {
      name: "Nathan-nguyen",
      avatar: "https://via.placeholder.com/40",
    },
    timeAgo: "3d ago",
    image:
      "https://images.ctfassets.net/gynu23gx3hnw/7spXkQpjj64edprZ7XP0PR/d268438fb78b2313b08ce104553ac062/Lost_Dog_Poster_for_Flaco.jpeg?w=750&fm=webp",
    lostPetInfo: {
      description:
        "I'm looking for a cat like the one in the photo, which was lost on 3/5/2024",
      lostDate: "3/5/2024",
      location: "Bach Khoa University, Di An, Binh Duong",
      contactNumber: "0444422222",
    },
  },
];

type TabType = "all_news" | "moments" | "knowledge" | "lost_pet";

const tabs: { id: TabType; label: string }[] = [
  { id: "all_news", label: "All news" },
  { id: "moments", label: "Moments" },
  { id: "knowledge", label: "Knowledge" },
  { id: "lost_pet", label: "Lost pet" },
];

const FeedsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all_news");
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);

  const handleCreatePost = (postData: any) => {
    console.log("New post:", postData);
    // Handle post creation
  };

  const filteredPosts = posts.filter((post) => {
    if (activeTab === "all_news") return true;
    return post.category === activeTab;
  });

  const getPlaceholderText = () => {
    switch (activeTab) {
      case "lost_pet":
        return "I hope you can find your pet ...";
      case "knowledge":
        return "Share your pet care knowledge ...";
      case "moments":
        return "Share your moments ...";
      default:
        return "What is going on?";
    }
  };

  const renderTabs = () => (
    <View style={styles.tabs}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => handleTabPress(tab.id)}
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
  );

  const handleTabPress = (tabId: TabType) => {
    setActiveTab(tabId);
  };

  const handleLike = (postId: string) => {
    console.log("Liked post:", postId);
  };

  const handleComment = (postId: string) => {
    console.log("Comment on post:", postId);
  };

  const handleShare = (postId: string) => {
    console.log("Share post:", postId);
  };

  const renderRegularPost = (post: Post) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{post.user.name}</Text>
            <Text style={styles.timeAgo}>{post.timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.postContent}>{post.content}</Text>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>{post.likes} like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setIsCommentsVisible(true)}
        >
          <Text style={styles.actionText}>{post.comments} comments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>

      <CommentsModal
        isVisible={isCommentsVisible}
        onClose={() => setIsCommentsVisible(false)}
        postId={post.id}
      />
    </View>
  );

  const renderLostPetPost = (post: Post) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{post.user.name}</Text>
            <Text style={styles.timeAgo}>{post.timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      <Image source={{ uri: post.image }} style={styles.postImage} />

      <View style={styles.lostPetInfo}>
        <Text style={styles.infoLabel}>Description:</Text>
        <Text style={styles.infoText}>{post.lostPetInfo?.description}</Text>

        <Text style={styles.infoLabel}>Phone number:</Text>
        <Text style={styles.infoText}>{post.lostPetInfo?.contactNumber}</Text>

        <Text style={styles.infoLabel}>Lost location:</Text>
        <Text style={styles.infoText}>{post.lostPetInfo?.location}</Text>
      </View>

      <View style={styles.lostPetActions}>
        <TouchableOpacity style={styles.phoneButton}>
          <Text style={styles.phoneButtonText}>📞</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectButton}>
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPost = ({ item }: any) => {
    return item.type === "lost"
      ? renderLostPetPost(item)
      : renderRegularPost(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderTabs()}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={getPlaceholderText()}
          placeholderTextColor="#666"
          onPress={() => {
            setIsCreatePostVisible(true);
          }}
        />
        <TouchableOpacity
          style={styles.imageButton}
          onPress={() => {
            setIsCreatePostVisible(true);
          }}
        >
          <Text>🖼️</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <CreatePostModal
        isVisible={isCreatePostVisible}
        onClose={() => setIsCreatePostVisible(false)}
        onSubmit={handleCreatePost}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabs: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: 30,
    width: "100%",
  },
  tabButton: {
    width: "25%",
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
    alignItems: "center",
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
