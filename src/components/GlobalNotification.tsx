"use client";

import { useState, useEffect, createContext, useContext } from "react";

export interface NotificationMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
}

interface NotificationContextType {
  notify: (
    message: string,
    type: NotificationMessage["type"],
    duration?: number
  ) => void;
  notifications: NotificationMessage[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
}

export function GlobalNotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  const notify = (
    message: string,
    type: NotificationMessage["type"],
    duration = 3000
  ) => {
    const id = Date.now().toString();
    const newNotification: NotificationMessage = {
      id,
      message,
      type,
      duration,
    };

    setNotifications((prev) => [...prev, newNotification]);

    if (duration > 0) {
      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== id)
        );
      }, duration);
    }
  };

  return (
    <NotificationContext.Provider value={{ notify, notifications }}>
      {children}
      <NotificationContainer
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </NotificationContext.Provider>
  );
}

function NotificationContainer({
  notifications,
  setNotifications,
}: {
  notifications: NotificationMessage[];
  setNotifications: (notifications: NotificationMessage[]) => void;
}) {
  return (
    <div className="tw-fixed tw-top-20 tw-right-4 tw-z-[999] tw-flex tw-flex-col tw-gap-3 max-lg:tw-right-2 max-lg:tw-left-2 max-lg:tw-top-16">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={() =>
            setNotifications(
              notifications.filter((n) => n.id !== notification.id)
            )
          }
        />
      ))}
    </div>
  );
}

function NotificationItem({
  notification,
  onClose,
}: {
  notification: NotificationMessage;
  onClose: () => void;
}) {
  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(onClose, notification.duration);
      return () => clearTimeout(timer);
    }
  }, [notification.duration, onClose]);

  const config = {
    success: {
      bg: "tw-bg-green-500",
      icon: "bi-check-circle-fill",
      border: "tw-border-green-600",
    },
    error: {
      bg: "tw-bg-red-500",
      icon: "bi-x-circle-fill",
      border: "tw-border-red-600",
    },
    info: {
      bg: "tw-bg-blue-500",
      icon: "bi-info-circle-fill",
      border: "tw-border-blue-600",
    },
    warning: {
      bg: "tw-bg-yellow-500",
      icon: "bi-exclamation-circle-fill",
      border: "tw-border-yellow-600",
    },
  }[notification.type];

  return (
    <div
      className={`${config.bg} tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-shadow-2xl tw-border-2 ${config.border} tw-animate-in tw-slide-in-from-top-4 tw-duration-300 max-w-sm tw-backdrop-blur-sm`}
      role="alert"
      aria-live="polite"
    >
      <div className="tw-flex tw-items-center tw-gap-3 tw-justify-between">
        <div className="tw-flex tw-items-center tw-gap-3">
          <i className={`bi ${config.icon} tw-text-xl`} />
          <span className="tw-text-sm tw-font-medium">
            {notification.message}
          </span>
        </div>
        <button
          onClick={onClose}
          className="tw-ml-4 hover:tw-opacity-70 tw-transition-opacity tw-p-1"
          aria-label="Close notification"
        >
          <i className="bi bi-x tw-text-xl tw-font-bold" />
        </button>
      </div>
    </div>
  );
}
