import { useEffect, useState } from "react";
import { Client } from "../../types";
import { useQuestionnaire } from "../../context/useQuestionnaire";
import { useNavigate } from "react-router-dom";
import { fetchClients } from "../../services/api";
import LoadingSpinner from "../ui/LoadingSpinner";
import { motion } from "framer-motion";
import ErrorMessage from "../ui/ErrorMessage";

const ClientSelector: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setClient } = useQuestionnaire();
  const navigate = useNavigate();

  useEffect(() => {
    const getClients = async () => {
      try {
        setLoading(true);
        const data = await fetchClients();
        setClients(data.filter((client) => client.isActive));
      } catch (err) {
        setError(`Error fetching clients: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    getClients();
  }, []);

  const handleClientSelection = (client: Client) => {
    setClient(client);
    navigate("/patient-info");
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Select Your Organization</h2>

      {clients.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No active organizations found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleClientSelection(client)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 cursor-pointer border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{client.name}</h3>
              <p className="text-sm text-gray-500">
                Default Language:{" "}
                <span className="font-medium capitalize">{client.defaultLanguage}</span>
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientSelector;