'use client';
import {ProfileSidebar} from './profile';
import {ArticleCard} from '@/components/shared/article-card';
import {mockData, mockArticles} from './mockdata';
export default function Profile() {
  // const [WalletId, setWalletId] = useState<string | null>(null);
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   setWalletId(params.get('walletId'));
  // }, []);

  return (
    <div className='bg-gradient-to-b from-gray-950 to-black text-white overflow-y-auto m-4'>
      <div className='flex flex-col lg:flex-row'>
        {/* Left column: Profile info */}
        <div className='lg:w-1/3'>
          <ProfileSidebar {...mockData} />
        </div>

        {/* Right column: Published articles */}
        <div className='lg:w-2/3'>
          {mockArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
