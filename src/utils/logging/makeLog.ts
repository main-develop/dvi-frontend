type logLevel = "INFO" | "WARNING" | "ERROR";

export const makeLog = (
  logLevel: logLevel,
  eventType: string,
  attributes = {}
) => {
  return JSON.stringify({
    sent_at: null,
    received_at: null,
    latency_ms: null,
    log_level: logLevel,
    event_type: eventType,
    attributes: { ...attributes },
  });
};
