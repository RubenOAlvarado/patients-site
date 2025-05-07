import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QuestionnaireProvider } from "./context/QuestionnaireContext";
import HomePage from "./pages/Home";
import PatientInfoPage from "./pages/PatientInfoPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import CompletionPage from "./pages/CompletionPage";

const App: React.FC = () => {
  return (
    <QuestionnaireProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patient-info" element={<PatientInfoPage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/completion" element={<CompletionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </QuestionnaireProvider>
  );
};

export default App;
