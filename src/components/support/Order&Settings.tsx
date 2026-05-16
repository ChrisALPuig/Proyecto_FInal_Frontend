import { IonRouterLink } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import { API_ENDPOINTS } from "../../config/apiConfig.ts";
import {
  CreditCard,
  User,
  Star,
  Shield,
  Lock,
  Mail,
  Tag,
  MessageCircle,
  Trash2,
  Search,
} from "lucide-react";
import { getUserProfile, updateUserProfile, UserProfile, changeEmail, changePassword, deleteAccount, DeleteAccountRequest } from "../../services/userService.ts";
import { generate2FAQR, verify2FACode, disable2FA, get2FAStatus } from "../../services/twoFactorService.ts";
import "./OrderSettings.css";
import "./DeleteAccount.css";

interface Payment {
  id: number;
  paymentId: string;
  productName: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: string;
  gameImage?: string;
  items?: string;
}

const defaultProfile = {
  id: 0,
  username: "",
  email: "",
  phoneNumber: "",
  birthDate: "",
  country: "Spain",
  currency: "Euro (EUR)",
  language: "English",
};

interface OrderSettingsProps {
  showOnlySection?: string;
  initialPayments?: Payment[];
  initialLoading?: boolean;
  onProfileUpdated?: () => void;
  onPaymentUpdated?: () => void;
}

