/* eslint-disable @typescript-eslint/no-explicit-any */
import { Question } from '../../types';
import { useQuestionnaire } from '../../context/useQuestionnaire';
import Toast from '../ui/Toast';
import { motion } from 'framer-motion';
import { useQuestionLogic } from '../../hooks/useQuestionLogic';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

interface QuestionRendererProps {
  question: Question;
  onNext: () => void;
  onPrevious: () => void;
  isLastQuestion: boolean;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  onNext,
  onPrevious,
  isLastQuestion,
}) => {
  const { responses } = useQuestionnaire();
  const { baseQuestion } = question;

  const { value, setValue, error, submitted, validate, submit, back } = useQuestionLogic({
    questionId: baseQuestion.id,
    responses,
    onNext,
    onPrevious,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
    if (error) console.error(error);
  };

  const handleSubmit = () => {
    if (validate(baseQuestion.validationRules)) {
      submit();
    }
  };

  const renderInputField = () => {
    switch (baseQuestion.questionType) {
      case "TEXT":
        return baseQuestion.validationRules.multiline ? (
          <textarea
            value={value}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            disabled={submitted}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={submitted}
          />
        );

      case "MULTIPLE_CHOICE": {
        const options = baseQuestion.metadata?.options || [];
        return (
          <div className="space-y-2">
            {options.map((option: { value: string | number | readonly string[] | undefined; label: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
              <motion.label
                key={index}
                layout
                className={`flex items-center p-3 border rounded cursor-pointer transition-colors ${
                  value === option.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${baseQuestion.id}`}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  disabled={submitted}
                  className="mr-3"
                />
                <span>{option.label}</span>
              </motion.label>
            ))}
          </div>
        );
      }

      case "BOOLEAN":
        return (
          <div className="space-y-2">
            <motion.label
              layout
              className={`flex items-center p-3 border rounded cursor-pointer transition-colors ${
                value === "true"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name={`q-${baseQuestion.id}`}
                value="true"
                checked={value === "true"}
                onChange={handleChange}
                disabled={submitted}
                className="mr-3"
              />
              <span>Yes</span>
            </motion.label>

            <motion.label
              layout
              className={`flex items-center p-3 border rounded cursor-pointer transition-colors ${
                value === "false"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name={`q-${baseQuestion.id}`}
                value="false"
                checked={value === "false"}
                onChange={handleChange}
                disabled={submitted}
                className="mr-3"
              />
              <span>No</span>
            </motion.label>
          </div>
        );

      case "SCALE": {
        const min = baseQuestion.validationRules.min ?? 0;
        const max = baseQuestion.validationRules.max ?? 10;
        const step = baseQuestion.validationRules.step ?? 1;

        return (
          <div className="space-y-4">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value || min}
              onChange={handleChange}
              disabled={submitted}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{baseQuestion.validationRules.minLabel || min}</span>
              <span>{value || min}</span>
              <span>{baseQuestion.validationRules.maxLabel || max}</span>
            </div>
          </div>
        );
      }

      case "DATE":
        return (
          <input
            type="date"
            value={value}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={submitted}
          />
        );

      default:
        return <p className="text-red-500">Unsupported question type</p>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-100"
    >

      <h3 className="text-xl font-medium text-gray-800 mb-4">{question.questionText}</h3>

      <div className="mb-4">{renderInputField()}</div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 text-red-500 text-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="flex justify-between pt-2">
        <button
          onClick={back}
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          ← Back
        </button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={submitted}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors ${
            submitted ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLastQuestion ? "Finish" : submitted ? "Saved" : "Next"}
        </motion.button>
      </div>

      {submitted && <Toast message="Answer saved successfully!" />}
    </motion.div>
  );
};

export default QuestionRenderer;