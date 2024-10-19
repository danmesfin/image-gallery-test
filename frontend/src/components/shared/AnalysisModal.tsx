import React from "react";
import { FiCalendar, FiFileText, FiX } from "react-icons/fi";

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  uploadDate: string;
  analysis: string | null;
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  uploadDate,
  analysis,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full flex">
        <div className="w-1/2 pr-4">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-64 object-contain mb-4 rounded-lg"
          />
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 flex items-center">
            <FiCalendar className="mr-2" /> {uploadDate}
          </p>
        </div>
        <div className="w-1/2 pl-4 border-l border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold flex items-center">
              <FiFileText className="mr-2" /> AI Analysis
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>
          <p className="text-gray-700 overflow-y-auto max-h-64">{analysis}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisModal;
