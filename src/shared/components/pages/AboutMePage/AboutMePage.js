import React from 'react'
import classNames from 'classnames/bind'
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'
import ChatbotContainer from '~containers/ChatbotContainer'
import ContactContainer from '~containers/ContactContainer'
//styles
import styles from './AboutMePage.scss'
const cx = classNames.bind(styles)

class AboutMePage extends React.Component{
    render(){
        return (
            <MainTemplate title="About Me" metas={[
                {
                    name : "description",
                    content : "Bpeak(김기현)이 누군지 궁금하신가요?"
                }
            ]}>
                <div className={cx('AboutMePage')}>
                    <div className={cx('Chatbot-wrapper')}>
                        {/* <ChatbotContainer/> */}
                    </div>
                    <div className={cx('contents')}>
                        <div className={cx("name")}>KIM KIHYUN</div>
                        <div className={cx("intro")}>
                            개발을 사랑하는 풀스택지향 웹개발자입니다.<br/>
                            백엔드 프론트엔드 둘다 개발해왔으므로 웹 전반에걸친 이해도가 높습니다.<br/>
                            컴퓨터공학을 전공하지는 않았으나, 컴퓨터 자체에대한 지적호기심이 많기때문에 하드웨어, OS 와같은 소프트웨어개발의 베이스가되는 지식은 책과 강의로 부족한 부분을 채워나가고 있습니다.<br/>
                            본인이 정확하게 이해한 코드를 작성하는것을 원칙으로하며,<br/>
                            논리적인사고에 기반한 학습으로 새로운 지식을 받아들이는 속도가 빠릅니다.<br/>
                            웹개발을 포함한 소프트웨어개발의 배움은 끝이없기에 계속 학습하는 개발자입니다.
                        </div>
                        <div className={cx("techStack")}>
                            <div className={cx('title')}>기술스택</div>
                            <div className={cx('category')}>Front-End</div>
                            <ul>
                                <li>HTML:5</li>
                                <li>CSS (pure css, scss)</li>
                                <li>Javascript (ES5, ES6 ... )</li>
                                <li>React</li>
                                <li>Mobx, Redux</li>
                            </ul>
                            <div className={cx('category')}>Back-End</div>
                            <ul>
                                <li>AWS</li>
                                <li>Linux</li>
                                <li>Node.js</li>
                                <li>Mysql, Mongo, Redis</li>
                                <li>Java</li>
                                <li>Spring</li>
                                <li>TCP/IP</li>
                                <li>Socket Programming</li>
                                <li>HTTP</li>
                            </ul>
                        </div>
                        <div className={cx('works')}>
                            <div className={cx('title')}>WORKS</div>
                            <ul>
                                <li>
                                    <div className={cx('projectName')}>BpeakBlog</div>
                                    <div className={cx('details')}>: 현재 운영중인 이블로그</div>
                                    <a href="https://github.com/bpeak/project-bpeakBlog" target="_blank">github바로가기 (CSR 로구현한 이전버전)</a>
                                    <a href="https://github.com/bpeak/project-bpeakBlog2" target="_blank">github바로가기 (SSR 된 현재버전)</a>
                                </li>
                                <li>
                                    <div className={cx('projectName')}>Outstagram</div>
                                    <div className={cx('details')}>: instagram 클론 프로젝트</div>
                                    <a href="https://github.com/bpeak/aws-ubuntu-outstagram" target="_blank">github바로가기</a>
                                </li>
                                <li>
                                    <div className={cx('projectName')}>react-dndf</div>
                                    <div className={cx('details')}>: 리액트에서 파일 드래그앤드랍위한 라이브러리 개발</div>
                                    <a href="https://www.npmjs.com/package/react-dndf" target="_blank">npm바로가기</a>
                                </li>
                            </ul>                    
                        </div>
                        <div className={cx('Contact-container')}><ContactContainer/></div>
                    </div>
                </div>
            </MainTemplate>
        )        
    }
}

export default AboutMePage