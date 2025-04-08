const GameEvent = {
    System: 'system',
    End: 'gameEnd',
    Start: 'gameStart',
  };
  
  class EventMessage {
    constructor(from, type, value) {
      this.from = from;
      this.type = type;
      this.value = value;
    }
  }
  
  class GameEventNotifier {
    events = [];
    handlers = [];
  
    constructor() {
      this.maxEvents = 10;
      const port = 4000;
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
      this.socket.onmessage = async (msg) => {
        try {
          const event = JSON.parse(await msg.data.text());
          this.receiveEvent(event);
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }

    broadcastEvent(from, type, value) {
      const event = new EventMessage(from, type, value);
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(event));
      }
      this.receiveEvent(event);
    }
  
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    removeHandler(handler) {
      this.handlers.filter((h) => h !== handler);
    }
  
    receiveEvent(event) {
      this.events.push(event);
      this.handlers.forEach((handler) => {
        handler(event);
      });
    }
  }
  
  const GameNotifier = new GameEventNotifier();
  export { GameEvent, GameNotifier };
  