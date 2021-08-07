import Header from "../shared/Header"
import React from "react"

const BaseLayout = props => {
    return(
        <div>
            <Header/>
            {props.children}
        </div>
    )
}

export default BaseLayout
