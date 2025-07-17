import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../components/BrandSlider.css';
import '../components/admin/serviceForm.css';
import '../components/admin/serviceList.css';
import '../components/footer/footer.css';
import '../components/header/header.css';
import '../components/services/serviceCard.css';
import '../components/ui/searchBar.css';
import '../pages/about/about.css';
import '../pages/category/category.css';
import '../pages/contact/contact.css';
import '../pages/index.css';
import '../pages/service/serviceDetails.css';
import '../components/BestCategory.css'
import '../pages/city/city.css'
import '../components/carServicesArea.css'; 
import '../components/adds.css'
import '../components/footer/footerFeatureBar.css';

function MyApp({ Component, pageProps }: any) {
  const router = useRouter(); 
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.dir = router.locale === 'ar' ? 'rtl' : 'ltr';
    }
  }, [router.locale]);
  return <Component {...pageProps} />;
}
export default appWithTranslation(MyApp);
