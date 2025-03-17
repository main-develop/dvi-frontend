export const makeLog = (eventType: string, details = {}) => {
  return JSON.stringify({
    sent_at: null,
    processed_at: null,
    latency_ms: null,
    event_type: eventType,
    details: { ...details },
  });
};
