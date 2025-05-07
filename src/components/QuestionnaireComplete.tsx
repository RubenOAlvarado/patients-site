import { Link } from "react-router-dom";
import { useQuestionnaire } from "../context/useQuestionnaire";

const QuestionnaireComplete: React.FC = () => {
  const { patient, client } = useQuestionnaire();

  return (
    <div className="max-w-lg mx-auto p-6 text-center">
      <div className="bg-white shadow-md rounded-lg p-8 mb-6">
        <div className="h-24 w-24 mx-auto mb-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
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
        </div>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Thank you for completing the questionnaire!
        </h2>
        
        <p className="text-gray-600 mb-6">
          {patient?.basicInfo.name}, your answers have been successfully recorded. A representative from {client?.name} may contact you soon.
        </p>
        
        <div className="border-t border-gray-200 pt-6 mt-6">
          <Link 
            to="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline inline-block"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireComplete;