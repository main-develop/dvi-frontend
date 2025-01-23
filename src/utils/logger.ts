type logLevel = "INFO" | "ERROR";

export const makeLog = (
  logLevel: logLevel,
  eventType: string,
  page: string,
  attributes = {}
) => {
  return JSON.stringify({
    sent_at: null,
    received_at: null,
    latency_ms: null,
    log_level: logLevel,
    event_type: eventType,
    page: page,
    attributes: { ...attributes },
  });
};
