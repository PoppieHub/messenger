import React from 'react';
import {Message} from "../../components";
import {Context} from "../../index";

const Home = () => {
    const {store} = React.useContext(Context);

    return (
        <section className="home">
            <div style={{margin: "60px"}}>
                <Message
                    avatar='https://lelolobi.com/wp-content/uploads/2021/11/Test-Logo-Small-Black-transparent-1-1.png'
                    text="Hello, cbdvcx fdvfvs vfb@!"
                    user={store.getProfile()}
                    dateTimestamp={new Date().getTime()}
                    isRead={true}
                    attachments={
                        {items: [
                                {
                                    id:'1',
                                    link: 'https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=100&q=60&w=100'
                                },
                                {
                                    id:'2',
                                    link: 'https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=200&q=60&w=200'
                                },
                                {
                                    id:'3',
                                    link: 'https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=300&q=60&w=300'
                                }
                            ]}
                    }
                />
                <Message
                    avatar='https://sun9-19.userapi.com/impg/z6uhkAgx2KhgretMc8a8YzxasZqxnpoR1xouEw/edMDxXBLi4Y.jpg?size=1241x932&quality=96&sign=9c9ce6c17bb3106fc647cbc1ca2c854a&type=album'
                    text="sNsc d,mm, dscvds ds"
                    user={store.getProfile()}
                    dateTimestamp={new Date().getTime()-1000000}
                    isMe={true}
                    isRead={false}
                    attachments={
                        {items: [
                                    {
                                        id:'1',
                                        link: 'https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=100&q=60&w=100'
                                    },
                                    {
                                        id:'2',
                                        link: 'https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=200&q=60&w=200'
                                    },
                                    {
                                        id:'3',
                                        link: 'https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=300&q=60&w=300'
                                    }
                        ]}
                    }
                />
            </div>
        </section>
    );
}

export default Home;