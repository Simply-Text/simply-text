import React, { useCallback, useEffect, useRef } from "react";
import { addPage } from "../utils/firebase"
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const TextHandler = (props) => {
    const [propText, setPropText] = React.useState(props.fullText);
    const ref = useRef(null);
    const [user] = useAuthState(auth);

    useEffect(() => {
        setPropText(props.fullText);
    }, [props]);

    const saveText = async () => {
        await addPage(user?.email, props.vResult, props.tResult, ref.current.value, props.image,props.wordData);
        alert("Success!");
    };

    const changeWordDat = (par,word,change) => {
        props.wordData[par].words[word] = change;
        console.log(props.wordData);
    }

    const getSentence = (arr,parIdx) => {
        var str = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].text == ".") {
                str.push(<button style={{float:"left",fontSize:15, backgroundColor:"transparent",border:0,paddingLeft:0}} key={i + "," + parIdx}>{arr[i].text}</button>);
            } else {
                str.push(<button style={{float:"left",fontSize:15, backgroundColor:"transparent",border:0,paddingRight:0}} key={i+ "," + parIdx}>{" " + arr[i].text}</button>) ;
            }
        }
        return str;
    }
    const makeDisplay = () => {
        var list = [];
        for(var i = 0; i < props.wordData.length; i++){
            list.push(<div>{getSentence(props.wordData[i].words,i)}</div>);
        }
        return (
                list
        );
    }

    if (propText != null) {
        return (
            <div className="text-handler">
                <textarea rows={6} defaultValue={propText} ref={ref}></textarea>
                {/*{makeDisplay()}*/}
                
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