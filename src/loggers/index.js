import pino from "pino";
import { ERROR_API_FAILRE, ERROR_MESSAGE, LOGGER_URL, SUCCESS_MSG } from "../constants/rewardConstants";

const send = async  (level, logEvent) => {
  const url = LOGGER_URL;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic cGFyc2VhYmxlOnBhcnNlYWJsZQ==",
        "Content-Type": "application/json",
      },
      body: JSON.stringify([logEvent]),
    });

    if (!response.ok) {
      console.error(ERROR_MESSAGE, response.statusText);
    } else {
      console.info(SUCCESS_MSG);
    }
  } catch (err) {
    console.error(ERROR_API_FAILRE, err.message);
  }
};

const logger = pino({
  browser: {
    serialize: true,
    asObject: true,
    transmit: {
      send,
    },
  },
});

export default logger;
