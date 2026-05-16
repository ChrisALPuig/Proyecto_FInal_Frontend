import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useNotification } from "../../contexts/NotificationContext.tsx";
import { replyToTicket } from "../../services/ticketService.ts";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import { API_ENDPOINTS } from "../../config/apiConfig";
import "./TicketModal.css";

interface Ticket {
  id: number;
  email: string;
  orderId: string;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  responses?: {
    id: number;
    message: string;
    responder: "USER" | "ADMIN" | "user" | "admin";
    respondedAt: string;
  }[];
}

interface TicketModalProps {
  ticket: Ticket;
  isOpen: boolean;
  onClose: () => void;
  onTicketUpdated?: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({
  ticket,
  isOpen,
  onClose,
  onTicketUpdated,
}) => {
  const { token, username } = useAuth();
  const { addNotification } = useNotification();
  const { t } = useLanguage();
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [ticket]);

  const handleSubmitResponse = async () => {
    if (!responseText.trim()) {
      alert(t("replyCannotBeEmpty"));
      return;
    }

    setLoading(true);

    try {
      await replyToTicket(ticket.id, responseText, token!);
      alert(t("replySent"));
      setResponseText("");
      onTicketUpdated?.();
    } catch (err: any) {
      console.error(err);
      alert(err.message || t("replySendError"));
    } finally {
      setLoading(false);
    }
  };

  const handleCloseTicket = () => {
    setConfirmCloseOpen(true);
  };

  const submitCloseTicket = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_ENDPOINTS.TICKETS}/${ticket.id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        body: "status=CLOSED",
      });

      if (!res.ok) throw new Error(t("ticketCloseError"));
      addNotification({
        id: `support-ticket-closed-${ticket.id}-${Date.now()}`,
        title: t("ticketClosedNotificationTitle"),
        message: t("ticketClosedNotificationMessage").replace("{id}", ticket.id.toString()),
        createdAt: new Date().toISOString(),
        read: false,
        link: `/ticket/${ticket.id}`,
      });
      onTicketUpdated?.();
      setConfirmCloseOpen(false);
      onClose();
    } catch (err: any) {
      alert(err.message || t("ticketCloseError"));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ticket-modal-overlay" onClick={onClose}>
      <div className="ticket-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ticket-modal-header">
          <div className="header-top">
            <h2>{t("myTicketsTitle")} #{ticket.id}</h2>
            <div className="header-right">
              <button className="ticket-modal-close" onClick={onClose}>
                ✖
              </button>
              <span className={`ticket-modal-status ${ticket.status.toLowerCase()}`}>
                {ticket.status === "OPEN" ? t("ticketStatusOpen") : t("ticketStatusClosed")}
              </span>
            </div>
          </div>
        </div>

        <div className="ticket-modal-info">
          <p>
            <strong>{t("ticketEmailLabel")}</strong> {ticket.email}
          </p>
          <p>
            <strong>{t("ticketOrderLabel")}</strong> {ticket.orderId || "N/A"}
          </p>
          <p>
            <strong>{t("ticketSubjectLabel")}</strong> {ticket.subject}
          </p>
        </div>

        <div className="ticket-modal-messages" ref={chatRef}>
          {/* Mensaje inicial del usuario */}
          <div className="modal-message user-message">
            <div className="message-header">
              <strong>{username || t("userLabel")}</strong>
              <span className="message-time">
                {new Date(ticket.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="message-content">{ticket.description}</p>
          </div>

          {/* Respuestas del admin */}
          {ticket.responses && ticket.responses.length > 0 ? (
            ticket.responses.map((resp) => {
              const isAdminResponse = resp.responder?.toString().toLowerCase() === "admin";
              return (
                <div
                  key={resp.id}
                  className={`modal-message ${
                    isAdminResponse ? "admin-message" : "user-message"
                  }`}
                >
                  <div className="message-header">
                    <strong>{isAdminResponse ? t("adminLabel") : t("userLabel")}</strong>
                    <span className="message-time">
                      {new Date(resp.respondedAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="message-content">{resp.message}</p>
                </div>
              );
            })
          ) : (
            <div className="no-responses">
              <p>{t("noResponsesYet")}</p>
            </div>
          )}
        </div>

        {ticket.status === "OPEN" && (
          <>
            <div className="ticket-modal-response">
              <textarea
                placeholder={t("replyPlaceholder")}
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                disabled={loading}
                className="response-textarea"
              />
            </div>

            <div className="ticket-modal-actions">
              <button
                className="btn-respond"
                onClick={handleSubmitResponse}
                disabled={loading}
              >
                {loading ? t("responding") : t("replyButton")}
              </button>
              <button
                className="btn-close-ticket"
                onClick={handleCloseTicket}
                disabled={loading}
              >
                {t("closeTicketButton")}
              </button>
            </div>
          </>
        )}

        {confirmCloseOpen && (
          <div className="confirm-overlay" onClick={() => setConfirmCloseOpen(false)}>
            <div className="confirm-popup" onClick={(e) => e.stopPropagation()}>
              <h3>{t("confirmCloseTitle")}</h3>
              <p>{t("confirmCloseMessage")}</p>
              <div className="confirm-actions">
                <button
                  className="btn-cancel"
                  type="button"
                  onClick={() => setConfirmCloseOpen(false)}
                  disabled={loading}
                >
                  {t("cancelButton")}
                </button>
                <button
                  className="btn-confirm"
                  type="button"
                  onClick={submitCloseTicket}
                  disabled={loading}
                >
                  {loading ? t("closing") : t("confirmCloseButton")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketModal;
