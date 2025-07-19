import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

const BlogCard = ({heading, paragraph, imgLink, date, blog} : {heading : string, paragraph : string, imgLink : string, date : string, blog : string}) => {

    return (
        <Link href={`/blog/${blog}`} className='blog-card'>
            <div className="image">
                <img src={imgLink} alt={heading} />
            </div>
            <div className="description">
                <span>{date}</span>
                <h2>{heading}</h2>
                <p>{paragraph}</p>
            </div>
        </Link>
    )
}

const blog = () => {
    return (
        <>
            <Header onSearch={() => {}} search={false} />
                <div className="blog">
                    <BlogCard heading='ما هي أفضل لمبات LED سيارات في مصر ؟' paragraph='بمقارنة واضحة تعرف على أفضل لمبات ليد للسيارات تباع في السوق المصري، وتعرف على نقاط قوة وضعف كل اللمبات المتميزة.' imgLink='https://i.ibb.co/V0XJZKVc/Best-Car-LED-Bulbs.webp' date='19 / 7 / 2025' blog='led'   />
                </div>
            <Footer />
        </>
    )
}

export default blog
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        },
    };
};