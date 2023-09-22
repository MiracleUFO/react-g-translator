const chunkRequest = async (
  text: string | string[],
  translationReqFunc: (_chunk: string | string[]) => Promise<string | undefined>,
  chunkSize: number = 0,
) => {
  const promises = [];
  const chunks = [];

  for (let i = 0; i < text.length;) {
    const endIndex = i + chunkSize;

    //  slices at last full sentences (within chunkSize)
    //  to aid better translation
    const endIndexFullSentence = (Math.min(endIndex, text.lastIndexOf('.', endIndex - 1) + 1) || endIndex);
    const chunk = (text.slice(i, endIndexFullSentence));
    chunks.push(chunk);
    promises.push(translationReqFunc(chunk));

    //  afterthough: next index is the last translated full sentence endIndex
    i += endIndexFullSentence;
  }

  Promise.all(promises);

  const translatedChunks = await Promise.all(promises);
  return translatedChunks.join(' ');
};

export default chunkRequest;
