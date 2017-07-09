import Server from 'socket.io';

import config from '../config';

export default function startServer(store) {
  const io = new Server().attach(config.PORT);
  console.log(`listening on port ${config.PORT}`);

  // get state on intial connect
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });

  // when state changes, this function gets called
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );
}
