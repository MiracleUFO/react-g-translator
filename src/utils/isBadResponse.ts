const isBadResponse = (response: Response) => (
  !response || response.status !== 200
);

export default isBadResponse;
