import React from 'react';
import { Button } from 'react-bootstrap';
import { STATUS, PLAYER } from '../helpers';

export function Square({ value, userRole, makeTurn, id, game }) {
    return (
        <Button
            className="square text-lg-center"
            onClick={() => makeTurn(id)}
            disabled={!(() => {
                if (value !== '')
                    return false;
                if (game.status !== STATUS.NOT_FINISHED)
                    return false;
                if (userRole === PLAYER.X && game.turn % 2 !== 0 || userRole === PLAYER.O && game.turn % 2 !== 1)
                    return false;
                return true;
            })()}>
            {value}
        </Button>
    );
}
