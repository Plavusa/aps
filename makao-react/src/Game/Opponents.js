/**
 * Created by Masa on 23-Dec-16.
 */
import React from 'react';
import CardSet from '../Card/CardSet';
import LinearProgress from 'material-ui/LinearProgress';
import FontIcon from 'material-ui/FontIcon';


Number.prototype.toRad = function () {
    return this * Math.PI / 180;
};

class Opponents extends React.Component {

    getStyles(i) {
        const angleDiff = 180 / (this.total + this.total % 2 - 1);
        const startAngle = 180;
        let angle = startAngle - angleDiff * (i + this.total % 2);
        if (this.total % 2 === 1) {
            if (i < Math.floor(this.total / 2))
                angle += angleDiff;
            if (i === Math.floor(this.total / 2)) {
                angle = 90;
            }
        } else {
            if (i === this.total / 2 - 1) {
                angle += angleDiff / 4;
            }
            else if (i === this.total / 2) {
                angle -= angleDiff / 4;

            }

        }

        const top = 50 - 50 * Math.sin(angle.toRad()) + '%';
        const leftNum = Math.round(50 - 50 * Math.cos(angle.toRad()));
        const left = leftNum > 50 ? 'calc(' + leftNum + '% - ' + this.elementWidth + 'px)' :
            leftNum === 50 ? 'calc(' + leftNum + '% - ' + this.elementWidth / 2 + 'px)' : leftNum + '%';

        return {
            position: 'absolute',
            width: this.elementWidth,
            top: top,
            left: left,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

        }
    }

    get total() {
        var a = this.props.players.length;
        return a;
    }

    getEllipseLength(rx, ry) {
        let h = Math.pow((rx - ry), 2) / Math.pow((rx + ry), 2);
        return (Math.PI * ( rx + ry )) * (1 + ( (3 * h) / ( 10 + Math.sqrt(4 - (3 * h))) ));
    };

    get elementEffectiveWidth() {
        return this.props.playerHeight / 3 * 4;
    }

    get elementWidth() {
        const width = this.elementEffectiveWidth;
        const fontSize = 24;
        return width + fontSize;
        /*if(this.props.players.length > 8){
         retVal = retVal*this.props.players.length/20;
         }
         return retVal
         const arc = this.getEllipseLength(window.innerWidth / 2, window.innerHeight / 2) / 2;
         return arc / this.total;
         */
    }

    isRight(i) {
        return i < this.total / 2;
    }

    getContainerStyle(i) {
        const fontSize = 24;
        const direction = this.isRight(i) ? 'row' : 'row-reverse';
        return {
            width: this.elementWidth,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: direction,
            fontSize: fontSize,
        }
    }

    get styles() {
        return {
            timer: {
                marginTop: '5%',
                width: '97%',
            },
            container: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }
        }
    }

    isOnTurn(player) {
        return player.id == this.props.playerOnMoveId
    }

    render() {
        const players = this.props.players;
        const width = this.elementEffectiveWidth;
        let height = this.props.playerHeight;
        if (players.length > 8)
            height = height * players.length / 11;
        if (players.length > 10)
            height = height * players.length / 15;

        return (
            <div style={{
                width: '100vw',
                height: '100vh',
                position: 'relative',
            }}>
                {
                    players.map((player, i) =>
                        <div key={i.toString()} style={this.getStyles(i)}>
                            <div style={this.getContainerStyle(i)}>
                                {this.isOnTurn(player) ?
                                    <FontIcon
                                        className="material-icons">{this.isRight(i) ? 'chevron_right' : 'chevron_left'}</FontIcon>
                                    : ""
                                }
                                <CardSet height={height} width={width} back cardNumber={+player.cardNumber}/>
                            </div>
                            {this.isOnTurn(player) ?
                                <LinearProgress mode="determinate" value={30} style={this.styles.timer}/>
                                :
                                ""
                            }

                        </div>
                    )
                }
            </div>
        );
    }
}

Opponents.propTypes = {
    players: React.PropTypes.array.isRequired,
    playerHeight: React.PropTypes.number,
    playerOnMoveId: React.PropTypes.number,
}

export default Opponents;