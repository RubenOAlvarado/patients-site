import { useEffect, useState } from "react";
import { Language, LanguagesListProps } from "../types";
import { fetchLanguages } from "../services/api";

const LanguagesList = ({ 
  onLanguageSelect, 
  selectedLanguageCode = '', 
  label = 'Language', 
  className = '' 
}: LanguagesListProps) => {
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
        setError('Error al cargar los idiomas');
        console.error('Error fetching languages:', err);
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
        <div className="animate-pulse h-10 bg-gray-200 rounded"></div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : (
        <select
          id="language-select"
          value={selectedLanguageCode}
          onChange={handleChange}
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select language</option>
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default LanguagesList;