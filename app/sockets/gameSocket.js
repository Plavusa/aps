import NewGames from '../Redis/NewGames';
import Gameplay from '../Gameplay/Gameplay';

import _ from 'lodash';



module.exports = function (socket) {

    var name = '';
    var creatorName = '';
    console.log('user connected to gameSocket');

    socket.on('join', (creatorUsername, username) => {
        if (!creatorUsername || !username) {
            return;
        }

        NewGames.getGame(creatorUsername).then((game) => {
           if(!game.players[username]){
               return;
           }

            name = username;
            creatorName = creatorUsername;
            socket.join(creatorUsername);
            Gameplay.setPlayerOnlineStatus(creatorUsername, username, true);
            let cards = game.players[username].cards.slice();
            let players = [];
            Object.keys(game.players).forEach((player) => {
                players.push({username: player, online: game.players[player].online, cardNumber: game.players[player].cards.length});
            });
            let talon = _.last(game.openStack);
            socket.emit('init', {players: players, cards: cards, talon: talon, playerOnMove: game.playerOnMove});
            socket.to(creatorUsername).broadcast.emit('user:join', {
                username: username,
                online: true,
                cardNumber: 1
            });
        });

    });

    function emitToEveryone(key, value){
        socket.emit(key, value);
        socket.to(creatorName).broadcast.emit(key, value);
    }

    function emitPlayerOnMove(username){
        emitToEveryone('play:playerOnMove', username);
    }

    function emitLog(log){
        emitToEveryone('log:new', log);
    }

    socket.on('play:move', (card) => {
        Gameplay.playMove(creatorName, name, card).then((data) => {
            socket.to(creatorName).broadcast.emit('play:move', name, card);
            emitPlayerOnMove(data.playerOnMove);
            emitLog(data.log);
        });
    });

    socket.on('play:draw', () => {
       Gameplay.draw(creatorName, name).then((data)=> {
           socket.emit('play:get', data.cards);
           socket.to(creatorName).broadcast.emit('play:draw', name, data.cardsNumber);
           emitLog(data.log);
       });

    });

    socket.on('play:pass', () => {
       Gameplay.getNextPlayer(creatorName).then((playerOnMove) => {
           emitPlayerOnMove(playerOnMove);
           emitLog({username: name, message: "pass"});
       });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected from gameSocket');
        Gameplay.setPlayerOnlineStatus(creatorName, name, false);
        socket.leave(creatorName);
        socket.broadcast.emit('user:left', name);
    });


};