const getErrorInTranslationMessage = ((error: unknown) => new Error(`Error in translation: ${String(error)}`));

export default getErrorInTranslationMessage;
