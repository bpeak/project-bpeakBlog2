import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
//assets
import fireImgSrc from '~assets/fire.png'
import clockImgSrc from '~assets/clock.png'
import noticeImgSrc from '~assets/notice.png'
//modules
import history from '~shared/modules/history'
//styles
import classNames from 'classnames/bind'
import styles from './HomePage.scss'
const cx = classNames.bind(styles)
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'
import GreetingBox from '~components/molecules/GreetingBox/GreetingBox'
import PostHoriCard from '~components/molecules/PostHoriCard/PostHoriCard'
import PostComment from '~components/molecules/PostComment/PostComment'
import SmallSpinner from '~components/atoms/spinners/SmallSpinner/SmallSpinner'

const HomePage = ({
    popularPosts,
    recentPost,
    noticePosts,
    recentComments,
}) => {

    return (
        <Fragment>
            <MainTemplate metas={[
                {
                    name : "description",
                    content : "Bpeak(김기현)의 개발, 라이프 블로그"
                }
            ]}>
                <div className={cx('HomePage')}>
                    <GreetingBox/>
                    <div className={cx('contents')}>
                        <div className={cx('posts')}>
                            <div className={cx('post-info')}>
                                <h3>공지<img src={noticeImgSrc}/></h3>
                                <Link to="/posts">모든포스트 보기</Link>
                            </div>
                            <ul className={cx('noticePosts')}>
                                {noticePosts && noticePosts.map((post) => (
                                    <li className={cx('title')} key={post._id}><Link to={`/post/${post._id}`}>{post.title}</Link></li>
                                ))}
                            </ul>
                            <div className={cx('post-info')}>
                                <h3>최근글<img src={clockImgSrc}/></h3>
                                <Link to="/posts">모든포스트 보기</Link>
                            </div>
                            <div className={cx('PostHoriCard-container')}>
                                {recentPost && <PostHoriCard post={recentPost}/>}
                            </div>
                            <div className={cx('post-info')}>
                                <h3>인기글<img src={fireImgSrc}/></h3>
                                <Link to="/posts">모든포스트 보기</Link>
                            </div>
                            {!popularPosts ? <div className={cx('spinner-container')}><SmallSpinner/></div> :
                            <Fragment>
                            {popularPosts.map((post) => (
                                <div className={cx('PostHoriCard-container')} key={post._id}>
                                    <PostHoriCard post={post}/>
                                </div>
                            ))}
                            </Fragment>
                            }
                        </div>
                        <div className={cx('comments')}>
                            <h3>Recent Comments</h3>
                        {!recentComments ? <div className={cx('spinner-container')}><SmallSpinner/></div>
                        : <Fragment>
                            {recentComments.map((comment) => {
                                return (
                                    <div 
                                    className={cx('PostComment-container')}
                                    onClick={() => {history.push(`/post/${comment.post_id}`)}}
                                    key={comment._id}>
                                        <PostComment
                                        comment={comment}
                                        isUseForm={false}
                                        isUseReply={false}
                                        />
                                    </div>
                                )
                            })}
                        </Fragment>
                        }
                        </div>                
                    </div>
                </div>
            </MainTemplate>
        </Fragment>            
    )
}

HomePage.propTypes = {
    noticePosts : PropTypes.array,
    recentPost : PropTypes.object,
    popularPosts : PropTypes.array,
    recentComments : PropTypes.array,
}

export default HomePage