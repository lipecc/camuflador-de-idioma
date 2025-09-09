import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPrompt = (text: string, level: string): string => {
    const levelGuidance = {
        'Sutil': 'Apenas substitua alguns caracteres por seus equivalentes cirílicos visualmente semelhantes. Não altere nenhuma palavra ou a estrutura da frase.',
        'Médio': 'Substitua caracteres e também troque algumas palavras por sinônimos. Mantenha a estrutura geral da frase.',
        'Forte': 'Reescreva o texto de forma mais livre, usando sinônimos e alterando a estrutura das frases para dificultar a detecção. Incorpore agressivamente os caracteres cirílicos.'
    };

    return `Você é um especialista em camuflagem de texto. Sua tarefa é reescrever o texto a seguir para torná-lo mais difícil de ser detectado por sistemas automatizados, mantendo o significado o mais próximo possível para um leitor humano. Você deve conseguir isso substituindo sutilmente alguns caracteres latinos por seus equivalentes cirílicos visualmente idênticos.

Caracteres que você pode usar para substituição:
- 'A' -> 'А'
- 'B' -> 'В'
- 'E' -> 'Е'
- 'K' -> 'К'
- 'M' -> 'М'
- 'H' -> 'Н'
- 'O' -> 'О'
- 'P' -> 'Р'
- 'C' -> 'С'
- 'T' -> 'Т'
- 'Y' -> 'У'
- 'X' -> 'Х'
- 'a' -> 'а'
- 'e' -> 'е'
- 'o' -> 'о'
- 'p' -> 'р'
- 'c' -> 'с'
- 'y' -> 'у'
- 'x' -> 'х'
- 'i' -> 'і'
- 'j' -> 'ј'

Nível de camuflagem solicitado: ${level}.
Instrução para o nível '${level}': ${levelGuidance[level as keyof typeof levelGuidance]}

Responda APENAS com o texto camuflado. Não adicione nenhuma explicação, introdução ou formatação como \`\`\`.

Texto Original:
---
${text}
---
`;
};

export const getCamouflagedText = async (text: string, level: 'Sutil' | 'Médio' | 'Forte'): Promise<string> => {
    if (!text.trim()) {
        return '';
    }

    try {
        const prompt = getPrompt(text, level);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Falha ao se comunicar com a IA. Tente novamente mais tarde.");
    }
};