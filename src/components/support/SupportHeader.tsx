import { IonRouterLink } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { User, Bell, BellRing } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import { useNotification } from "../../contexts/NotificationContext.tsx";
import { useModal } from "../../contexts/ModalContext.tsx";
import { getUserProfile } from "../../services/userService.ts";
import { useState, useEffect, useRef } from "react";
import "./SupportHeader.css";

const SupportHeader: React.FC = () => {
  const history = useHistory();
  const { t } = useLanguage();
  const { isAuthenticated, logout, avatar, token, setAvatar } = useAuth();
  const { openLoginModal, openRegisterModal } = useModal();
  const [avatarError, setAvatarError] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const notificationMenuRef = useRef<HTMLDivElement | null>(null);

  const { notifications, unreadCount, markAllRead, markAsRead, removeNotification } = useNotification();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const loadAvatar = async () => {
      if (!token || avatar) return;
      try {
        const profile = await getUserProfile(token);
        if (profile.avatar) {
          setAvatar(profile.avatar);
        }
      } catch (error) {
        console.error("Unable to load user avatar:", error);
      }
    };

    if (isAuthenticated) {
      loadAvatar();
    }
  }, [isAuthenticated, token, avatar, setAvatar]);

  useEffect(() => {
    if (avatar) {
      setAvatarError(false);
    }
  }, [avatar]);

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const openNotificationMenu = () => {
    setNotificationMenuOpen(true);
    if (unreadCount > 0) {
      markAllRead();
    }
  };

  const toggleNotificationMenu = () => {
    setNotificationMenuOpen((prev) => {
      if (!prev && unreadCount > 0) {
        markAllRead();
      }
      return !prev;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        notificationMenuOpen &&
        notificationRef.current &&
        notificationMenuRef.current &&
        !notificationRef.current.contains(target) &&
        !notificationMenuRef.current.contains(target)
      ) {
        setNotificationMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notificationMenuOpen]);

  return (
    <div className="header-fixed2">
      <div className="header-inner">
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="logo" 
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/home")}
        />
        <IonRouterLink href="/home" className="home-link">
          <h3 className="header-title">{t("goToStore")}</h3>
        </IonRouterLink>
        <div className="header-actions">
          {!isAuthenticated ? (
            <>
              <button
                onClick={openLoginModal}
                className="btn-outline"
              >
                {t("signIn")}
              </button>
              <button
                onClick={openRegisterModal}
                className="btn-primary"
              >
                {t("signUp")}
              </button>
            </>
          ) : (
            <>
              <div className="notification-wrapper" ref={notificationRef} style={{ order: 1 }}>
                {unreadCount > 0 ? (
                  <BellRing
                    className="notification-icon"
                    onClick={toggleNotificationMenu}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <Bell
                    className="notification-icon"
                    onClick={toggleNotificationMenu}
                    style={{ cursor: "pointer" }}
                  />
                )}
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
                {notificationMenuOpen && (
                  <div className="notification-dropdown" ref={notificationMenuRef}>
                    <div className="notification-dropdown-header">
                      <span>{t("notifications")}</span>
                      <button
                        className="notification-clear"
                        onClick={markAllRead}
                      >
                        {t("markAllRead")}
                      </button>
                    </div>
                    {notifications.length === 0 ? (
                      <div className="notification-empty">
                        {t("noNewNotifications")}
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`notification-item ${notification.read ? "read" : "unread"}`}
                        >
                          <div
                            className="notification-item-content"
                            onClick={() => {
                              if (notification.link) {
                                history.push(notification.link);
                              }
                              markAsRead(notification.id);
                              setNotificationMenuOpen(false);
                            }}
                          >
                            <strong>{notification.title}</strong>
                            <p>{notification.message}</p>
                          </div>
                          <button
                            className="notification-delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            aria-label="Borrar notificación"
                          >
                            ✕
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              <div className="user-menu-wrapper" ref={userMenuRef} style={{ order: 2 }}>
                {avatar && !avatarError ? (
                  <img
                    src={avatar}
                    alt="User avatar"
                    className="support-user-avatar"
                    onClick={toggleUserMenu}
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <User
                    className="user-icon"
                    style={{ cursor: "pointer" }}
                    onClick={toggleUserMenu}
                  />
                )}
                {isUserMenuOpen && (
                  <div className="user-menu-dropdown">
                    <div
                      className="user-menu-item"
                      onClick={() => {
                        history.push("/my-tickets");
                        setIsUserMenuOpen(false);
                      }}
                    >
                      {t("myTickets")}
                    </div>
                    <div
                      className="user-menu-item"
                      onClick={() => {
                        logout();
                        history.push("/home");
                        setIsUserMenuOpen(false);
                      }}
                    >
                      {t("signOut")}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="header-title-container">
        <h1>{t("supportCenter")}</h1>
        <div className="search-container">
          <FiSearch className="search-icon"/>
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="search-input"
          />
        </div>
      </div>
    </div>
  );
};

export default SupportHeader;