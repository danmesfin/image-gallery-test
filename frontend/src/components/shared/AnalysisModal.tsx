import React from "react";
import { FiCalendar, FiFileText, FiX } from "react-icons/fi";

interface AnalysisModalProps {
  isOpen: boolean;
  onToggle: () => void;
  imageSrc: string;
  title: string;
  uploadDate: string;
  analysis: string | null;
  isLoading: boolean;
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({
  isOpen,
  onToggle,
  imageSrc,
  title,
  uploadDate,
  analysis,
  isLoading,
}) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-full md:w-2/3 lg:w-1/2 bg-white shadow-xl transform ${
        isOpen || isLoading ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="h-full overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onToggle}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-64 object-contain mb-4 rounded-lg"
        />
        <p className="text-gray-600 flex items-center mb-4">
          <FiCalendar className="mr-2" /> {uploadDate}
        </p>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-xl font-semibold flex items-center mb-2">
            <FiFileText className="mr-2" /> AI Analysis
          </h3>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ) : (
            <p className="text-gray-700">{analysis}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisModal;
