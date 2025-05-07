import { useNavigate } from "react-router-dom";
import { useQuestionnaire } from "../context/useQuestionnaire";
import { useEffect } from "react";
import QuestionnaireComplete from "../components/QuestionnaireComplete";

const CompletionPage: React.FC = () => {
  const { isCompleted, patient } = useQuestionnaire();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCompleted || !patient) {
      navigate('/');
    }
  }, [isCompleted, patient, navigate]);

  if (!isCompleted || !patient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <QuestionnaireComplete />
    </div>
  );
};

export default CompletionPage;