import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 text-transparent bg-clip-text">
        Camuflador de Idioma
      </h1>
      <p className="mt-2 text-lg text-gray-400">
        Substitua caracteres latinos por cirílicos para ofuscar seu texto.
      </p>
    </header>
  );
};