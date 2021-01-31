import React from 'react';

function Loading(props:any) {
    return (
        <div className="loadingWindow">
            <div className="backdrop">
            </div>
            <div className="loadingContent">
                <div className="loader"></div>
            </div>
        </div>
    );
}
export default Loading;