import { useNavigate } from "react-router-dom";
import { useQuestionnaire } from "../context/useQuestionnaire";
import { useState } from "react";
import LanguagesList from "./LanguagesList";

const PatientForm: React.FC = () => {
  const { client, setPatient } = useQuestionnaire();
  const defaultLanguage = client?.defaultLanguage || 'en';
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    preferredLanguage: defaultLanguage,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setFormData(prev => ({
        ...prev,
        preferredLanguage: languageCode
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!client) {
      setError('No client selected. Please go back and select a client.');
      return;
    }

    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await setPatient({
        clientId: client.id,
        basicInfo: {
          name: formData.name,
          email: formData.email || undefined,
          phone: formData.phone || undefined,
          age: formData.age ? parseInt(formData.age) : undefined,
          gender: formData.gender || undefined,
        },
        preferredLanguage: formData.preferredLanguage,
      });
      
      navigate('/questionnaire');
    } catch (err) {
      setError(`Error creating patient: ${err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Patient information
      </h2>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="0"
              max="120"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div>
          <LanguagesList 
            onLanguageSelect={handleLanguageSelect}
            selectedLanguageCode={selectedLanguage}
            label="Prefered language"
           />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Go Back
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;