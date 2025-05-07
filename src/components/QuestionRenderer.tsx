import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { useQuestionnaire } from '../context/useQuestionnaire';

interface QuestionRendererProps {
  question: Question;
  onNext: () => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, onNext }) => {
  const { saveResponse, responses } = useQuestionnaire();
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  const { baseQuestion } = question;
  const questionType = baseQuestion.questionType;
  const responseDataType = baseQuestion.responseDataType;
  const validationRules = baseQuestion.validationRules;
  
  useEffect(() => {
    const existingResponse = responses[baseQuestion.id];
    if (existingResponse) {
      setValue(existingResponse.response);
      setSubmitted(true);
    } else {
      setValue('');
      setSubmitted(false);
    }
  }, [question, responses, baseQuestion.id]);

  const validateResponse = (): boolean => {
    setError(null);
    
    if (validationRules.required && !value.trim()) {
      setError('This question is required');
      return false;
    }
    
    if (value) {
      switch (responseDataType) {
        case 'INTEGER': {
          const numValue = Number(value);
          if (isNaN(numValue)) {
            setError('Please enter a valid number');
            return false;
          }
          
          if (validationRules.min !== undefined && numValue < validationRules.min) {
            setError(`Min value is ${validationRules.min}`);
            return false;
          }
          
          if (validationRules.max !== undefined && numValue > validationRules.max) {
            setError(`Max value is ${validationRules.max}`);
            return false;
          }
          break;
        }  
        case 'STRING':
          if (validationRules.minLength && value.length < validationRules.minLength) {
            setError(`Text must be at least ${validationRules.minLength} characters`);
            return false;
          }
          
          if (validationRules.maxLength && value.length > validationRules.maxLength) {
            setError(`Text should not exceed ${validationRules.maxLength} characters`);
            return false;
          }
          
          if (validationRules.pattern) {
            const regex = new RegExp(validationRules.pattern);
            if (!regex.test(value)) {
              setError(validationRules.patternMessage || 'The entered format is not valid');
              return false;
            }
          }
          break;
      }
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (validateResponse()) {
      saveResponse(baseQuestion.id, value);
      setSubmitted(true);
      onNext();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValue(e.target.value);
    if (error) setError(null);
  };

  const renderInputField = () => {
    switch (questionType) {
      case 'TEXT':
        if (validationRules.multiline) {
          return (
            <textarea
              value={value}
              onChange={handleChange as React.ChangeEventHandler<HTMLTextAreaElement>}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              disabled={submitted}
            />
          );
        } else {
          return (
            <input
              type="text"
              value={value}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={submitted}
            />
          );
        }
        
      case 'MULTIPLE_CHOICE': {
        const options = baseQuestion.metadata.options || [];
        return (
          <div className="space-y-2">
            {options.map((option: { value: string; label: string }, index: number) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name={`question-${baseQuestion.id}`}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  className="mr-2"
                  disabled={submitted}
                />
                <label htmlFor={`option-${index}`} className="text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      }  
      case 'BOOLEAN':
        return (
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="option-yes"
                name={`question-${baseQuestion.id}`}
                value="true"
                checked={value === "true"}
                onChange={handleChange}
                className="mr-2"
                disabled={submitted}
              />
              <label htmlFor="option-yes" className="text-gray-700">Yes</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="option-no"
                name={`question-${baseQuestion.id}`}
                value="false"
                checked={value === "false"}
                onChange={handleChange}
                className="mr-2"
                disabled={submitted}
              />
              <label htmlFor="option-no" className="text-gray-700">No</label>
            </div>
          </div>
        );
        
      case 'SCALE': {
        const min = validationRules.min || 0;
        const max = validationRules.max || 10;
        const step = validationRules.step || 1;
        
        return (
          <div className="space-y-4">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value || min}
              onChange={handleChange}
              className="w-full"
              disabled={submitted}
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{validationRules.minLabel || min}</span>
              <span>{value || min}</span>
              <span>{validationRules.maxLabel || max}</span>
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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-medium text-gray-800 mb-4">{question.questionText}</h3>
      
      <div className="mb-4">
        {renderInputField()}
      </div>
      
      {error && (
        <div className="mb-4 text-red-500 text-sm">
          {error}
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline ${
            submitted ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={submitted}
        >
          {submitted ? 'Response saved' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuestionRenderer;