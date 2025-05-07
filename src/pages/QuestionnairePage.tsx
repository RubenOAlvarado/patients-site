import { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ProgressBar from "../components/ProgressBar";
import QuestionRenderer from "../components/QuestionRenderer";
import { useQuestionnaire } from "../context/useQuestionnaire";
import { useNavigate } from "react-router-dom";

const QuestionnairePage: React.FC = () => {
  const { 
    patient, 
    questions, 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    submitResponses,
    isSubmitting,
    isCompleted
  } = useQuestionnaire();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!patient) {
      navigate('/');
      return;
    }

    if (isCompleted) {
      navigate('/completion');
    }
  }, [patient, navigate, isCompleted]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex >= questions.length) {
      submitResponses();
    }
  }, [currentQuestionIndex, questions.length, submitResponses]);

  if (!patient || questions.length === 0) {
    return <LoadingSpinner />;
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Saving responses...</h2>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return <LoadingSpinner />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Health Questionnaire
          </h1>
          
          <ProgressBar 
            current={currentQuestionIndex + 1} 
            total={questions.length} 
          />
        </div>

        <QuestionRenderer
          question={currentQuestion}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default QuestionnairePage;