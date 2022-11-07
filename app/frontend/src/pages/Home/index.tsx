import React from 'react';
import {Context} from "../../index";
import {Dialogs} from "../../components/";
import {fakeChatsListResponse} from "./fakeData";

const Home = () => {
    const {store} = React.useContext(Context);

    return (
        <section className="home">
            <div style={{margin: "60px"}}>
                <Dialogs chatsList={fakeChatsListResponse()} />
            </div>
        </section>
    );
}

export default Home;