import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestionnaire } from "../context/useQuestionnaire";
import PatientForm from "../components/common/PatientForm";
import { motion } from 'framer-motion';

const PatientInfoPage: React.FC = () => {
  const { client } = useQuestionnaire();
  const navigate = useNavigate();

  useEffect(() => {
    if (!client) {
      navigate("/");
    }
  }, [client, navigate]);

  if (!client) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{client.name}</h1>
          <p className="text-lg text-gray-600">Please provide your information to start the questionnaire</p>
        </div>

        <motion.div
          whileHover={{ boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
        >
          <PatientForm />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PatientInfoPage;