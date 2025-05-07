import { useEffect, useState } from "react";
import { Client } from "../types";
import { useQuestionnaire } from "../context/useQuestionnaire";
import { useNavigate } from "react-router-dom";
import { fetchClients } from "../services/api";
import LoadingSpinner from "./LoadingSpinner";

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
        setClients(data.filter(client => client.isActive));
        setLoading(false);
      } catch (err) {
        setError(`Error fetching clients: ${err}`);
        setLoading(false);
      }
    };

    getClients();
  }, []);

  const handleClientSelection = (client: Client) => {
    setClient(client);
    navigate('/patient-info');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
        <button 
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Pick your organization
      </h2>
      
      {clients.length === 0 ? (
        <p className="text-center text-gray-600">No organizations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
              onClick={() => handleClientSelection(client)}
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-700">{client.name}</h3>
              <p className="text-gray-600 text-sm">
                Default Language: {client.defaultLanguage}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientSelector;