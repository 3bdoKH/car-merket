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
                    <a href={`https://wa.me/2${service.contact}`} className="service-contact">📞 {service.contact}</a>
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
