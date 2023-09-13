const determineRenderedText = (
  text: string,
  translatedText: string | undefined,
  shouldFallback: boolean | undefined,
  isError: boolean,
  isLoading: boolean,
) => {
  if (shouldFallback && (isError || isLoading)) return text;
  if (isError) return 'Error translating text';
  if (isLoading) return 'Loading translation...';
  if (translatedText) return translatedText;
  return '';
};

export default determineRenderedText;
