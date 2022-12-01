import React, { useCallback, useEffect, useRef } from "react";
import { addPage } from "../utils/firebase"
import { auth} from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const TextHandler = (props) => {
    const [propText, setPropText] = React.useState(props.fullText);
    const ref = useRef(null);
    const [user] = useAuthState(auth);

    useEffect(() => {
        setPropText(props.fullText);
    }, [props]);

    const saveText = async () => {
        await addPage(user?.email, props.vResult, props.tResult, ref.current.value, props.image);
        alert("Success!");
    };

    if(propText != null) {
        return (
            <div className="text-handler">
                <textarea defaultValue={propText} ref={ref}></textarea>
                <button className="button" onClick={() => saveText()}>Save</button>
            </div>
        );
    } else {
        return (
            <div className="text-handler">
                <textarea readOnly={true} key={true} defaultValue={"No text to display"}></textarea>
                <button disabled={true} className="button">Save</button>
            </div>
        );
    }

};
export default TextHandler