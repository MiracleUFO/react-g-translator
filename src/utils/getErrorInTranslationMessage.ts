const getErrorInTranslationMessage = ((error: unknown) => new Error(`react-g-translator: Error in translation: ${String(error)}`));

export default getErrorInTranslationMessage;
