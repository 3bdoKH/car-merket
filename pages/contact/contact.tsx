import React, { useState } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaBullhorn } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import Head from 'next/head';

const ContactPage: React.FC = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const { t, i18n } = useTranslation('common');
    const isArabic = i18n.language === 'ar';
    const metaTitle = isArabic ? 'اتصل بنا - كار ماركت' : 'Contact Car Market';
    const metaDescription = isArabic ? 'هل لديك أسئلة أو تحتاج إلى دعم؟ تواصل مع فريق كار ماركت.' : 'Have questions or need support? Contact the Car Market team.';
    const metaOgImage = '/public/file.svg';
    const metaUrl = 'https://yourdomain.com/contact/contact';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        if (response.ok) {
            alert('Thank you for contacting us!');
            setForm({ name: '', email: '', message: '' });
        } else {
            alert('There was an error. Please try again later.');
        }
    };

    return (
        <>
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
                                '@type': 'ContactPage',
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
                            }
                        ])
                    }}
                />
            </Head>
            <Header search={false} onSearch={()=>{}} />
            <div className="contact-container">
                <div className="contact-grid">
                    <div className="contact-left">
                        <div className="contact-illustration">
                            {/* Friendly SVG illustration */}
                            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="90" height="90" rx="20" fill="#e9ecef"/>
                                <path d="M20 30C20 27.7909 21.7909 26 24 26H66C68.2091 26 70 27.7909 70 30V60C70 62.2091 68.2091 64 66 64H24C21.7909 64 20 62.2091 20 60V30Z" fill="#fff"/>
                                <path d="M22 32L45 48L68 32" stroke="#a259ec" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22 58V32L45 48L68 32V58" stroke="#a259ec" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h1 className="contact-title">Contact Us</h1>
                        <div className="contact-info">
                            <p className="contact-detail"><FaPhone style={{marginRight: '8px'}} />Contact Number: <a href="tel:01095016685">01095016685</a></p>
                            <p className="contact-detail"><FaEnvelope style={{marginRight: '8px'}} />Or you can email us at: <a href="mailto:info@emereld-marketing.online">info@emereld-marketing.online</a></p>
                            <p className="contact-detail"><FaWhatsapp style={{marginRight: '8px', color: '#25D366'}} />WhatsApp: <a href="https://wa.me/201095016685" target="_blank" rel="noopener noreferrer">01095016685</a></p>
                        </div>
                        <div className="contact-advertise">
                            <FaBullhorn style={{marginRight: '8px', color: '#a259ec'}} />
                            If you want to advertise your service, give us a call to display your service on our website.
                        </div>
                    </div>
                    <div className="contact-right">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div>
                                <label htmlFor="name" className="contact-label">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="contact-input"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="contact-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="contact-input"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="contact-label">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="contact-textarea"
                                />
                            </div>
                            <button type="submit" className="button">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        },
    };
};

export default ContactPage;
