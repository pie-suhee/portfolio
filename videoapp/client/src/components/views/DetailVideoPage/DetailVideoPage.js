import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { List, Avatar, Row, Col } from 'antd'
import axios from 'axios'
import SideVideo from './Sections/SideVideo'
import Subscriber from './Sections/Subscriber'
import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes'

import '../../../css/layout.css'
import '../../../css/detail.css'

function DetailVideoPage(props) {

    const { videoId } = useParams()
    const [Video, setVideo] = useState([])
    const [CommentLists, setCommentLists] = useState([])

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.video)
                    setVideo(response.data.video)
                } else {
                    alert('Failed to get video Info')
                }
            })

        axios.post('/api/comment/getComments', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log('response.data.comments',response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get video Info')
                }
            })


    }, [])

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }


    if (Video.writer) {
        return (
            <Row className='DetailLayout'>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em', boxSizing: 'border-box' }}>
                        <video style={{ width: '100%' }} src={`http://18.222.143.17:5000/${Video.filePath}`} controls></video>

                        <div className='VideoInfo'>
                            <div className='UserInfo'>
                                <Avatar src={Video.writer && Video.writer.image} />
                                <div className='VideoText'>
                                    <a href="https://ant.design">{Video.title}</a> <br />
                                    <span>{Video.description}</span>
                                </div>
                            </div>
                            <div>
                                <LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')}  />
                            </div>
                        </div>
                        
                        <Subscriber userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} />

                    
                        <Comments CommentLists={CommentLists} postId={Video._id} refreshFunction={updateComment} />
                    </div>
                </Col>
                <Col lg={6} xs={24} style={{ marginBottom: '3rem'}}>
                    <SideVideo />
                </Col>
            </Row>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }


}

export default DetailVideoPage