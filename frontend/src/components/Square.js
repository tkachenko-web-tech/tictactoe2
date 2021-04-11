import React from 'react';
import { Button } from 'react-bootstrap';

export function Square({ value, userRole, makeTurn, id, game }) {
    return (
        <Button
            className="square text-lg-center"
            onClick={() => { return makeTurn(id) }}
            disabled={!(() => {
                if (value !== '')
                    return false;
                if (game.status !== 'NOT_FINISHED')
                    return false;
                if (userRole === 'X' && game.turn % 2 !== 0 || userRole === 'O' && game.turn % 2 !== 1)
                    return false;
                return true;
            })()}>
            {value}
        </Button>
    );
}
