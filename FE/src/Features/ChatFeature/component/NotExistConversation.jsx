import React from 'react';
import PropTypes from 'prop-types';
import CricalImage from '../../../Components/CricalImage';

NotExistConversation.propTypes = {

};

function NotExistConversation({ member = {} }) {
    return (
        <>
            {member.displayName &&
                <div className='flex flex-col items-center mt-10'>
                    <CricalImage size={70} src={member.avatarUrl} />
                    <p className='capitalize text-center font-bold mt-2' >{member.displayName}</p>
                    <p className='text-center mt-2' >Gửi tin nhắn để tạo Cuộc trò truyện với {member.displayName}</p>
                </div>}
        </>
    );
}

export default NotExistConversation;