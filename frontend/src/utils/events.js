export const EVENT_TYPE_TRACK = "track";
export const EVENT_TYPE_IDENTIFY = "identify";
export const EVENT_TYPE_PAGE = "page";

// Normalize event value by socket event type
function normlizeEventValueFromSocket(socketEvent) {
  switch (socketEvent.type) {
    case EVENT_TYPE_TRACK: {
      return socketEvent.event;
    }
    case EVENT_TYPE_IDENTIFY: {
      return socketEvent.traits.email;
    }
    case EVENT_TYPE_PAGE: {
      return socketEvent.properties.path;
    }
    default: {
      return "";
    }
  }
}

// Normalize event received from API via socket
export function normalizeEventFromSocket(socketEvent) {
  try {
    return {
      id: socketEvent.messageId,
      type: socketEvent.type,
      timestamp: socketEvent.sentAt,
      value: normlizeEventValueFromSocket(socketEvent),
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}
