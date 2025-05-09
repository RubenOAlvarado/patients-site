import { useEffect, useState } from "react";
import { Language, LanguagesListProps } from "../../types";
import { fetchLanguages } from "../../services/api";
import { motion } from 'framer-motion';

const LanguagesList: React.FC<LanguagesListProps> = ({
  onLanguageSelect,
  selectedLanguageCode = "",
  label = "Language",
  className = "",
}) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        setLoading(true);
        const data = await fetchLanguages();
        setLanguages(data);
        setError(null);
      } catch (err) {
        setError("Error loading languages");
        console.error("Error fetching languages:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLanguages();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageSelect(e.target.value);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {loading ? (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className="animate-pulse h-10 bg-gray-200 rounded"
        ></motion.div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm"
        >
          {error}
        </motion.div>
      ) : (
        <motion.select
          id="language-select"
          value={selectedLanguageCode}
          onChange={handleChange}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select language</option>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </motion.select>
      )}
    </div>
  );
};

export default LanguagesList;