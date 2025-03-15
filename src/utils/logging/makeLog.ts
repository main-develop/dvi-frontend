export const makeLog = (eventType: string, attributes = {}) => {
  return JSON.stringify({
    sent_at: null,
    processed_at: null,
    latency_ms: null,
    event_type: eventType,
    attributes: { ...attributes },
  });
};
