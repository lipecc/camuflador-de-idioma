import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { EditorPanel } from './components/EditorPanel';
import { ArrowRightIcon } from './components/Icons';
import { useClipboard } from './hooks/useClipboard';
import { camouflageText } from './utils/camouflage';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const { isCopied, copy } = useClipboard();

  const handleCamouflage = useCallback(() => {
    if (!inputText) return;
    const camouflaged = camouflageText(inputText);
    setOutputText(camouflaged);
  }, [inputText]);

  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="flex flex-col flex-grow w-full max-w-7xl mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 flex-grow">
          <EditorPanel
            title="Texto Original"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onClear={handleClear}
            placeholder="Digite ou cole seu texto aqui..."
          />

          <div className="flex items-center justify-center my-4 lg:my-0">
            <button
              onClick={handleCamouflage}
              disabled={!inputText}
              className="p-4 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:scale-110 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100 lg:rotate-0 rotate-90"
              aria-label="Camuflar texto"
            >
              <ArrowRightIcon className="w-6 h-6" />
            </button>
          </div>

          <EditorPanel
            title="Texto Camuflado"
            value={outputText}
            isReadOnly={true}
            onCopy={() => copy(outputText)}
            isCopied={isCopied}
            placeholder={'O resultado aparecerá aqui...'}
          />
        </div>
      </main>
      <footer className="text-center mt-8 text-gray-500 text-sm">
        <p>Ferramenta de substituição de caracteres.</p>
      </footer>
    </div>
  );
}