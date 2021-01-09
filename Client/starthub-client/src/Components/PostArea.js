import React, { useRef, useCallback, useState } from "react";
import axious from "axios"

function PostArea(){
    const [posts, setPosts] = useState([]);
    const [isLoaded, setisLoaded] = useState(false);
    const [queryState,setQueryState] = useState({page:1,numberOfPosts:10});

    let URL = `http://localhost:3000/posts/` + queryState.page + '-' + queryState.numberOfPosts;


    function handleFetch() {
        console.log("Entered here")
        console.log(URL);
		axious.get(URL).then(function (response) {
            console.log(response);
          }).catch(function (error) {
            // handle error
            console.log(error);
          })
	};

    return (
        <div className="post" onClick={handleFetch}>
            <button onClick={handleFetch} />
        </div>
    )
}

export default PostArea;