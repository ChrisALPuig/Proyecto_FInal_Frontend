import { IonHeader, IonToolbar, IonImg, IonText } from "@ionic/react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useHistory } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User, Bell, BellRing, ChevronDown, ChevronRight } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import { useNotification } from "../../contexts/NotificationContext.tsx";
import { useModal } from "../../contexts/ModalContext.tsx";
import { API_ENDPOINTS } from "../../config/apiConfig";
import { getUserProfile } from "../../services/userService.ts";

type MenuCoords = { top: number; left: number; };
import CartPopover, { CartItem } from "../carrito/CartPopover.tsx";
import WishlistPopover from "../carrito/WishlistPopover.tsx";
import "./Header.css";

const Header: React.FC = () => {
  const history = useHistory();
  const cartRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartPopoverOpen, setCartPopoverOpen] = useState(false);
  const [wishlistPopoverOpen, setWishlistPopoverOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [notificationCoords, setNotificationCoords] = useState<MenuCoords>({ top: 0, left: 0 });
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [menuCoords, setMenuCoords] = useState<MenuCoords>({ top: 0, left: 0 });
  const storeRef = useRef<HTMLLIElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const userIconRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const { isAuthenticated, logout, avatar, token, setAvatar } = useAuth();
  const { openLoginModal, openRegisterModal } = useModal();
  const { t } = useLanguage();
  const { notifications, unreadCount, markAllRead, markAsRead, removeNotification } = useNotification();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const gameCategories = [
    { id: "new-releases", label: "New releases", submenu: ["This week", "Last 30 days", "Coming soon", "Pre-orders", "Free to play", "Early access"] },
    { id: "bestsellers", label: "Bestsellers", submenu: ["Top sellers", "Most played", "Top rated", "Trending now", "Award winners", "Staff picks"] },
    { id: "on-sale", label: "On sale now", submenu: ["Up to 50% off", "Up to 75% off", "Flash deals", "Weekly specials", "Seasonal sales", "Bundle deals"] },
    { id: "rpg", label: "RPG", submenu: ["Action RPG", "JRPG", "Western RPG", "MMORPG", "CRPG", "Roguelike"] },
    { id: "action", label: "Action", submenu: ["FPS", "TPS", "Battle Royale", "Fighting", "Hack and Slash", "Platformer"] },
    { id: "adventure", label: "Adventure", submenu: ["Point & Click", "Visual Novel", "Interactive Fiction", "Exploration", "Puzzle Adventure", "Survival"] },
    { id: "strategy", label: "Strategy", submenu: ["Turn-based", "Real-time", "4X", "Tower Defense", "RTS", "Grand Strategy"] },
    { id: "open-world", label: "Open world", submenu: ["Sandbox", "Exploration", "Survival", "RPG Open World", "Action Open World", "Simulation"] },
    { id: "indie", label: "Indie", submenu: ["Indie Gems", "Retro", "Pixel Art", "Experimental", "Narrative", "Puzzle Indie"] },
    { id: "shooters", label: "Shooters", submenu: ["FPS", "TPS", "Arena Shooter", "Bullet Hell", "Rail Shooter", "Top-Down Shooter"] },
    { id: "platformers", label: "Platformers", submenu: ["2D Platformer", "3D Platformer", "Precision Platformer", "Metroidvania", "Run and Gun", "Puzzle Platformer"] },
    { id: "city-builders", label: "City builders", submenu: ["City Building", "Empire Building", "Management", "Simulation", "Strategy City", "God Games"] },
  ];
  const activeCategory = gameCategories.find((category) => category.id === hoveredCategory);

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

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const openUserMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    const rect = userIconRef.current?.getBoundingClientRect();
    if (rect) {
      const menuWidth = 220;
      const viewportWidth = window.innerWidth;
      let left = rect.left;
      if (left + menuWidth > viewportWidth - 16) {
        left = Math.max(16, viewportWidth - menuWidth - 16);
      }
      setMenuCoords({ top: rect.bottom + 8, left });
    }
    setUserMenuOpen(true);
  };

  const toggleUserMenu = () => {
    if (userMenuOpen) {
      setUserMenuOpen(false);
      return;
    }
    openUserMenu();
  };

  const closeUserMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setUserMenuOpen(false);
      closeTimeoutRef.current = null;
    }, 180);
  };

  const openNotificationMenu = () => {
    const rect = notificationRef.current?.getBoundingClientRect();
    if (rect) {
      const menuWidth = 320;
      const viewportWidth = window.innerWidth;
      let left = rect.left;
      if (left + menuWidth > viewportWidth - 16) {
        left = Math.max(16, viewportWidth - menuWidth - 16);
      }
      setNotificationCoords({ top: rect.bottom + 8, left });
    }
    setNotificationMenuOpen(true);
    if (unreadCount > 0) {
      markAllRead();
    }
  };

  const toggleNotificationMenu = () => {
    if (notificationMenuOpen) {
      setNotificationMenuOpen(false);
      return;
    }
    openNotificationMenu();
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!notificationMenuOpen) {
        return;
      }

      const target = event.target as Node;
      const clickedOnTrigger = notificationRef.current?.contains(target);
      const clickedInsideMenu = notificationMenuRef.current?.contains(target);

      if (!clickedOnTrigger && !clickedInsideMenu) {
        setNotificationMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [notificationMenuOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleStoreMouseEnter = () => {
    setSidebarOpen(true);
  };

  const handleStoreMouseLeave = () => {
    setTimeout(() => {
      if (!storeRef.current?.matches(":hover") && !sidebarRef.current?.matches(":hover")) {
        setSidebarOpen(false);
        setHoveredCategory(null);
      }
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    setSidebarOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setTimeout(() => {
      if (!storeRef.current?.matches(":hover") && !sidebarRef.current?.matches(":hover")) {
        setSidebarOpen(false);
        setHoveredCategory(null);
      }
    }, 150);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const navigateTo = (path: string) => {
    setUserMenuOpen(false);
    history.push(path);
    setTimeout(() => {
      if (window.location.pathname !== path) {
        window.location.href = path;
      }
    }, 100);
  };

  // 🔒 Carrito y wishlist protegidos
  const handleCartClick = () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    setCartPopoverOpen(true);
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    setWishlistPopoverOpen(true);
  };

  // Búsqueda sin filtros
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    fetch(
      `${API_ENDPOINTS.GAMES}/search?query=${encodeURIComponent(
        query
      )}`
    )
      .then((res) => res.json())
      .then((data) => setSearchResults(data))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <IonHeader className="header-fixed">
        <IonToolbar className="toolbar">
          <div className="header-container">
            <img src="/logo.png" alt="Logo" className="logo" />
            <h1 onClick={() => history.push("/home")} className="title">
              CG
            </h1>

            {/* Navegación Desktop */}
            <ul className="nav-list">
              <li
                ref={storeRef}
                onMouseEnter={handleStoreMouseEnter}
                onMouseLeave={handleStoreMouseLeave}
                onClick={() => history.push("/games")}
                className="store-menu-item"
              >
                {t("store")}
                <ChevronDown size={16} className="dropdown-arrow" />
              </li>
              <li onClick={handleWishlistClick} style={{ cursor: "pointer" }}>
                {t("wishlist")}
              </li>
              <li onClick={() => history.push("/support")}>{t("support")}</li>
            </ul>

            {/* Dropdown categories */}
            {sidebarOpen && (
              <div
                ref={sidebarRef}
                className="store-dropdown-wrapper"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <div className="store-dropdown">
                  <div className="dropdown-categories">
                    {gameCategories.map((category) => (
                      <button
                        key={category.id}
                        className={`dropdown-category ${hoveredCategory === category.id ? "active" : ""}`}
                        onMouseEnter={() => setHoveredCategory(category.id)}
                        onClick={() => history.push("/games")}
                        type="button"
                      >
                        <span>{category.label}</span>
                        <ChevronRight size={16} />
                      </button>
                    ))}
                  </div>
                  <div className="dropdown-submenu">
                    {activeCategory ? (
                      <>
                        <div className="submenu-title">{activeCategory.label}</div>
                        <ul>
                          {activeCategory.submenu.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <div className="submenu-empty">Hover a category to see subcategories</div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* Acciones Desktop */}
            <div className="actions">
              <Search
                className="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                style={{ cursor: "pointer" }}
              />
              <div className="cart-container" ref={cartRef}>
                <ShoppingCart
                  onClick={handleCartClick}
                  className="icon"
                  style={{ cursor: "pointer" }}
                />
              </div>

              <div className="notification-container" ref={notificationRef}>
                {unreadCount > 0 ? (
                  <BellRing
                    className="icon"
                    onClick={toggleNotificationMenu}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <Bell
                    className="icon"
                    onClick={toggleNotificationMenu}
                    style={{ cursor: "pointer" }}
                  />
                )}
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </div>

              {/* Usuario */}
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={openLoginModal}
                    className="btn btn-outline"
                  >
                    {t("signIn")}
                  </button>
                  <button
                    onClick={openRegisterModal}
                    className="btn btn-primary"
                  >
                    {t("signUp")}
                  </button>
                </>
              ) : (
                <div
                  className="user-menu-container"
                  ref={userIconRef}
                  onClick={toggleUserMenu}
                  onMouseEnter={openUserMenu}
                  onMouseLeave={closeUserMenu}
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Perfil"
                      className="user-avatar"
                    />
                  ) : (
                    <User
                      className="icon user-icon"
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  {userMenuOpen &&
                    createPortal(
                      <div
                        className="hover-user-menu"
                        style={{
                          position: "fixed",
                          top: menuCoords.top,
                          left: menuCoords.left,
                          zIndex: 99999,
                        }}
                        onMouseEnter={openUserMenu}
                        onMouseLeave={closeUserMenu}
                      >
                        <div className="hover-user-menu-header">{t("yourAccount")}</div>
                        <ul>
                          <li onClick={() => navigateTo("/user-profile")}>{t("yourProfile")}</li>
                          <li onClick={() => navigateTo("/orders-settings")}>{t("ordersSettings")}</li>
                          <li onClick={() => navigateTo("/my-tickets")}>{t("myTickets")}</li>
                          <li
                            onClick={() => {
                              logout();
                              navigateTo("/home");
                            }}
                          >
                            {t("signOut")}
                          </li>
                        </ul>
                      </div>,
                      document.body
                    )}
                </div>
              )}

              {notificationMenuOpen &&
                createPortal(
                  <div
                    className="notification-dropdown"
                    ref={notificationMenuRef}
                    style={{
                      position: "fixed",
                      top: notificationCoords.top,
                      left: notificationCoords.left,
                      zIndex: 99999,
                    }}
                  >
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
                          onClick={() => {
                            if (notification.link) {
                              history.push(notification.link);
                            }
                            markAsRead(notification.id);
                            removeNotification(notification.id);
                            setNotificationMenuOpen(false);
                          }}
                        >
                          <div className="notification-item-top">
                            <strong>{notification.title}</strong>
                            <button
                              type="button"
                              className="notification-close"
                              onClick={(event) => {
                                event.stopPropagation();
                                removeNotification(notification.id);
                              }}
                            >
                              ×
                            </button>
                          </div>
                          <p>{notification.message}</p>
                        </div>
                      ))
                    )}
                  </div>,
                  document.body
                )}
            </div>

            {/* Botón hamburguesa Mobile */}
            <div className="hamburger" onClick={toggleMenu}>
              {menuOpen ? <X className="icon" /> : <Menu className="icon" />}
            </div>
          </div>
        </IonToolbar>

        {/* Barra de búsqueda */}
        {searchOpen && (
          <div className="search-bar-expanded">
            <div className="search-content">
              <div className="search-input-wrapper">
                <Search className="search-input-icon" />
                <input
                  type="text"
                  placeholder={t("searchGames")}
                  className="search-input-field"
                  value={searchQuery}
                  onChange={onSearchChange}
                  autoFocus
                />
                <button className="close-search-btn" onClick={closeSearch}>
                  <X size={20} />
                </button>
              </div>

              <div className="search-results">
                {searchResults.length === 0 && searchQuery && (
                  <p style={{ color: "black", padding: "8px 16px" }}>
                    {t("noSearchResults")}
                  </p>
                )}
                {searchResults.map((game) => (
                  <div
                    key={game.id}
                    className="search-result-item"
                    onClick={() => {
                      history.push(`/game/${game.id}`);
                      closeSearch();
                    }}
                  >
                    <IonImg
                      src={game.coverImage}
                      className="search-result-img"
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <IonText style={{ color: "black", fontWeight: "600" }}>
                        {game.title}
                      </IonText>
                      <IonText style={{ color: "black", fontSize: "13px" }}>
                        {game.edition ? `Edición: ${game.edition}` : ""}
                        {game.price ? ` - ${game.price.toFixed(2)} €` : ""}
                      </IonText>
                      {game.genres && game.genres.length > 0 && (
                        <IonText style={{ color: "black", fontSize: "12px" }}>
                          Géneros: {game.genres.join(", ")}
                        </IonText>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Menú Mobile */}
        {menuOpen && (
          <div className="mobile-menu">
            <ul>
              <li
                onClick={() => {
                  history.push("/games");
                  setMenuOpen(false);
                }}
              >
                {t("store")}
              </li>
              <li
                onClick={() => {
                  handleWishlistClick();
                  setMenuOpen(false);
                }}
              >
                {t("wishlist")}
              </li>
              <li
                onClick={() => {
                  history.push("/support");
                  setMenuOpen(false);
                }}
              >
                {t("support")}
              </li>
            </ul>
            {!isAuthenticated && (
              <>
                <button
                  className="mobile-btn mobile-btn-outline"
                  onClick={() => {
                    openLoginModal();
                    setMenuOpen(false);
                  }}
                >
                  {t("signIn")}
                </button>
                <button
                  className="mobile-btn mobile-btn-primary"
                  onClick={() => {
                    history.push("/register");
                    setMenuOpen(false);
                  }}
                >
                  {t("signUp")}
                </button>
              </>
            )}
          </div>
        )}
      </IonHeader>

      <CartPopover
        isOpen={cartPopoverOpen}
        onClose={() => setCartPopoverOpen(false)}
        cartItems={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
        triggerElement={cartRef}
      />
      <WishlistPopover
        isOpen={wishlistPopoverOpen}
        onClose={() => setWishlistPopoverOpen(false)}
        triggerElement={wishlistRef}
      />
    </>
  );
};

export default Header;