import { memo, useContext, useState } from 'react'
import { english, vietnamese } from '../../Languages/Photo'
import { CommonDataForAllViewService } from '../ViewInformationDetailService'
import './ViewPhotos.scss'

function ViewPhotos({ languageSelected }) {
    let languageList = (languageSelected === 'EN' ? english : vietnamese)
    const service = useContext(CommonDataForAllViewService)
    const [imageFullView, setImageFullView] = useState()

    return (
        <div>
            {imageFullView && imageFullView !== null &&
                <div className='image-full-view'>
                    <div onClick={() => setImageFullView(null)} className='bg-popup'/>
                    <img src={URL.createObjectURL(imageFullView)} />
                </div>
            }
            <div className='container'>
                <div>
                    <label className='d-block mb-20'>{languageList.txtReception}<span className='requird-star'>*</span></label>
                    <div className='grid-image'>
                        {[...service.receptionHallPhoto].map((img) => (
                            <div className="image-selected">
                                <img className={`image-selected ${(!imageFullView || imageFullView === null) && 'cursor-pointer'}`} onClick={() => setImageFullView(img)} src={URL.createObjectURL(img)} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-30'>
                    <label className='d-block mb-20'>{languageList.txtOutdoor}</label>
                    <div className='grid-image'>
                        {[...service.outdoorPhoto].map((img) => (
                            <div className="image-selected">
                                <img className={`image-selected ${(!imageFullView || imageFullView === null) && 'cursor-pointer'}`} onClick={() => setImageFullView(img)} src={URL.createObjectURL(img)} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-30'>
                    <label className='d-block mb-20'>{languageList.txtOther}</label>
                    <div className='grid-image'>
                        {[...service.otherPhoto].map((img) => (
                            <div className="image-selected">
                                <img className={`image-selected ${(!imageFullView || imageFullView === null) && 'cursor-pointer'}`} onClick={() => setImageFullView(img)} src={URL.createObjectURL(img)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ViewPhotos)