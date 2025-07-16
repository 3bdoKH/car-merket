import React from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';

const About: React.FC = () => {
    const { t, i18n } = useTranslation('common');
    const isArabic = i18n.language === 'ar';
    const metaTitle = isArabic ? 'ما هو كار ماركت' : 'About Car Market';
    const metaDescription = isArabic ? 'كار ماركت يربطك بمحترفين موثوقين في مجال السيارات لجميع احتياجات صيانة وإصلاح سيارتك.' : 'Car Market connects you with trusted automotive professionals for all your car maintenance and repair needs.';
    const metaOgImage = '/public/file.svg';
    const metaUrl = 'https://yourdomain.com/about/about';

    const faqData = isArabic ? [
      {
        question: 'ما هي كار ماركت؟',
        answer: 'كار ماركت منصة تربطك بمحترفين موثوقين في مجال السيارات لجميع احتياجات صيانة وإصلاح سيارتك.'
      },
      {
        question: 'كيف أبحث عن خدمات السيارات؟',
        answer: 'يمكنك البحث عن خدمات السيارات حسب الفئة أو المدينة باستخدام شريط البحث في الصفحة الرئيسية.'
      },
      {
        question: 'هل يمكنني مقارنة مقدمي الخدمات؟',
        answer: 'نعم، يمكنك مقارنة مقدمي الخدمات بناءً على التقييمات والمعلومات المتوفرة.'
      },
      {
        question: 'كيف أتواصل مع فريق الدعم؟',
        answer: 'يمكنك التواصل معنا عبر صفحة اتصل بنا أو عبر البريد الإلكتروني info@emereld-marketing.online.'
      }
    ] : [
      {
        question: 'What is Car Market?',
        answer: 'Car Market is a platform that connects you with trusted automotive professionals for all your car maintenance and repair needs.'
      },
      {
        question: 'How do I search for car services?',
        answer: 'You can search for car services by category or city using the search bar on the homepage.'
      },
      {
        question: 'Can I compare service providers?',
        answer: 'Yes, you can compare service providers based on ratings and available information.'
      },
      {
        question: 'How do I contact support?',
        answer: 'You can contact us via the Contact page or by email at info@emereld-marketing.online.'
      }
    ];

    return (
        <div className="about-bg">
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={metaUrl} />
                <meta property="og:image" content={metaOgImage} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content={metaOgImage} />
                <meta httpEquiv="Content-Language" content={isArabic ? 'ar' : 'en'} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([
                            {
                                '@context': 'https://schema.org',
                                '@type': 'AboutPage',
                                'name': metaTitle,
                                'description': metaDescription,
                                'inLanguage': isArabic ? 'ar' : 'en',
                                'url': metaUrl
                            },
                            {
                                '@context': 'https://schema.org',
                                '@type': 'Organization',
                                'name': isArabic ? 'كار ماركت' : 'Car Market',
                                'url': metaUrl,
                                'logo': metaOgImage,
                                'contactPoint': [
                                    {
                                        '@type': 'ContactPoint',
                                        'telephone': '+201095016685',
                                        'contactType': 'customer service',
                                        'areaServed': 'EG',
                                        'availableLanguage': ['en', 'ar']
                                    }
                                ]
                            },
                            {
                                '@context': 'https://schema.org',
                                '@type': 'FAQPage',
                                'mainEntity': faqData.map(faq => ({
                                    '@type': 'Question',
                                    'name': faq.question,
                                    'acceptedAnswer': {
                                        '@type': 'Answer',
                                        'text': faq.answer
                                    }
                                }))
                            }
                        ])
                    }}
                />
            </Head>
            <Header onSearch={() => {}} search={false}/>
            <div className="about-container">
                <h1>{t('about-title')}</h1>
                <section className="about-section">
                    <h2>{t('about-who-title')}</h2>
                    <p>
                    {t('about-who-desc')}
                    </p>
                </section>
                <section className="about-section">
                    <h2>{t('about-mission-title')}</h2>
                    <p>
                    {t('about-mission-desc')}
                    </p>
                </section>
                <section className="about-section">
                    <h2>{t('about-contact-title')}</h2>
                    <p>
                    {t('about-contact-desc')}<a href="mailto:info@emereld-marketing.online">{t('about-contact-email')}</a>.
                    </p>
                </section>
                <section className="about-section">
                    <h2>{isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</h2>
                    <div className="faq-list">
                        {faqData.map((faq, idx) => (
                            <div key={idx} className="faq-item">
                                <strong className="faq-question">{faq.question}</strong>
                                <p className="faq-answer">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        },
    };
};

export default About;
