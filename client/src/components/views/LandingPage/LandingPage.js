import React, {useEffect} from 'react'
import axios from 'axios'
function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello')
            .then(response => { console.log(response) })
    }, [])
}

export default LandingPage