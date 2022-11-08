import React from 'react';
import {Context} from "../../index";
import {Dialogs, AudioMessage, Message} from "../../components/";
import {fakeChatsListResponse, fakeSecondMessageListResponse} from "./fakeData";

const Home = () => {
    const {store} = React.useContext(Context);

    return (
        <section className="home">
            <div style={{margin: "60px"}}>
                {/*<Dialogs chatsList={fakeChatsListResponse()} /> */}
                {fakeSecondMessageListResponse().items.map((item) => <Message message={item} key={item.id}/>)}
            </div>
        </section>
    );
}

export default Home;