import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getService } from "../../lib/api";
import type { Service } from "../../types/service";
import Image from "next/image";
import Header from "@/components/header/Header";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';
import Footer from "@/components/footer/Footer";
import Head from 'next/head';

export default function ServiceDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [service, setService] = useState<Service | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const {t, i18n} = useTranslation();
    useEffect(() => {
        if (id) {
            getService(id as string).then(setService);
        }
    }, [id]);

    useEffect(() => {
        setSelectedImage(0);
    }, [service]);


    if (!service) return <div className="service-loading">Loading...</div>;

    const isArabic = i18n.language === 'ar';
    const categoryName = service.category === 'repair' ? t('repair') : service.category === 'carwash' ? t('carwash') : service.category === 'spray' ? t('spray') : service.category === 'spare parts' ? t('spare-parts') : service.category === 'tires' ? t('tires') : service.category === 'accessorize' ? t('accessorize') : service.category === 'showroom' ? t('showroom') : '';
    const metaTitle = isArabic
      ? `${service.name} في ${service.city} | ${categoryName} | كار ماركت`
      : `${service.name} in ${service.city} | ${categoryName} | Car Market`;
    const metaDescription = isArabic
      ? `${service.name} يقدم خدمات ${categoryName} في ${service.city}. ${service.description}`
      : `${service.name} offers ${categoryName} services in ${service.city}. ${service.description}`;
    const metaOgImage = service.images && service.images.length > 0 ? service.images[0] : '/public/file.svg';
    const metaUrl = `https://yourdomain.com/service/${service._id}`;

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
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'LocalBusiness',
                        'name': service.name,
                        'description': service.description,
                        'image': service.images && service.images.length > 0 ? service.images[0] : undefined,
                        'address': {
                            '@type': 'PostalAddress',
                            'streetAddress': service.address,
                            'addressLocality': service.city,
                            'addressCountry': 'EG'
                        },
                        'telephone': service.contact,
                        'url': metaUrl,
                        'areaServed': 'EG',
                        'availableLanguage': ['en', 'ar'],
                        'serviceType': categoryName,
                        'geo': service.location ? { '@type': 'GeoCoordinates', 'name': service.city } : undefined
                    })
                }}
            />
        </Head>
        <Header onSearch={() => {}} search={false}/>
        <div className="service-details-container">
            <div className="service-header">
                {service.logo && (
                    <div className="service-logo-wrapper">
                        <Image src={service.logo} alt={`${service.name} logo`} width={64} height={64} className="service-logo" />
                    </div>
                )}
                <div className="service-header-info">
                    <h1 className="service-title">{service.name}</h1>
                    <span className="service-category">
                        {
                            service.category === 'repair' ? t('repair') : service.category === 'carwash' ? t('carwash') : service.category === 'spray' ? t('spray') : service.category === 'spare parts' ? t('spare-parts') : service.category === 'tires' ? t('tires') : service.category === 'accessorize' ? t('accessorize') : service.category === 'showroom' ? t('showroom') : ""
                        } 
                    </span>
                </div>
            </div>
            {service.images && service.images.length > 0 && (
                <div className="service-image-gallery">
                    <div className="service-primary-image-wrapper">
                        <Image src={service.images[selectedImage]} alt={`${service.name} image ${selectedImage+1}`} fill className="service-primary-image" />
                    </div>
                    <div className="service-image-nav">
                        {service.images.map((img, idx) => (
                            <button
                                key={idx}
                                className={`service-image-thumb-btn${selectedImage === idx ? ' active' : ''}`}
                                onClick={() => setSelectedImage(idx)}
                                aria-label={`Show image ${idx+1}`}
                            >
                                <div className="service-image-thumb-wrapper">
                                    <Image src={img} alt={`${service.name} thumbnail ${idx+1}`} fill className="service-image-thumb" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {service.description && (
                <p className="service-description">{service.description}</p>
            )}
            <div className="service-info-section">
                <div className="service-info-details">
                    <p className="service-address">📍 {service.city}</p>
                    <p className="service-address">📍 {service.address}</p>
                    {
                        service.contact.length === 1 && (
                            <a href={`tel:${service.contact[0]}`} className="service-contact">📞 {service.contact[0]}</a>
                        )
                    }
                    {
                        service.contact.length > 1 && (
                            service.contact.map(c => (
                                c.startsWith('+') ? <a href={`https://wa.me/${c}`} className="service-contact"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48"><path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path></svg>
                                    {c}</a> : <a href={`tel:${c}`} className="service-contact">📞 {c}</a>
                            ))
                        )
                    }

                    <div className="service-offered-section">
                        <h2 className="service-offered-title">{t('services')}</h2>
                        <ul className="service-offered-list">
                            {service.servicesOffered.map((item) => (
                                <li key={item} className="service-offered-item">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="service-map-wrapper">
                    
                        <iframe 
                        src={service.location}
                        width="600"
                        height="450"
                        allowFullScreen
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    
                </div>
            </div>
        </div>
        {/* Facebook icon for the first social link, if available */}
        {service.social && service.social.length > 0 && service.social[0] && (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                <a href={service.social[0]} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="24" r="24" fill="#1877F2"/>
                        <path d="M32 24.001h-5.333v12H21.333v-12h-2.666v-4h2.666v-2.667c0-2.206 1.127-5.333 5.333-5.333l3.334.014v3.72h-2.42c-.393 0-.947.197-.947 1.04V20h3.48l-.453 4z" fill="#fff"/>
                    </svg>
                </a>
            </div>
        )}
        <Footer />
        </>
    );
}
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        },
    };
};
