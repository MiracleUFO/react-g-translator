const determineRenderedText = (
  text: string,
  translatedText: string | undefined,
  shouldFallback: boolean | undefined,
  isError: boolean,
  isLoading: boolean,
) => {
  if (translatedText) return translatedText;
  if (shouldFallback && (isError || isLoading)) return text;
  if (isLoading) return text;
  if (isError) return '';
  return '';
};

export default determineRenderedText;
