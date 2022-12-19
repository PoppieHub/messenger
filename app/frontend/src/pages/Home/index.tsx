import React from 'react';
import {HomeProps} from "../../models/props/HomeProps";
import {Toggle} from "../../components/";

const Home: React.FC <HomeProps> = ({childrenFirst, childrenSecond}) => {
    return (
        <section className="home">
            <div className="messenger">
                <div className="messenger__sidebar">
                    <Toggle />
                    {childrenFirst && childrenFirst}
                </div>
                {childrenSecond && childrenSecond}
            </div>
        </section>
    );
}

export default Home;