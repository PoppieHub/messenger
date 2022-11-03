import React from 'react';
import {Message} from "../../components";
import {Context} from "../../index";
import fakeMessageListResponse from './fakeData';

const Home = () => {
    const {store} = React.useContext(Context);

    return (
        <section className="home">
            {/*<div style={{margin: "60px"}}>
                {
                    fakeMessageListResponse.items.map((item) =>
                        <Message key={item.id} message={item}/>
                    )
                }
            </div>*/}
        </section>
    );
}

export default Home;