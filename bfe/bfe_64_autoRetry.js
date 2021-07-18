// One approach to handle this is auto retry when network error occurs.

// You are asked to create a fetchWithAutoRetry(fetcher, count), which automatically fetch again when error happens, until the maximum count is met.

// For the problem here, there is no need to detect network error, you can just retry on all promise rejections.

/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  return fetcher().catch((err) => {
    if (maximumRetryCount === 0) {
      throw err;
    }
    return fetchWithAutoRetry(fetcher, maximumRetryCount - 1);
  });
}
