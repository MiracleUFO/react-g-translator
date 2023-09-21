const chunkRequest = async (
  text: string | string[],
  translationReqFunc: (_chunk: string | string[]) => Promise<string | undefined>,
  chunkSize: number = 0,
) => {
  const promises = [];

  for (let i = 0; i < text.length; i += chunkSize) {
    //  issue: need better way to handle arrays with text items > 5000 chars
    //  below just takes arrays with more than 5000 items and slices it.
    //  nested approach required?
    const chunk = text.slice(i, i + chunkSize);
    promises.push(translationReqFunc(chunk));
  }

  const translatedChunks = await Promise.all(promises);
  return translatedChunks.join('');
};

export default chunkRequest;