const OrderSettings: React.FC<OrderSettingsProps> = ({ showOnlySection, initialPayments, initialLoading = false, onProfileUpdated, onPaymentUpdated }) => {
  const { token, isAuthenticated, roles, login, logout, setAvatar } = useAuth();
  const { setLanguage, t } = useLanguage();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [payments, setPayments] = useState<Payment[]>(initialPayments || []);
  const [loading, setLoading] = useState(initialPayments ? false : initialLoading);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [phoneSaving, setPhoneSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [accountForm, setAccountForm] = useState({
    username: "",
    avatar: "",
    phoneNumber: "",
    birthDate: "",
    country: "Spain",
    currency: "Euro (EUR)",
    language: "English",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState(showOnlySection || "ordersHistory");
  const [message, setMessage] = useState("");
  const [expandedOrders, setExpandedOrders] = useState<Record<number, boolean>>({});
  const [downloadingOrderId, setDownloadingOrderId] = useState<string | null>(null);

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const downloadGame = async (orderId: string, gameName: string) => {
    try {
      setDownloadingOrderId(orderId);
      const response = await fetch(`${API_ENDPOINTS.DOWNLOADS}/game/${orderId}`);
      
      if (!response.ok) {
        alert('Error downloading file');
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${gameName.replaceAll(/[^a-zA-Z0-9._-]/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading game:', error);
      alert('Error downloading file');
    } finally {
      setDownloadingOrderId(null);
    }
  };
  
  // Email/Password change modals
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [emailForm, setEmailForm] = useState({ currentPassword: "", newEmail: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSavingEmail, setIsSavingEmail] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [twoFAStatusLoading, setTwoFAStatusLoading] = useState(true);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showDisable2FAModal, setShowDisable2FAModal] = useState(false);
  const [show2FAVerificationModal, setShow2FAVerificationModal] = useState(false);
  const [twoFAQR, setTwoFAQR] = useState("");
  const [twoFASecret, setTwoFASecret] = useState("");
  const [twoFACode, setTwoFACode] = useState("");
  const [twoFAVerificationCode, setTwoFAVerificationCode] = useState("");
  const [twoFAError, setTwoFAError] = useState("");
  const [twoFALoading, setTwoFALoading] = useState(false);
  const [pendingAction, setPendingAction] = useState<"email" | "password" | null>(null);
  
  // Delete account
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletionPassword, setDeletionPassword] = useState("");
  const [deletionError, setDeletionError] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  useEffect(() => {
    if (initialPayments) {
      setPayments(initialPayments);
    }

    const fetchPayments = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_ENDPOINTS.PAYMENTS}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPayments(data);
        } else {
          console.error("Failed to fetch payments", response.status);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();

    const normalizeLanguageValue = (value: string) => {
      if (value === "Spanish" || value === "Español") return "Español";
      return "English";
    };

    const fetchProfile = async () => {
      if (!token) {
        setProfileLoading(false);
        return;
      }

      try {
        const profileData = await getUserProfile(token);
        setProfile(profileData);
        setAvatarPreview(profileData.avatar || "");
        const languageValue = normalizeLanguageValue(profileData.language || "English");
        setAccountForm({
          username: profileData.username || "",
          avatar: profileData.avatar || "",
          phoneNumber: profileData.phoneNumber || "",
          birthDate: profileData.birthDate || "",
          country: profileData.country || "Spain",
          currency: profileData.currency || "Euro (EUR)",
          language: languageValue,
        });
        setLanguage(languageValue);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchPayments();
    fetchProfile();
    const fetch2FAStatus = async () => {
      if (!token) {
        setTwoFAStatusLoading(false);
        return;
      }

      try {
        const data = await get2FAStatus(token);
        setTwoFAEnabled(data.enabled);
      } catch (error) {
        console.error("Error fetching 2FA status:", error);
      } finally {
        setTwoFAStatusLoading(false);
      }
    };

    fetch2FAStatus();
  }, [token]);

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const nextValue = name === "language"
      ? value === "Spanish" || value === "Español"
        ? "Español"
        : "English"
      : value;

    setAccountForm((prev) => ({ ...prev, [name]: nextValue }));

    if (name === "language") {
      setLanguage(nextValue);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatarPreview(result);
      setAccountForm((prev) => ({ ...prev, avatar: result }));
      setMessage(t("avatarChangedSuccess"));
    };
    reader.onerror = () => {
      setMessage(t("avatarChangeError"));
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSave = async () => {
    if (!token) return;

    setProfileSaving(true);
    setMessage("");

    try {
      const updatePayload = {
        username: accountForm.username,
        phoneNumber: accountForm.phoneNumber,
        birthDate: accountForm.birthDate,
        country: accountForm.country,
        currency: accountForm.currency,
        language: accountForm.language,
        ...(accountForm.avatar ? { avatar: accountForm.avatar } : {}),
      };

      const updated = await updateUserProfile(token, updatePayload);
      setProfile(updated);
      setAccountForm((prev) => ({ ...prev, username: updated.username, avatar: updated.avatar || prev.avatar }));
      setAvatarPreview(updated.avatar || avatarPreview);

      if (updated.avatar) {
        setAvatar(updated.avatar);
      }

      if (updated.token) {
        login(updated.token, updated.username, roles, updated.avatar || null);
      }

      setMessage(t("profileUpdatedSuccess"));
      
      // Notificar al componente padre que el perfil fue actualizado
      if (onProfileUpdated) {
        setTimeout(() => onProfileUpdated(), 300);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage(t("profileUpdatedError"));
    } finally {
      setProfileSaving(false);
    }
  };

  const handleAddPhone = async () => {
    if (!token) return;
    if (!accountForm.phoneNumber?.trim()) {
      setMessage(t("enterPhoneNumber"));
      return;
    }

    setPhoneSaving(true);
    setMessage("");

    try {
      const updatePayload = {
        username: accountForm.username,
        phoneNumber: accountForm.phoneNumber,
        birthDate: accountForm.birthDate,
        country: accountForm.country,
        currency: accountForm.currency,
        language: accountForm.language,
        ...(accountForm.avatar ? { avatar: accountForm.avatar } : {}),
      };

      const updated = await updateUserProfile(token, updatePayload);
      setProfile(updated);
      setAccountForm((prev) => ({ ...prev, phoneNumber: updated.phoneNumber || prev.phoneNumber }));
      setMessage(t("phoneAddedSuccess"));
      
      // Notificar al componente padre que el perfil fue actualizado
      if (onProfileUpdated) {
        setTimeout(() => onProfileUpdated(), 300);
      }
    } catch (error) {
      console.error("Error updating phone number:", error);
      setMessage(t("phoneAddError"));
    } finally {
      setPhoneSaving(false);
    }
  };

  const handleActivate2FA = async () => {
    if (!token) return;

    setTwoFALoading(true);
    setTwoFAError("");
    try {
      const data = await generate2FAQR(token);
      // Agregar el prefijo data URI si el QR es base64
      const qrWithPrefix = data.qr.startsWith('data:') ? data.qr : `data:image/png;base64,${data.qr}`;
      setTwoFAQR(qrWithPrefix);
      setTwoFASecret(data.secret);
      setShow2FAModal(true);
    } catch (error: any) {
      setTwoFAError(error.message || "Error generando 2FA");
    } finally {
      setTwoFALoading(false);
    }
  };

  const handleVerify2FACode = async () => {
    if (!token || !twoFACode.trim()) {
      setTwoFAError(t("enter2FACode"));
      return;
    }

    setTwoFALoading(true);
    setTwoFAError("");
    try {
      await verify2FACode(token, twoFACode);
      setTwoFAEnabled(true);
      setShow2FAModal(false);
      setTwoFACode("");
      setMessage(t("twoFAActivatedSuccess"));
      setTimeout(() => setMessage(""), 3000);
    } catch (error: any) {
      setTwoFAError(error.message || t("twoFAVerifyError"));
    } finally {
      setTwoFALoading(false);
    }
  };

  const handleDisable2FA = async (): Promise<boolean> => {
    if (!token) return false;

    setTwoFALoading(true);
    setTwoFAError("");
    try {
      await disable2FA(token, twoFACode || "");
      setTwoFAEnabled(false);
      setTwoFACode("");
      setMessage(t("twoFADisabledSuccess"));
      setTimeout(() => setMessage(""), 3000);
      return true;
    } catch (error: any) {
      setTwoFAError(error.message || t("twoFADisableError"));
      return false;
    } finally {
      setTwoFALoading(false);
    }
  };

  const handleVerify2FAForAction = async () => {
    if (!token || !twoFAVerificationCode.trim()) {
      setTwoFAError(t("enter2FACode"));
      return;
    }

    setTwoFALoading(true);
    setTwoFAError("");
    try {
      await verify2FACode(token, twoFAVerificationCode);
      if (pendingAction === "email") {
        await handleChangeEmail();
      } else if (pendingAction === "password") {
        await handleChangePassword();
      }
      setShow2FAVerificationModal(false);
    } catch (error: any) {
      setTwoFAError(error.message || t("twoFAVerifyError"));
    } finally {
      setTwoFALoading(false);
    }
  };

  const handleChangeEmail = async () => {
    if (!token) return;

    if (twoFAEnabled && !pendingAction) {
      setPendingAction("email");
      setTwoFAVerificationCode("");
      setTwoFAError("");
      setShowEmailModal(false);
      setShow2FAVerificationModal(true);
      return;
    }

    setEmailError("");
    setIsSavingEmail(true);

    try {
      const updated = await changeEmail(token, emailForm);
      setProfile(updated);
      setShowEmailModal(false);
      setEmailForm({ currentPassword: "", newEmail: "" });
      setShow2FAVerificationModal(false);
      setPendingAction(null);
      setTwoFAVerificationCode("");
      setMessage(t("emailChangedSuccess"));
      setTimeout(() => setMessage(""), 3000);
    } catch (error: any) {
      setEmailError(error.message || t("emailChangeError"));
    } finally {
      setIsSavingEmail(false);
    }
  };

  const handleChangePassword = async () => {
    if (!token) return;

    if (twoFAEnabled && !pendingAction) {
      setPendingAction("password");
      setTwoFAVerificationCode("");
      setTwoFAError("");
      setShowPasswordModal(false);
      setShow2FAVerificationModal(true);
      return;
    }

    setPasswordError("");
    setIsSavingPassword(true);

    try {
      await changePassword(token, passwordForm);
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: "", newPassword: "" });
      setShow2FAVerificationModal(false);
      setPendingAction(null);
      setTwoFAVerificationCode("");
      setMessage(t("passwordChangedSuccess"));
      setTimeout(() => setMessage(""), 3000);
    } catch (error: any) {
      setPasswordError(error.message || t("passwordChangeError"));
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!token) return;

    setDeletionError("");
    setIsDeletingAccount(true);

    try {
      const data: DeleteAccountRequest = { password: deletionPassword };
      await deleteAccount(token, data);

      setShowDeleteModal(false);
      setDeletionPassword("");
      setMessage("Account deleted successfully.");
      
      // Cerrar sesión después de eliminar la cuenta
      logout();
      
      // Redirigir a la página principal después de un breve delay
      setTimeout(() => {
        window.location.href = '/home';
      }, 1000);
    } catch (error: any) {
      setDeletionError(error.message || "Failed to delete account");
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const filteredPayments = payments.filter((payment) =>
    payment.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const menuItems = [
    { key: "ordersHistory", icon: CreditCard },
    { key: "accountAndLocale", icon: User },
    { key: "loginAndSecurity", icon: Lock },
    { key: "deleteAccount", icon: Trash2 },
  ];

  if (showOnlySection) {
    return (
      <section className="orders-panel">
        <div className="panel-topbar">
          <div className="panel-heading">
            <span className="panel-label">{t(showOnlySection)}</span>
            <h2 className="panel-title">{t(showOnlySection)}</h2>
          </div>
        </div>
        {showOnlySection === "ordersHistory" && (
          <div className="orders-list">
            {loading ? (
              <div className="orders-empty">{t("loadingPayments")}</div>
            ) : !isAuthenticated ? (
              <div className="orders-empty">
                <p>{t("signInToViewPayments")}</p>
                <IonRouterLink routerLink="/login" className="login-link">
                  {t("signIn")}
                </IonRouterLink>
              </div>
            ) : filteredPayments.length === 0 ? (
              <div className="orders-empty">{t("noPaymentsFound")}</div>
            ) : (
              filteredPayments.map((payment) => {
                let paymentItems: { id: number; name: string; quantity: number; price: number; image: string; }[] = [];
                if (payment.items) {
                  try {
                    paymentItems = JSON.parse(payment.items);
                  } catch (error) {
                    console.error('Error parsing order items:', error);
                  }
                }

                return (
                  <article key={payment.id} className="order-card">
                    <div className="order-card-header">
                      <div className="order-card-header-left">
                        <p className="order-number">ORDER #{payment.orderId}</p>
                        <span className="order-date">{new Date(payment.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span className="order-price">€{Number(payment.amount).toFixed(2)}</span>
                    </div>

                    <div className="order-card-body">
                      <div className="order-thumb">{payment.productName?.charAt(0) || "#"}</div>
                      <div className="order-details">
                        <p className="order-product">{payment.productName}</p>
                        <div className="order-meta">
                          <span className="order-subtitle">{payment.status}</span>
                        </div>
                        <div className="order-details-actions">
                          <button type="button" className="order-details-btn order-details-btn-small" onClick={() => toggleOrderDetails(payment.id)}>
                            {expandedOrders[payment.id] ? t('hideDetails') : t('showDetails')}
                          </button>
                          {payment.status === 'success' && (
                            <button 
                              className="order-details-btn order-details-btn-small" 
                              onClick={() => downloadGame(payment.orderId, payment.productName)}
                              disabled={downloadingOrderId === payment.orderId}
                            >
                              {downloadingOrderId === payment.orderId ? 'Downloading...' : 'Download Game'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {expandedOrders[payment.id] && (
                      <div className="order-items-details">
                        <h4>{t('orderItemsTitle')}</h4>
                        {paymentItems.length > 0 ? (
                          paymentItems.map((item) => (
                            <div key={item.id} className="order-item-row">
                              <img src={item.image} alt={item.name} className="order-item-image" />
                              <div className="order-item-info">
                                <p className="order-item-name">{item.name}</p>
                                <p className="order-item-qty">{t('orderItemsQuantity').replace('{count}', item.quantity.toString())}</p>
                              </div>
                              <span className="order-item-price">€{Number(item.price).toFixed(2)}</span>
                            </div>
                          ))
                        ) : (
                          <p className="order-item-empty">{t('orderItemsEmpty')}</p>
                        )}
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>
        )}
        {showOnlySection === "accountAndLocale" && (
          <div className="account-content">
            <div className="account-section">
              <h3>{t("myIdentity")}</h3>
              {message && <div className="account-message account-message-above-section">{message}</div>}
              {profileLoading ? (
                <div className="orders-empty">{t("loadingProfile")}</div>
              ) : (
                <>
                  <div className="account-row">
                    <span>{t("avatar")}</span>
                    <div className="account-avatar">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="avatar" className="account-avatar-img" />
                      ) : (
                        <User className="sidebar-icon" />
                      )}
                    </div>
                    <div>
                      <button
                        className="button-secondary"
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                      >
                        {t("change")}
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={avatarInputRef}
                        onChange={handleAvatarChange}
                        hidden
                      />
                    </div>
                  </div>
                  <div className="account-row">
                    <span>{t("username")}</span>
                    <input
                      name="username"
                      value={accountForm.username}
                      onChange={handleAccountChange}
                      className="account-input"
                      placeholder={t("yourUsername")}
                    />
                    <div />
                  </div>
                  <div className="account-row">
                    <span>{t("phoneNumber")}</span>
                    <input
                      name="phoneNumber"
                      value={accountForm.phoneNumber}
                      onChange={handleAccountChange}
                      className="account-input"
                      placeholder={t("addPhoneNumber")}
                    />
                    <button
                      type="button"
                      className="button-primary"
                      onClick={handleAddPhone}
                      disabled={phoneSaving || profileLoading || !isAuthenticated}
                    >
                      {phoneSaving ? t("saving") : t("add")}
                    </button>
                  </div>
                  <div className="account-row">
                    <span>{t("birthday")}</span>
                    <input
                      name="birthDate"
                      type="date"
                      value={accountForm.birthDate}
                      onChange={handleAccountChange}
                      className="account-input"
                    />
                    <div />
                  </div>
                  <div className="account-row">
                    <span>{t("country")}</span>
                    <select
                      name="country"
                      value={accountForm.country}
                      onChange={handleAccountChange}
                      className="account-select"
                    >
                      <option value="Spain">Spain</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Italy">Italy</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Japan">Japan</option>
                      <option value="China">China</option>
                      <option value="India">India</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Chile">Chile</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Peru">Peru</option>
                      <option value="Venezuela">Venezuela</option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Uruguay">Uruguay</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Other">Other</option>
                    </select>
                    <div />
                  </div>
                  <div className="account-row">
                    <span>{t("currency")}</span>
                    <select
                      name="currency"
                      value={accountForm.currency}
                      onChange={handleAccountChange}
                      className="account-select"
                    >
                      <option value="Euro (EUR)">Euro (EUR)</option>
                      <option value="US Dollar (USD)">US Dollar (USD)</option>
                      <option value="British Pound (GBP)">British Pound (GBP)</option>
                      <option value="Japanese Yen (JPY)">Japanese Yen (JPY)</option>
                      <option value="Canadian Dollar (CAD)">Canadian Dollar (CAD)</option>
                      <option value="Australian Dollar (AUD)">Australian Dollar (AUD)</option>
                      <option value="Swiss Franc (CHF)">Swiss Franc (CHF)</option>
                      <option value="Chinese Yuan (CNY)">Chinese Yuan (CNY)</option>
                      <option value="Indian Rupee (INR)">Indian Rupee (INR)</option>
                      <option value="Brazilian Real (BRL)">Brazilian Real (BRL)</option>
                      <option value="Mexican Peso (MXN)">Mexican Peso (MXN)</option>
                      <option value="Argentine Peso (ARS)">Argentine Peso (ARS)</option>
                      <option value="Chilean Peso (CLP)">Chilean Peso (CLP)</option>
                      <option value="Colombian Peso (COP)">Colombian Peso (COP)</option>
                      <option value="Peruvian Sol (PEN)">Peruvian Sol (PEN)</option>
                      <option value="Venezuelan Bolivar (VES)">Venezuelan Bolivar (VES)</option>
                      <option value="Uruguayan Peso (UYU)">Uruguayan Peso (UYU)</option>
                      <option value="Paraguayan Guarani (PYG)">Paraguayan Guarani (PYG)</option>
                      <option value="Bolivian Boliviano (BOB)">Bolivian Boliviano (BOB)</option>
                    </select>
                    <div />
                  </div>
                  <div className="account-row">
                    <span>{t("language")}</span>
                    <select
                      name="language"
                      value={accountForm.language}
                      onChange={handleAccountChange}
                      className="account-select"
                    >
                      <option value="English">English</option>
                      <option value="Español">Español</option>
                    </select>
                    <div />
                  </div>
                  <div className="account-row account-row-save">
                    <div />
                    <button
                      type="button"
                      className="button-primary"
                      onClick={handleProfileSave}
                      disabled={profileSaving || profileLoading || !isAuthenticated}
                    >
                      {profileSaving ? t("saving") : t("saveChanges")}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <div className="orders-settings-page">
      <div className="orders-settings-wrapper">
        <aside className="orders-sidebar">
          <span className="sidebar-title">{t("ordersHistory")}</span>
          <nav className="sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  className={`sidebar-item ${item.key === activeSection ? "active" : ""}`}
                  onClick={() => {
                    setActiveSection(item.key);
                    setMessage("");
                  }}
                >
                  <Icon className="sidebar-icon" />
                  <span>{t(item.key)}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="orders-panel">
          <div className="panel-topbar">
            <div className="panel-heading">
              <span className="panel-label">{t(activeSection)}</span>
              <h2 className="panel-title">{t(activeSection)}</h2>
            </div>
          </div>

          {activeSection === "ordersHistory" ? (
            <div className="orders-list">
              {loading ? (
                <div className="orders-empty">{t("loadingPayments")}</div>
              ) : !isAuthenticated ? (
                <div className="orders-empty">
                  <p>{t("signInToViewPayments")}</p>
                  <IonRouterLink routerLink="/login" className="login-link">
                    {t("signIn")}
                  </IonRouterLink>
                </div>
              ) : filteredPayments.length === 0 ? (
                <div className="orders-empty">{t("noPaymentsFound")}</div>
              ) : (
                filteredPayments.map((payment) => {
                  let paymentItems: { id: number; name: string; quantity: number; price: number; image: string; }[] = [];
                  if (payment.items) {
                    try {
                      paymentItems = JSON.parse(payment.items);
                    } catch (error) {
                      console.error('Error parsing order items:', error);
                    }
                  }

                  return (
                    <article key={payment.id} className="order-card">
                      <div className="order-card-header">
                        <div className="order-card-header-left">
                          <p className="order-number">ORDER #{payment.orderId}</p>
                          <span className="order-date">{new Date(payment.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className="order-price">€{Number(payment.amount).toFixed(2)}</span>
                      </div>

                      <div className="order-card-body">
                        <div className="order-thumb">{payment.productName?.charAt(0) || "#"}</div>
                        <div className="order-details">
                          <p className="order-product">{payment.productName}</p>
                          <div className="order-meta">
                            <span className="order-subtitle">{payment.status}</span>
                          </div>
                          <div className="order-details-actions">
                            <button type="button" className="order-details-btn order-details-btn-small" onClick={() => toggleOrderDetails(payment.id)}>
                              {expandedOrders[payment.id] ? t('hideDetails') : t('showDetails')}
                            </button>
                            {payment.status === 'success' && (
                              <button 
                                className="order-details-btn order-details-btn-small" 
                                onClick={() => downloadGame(payment.orderId, payment.productName)}
                                disabled={downloadingOrderId === payment.orderId}
                              >
                                {downloadingOrderId === payment.orderId ? 'Downloading...' : 'Download Game'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {expandedOrders[payment.id] && (
                        <div className="order-items-details">
                          <h4>{t('orderItemsTitle')}</h4>
                          {paymentItems.length > 0 ? (
                            paymentItems.map((item) => (
                              <div key={item.id} className="order-item-row">
                                <img src={item.image} alt={item.name} className="order-item-image" />
                                <div className="order-item-info">
                                  <p className="order-item-name">{item.name}</p>
                                  <p className="order-item-qty">{t('orderItemsQuantity').replace('{count}', item.quantity.toString())}</p>
                                </div>
                                <span className="order-item-price">€{Number(item.price).toFixed(2)}</span>
                              </div>
                            ))
                          ) : (
                            <p className="order-item-empty">{t('orderItemsEmpty')}</p>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })
              )}
            </div>
          ) : activeSection === "accountAndLocale" ? (
            <div className="account-content">
              <div className="account-section">
                <h3>{t("myIdentity")}</h3>
                {message && <div className="account-message account-message-above-section">{message}</div>}
                {profileLoading ? (
                  <div className="orders-empty">{t("loadingProfile")}</div>
                ) : (
                  <>
                    <div className="account-row">
                      <span>{t("avatar")}</span>
                      <div className="account-avatar">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="avatar" className="account-avatar-img" />
                        ) : (
                          <User className="sidebar-icon" />
                        )}
                      </div>
                      <div>
                        <button
                          className="button-secondary"
                          type="button"
                          onClick={() => avatarInputRef.current?.click()}
                        >
                          {t("change")}
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={avatarInputRef}
                          onChange={handleAvatarChange}
                          hidden
                        />
                      </div>
                    </div>
                    <div className="account-row">
                      <span>{t("username")}</span>
                      <input
                        name="username"
                        value={accountForm.username}
                        onChange={handleAccountChange}
                        className="account-input"
                        placeholder={t("yourUsername")}
                      />
                      <div />
                    </div>
                    <div className="account-row">
                      <span>{t("phoneNumber")}</span>
                      <input
                        name="phoneNumber"
                        value={accountForm.phoneNumber}
                        onChange={handleAccountChange}
                        className="account-input"
                        placeholder={t("addPhoneNumber")}
                      />
                      <button
                        type="button"
                        className="button-primary"
                        onClick={handleAddPhone}
                        disabled={phoneSaving || profileLoading || !isAuthenticated}
                      >
                        {phoneSaving ? t("saving") : t("add")}
                      </button>
                    </div>
                    <div className="account-row">
                      <span>{t("birthday")}</span>
                      <input
                        name="birthDate"
                        type="date"
                        value={accountForm.birthDate}
                        onChange={handleAccountChange}
                        className="account-input"
                      />
                    </div>
                    <div className="account-row">
                      <span>{t("location")}</span>
                      <select
                        name="country"
                        value={accountForm.country}
                        onChange={handleAccountChange}
                        className="account-select"
                      >
                        <option>Spain</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>France</option>
                        <option>Germany</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              <div className="account-section">
                <h3>{t("locale")}</h3>
                <div className="account-row">
                  <span>{t("currency")}</span>
                  <select
                    name="currency"
                    value={accountForm.currency}
                    onChange={handleAccountChange}
                    className="account-select"
                  >
                    <option>Euro (EUR)</option>
                    <option>US Dollar (USD)</option>
                    <option>British Pound (GBP)</option>
                    <option>Japanese Yen (JPY)</option>
                  </select>
                </div>
                <div className="account-row">
                  <span>{t("language")}</span>
                  <select
                    name="language"
                    value={accountForm.language}
                    onChange={handleAccountChange}
                    className="account-select"
                  >
                    <option>English</option>
                    <option>Español</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>

              <div className="account-footer">
                <button
                  onClick={handleProfileSave}
                  className="button-primary"
                  disabled={profileSaving || profileLoading || !isAuthenticated}
                >
                  {profileSaving ? t("saving") : t("saveChanges")}
                </button>
              </div>
            </div>
          ) : activeSection === "loginAndSecurity" ? (
            <div className="account-content">
              {message && <div className="account-message account-message-above-section">{message}</div>}
              <div className="account-section login-security-card">
                <div className="login-card-header">
                  <h3>{t("accountLogin")}</h3>
                </div>
                {profileLoading ? (
                  <div className="orders-empty">{t("loadingProfile")}</div>
                ) : (
                  <>
                    <div className="login-row">
                      <span>{t("email")}</span>
                      <span className="login-value">{profile?.email || "-"}</span>
                      <button 
                        className="button-secondary"
                        onClick={() => {
                          setEmailForm({ currentPassword: "", newEmail: profile?.email || "" });
                          setEmailError("");
                          setShowEmailModal(true);
                        }}
                      >
                        {t("change")}
                      </button>
                    </div>
                    <div className="login-row">
                      <span>{t("password")}</span>
                      <span className="login-value">••••••••••••••••</span>
                      <button 
                        className="button-secondary"
                        onClick={() => {
                          setPasswordForm({ currentPassword: "", newPassword: "" });
                          setPasswordError("");
                          setShowPasswordModal(true);
                        }}
                      >
                        {t("change")}
                      </button>
                    </div>
                    <div className="login-row">
                      <span>{t("twoFactorAuthentication")}</span>
                      <span className="login-value">
                        {twoFAStatusLoading ? t("loading") : twoFAEnabled ? t("enabled") : t("disabled")}
                      </span>
                      {!twoFAStatusLoading && !twoFAEnabled && (
                        <button
                          className="button-secondary"
                          onClick={handleActivate2FA}
                          disabled={twoFALoading}
                        >
                          {t("activate2FA")}
                        </button>
                      )}
                      {!twoFAStatusLoading && twoFAEnabled && (
                        <button
                          className="button-secondary"
                          onClick={() => {
                            setTwoFACode("");
                            setTwoFAError("");
                            setShowDisable2FAModal(true);
                          }}
                          disabled={twoFALoading}
                        >
                          {t("disable")}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>          ) : activeSection === "deleteAccount" ? (
            <div className="account-content">
              <div className="delete-account-card">
                <h3>{t("confirmAccountDeletion")}</h3>
                <div className="delete-account-text">
                  <p>{t("thisActionCannotBeUndone")}</p>
                </div>
                <button 
                  className="button-danger delete-account-button"
                  onClick={() => {
                    setDeletionPassword("");
                    setDeletionError("");
                    setShowDeleteModal(true);
                  }}
                >
                  {t("deleteAccountButton")}
                </button>
              </div>
            </div>
          ) : (
            <div className="orders-empty">This section is not available yet.</div>
          )}
        </section>
      </div>

      {/* Modal de verificación 2FA para cambios de email/contraseña */}
      {show2FAVerificationModal && (
        <div className="modal-overlay" onClick={() => {
          setShow2FAVerificationModal(false);
          setPendingAction(null);
          setTwoFAVerificationCode("");
          setTwoFAError("");
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{t("twoFactorVerification")}</h3>
            <p style={{ color: "#999", marginBottom: "20px", fontSize: "0.95em" }}>
              {pendingAction === "email" 
                ? t("enter2FACodeToChangeEmail") 
                : t("enter2FACodeToChangePassword")}
            </p>
            {twoFAError && <div className="modal-error">{twoFAError}</div>}
            <div className="modal-form-group">
              <label>{t("authenticatorCode")}</label>
              <input
                type="text"
                placeholder={t("codePlaceholder")}
                value={twoFAVerificationCode}
                onChange={(e) => setTwoFAVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="modal-input"
                maxLength={6}
              />
            </div>
            <div className="modal-buttons">
              <button
                className="button-secondary"
                onClick={() => {
                  setShow2FAVerificationModal(false);
                  setPendingAction(null);
                  setTwoFAVerificationCode("");
                  setTwoFAError("");
                }}
              >
                {t("cancel")}
              </button>
              <button
                className="button-primary"
                onClick={handleVerify2FAForAction}
                disabled={twoFALoading || twoFAVerificationCode.length !== 6}
              >
                {twoFALoading ? t("verifying") : t("verify")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de cambio de email */}
      {showEmailModal && (
        <div className="modal-overlay" onClick={() => setShowEmailModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{t("changeEmail")}</h3>
            {emailError && <div className="modal-error">{emailError}</div>}
            <div className="modal-form-group">
              <label>{t("currentPassword")}</label>
              <input
                type="password"
                placeholder={t("enterCurrentPassword")}
                value={emailForm.currentPassword}
                onChange={(e) => setEmailForm({ ...emailForm, currentPassword: e.target.value })}
                className="modal-input"
              />
            </div>
            <div className="modal-form-group">
              <label>{t("newEmail")}</label>
              <input
                type="email"
                placeholder={t("enterNewEmail")}
                value={emailForm.newEmail}
                onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                className="modal-input"
              />
            </div>
            <div className="modal-buttons">
              <button 
                className="button-secondary"
                onClick={() => setShowEmailModal(false)}
              >
                {t("cancel")}
              </button>
              <button 
                className="button-primary"
                onClick={handleChangeEmail}
                disabled={isSavingEmail || !emailForm.currentPassword || !emailForm.newEmail}
              >
                {isSavingEmail ? t("saving") : t("changeEmailButton")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de cambio de contraseña */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{t("changePassword")}</h3>
            {passwordError && <div className="modal-error">{passwordError}</div>}
            <div className="modal-form-group">
              <label>{t("currentPassword")}</label>
              <input
                type="password"
                placeholder={t("enterCurrentPassword")}
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="modal-input"
              />
            </div>
            <div className="modal-form-group">
              <label>{t("newPassword")}</label>
              <input
                type="password"
                placeholder={t("enterNewPassword")}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="modal-input"
              />
            </div>
            <div className="modal-buttons">
              <button 
                className="button-secondary"
                onClick={() => setShowPasswordModal(false)}
              >
                {t("cancel")}
              </button>
              <button 
                className="button-primary"
                onClick={handleChangePassword}
                disabled={isSavingPassword || !passwordForm.currentPassword || !passwordForm.newPassword}
              >
                {isSavingPassword ? t("saving") : t("changePasswordButton")}
              </button>
            </div>
          </div>
        </div>
      )}

      {show2FAModal && (
        <div className="modal-overlay" onClick={() => setShow2FAModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{t("setup2FATitle")}</h3>
            {twoFAError && <div className="modal-error">{twoFAError}</div>}
            <div className="modal-form-group">
              <label>{t("scanTheQRCode")}</label>
              {twoFAQR ? (
                <img src={twoFAQR} alt="2FA QR" className="twofa-qr" />
              ) : (
                <p>{t("loading")}</p>
              )}
            </div>
            <div className="modal-form-group">
              <label>{t("enter2FACode")}</label>
              <input
                type="text"
                placeholder={t("codePlaceholder")}
                value={twoFACode}
                onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="modal-input"
              />
            </div>
            <div className="modal-buttons">
              <button
                className="button-secondary"
                onClick={() => setShow2FAModal(false)}
              >
                {t("cancel")}
              </button>
              <button
                className="button-primary"
                onClick={handleVerify2FACode}
                disabled={twoFALoading || twoFACode.length !== 6}
              >
                {twoFALoading ? t("processing") : t("activate2FA")}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDisable2FAModal && (
        <div className="modal-overlay" onClick={() => setShowDisable2FAModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{t("twoFactorAuthentication")}</h3>
            {twoFAError && <div className="modal-error">{twoFAError}</div>}
            <div className="modal-form-group">
              <label>{t("enter2FACode")}</label>
              <input
                type="text"
                placeholder={t("codePlaceholder")}
                value={twoFACode}
                onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="modal-input"
              />
              <p style={{ fontSize: "0.9em", color: "#999", marginTop: "8px" }}>
                {t("enterYourAuthenticatorCode")}
              </p>
            </div>
            <div className="modal-buttons">
              <button
                className="button-secondary"
                onClick={() => setShowDisable2FAModal(false)}
              >
                {t("cancel")}
              </button>
              <button
                className="button-primary"
                onClick={async () => {
                  const success = await handleDisable2FA();
                  if (success) {
                    setShowDisable2FAModal(false);
                  }
                }}
                disabled={twoFALoading || twoFACode.length !== 6}
              >
                {twoFALoading ? t("processing") : t("disable")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de eliminación de cuenta */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{t("confirmAccountDeletion")}</h3>
            {deletionError && <div className="modal-error">{deletionError}</div>}
            <div className="modal-form-group">
              <label>{t("enterPasswordToConfirm")}</label>
              <input
                type="password"
                placeholder={t("enterYourPassword")}
                value={deletionPassword}
                onChange={(e) => setDeletionPassword(e.target.value)}
                className="modal-input"
              />
            </div>
            <div className="deletion-warning">
              <p>{t("deletionWarningText")}</p>
            </div>
            <div className="modal-buttons">
              <button 
                className="button-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                {t("cancel")}
              </button>
              <button 
                className="button-danger"
                onClick={handleDeleteAccount}
                disabled={isDeletingAccount || !deletionPassword}
              >
                {isDeletingAccount ? t("deleting") : t("deleteMyAccount")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSettings;
