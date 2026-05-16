import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useAuth } from "./AuthContext.tsx";
import { getUserTickets } from "../services/ticketService.ts";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  link?: string;
};

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (notification: NotificationItem) => void;
  removeNotification: (id: string) => void;
  markAllRead: () => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("notifications");
    if (stored) {
      try {
        setNotifications(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse notifications from localStorage", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = useCallback((notification: NotificationItem) => {
    setNotifications((prev) => {
      if (prev.some((item) => item.id === notification.id)) {
        return prev;
      }
      return [notification, ...prev];
    });
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  };

  useEffect(() => {
    if (!isAuthenticated || !token) {
      return;
    }

    let isMounted = true;

    const refreshTicketResponses = async () => {
      try {
        const tickets = await getUserTickets(token);
        const countsStorage = localStorage.getItem("ticketResponseCounts");
        const storedCounts: Record<string, number> = countsStorage ? JSON.parse(countsStorage) : {};
        const nextCounts: Record<string, number> = {};

        tickets.forEach((ticket: any) => {
          const ticketId = String(ticket.id);
          const currentResponses = ticket.responses?.length ?? 0;
          const previousResponses = storedCounts[ticketId] ?? 0;

          if (currentResponses > previousResponses) {
            addNotification({
              id: `support-response-${ticketId}-${currentResponses}`,
              title: "Nueva respuesta del soporte",
              message: `Tu ticket #${ticketId} tiene ${currentResponses} respuesta${currentResponses > 1 ? "s" : ""}.`,
              createdAt: new Date().toISOString(),
              read: false,
              link: `/ticket/${ticketId}`,
            });
          }

          nextCounts[ticketId] = currentResponses;
        });

        if (isMounted) {
          localStorage.setItem("ticketResponseCounts", JSON.stringify(nextCounts));
        }
      } catch (err) {
        console.error("Error revisando tickets para notificaciones", err);
      }
    };

    refreshTicketResponses();
    const interval = window.setInterval(refreshTicketResponses, 45000);
    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, [isAuthenticated, token, addNotification]);

  const unreadCount = notifications.reduce((count, item) => count + (item.read ? 0 : 1), 0);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        removeNotification,
        markAllRead,
        markAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification must be used within NotificationProvider");
  return context;
};
