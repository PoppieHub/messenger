import React from 'react';
import {Context} from "../../index";
import {fakeChatsListResponse} from './fakeData';
import {DialogItem} from "../../components";

const Home = () => {
    const {store} = React.useContext(Context);

    return (
        <section className="home">
            <div style={{margin: "60px"}}>
                <div className="dialogs">
                    {
                        fakeChatsListResponse().items.map((item) =>
                            <DialogItem key={item.id} chat={item} />
                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default Home;