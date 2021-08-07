import React from "react"

const CustomError = ({ statusCode }) => {

    if(statusCode === 404) {
        return <h1>The resource was not found!</h1>
    }
return <div>This is an Error</div>
}

CustomError.getServerSideProps =  async ({err, res}) => {

    return {
        props: {
            statusCode: res ? res.statusCode : err ? err.statusCode : 404
        },
    }
}
export default CustomError
