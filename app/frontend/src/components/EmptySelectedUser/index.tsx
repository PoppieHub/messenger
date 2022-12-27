import React from "react";
import './EmptySelectedUser.scss';

const EmptySelectedUser  = () => {

    return (
        <div className="contacts__emptySelectedUser">
            <span className="contacts__emptySelectedUser-title">Выберите пользователя, чтобы открыть его профиль</span>
            <div className="contacts__emptySelectedUser-openProfile" />
        </div>
    );
}

export default EmptySelectedUser;