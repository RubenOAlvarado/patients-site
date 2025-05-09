import { useEffect } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ProgressBar from "../components/ui/ProgressBar";
import QuestionRenderer from "../components/common/QuestionRenderer";
import { useQuestionnaire } from "../context/useQuestionnaire";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const QuestionnairePage: React.FC = () => {
  const {
    patient,
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    submitResponses,
    isSubmitting,
    isCompleted,
  } = useQuestionnaire();

  const navigate = useNavigate();

  useEffect(() => {
    if (!patient) {
      navigate("/");
      return;
    }

    if (isCompleted) {
      navigate("/completion");
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Saving your responses...</h2>
          <LoadingSpinner />
        </motion.div>
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

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg mx-auto"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Health Questionnaire</h1>
          <p className="text-gray-600">
            Please answer the following questions about your health.
          </p>
        </div>

        <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />

        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
        >
          <QuestionRenderer
            question={currentQuestion}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isLastQuestion={isLastQuestion}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QuestionnairePage;