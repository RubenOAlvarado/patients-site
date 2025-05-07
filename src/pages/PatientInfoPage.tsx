import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestionnaire } from "../context/useQuestionnaire";
import PatientForm from "../components/PatientForm";

const PatientInfoPage: React.FC = () => {
  const { client } = useQuestionnaire();
  const navigate = useNavigate();

  useEffect(() => {
    if (!client) {
      navigate('/');
    }
  }, [client, navigate]);

  if (!client) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {client.name}
          </h1>
          <p className="text-lg text-gray-600">
            Please provide your information to start the questionnaire
          </p>
        </div>

        <PatientForm />
      </div>
    </div>
  );
};

export default PatientInfoPage;