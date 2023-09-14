const determineRenderedText = (
  text: string,
  translatedText: string | undefined,
  shouldFallback: boolean | undefined,
  isError: boolean,
  isLoading: boolean,
) => {
  if (shouldFallback && (isError || isLoading)) return text;
  if (isLoading) return text;
  if (isError) return '';
  if (translatedText) return translatedText;
  return '';
};

export default determineRenderedText;
