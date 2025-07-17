import React, { useTransition } from 'react';
import { useRouter } from 'next/router';
import { FaWrench } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const cities = [
    {
        name: 'القاهرة',
        slug: 'cairo',
        count: 213,
        areas: ['Elmanial', 'المنيل', 'مدينة الشروق', 'مدينة السلام', 'الرحاب', 'المقطم'],
    },
    {
        name: 'الجيزة',
        slug: 'giza',
        count: 83,
        areas: ['الدقي', 'العياط', 'المهندسين', 'الهرم', '6 أكتوبر'],
    },
    {
        name: 'الاسكندرية',
        slug: 'alexandria',
        count: 36,
        areas: ['العامرية', 'الطريق الدائري', 'برج العرب', 'EIRAML Station', 'المندرة'],
    },
];

const CarServicesArea = () => {
    const router = useRouter();
    const {t} = useTranslation()
    const handleCardClick = (citySlug: string) => {
        router.push(`/city/${citySlug}`);
    };

    return (
        <div className="car-services-area-cards">
            <div className="car-services-area-heading">
                <h2>{t('car-services-area-title')}</h2>
                <p>{t('car-services-area-p')}</p>
            </div>
        <div className="areas">
        {cities.map(city => (
            <div
            key={city.slug}
            className="car-service-card"
            onClick={() => handleCardClick(city.slug)}
            >
            <FaWrench className="wrench-icon" />
            <div className="city-title">{city.name}</div>
            <div className="service-count">أكثر من {city.count} مركز صيانة</div>
            <div className="areas-title">مناطق شائعة</div>
            <ul className="areas-list">
                {city.areas.map(area => (
                <li key={area}> • {area}</li>
                ))}
            </ul>
            </div>
        ))}
        </div>
        </div>
    );
};

export default CarServicesArea;
