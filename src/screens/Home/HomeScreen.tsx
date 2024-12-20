import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CardBudget from "../../components/Home/budget/CardBudget";
import IconGoalSystem from "../../icon/IconGoalSystem";
import ListCardBudget from "../../components/Home/budget/ListCardBudget";
import NoInfo from "../../components/Home/budget/NoInfo";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import ColorSystem from "../../color/ColorSystem";
import ModalAddBudget from "../../components/Home/add/ModalAddBudget";
import ModalAddTransaction from "../../components/Home/add/ModalAddTransaction";
import CircleGraph from "../../components/Home/graph/CircleGraph";
import TransactionCard from "../../components/Home/add/transaction/TransactionCard";
import IconBudgetSystem from "../../icon/IconBugetSystem";
import BudgetDetailCard from "../../components/Home/budget/BudgetDetailCard";
import { useGetCategoriesQuery } from "../../services/categories";
import {
  useGetBudgetByIdQuery,
  useGetBudgetsQuery,
} from "../../services/budgets";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { set } from "date-fns";
import {
  useGetUserBudgetsQuery,
  useGetUserCategoriesQuery,
  useGetUserMoneySourcesQuery,
  useGetUserRecordsQuery,
} from "../../services/users";
import { useAppDispatch } from "../../hooks/redux";
import { stateToggle } from "../../store/reducers/addMoneySrcModal.reducer";

// const records = [
//   {
//     _id: "661fb7c7e68985486257c3b3",
//     amount: 25000,
//     type: "expense",
//     category: "restaurant",
//     description: "Ăn sáng",
//     date: "2024-04-17T00:00:00.000Z",
//     __v: 0,
//   },
//   {
//     _id: "661fb7d3e68985486257c3b5",
//     amount: 50000,
//     type: "expense",
//     category: "beauty",
//     description: "Ăn trưa",
//     date: "2024-04-17T00:00:00.000Z",
//     __v: 0,
//   },
//   {
//     _id: "661fb7d7e68985486257c3b7",
//     amount: 50000,
//     type: "expense",
//     category: "restaurant",
//     description: "Ăn tối",
//     date: "2024-04-17T00:00:00.000Z",
//     __v: 0,
//   },
//   {
//     _id: "661fb7f0e68985486257c3b9",
//     amount: 10000000,
//     type: "income",
//     category: "salary",
//     description: "Lương tháng 3",
//     date: "2024-04-17T00:00:00.000Z",
//     __v: 0,
//   },
//   {
//     _id: "661fb7f4e68985486257c3bb",
//     amount: 10000000,
//     type: "income",
//     category: "salary",
//     description: "Lương tháng 4",
//     date: "2024-04-17T00:00:00.000Z",
//     __v: 0,
//   },
//   {
//     _id: "66201ee6b7049857abc2b2dc",
//     amount: 25000,
//     type: "expense",
//     category: "restaurant",
//     description: "Ăn sáng",
//     date: "2024-04-17T00:00:00.000Z",
//     __v: 0,
//   },
// ];

const HomeScreen = ({ navigation }: any) => {
  const [isAddBudgetModalVisible, setIsAddBudgetModalVisible] = useState(false);
  const [isAddTransactionModalVisible, setIsAddTransactionModalVisible] =
    useState(false);
  const userId = useSelector((state: RootState) => state.LoginStatus.userId);

  let { data: categories, isLoading: isLoadingCategories } =
    useGetUserCategoriesQuery(userId);
  let { data: budgets, isLoading: isLoadingBudgets } =
    useGetUserBudgetsQuery(userId);
  let { data: records, isLoading: isLoadingRecords } =
    useGetUserRecordsQuery(userId);
  let { data: moneySources, isLoading: isLoadingMoneySources } =
    useGetUserMoneySourcesQuery(userId);

  const [budgetCategories, setBudgetCategories] = useState([]);
  const [budgetsInfo, setBudgetsInfo] = useState([]);
  const [newBudget, setNewBudget] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleAddBudget = () => {
    setIsAddBudgetModalVisible(true);
  };
  const dispatch = useAppDispatch();
  const handleAddTransaction = () => {
    if (moneySources && moneySources.length == 0) {
      Alert.alert(
        "Chưa tạo nguồn tiền",
        "Vui lòng tạo nguồn tiền trước để liên kết",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Tạo nguồn tiền",
            onPress: () => {
              console.log("Tạo nguồn tiền");
              dispatch(stateToggle());
              navigation.navigate("Ví của bạn");
            },
          },
        ]
      );
      return;
    }
    setIsAddTransactionModalVisible(true);
  };
  const refreshNewBudget = (data: any) => {
    setNewBudget(data);
  };
  const handleViewAllTransactions = () => {
    navigation.navigate("AllTransaction", { data: records });
  };
  const handleViewAllBudgets = () => {
    navigation.navigate("All Budgets", { data: budgetsInfo });
  };
  const preprocessBudgetCategories = async () => {
    const expenseCategories = categories.filter(
      (category) => category.type === "expense"
    );
    const sortedCategories = [...expenseCategories].sort((a, b) => {
      if (a.budgetId === null && b.budgetId !== null) {
        return 1; // If a's budgetId is null and b's is not, b comes first
      } else if (a.budgetId !== null && b.budgetId === null) {
        return -1; // If a's budgetId is not null and b's is null, a comes first
      } else {
        return 0; // Otherwise, maintain the current order
      }
    });

    const categoriesWithUpdatedBalance = sortedCategories.map((category) => {
      if (category.budgetId !== null) {
        const matchingBudget = budgets.find(
          (budget) => budget._id === category.budgetId
        );
        if (matchingBudget) {
          return {
            ...category,
            balance: matchingBudget.amount,
            used: matchingBudget.currentSpent,
          };
        }
      }
      return category;
    });
    const budgetsFullInfo = categoriesWithUpdatedBalance.filter(
      (category) => category.budgetId !== null
    );

    setBudgetsInfo(budgetsFullInfo);
    setBudgetCategories(categoriesWithUpdatedBalance);
  };
  useEffect(() => {
    if (categories && budgets) {
      const count = categories.reduce((count, category) => {
        if (category.budgetId !== null) {
          return count + 1;
        }
        return count;
      }, 0);
      if (count === budgets.length) {
        if (
          newBudget &&
          budgets.find((budget) => budget._id === newBudget._id) === undefined
        ) {
          const newCategories = categories.map((category) => {
            if (category._id === newBudget.categoryId) {
              return {
                ...category,
                budgetId: newBudget._id,
              };
            }
            return category;
          });
          categories = newCategories;
          const newBudgets = [...budgets, newBudget];
          budgets = newBudgets;
          setNewBudget(null);
        }
        preprocessBudgetCategories();
      } else if (budgets.length > count) {
        const updatedCategories = categories.map((category) => {
          const matchingBudget = budgets.find(
            (budget) => budget.categoryId === category._id
          );
          if (matchingBudget) {
            return {
              ...category,
              budgetId: matchingBudget._id,
            };
          }
          return category;
        });

        categories = updatedCategories;
        preprocessBudgetCategories();
      } else {
        console.log("Budgets are not ready yet");
        if (!newBudget) {
          return;
        }
        const newBudgets = [...budgets, newBudget];
        budgets = newBudgets;
        preprocessBudgetCategories();
        setNewBudget(null);
      }
      console.log(budgetsInfo);
    }
  }, [categories, budgets, moneySources]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        isAddBudgetModalVisible || isAddTransactionModalVisible
          ? { backgroundColor: "rgba(0,0,0,0.3)" }
          : { backgroundColor: "#fff" },
      ]}
    >
      {(isLoadingCategories || isLoadingBudgets) && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={ColorSystem.primary[800]} />
        </View>
      )}
      {!isLoadingBudgets && !isLoadingCategories && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.containerview}>
            <CircleGraph budgets={budgetsInfo} />
            <View style={styles.addBudget}>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>Ngân sách</Text>
              <TouchableOpacity
                style={styles.buttonAddBudget}
                onPress={handleAddBudget}
              >
                <MaterialIcons
                  name="add"
                  size={25}
                  color={ColorSystem.secondary[600]}
                />
                <Text
                  style={{ fontSize: 18, color: ColorSystem.secondary[600] }}
                >
                  Thêm
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ paddingBottom: 20 }}>
              <ListCardBudget budgets={budgetCategories} />
            </View>

            {(!budgetsInfo || budgetsInfo.length === 0) && (
              <NoInfo name="ngân sách" />
            )}
            {budgetsInfo &&
              budgetsInfo.length > 0 &&
              budgetsInfo.slice(0, 2).map((item, index) => {
                return <BudgetDetailCard key={index} budget={item} />;
              })}
            {budgetsInfo && budgetsInfo.length > 2 && (
              <TouchableOpacity
                style={{
                  paddingTop: 15,
                  paddingBottom: 30,
                  alignItems: "center",
                }}
                onPress={handleViewAllBudgets}
              >
                <Text
                  style={{
                    color: ColorSystem.secondary[600],
                    fontSize: 16,
                  }}
                >
                  Xem tất cả
                </Text>
              </TouchableOpacity>
            )}
            <View style={styles.addBudget}>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                Giao dịch thu chi
              </Text>
              <TouchableOpacity
                style={styles.buttonAddBudget}
                onPress={handleAddTransaction}
              >
                <MaterialIcons
                  name="add"
                  size={25}
                  color={ColorSystem.secondary[600]}
                />
                <Text
                  style={{ fontSize: 18, color: ColorSystem.secondary[600] }}
                >
                  Thêm
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingBottom: 30 }}>
              {(!records ||
                records.filter(
                  (item) => item.type === "income" || item.type === "expense"
                ).length === 0) && <NoInfo name="giao dịch" />}
              {records &&
                records.length > 0 &&
                records
                  .filter(
                    (item) => item.type === "income" || item.type === "expense"
                  )
                  .slice(0, 3)
                  .map((item, index) => {
                    return <TransactionCard record={item} key={index} />;
                  })}
              {records && records.length > 3 && (
                <TouchableOpacity
                  style={{
                    paddingTop: 15,

                    alignItems: "center",
                  }}
                  onPress={handleViewAllTransactions}
                >
                  <Text
                    style={{
                      color: ColorSystem.secondary[600],
                      fontSize: 16,
                    }}
                  >
                    Xem tất cả
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <ModalAddBudget
              isModalVisible={isAddBudgetModalVisible}
              setIsModalVisible={setIsAddBudgetModalVisible}
              budgetCategories={budgetCategories}
              setRefresh={setRefresh}
              refreshNewBudget={refreshNewBudget}
            />
            <ModalAddTransaction
              isModalVisible={isAddTransactionModalVisible}
              setIsModalVisible={setIsAddTransactionModalVisible}
              navigation={navigation}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  containerview: {
    paddingHorizontal: "5%",
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  addBudget: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "3%",
  },
  buttonAddBudget: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
});

export default HomeScreen;
