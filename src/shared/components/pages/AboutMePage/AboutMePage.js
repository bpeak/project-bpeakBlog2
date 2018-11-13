import React from 'react'
//components
import MainTemplate from '~components/templates/MainTemplate/MainTemplate'

const AboutMePage = () => {
    return (
        <MainTemplate title="About Me" metas={[
            {
                name : "description",
                content : "Bpeak(김기현)이 누군지 궁금하신가요?"
            }
        ]}>
            <div>
                <h1>추후 업데이트예정</h1>
                <h2>김기현</h2>
                <h2>bpeakcpeak@gmail.com</h2>
            </div>
        </MainTemplate>
    )
}

export default AboutMePage