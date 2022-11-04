import React from 'react';
import {Context} from "../../index";
import {fakeMessageListResponse, fakeChatsListResponse} from './fakeData';
import {Message} from "../../components";

const Home = () => {
    const {store} = React.useContext(Context);

    return (
        <section className="home">
            {fakeMessageListResponse().items.map((item)=>
                <Message key={item.id} message={item} />
            )}
        </section>
    );
}

export default Home;