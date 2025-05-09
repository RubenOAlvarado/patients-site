import { Link } from "react-router-dom";
import { useQuestionnaire } from "../../context/useQuestionnaire";
import { motion } from "framer-motion";

const QuestionnaireComplete: React.FC = () => {
  const { patient, client } = useQuestionnaire();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-lg mx-auto p-6"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white shadow-xl rounded-2xl p-8 mb-6 border border-gray-100 text-center"
      >
        <motion.div
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="h-24 w-24 mx-auto mb-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-4 text-gray-800"
        >
          Thank you for completing the questionnaire!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-8"
        >
          <span className="font-medium">{patient?.basicInfo.name}</span>, your answers have been successfully recorded. A representative from{" "}
          <span className="font-semibold text-blue-600">{client?.name}</span> may contact you soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-200 pt-6 mt-8"
        >
          <Link
            to="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default QuestionnaireComplete;