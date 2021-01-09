import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import PostArea from "./PostArea";

function App(){
    return (
        <div>
            <Header />
            <CreateArea />
            <PostArea />
            <Footer />
        </div>
    )
}

export default App;