import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { getUserTickets } from "../../services/ticketService.ts";
import { useHistory } from "react-router-dom";
import { IonPage, IonContent } from "@ionic/react";
import SupportHeader from "../../components/support/SupportHeader.tsx";
import TicketModal from "../../components/support/TicketModal.tsx";
import { useNotification } from "../../contexts/NotificationContext.tsx";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "./MyTickets.css";

interface Ticket {
  id: number;
  email: string;
  orderId: string;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  responses?: any[];
}

const MyTickets: React.FC = () => {
  const { token, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  const { addNotification } = useNotification();

  const fetchTickets = async () => {
    try {
      if (!isAuthenticated || !token) {
        setError(t("ticketsAuthRequired"));
        setLoading(false);
        return;
      }

      const data = await getUserTickets(token);
      setTickets(data);
    } catch (err) {
      console.error(err);
      setError(t("ticketsLoadError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [token, isAuthenticated]);

  // Auto-refresh tickets every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated && token && !isModalOpen) {
        fetchTickets();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [token, isAuthenticated, isModalOpen]);

  const handleViewTicket = (ticketId: number) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      setSelectedTicket(ticket);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const handleTicketUpdated = async () => {
    // Recargar los tickets después de una actualización
    try {
      if (isAuthenticated && token) {
        const data = await getUserTickets(token);
        setTickets(data);
        if (selectedTicket) {
          const updated = data.find((t: Ticket) => t.id === selectedTicket.id);
          if (updated) {
            setSelectedTicket(updated);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="my-tickets-container"><p>{t("ticketsLoading")}</p></div>;
  }

  if (error) {
    return <div className="my-tickets-container error"><p>{error}</p></div>;
  }

  return (
    <IonPage>
      <SupportHeader />
      <IonContent fullscreen>
        <div className="my-tickets-container">
      <h1>{t("myTicketsTitle")}</h1>

      {tickets.length === 0 ? (
        <div className="no-tickets">
          <p>{t("noOpenTickets")}</p>
          <button className="btn-create-ticket" onClick={() => history.push("/form")}>{t("createNewTicket")}</button>
        </div>
      ) : (
        <div className="tickets-list">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <div className="ticket-header">
                <div className="ticket-info">
                  <h3>{t("myTicketsTitle")} #{ticket.id}</h3>
                  <p className="ticket-subject">{ticket.subject}</p>
                </div>
                <span className={`status ${ticket.status.toLowerCase()}`}>
                  {ticket.status === "OPEN" ? t("ticketStatusOpen") : t("ticketStatusClosed")}
                </span>
              </div>

              <div className="ticket-body">
                <p className="ticket-description">{ticket.description}</p>
                <div className="ticket-meta">
                  <span>📧 {ticket.email}</span>
                  <span>📦 {t("ticketOrderLabel")} {ticket.orderId || "N/A"}</span>
                  <span>
                    📅 {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>

              <div className="ticket-responses">
                {ticket.responses && ticket.responses.length > 0 ? (
                  <p className="response-count">
                    ✓ {t("ticketResponseCount")
                      .replace("{count}", ticket.responses.length.toString())
                      .replace("{plural}", ticket.responses.length > 1 ? "s" : "")}
                  </p>
                ) : (
                  <p className="no-response">{t("noResponsesYet")}</p>
                )}
              </div>

              <button
                className="btn-view-ticket"
                onClick={() => handleViewTicket(ticket.id)}
              >
                {t("viewDetails")}
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
      </IonContent>

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onTicketUpdated={handleTicketUpdated}
        />
      )}
    </IonPage>
  );
};

export default MyTickets;
