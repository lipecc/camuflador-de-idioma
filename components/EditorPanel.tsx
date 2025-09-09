import React from 'react';
import { CopyIcon, CheckIcon, ClearIcon } from './Icons';

interface EditorPanelProps {
  title: string;
  value: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isReadOnly?: boolean;
  onCopy?: () => void;
  isCopied?: boolean;
  onClear?: () => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  title,
  value,
  placeholder,
  onChange,
  isReadOnly = false,
  onCopy,
  isCopied = false,
  onClear,
}) => {
  return (
    <div className="flex flex-col bg-gray-800 border border-gray-700 rounded-lg shadow-md h-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-300">{title}</h2>
        <div className="flex items-center space-x-2">
          {onCopy && (
            <button
              onClick={onCopy}
              disabled={!value}
              className="p-2 text-gray-400 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Copiar texto"
            >
              {isCopied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
            </button>
          )}
          {onClear && (
             <button
              onClick={onClear}
              disabled={!value}
              className="p-2 text-gray-400 hover:text-red-400 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Limpar texto"
            >
              <ClearIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      <div className="flex-grow p-1 relative">
        <textarea
          value={value}
          onChange={onChange}
          readOnly={isReadOnly}
          placeholder={placeholder}
          className="w-full h-full min-h-[300px] md:min-h-[400px] bg-transparent text-gray-200 placeholder-gray-500 resize-none focus:outline-none p-3"
          spellCheck="false"
        />
      </div>
    </div>
  );
};