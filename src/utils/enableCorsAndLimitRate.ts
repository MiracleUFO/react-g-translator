/* eslint-disable func-names, camelcase */
const enableCorsWithRateLimiting = (requestsPerSecond: number) => {
  const cors_api_host = 'cors-anywhere.herokuapp.com';
  // const cors_api_url = `https://${cors_api_host}/`;
  const { slice } = [];
  const origin = `${window.location.protocol}//${window.location.host}`;
  const { open } = XMLHttpRequest.prototype;
  let lastRequestTime = 0;
  const pendingRequests: any = [];

  XMLHttpRequest.prototype.open = function () {
    // eslint-disable-next-line prefer-rest-params
    const args: any = slice.call(arguments);
    // eslint-disable-next-line no-useless-escape
    const targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);

    if (targetOrigin && targetOrigin[0].toLowerCase() !== origin
    && targetOrigin[1] !== cors_api_host) {
      const currentTime = Date.now();
      const timeSinceLastRequest = currentTime - lastRequestTime;

      if (timeSinceLastRequest < 1000 / requestsPerSecond) {
        // If the request is too soon, push it to the pending requests array.
        pendingRequests.push(() => open.apply(this, args));
      } else {
        // If it's been long enough, send the request immediately.
        lastRequestTime = currentTime;
        open.apply(this, args);
      }
    }
  };

  // Function to process pending requests.
  const processPendingRequests = () => {
    if (pendingRequests.length > 0) {
      const currentTime = Date.now();
      const timeSinceLastRequest = currentTime - lastRequestTime;

      if (timeSinceLastRequest >= 1000 / requestsPerSecond) {
        // If it's been long enough, send a pending request.
        lastRequestTime = currentTime;
        const requestFunction = pendingRequests.shift();
        requestFunction();
      }
    }
  };

  // Set up a timer to periodically process pending requests.
  setInterval(processPendingRequests, 1000 / requestsPerSecond);
};

export default enableCorsWithRateLimiting;
