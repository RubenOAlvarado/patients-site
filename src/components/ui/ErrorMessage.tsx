import { motion } from "framer-motion";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.div
        className="bg-red-100 text-red-700 border border-red-300 rounded-lg p-4 mb-4 w-full max-w-md"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <p>{message}</p>
      </motion.div>
      {onRetry && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onRetry}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Retry
        </motion.button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;