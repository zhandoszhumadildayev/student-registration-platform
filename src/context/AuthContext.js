import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("auth_user", null);
  const [notifications, setNotifications] = useLocalStorage("notifications", []);

  const addNotification = (text) => {
    const newNotification = {
      id: Date.now(),
      text,
      date: new Date().toLocaleString(),
      read: false
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  const login = ({ email }) => {
    const nextUser = {
      email,
      name: email.split("@")[0] || "Student",
      fullName: "",
      phone: "",
      specialty: "",
      avatar: "",
      role: "student"
    };

    setUser(nextUser);
    addNotification("You logged in successfully.");
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (newData) => {
    setUser((previousUser) => ({
      ...previousUser,
      ...newData
    }));

    addNotification("Profile information was updated.");
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true
      }))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
        updateProfile,
        notifications,
        addNotification,
        markNotificationsAsRead
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}