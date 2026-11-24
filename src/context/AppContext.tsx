"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Notification } from "@/types";
import { mockStore, initializeMockStore } from "@/lib/mockStore";

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  switchRole: (role: User["role"]) => void;
  notifications: Notification[];
  unreadCount: number;
  markNotificationsRead: () => void;
  refreshData: () => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    initializeMockStore();
    const user = mockStore.getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setNotifications(mockStore.getNotifications(user.id));
    }
  }, [tick]);

  const refreshData = () => {
    setTick((t) => t + 1);
    if (currentUser) {
      setNotifications(mockStore.getNotifications(currentUser.id));
    }
  };

  const switchRole = (role: User["role"]) => {
    const users = mockStore.getUsers();
    let target = users.find((u) => u.role === role);
    if (!target) {
      target = users[0];
    }
    mockStore.setCurrentUser(target);
    setCurrentUser(target);
    setNotifications(mockStore.getNotifications(target.id));
  };

  const markNotificationsRead = () => {
    if (!currentUser) return;
    mockStore.markNotificationsRead(currentUser.id);
    setNotifications(mockStore.getNotifications(currentUser.id));
  };

  const resetDemoData = () => {
    mockStore.resetStore();
    refreshData();
    window.location.reload();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser: (u) => {
          mockStore.setCurrentUser(u);
          setCurrentUser(u);
          refreshData();
        },
        switchRole,
        notifications,
        unreadCount,
        markNotificationsRead,
        refreshData,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
