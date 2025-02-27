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

    start = false;
    wager = Math.floor(Math.random() * 3000) + 1;
  
    constructor() {
      setInterval(() => {
        const date = new Date().toLocaleDateString();
        const userName = 'Don';
        let earnings = 0;
        let won = "won";
        let type = GameEvent.End;
        this.start = !this.start;
        if (!this.start) {
            type = GameEvent.End;
            let outcome = "won";
            let winnings = this.wager;
            let rand = Math.random();
            if (rand < 0.5) {
                outcome = "lost";
            } else if (rand < 0.6) {
                winnings *= 1.5;
            }
            won = outcome;
            earnings = winnings;
        } else {
            type = GameEvent.Start;
            this.wager = Math.floor(Math.random() * 3000) + 1;
            earnings = this.wager;
        }
            this.broadcastEvent(userName, type, { name: userName, earnings: earnings, date: date, won: won});
        }, 5000);
    }
  
    broadcastEvent(from, type, value) {
      const event = new EventMessage(from, type, value);
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
  