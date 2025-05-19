import { API_ERROR_MESSAGE, API_FAILURE_MESSAGE, API_INFO_MESSAGE, API_LOG_MESSAGE, STARTING_TRANSACTION, TRANSACTION_ENDPOINT_CALL } from "../constants/rewardConstants";
import logger from "../loggers";

export const fetchTransactions = async () => {
  logger.info({ msg: STARTING_TRANSACTION });

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
     await fetch(`${TRANSACTION_ENDPOINT_CALL}`)
        .then(response => {
          if (!response.ok) {
            const error = new Error(API_FAILURE_MESSAGE);
            logger.error({
              msg: API_LOG_MESSAGE,
              status: response.status,
              statusText: response.statusText
            });
            throw error;
          }
          return response.json();
        })
        .then(data => {
          logger.info({
            msg: API_INFO_MESSAGE,
            count: data.length,
            sample: data.slice(0, 2)
          });
          resolve(data);
        })
        .catch(err => {
          logger.error({ msg: API_ERROR_MESSAGE, error: err.message });
          reject(err);
        });
    }, 1000);
  });
};
