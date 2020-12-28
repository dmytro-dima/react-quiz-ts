import React from 'react';
import Sky from './sky';

export const SkyBackground = () => {
    const modes = {
        0: 'https://image.flaticon.com/icons/svg/1230/1230864.svg',
        1: 'https://svgshare.com/i/9T5.svg',
        2: 'https://image.flaticon.com/icons/svg/141/141015.svg',
        3: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png',
        4: 'https://image.flaticon.com/icons/svg/124/124574.svg',
        5: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png',
    }
    return (
        <Sky
            images={modes}
            how="150"
            size="100px"
            time={30}
            background={"#2F3939"}
        />
    );
}

