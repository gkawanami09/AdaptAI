import {useEffect} from "react";

function Callnone (props) {
    useEffect(() => {
        if (props.htt) {
            props.setChargeHt(true)
        }
        else {
            if (props.load) {
                props.esperar()
            }

            var val = props.val
            val = val + 1
            props.setar(val)
        }
    }, []);

    return (
        <div style={{display: 'none'}}></div>
    )
}

export default Callnone