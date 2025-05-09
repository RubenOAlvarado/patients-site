import { motion } from "framer-motion";
import ClientSelector from "../components/common/ClientSelector";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Welcome to the Health Questionnaire System
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12">
          Select your organization to begin the health assessment process.
        </p>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
        >
          <ClientSelector />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;