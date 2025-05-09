import { useNavigate } from "react-router-dom";
import { useQuestionnaire } from "../context/useQuestionnaire";
import { useEffect } from "react";
import QuestionnaireComplete from "../components/common/QuestionnaireComplete";

const CompletionPage: React.FC = () => {
  const { isCompleted, patient } = useQuestionnaire();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCompleted || !patient) {
      navigate("/");
    }
  }, [isCompleted, patient, navigate]);

  if (!isCompleted || !patient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <QuestionnaireComplete />
    </div>
  );
};

export default CompletionPage;