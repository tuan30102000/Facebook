
UserAboutTab.propTypes = {

};

const data = [
    { title: 'Học tại', content: 'Hải Dương' },
    { title: 'Học tại', content: 'Hải Dương' },
    { title: 'Học tại', content: 'Hải Dương' },
    { title: 'Học tại', content: 'Hải Dương' },
    { title: 'Học tại', content: 'Hải Dương' },
    { title: 'Học tại', content: 'Hải Dương' },
    { title: 'Học tại', content: 'Hải Dương' },
    { title: 'Học tại', content: 'Hải Dương' },
]



function UserAboutTab({ about }) {

    return (
        <div className='flex justify-center h-max' >
            <div className="basis-[1024px] px-8">
                <p>{about}</p>
                {data.map((item, i) => <p><span>{item.title}</span>:<span className="font-[700]" >{item.content}</span></p>)}
            </div>
        </div>
    );
}

export default UserAboutTab;