const chunkRequest = (
  text: string,
  chunkSize: number = 0,
) => {
  const chunks = [];

  for (let i = 0; i < text.length;) {
    const endIndex = i + chunkSize;

    //  slices at last full sentences (within chunkSize)
    //  to aid better translation
    const endIndexFullSentence = (Math.min(endIndex, text.lastIndexOf('.', endIndex - 1) + 1) || endIndex);
    const chunk = (text.slice(i, endIndexFullSentence));
    chunks.push(chunk);

    //  afterthough: next index is the last translated full sentence endIndex
    i += endIndexFullSentence;
  }

  return chunks;
};

export default chunkRequest;
