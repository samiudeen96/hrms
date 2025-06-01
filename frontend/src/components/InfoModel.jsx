import { useDispatch, useSelector } from 'react-redux';
import { modalClose } from '../redux/reducers/infoModalSlice';

const InfoModel = () => {

    const dispatch = useDispatch();
    const content = useSelector(state => state.infoModal.infoContent)

    return (
        <div className="fixed inset-0 bg-[#00000047] bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white  rounded-sm shadow-sm m-3 p-5">
                <div className=''>
                    <p>{content.text}</p>
                    <div className='flex justify-center items-center gap-5 mt-5'>
                        <button className='button_secondary' onClick={() => dispatch(modalClose())}>Cancel</button>
                        <button className={`button_tertiary ${content.color}`} onClick={content.handler} >Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoModel;