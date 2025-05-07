import ClientSelector from "../components/ClientSelector";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Health Questionnaire System</h1>
          <p className="text-lg text-gray-600">
            Complete the questionnaire to help us better understand your health needs.
          </p>
        </div>

        <ClientSelector />
      </div>
    </div>
  );
};

export default HomePage;