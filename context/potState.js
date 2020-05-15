import React, { useState } from "react";
import PotContext from './potContext';

const PotState = props => {

    const [pot, setPot] = useState(0)

    return (
        <PotContext.Provider 
            value={{
                pot,
                setPot
            }}>
            {props.children}
        </PotContext.Provider>
    )
}

export default PotState;
