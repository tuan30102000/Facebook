import React from 'react';
import PropTypes from 'prop-types';
import UserInfoMini from '../../../Components/UserInfoMini'
NavbarChat.propTypes = {

};

function NavbarChat({ member }) {
    return (
        <div className='h-[60px] items-center p-3 flex w-full shadow'>
            <div className="">
                <UserInfoMini avatarUrl={member.avatarUrl} nameStyle={'self-center'} avtSize={'w-10 h-10'} userId={member._id} displayName={member.displayName} />
            </div>
        </div>
    );
}

export default NavbarChat;