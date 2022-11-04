import React from 'react';
import {Context} from "../../index";
import {fakeMessageListResponse, fakeChatsListResponse} from './fakeData';

const Home = () => {
    const {store} = React.useContext(Context);

    return (
        <section className="home">

        </section>
    );
}

export default Home;