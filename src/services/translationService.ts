// Servicio de traducción usando Google Translate API
// Traduce el contenido del juego (description, story, requirements, etc.)

export type LanguageCode = "en" | "es";

interface TranslationCache {
  [key: string]: {
    [key: string]: string;
  };
}

const cache: TranslationCache = {};

/**
 * Traduce texto usando Google Translate API sin necesidad de dependencias externas
 * @param text - Texto a traducir
 * @param targetLang - Idioma destino ("en" o "es")
 * @returns Texto traducido
 */
export async function translateText(
  text: string,
  targetLang: LanguageCode
): Promise<string> {
  // Si el idioma es inglés, devolver el texto original
  if (targetLang === "en" || !text) {
    return text;
  }

  // Verificar si está en caché
  const cacheKey = `${text}|${targetLang}`;
  if (cache[targetLang] && cache[targetLang][text]) {
    return cache[targetLang][text];
  }

  try {
    // Usar Google Translate API simple
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
    );
    
    if (!response.ok) {
      console.warn(`Translation API error: ${response.status}`);
      return text;
    }

    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translatedText = data.responseData.translatedText;
      
      // Guardar en caché
      if (!cache[targetLang]) {
        cache[targetLang] = {};
      }
      cache[targetLang][text] = translatedText;
      
      return translatedText;
    }
    
    return text;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}

/**
 * Traduce un array de strings
 * @param texts - Array de textos a traducir
 * @param targetLang - Idioma destino
 * @returns Array de textos traducidos
 */
export async function translateTexts(
  texts: string[],
  targetLang: LanguageCode
): Promise<string[]> {
  if (targetLang === "en") {
    return texts;
  }

  return Promise.all(
    texts.map((text) => translateText(text, targetLang))
  );
}

/**
 * Interfaz para datos de juego traducidos
 */
export interface TranslatedGameData {
  description?: string;
  story?: string;
  systemRequirementsMin?: string;
  systemRequirementsRecommended?: string;
  genres?: string[];
  tags?: string[];
  features?: string[];
}

/**
 * Traduce todos los campos de un juego
 * @param gameData - Objeto con datos del juego a traducir
 * @param targetLang - Idioma destino
 * @returns Objeto con datos traducidos
 */
export async function translateGameContent(
  gameData: TranslatedGameData,
  targetLang: LanguageCode
): Promise<TranslatedGameData> {
  // Si es inglés, devolver sin cambios
  if (targetLang === "en") {
    return gameData;
  }

  const translated: TranslatedGameData = {
    ...gameData,
  };

  // Traducir campos de texto
  const textFields = ["description", "story", "systemRequirementsMin", "systemRequirementsRecommended"] as const;

  for (const field of textFields) {
    if (gameData[field]) {
      translated[field] = await translateText(gameData[field], targetLang);
    }
  }

  // Traducir arrays
  if (gameData.genres && gameData.genres.length > 0) {
    translated.genres = await translateTexts(gameData.genres, targetLang);
  }

  if (gameData.tags && gameData.tags.length > 0) {
    translated.tags = await translateTexts(gameData.tags, targetLang);
  }

  if (gameData.features && gameData.features.length > 0) {
    translated.features = await translateTexts(gameData.features, targetLang);
  }

  return translated;
}

/**
 * Limpia el caché de traducciones
 */
export function clearTranslationCache(): void {
  Object.keys(cache).forEach((key) => {
    delete cache[key];
  });
}
