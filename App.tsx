
import React, { useState, useEffect, useRef } from 'react';
import { VehicleAd, User, Page, SearchCriteria, BlogPost, Testimonial } from './types';
import { supabase } from './supabaseClient';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import PostAdForm from './components/PostAdForm';
import Contact from './components/Contact';
import Landing from './components/Landing';
import Profile from './components/Profile';
import Register from './components/Register';
import VerifyAccount from './components/VerifyAccount';
import SearchResults from './components/SearchResults';
import About from './components/About';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Faq from './components/Faq';
import AdDetail from './components/AdDetail';
import Blog from './components/Blog';
import BlogPostPage from './components/BlogPost';
import ForgotPassword from './components/ForgotPassword';
import AllAds from './components/AllAds';
import BackToTopButton from './components/BackToTopButton';

// Mapper functions to convert snake_case from DB to camelCase for the app
const mapDbToAd = (dbAd: any): VehicleAd => {
  let imageUrls: string[] = [];
  // Check if dbAd has image_urls and it's an array
  if (Array.isArray(dbAd.image_urls) && dbAd.image_urls.length > 0) {
      imageUrls = dbAd.image_urls;
  } else if (dbAd.image_url) {
      imageUrls = [dbAd.image_url];
  }

  // If we only have one image, let's add more for the carousel demonstration.
  if (imageUrls.length === 1) {
      imageUrls.push('https://images.unsplash.com/photo-1511919884226-fd32877b47bd?q=80&w=800&h=600&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
      imageUrls.push('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&h=600&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  }

  if (imageUrls.length === 0) {
        imageUrls.push('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&h=600&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  }

  return {
    id: dbAd.id,
    title: dbAd.title,
    price: dbAd.price,
    year: dbAd.year,
    mileage: dbAd.mileage,
    location: dbAd.location,
    imageUrls: imageUrls,
    category: dbAd.category,
    ownerId: dbAd.owner_id,
    description: dbAd.description,
  };
};

const mapDbToUser = (dbUser: any): User => ({
  id: dbUser.id,
  name: dbUser.name,
  phone: dbUser.phone,
  address: dbUser.address,
  imageUrl: dbUser.image_url,
  favorites: dbUser.favorites || [],
});

const getErrorMessage = (error: unknown): string => {
    let message = 'An unknown error occurred.';
    if (error instanceof Error) {
        message = error.message;
    } else if (error && typeof error === 'object' && 'message' in error) {
        const msg = (error as { message: unknown }).message;
        if (typeof msg === 'string') {
            message = msg;
        }
    } else if (typeof error === 'string') {
        message = error;
    }
    return message;
};

const mockBlogPosts: BlogPost[] = [];

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    authorName: 'سارة العلمي',
    authorImageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    comment: 'تجربة رائعة! تمكنت من بيع سيارتي في أقل من أسبوع. المنصة سهلة الاستخدام وموثوقة للغاية. أنصح بها بشدة!',
    date: '2024-07-12',
  },
  {
    id: 2,
    authorName: 'محمد أمين',
    authorImageUrl: 'https://randomuser.me/api/portraits/men/62.jpg',
    rating: 5,
    comment: 'أفضل موقع لشراء السيارات المستعملة في المغرب. وجدت بالضبط ما كنت أبحث عنه بسعر ممتاز. شكراً لفريق مغرب كار.',
    date: '2024-07-08',
  },
  {
    id: 3,
    authorName: 'ليلى بناني',
    authorImageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4,
    comment: 'المنصة جيدة جداً، لكن أتمنى إضافة المزيد من خيارات الفلترة في البحث. بشكل عام، تجربة إيجابية.',
    date: '2024-07-01',
  },
];


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allAds, setAllAds] = useState<VehicleAd[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Landing);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dbSetupError, setDbSetupError] = useState(false);

  const [editingAd, setEditingAd] = useState<VehicleAd | null>(null);
  const [registrationEmail, setRegistrationEmail] = useState<string>('');
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | null>(null);
  const [searchResults, setSearchResults] = useState<VehicleAd[]>([]);
  const [viewingAd, setViewingAd] = useState<VehicleAd | null>(null);
  const [viewingPost, setViewingPost] = useState<BlogPost | null>(null);

  const currentPageRef = useRef(currentPage);
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const fetchAds = async () => {
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) {
      const rawMessage = getErrorMessage(error);
      if (rawMessage.includes('Could not find the table')) {
        setDbSetupError(true);
      }
      const errorMessage = `Error fetching ads: ${rawMessage}`;
      console.error(errorMessage);
      setError(prev => prev ? `${prev}\n${errorMessage}` : errorMessage);
    } else if (data) {
      setAllAds(data.map(mapDbToAd));
    }
  };

  const fetchUsers = async () => {
     const { data, error } = await supabase.from('profiles').select('*');
     if (error) {
        const rawMessage = getErrorMessage(error);
        if (rawMessage.includes('Could not find the table')) {
            setDbSetupError(true);
        }
        const errorMessage = `Error fetching users: ${rawMessage}`;
        console.error(errorMessage);
        setError(prev => prev ? `${prev}\n${errorMessage}` : errorMessage);
     } else if (data) {
        setAllUsers(data.map(mapDbToUser));
     }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    setDbSetupError(false);
    
    const initialFetch = async () => {
      await Promise.all([fetchAds(), fetchUsers()]);
    };

    initialFetch();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profiles, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .limit(1); // Use limit(1) instead of single() for resilience
        
        if (profileError) {
          const rawMessage = getErrorMessage(profileError);
          if (rawMessage.includes('Could not find the table')) {
              setDbSetupError(true);
          }
          const errorMessage = `Error fetching user profile: ${rawMessage}`;
          console.error(errorMessage);
          setError(prev => prev ? `${prev}\n${errorMessage}` : errorMessage);
          setCurrentUser(null);
          setIsLoggedIn(false);
        } else if (profiles && profiles.length > 0) {
          const profile = profiles[0];
          setCurrentUser({ ...mapDbToUser(profile), email: session.user.email });
          setIsLoggedIn(true);
          if ([Page.Landing, Page.Login, Page.Register, Page.VerifyAccount, Page.ForgotPassword].includes(currentPageRef.current)) {
             setCurrentPage(Page.Home);
          }
        } else {
          // This can happen if the profile creation trigger failed.
          // Log out the user to prevent an inconsistent state.
          console.warn(`No profile found for user ${session.user.id}. Logging out.`);
          await supabase.auth.signOut();
          setCurrentUser(null);
          setIsLoggedIn(false);
        }
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);


  const handleLogin = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(getErrorMessage(error));
      throw error;
    } else {
      handleNavigate(Page.Home);
    }
  };
  
  const handleRegister = async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) {
      alert(getErrorMessage(error));
      throw error;
    } else if (data.user) {
        // The trigger will create the profile
        if (data.user.identities && data.user.identities.length > 0) {
             setRegistrationEmail(email);
             handleNavigate(Page.VerifyAccount);
        } else {
            alert("Registration successful, but couldn't get user details for verification step.");
        }
    }
  };

  const handleVerify = async (token) => {
    const { error } = await supabase.auth.verifyOtp({ email: registrationEmail, token, type: 'signup' });
    if(error) {
        alert(getErrorMessage(error));
    } else {
        alert('Account verified successfully! You can now log in.');
        handleNavigate(Page.Login);
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setIsLoggedIn(false);
    handleNavigate(Page.Landing);
  };

  const handleForgotPasswordRequest = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
    });
    if (error) {
      alert(getErrorMessage(error));
    }
  };
  
  const handleNavigate = (page: Page, data?: any) => {
    const protectedPages = [Page.Dashboard, Page.PostAd, Page.EditAd, Page.Messages, Page.Profile, Page.Home];
    if (!isLoggedIn && protectedPages.includes(page)) {
      setCurrentPage(Page.Login);
      return;
    }

    if (page === Page.EditAd && data) setEditingAd(data);
    else setEditingAd(null);

    if (page === Page.AdDetail && data) setViewingAd(data);
    if (page === Page.BlogPost && data) setViewingPost(data);
    
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
    if (!currentUser) {
        alert('You must be logged in to upload files.');
        return null;
    }
    const fileExt = file.name.split('.').pop();
    const fileName = `${currentUser.id}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);
    if (error) {
      console.error('Error uploading file:', getErrorMessage(error));
      alert('Error uploading file: ' + getErrorMessage(error));
      return null;
    }
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return publicUrl;
  };

  const handleAdPosted = async (adData: any) => {
    if (!currentUser) return;
    setLoading(true);

    let imageUrls = editingAd?.imageUrls || [];
    if (adData.imageFile) {
        const uploadedUrl = await uploadFile(adData.imageFile, 'ads');
        if (uploadedUrl) {
            if(editingAd) {
                 // Replace first image, keep others
                 imageUrls = [uploadedUrl, ...imageUrls.slice(1)];
            } else {
                 imageUrls = [uploadedUrl];
            }
        }
    }
    
    const dbData = {
        title: adData.title,
        price: Number(adData.price),
        year: Number(adData.year),
        mileage: Number(adData.mileage),
        location: adData.location,
        description: adData.description,
        category: adData.category,
        image_urls: imageUrls,
        image_url: imageUrls[0] || null, // For compatibility
    };
    
    if (editingAd) {
      const { error } = await supabase.from('ads').update(dbData).eq('id', editingAd.id);
      if(error) alert(getErrorMessage(error));
    } else {
      // Add more images for demo purposes to new ads
      if (dbData.image_urls.length === 1) {
          dbData.image_urls.push('https://images.unsplash.com/photo-1511919884226-fd32877b47bd?q=80&w=400&h=300&auto=format&fit=crop');
          dbData.image_urls.push('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=400&h=300&auto=format&fit=crop');
          dbData.image_url = dbData.image_urls[0]; // just in case
      }
      const { error } = await supabase.from('ads').insert([{ ...dbData, owner_id: currentUser.id }]);
      if(error) alert(getErrorMessage(error));
    }
    
    await fetchAds();
    setEditingAd(null);
    handleNavigate(Page.Dashboard);
  };
  
  const handleDeleteAd = async (adId: number) => {
    const { error } = await supabase.from('ads').delete().eq('id', adId);
    if (error) {
      alert(getErrorMessage(error));
    } else {
      setAllAds(allAds.filter(ad => ad.id !== adId));
    }
  };

  const handleUpdateProfile = async (updatedData: any) => {
    if (!currentUser) return;
    setLoading(true);

    let imageUrl = currentUser.imageUrl;
    if (updatedData.imageFile) {
        const uploadedUrl = await uploadFile(updatedData.imageFile, 'avatars');
        if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const profileData = {
        name: updatedData.name,
        phone: updatedData.phone,
        address: updatedData.address,
        image_url: imageUrl,
    };

    const { error } = await supabase.from('profiles').update(profileData).eq('id', currentUser.id);

    if (error) {
      alert(getErrorMessage(error));
    } else {
      const updatedUser = {
        ...currentUser,
        ...mapDbToUser({id: currentUser.id, ...profileData})
      };
      setCurrentUser(updatedUser);
      setAllUsers(allUsers.map(u => u.id === currentUser.id ? updatedUser : u));
    }
    setLoading(false);
  };

  const handleSearch = (criteria: SearchCriteria) => {
    setSearchCriteria(criteria);
    handleNavigate(Page.SearchResults);
    window.scrollTo(0, 0);
  };
  
  const handleReviewSubmitted = async (review: Omit<Testimonial, 'id' | 'date' | 'authorImageUrl'>) => {
    const newLocalTestimonial: Testimonial = {
        id: Date.now(),
        authorName: review.authorName,
        authorImageUrl: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 9)}.jpg`,
        rating: review.rating,
        comment: review.comment,
        date: new Date().toISOString().split('T')[0]
    };
    setTestimonials([newLocalTestimonial, ...testimonials]);
  };

  const handleToggleFavorite = async (adId: number) => {
    if (!currentUser) return handleNavigate(Page.Login);
    
    const isFavorited = currentUser.favorites.includes(adId);
    const updatedFavorites = isFavorited
      ? currentUser.favorites.filter(id => id !== adId)
      : [...currentUser.favorites, adId];
    
    const { error } = await supabase
        .from('profiles')
        .update({ favorites: updatedFavorites })
        .eq('id', currentUser.id);

    if (error) {
        alert(getErrorMessage(error));
    } else {
        setCurrentUser({ ...currentUser, favorites: updatedFavorites });
    }
  };
  
  useEffect(() => {
    if (currentPage === Page.SearchResults && searchCriteria) {
      const performSearch = () => {
        let results = [...allAds];
        if (searchCriteria.query) {
          const queryLower = searchCriteria.query.toLowerCase();
          results = results.filter(ad => 
            ad.title.toLowerCase().includes(queryLower) || 
            ad.location.toLowerCase().includes(queryLower)
          );
        }
        if (searchCriteria.category && searchCriteria.category !== 'الكل') {
          results = results.filter(ad => ad.category === searchCriteria.category);
        }
        if (searchCriteria.yearFrom) {
          results = results.filter(ad => ad.year >= parseInt(searchCriteria.yearFrom));
        }
        if (searchCriteria.yearTo) {
          results = results.filter(ad => ad.year <= parseInt(searchCriteria.yearTo));
        }
        setSearchResults(results);
      };
      performSearch();
    }
  }, [searchCriteria, currentPage, allAds]);


  const renderContent = () => {
    if (loading && !dbSetupError) {
        return <div className="flex h-screen items-center justify-center"><p className="text-xl">جاري التحميل...</p></div>;
    }
      
    const favoriteIds = currentUser?.favorites || [];
    
    switch (currentPage) {
      case Page.Landing:
        // FIX: Pass handleToggleFavorite function instead of undefined onToggleFavorite
        return <Landing latestAds={allAds.slice(0, 4)} onNavigate={handleNavigate} onSearch={handleSearch} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />;
      case Page.Login:
        return <Login onLogin={handleLogin} onNavigate={handleNavigate} />;
      case Page.Register:
        return <Register onRegister={handleRegister} onNavigate={handleNavigate} />;
      case Page.ForgotPassword:
        return <ForgotPassword onForgotPasswordRequest={handleForgotPasswordRequest} onNavigate={handleNavigate} />;
      case Page.VerifyAccount:
        return <VerifyAccount email={registrationEmail} onVerify={(token) => handleVerify(token)} />;
      case Page.Home:
        return <Home latestAds={allAds.slice(0, 8)} recommendedAds={allAds.slice().reverse().slice(0, 4)} testimonials={testimonials} onNavigate={handleNavigate} onSearch={handleSearch} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />;
      case Page.Dashboard:
        if (!currentUser) return null;
        const favoriteAds = allAds.filter(ad => currentUser.favorites.includes(ad.id));
        // FIX: Pass handleToggleFavorite function instead of undefined onToggleFavorite
        return <Dashboard 
                  user={currentUser} 
                  userAds={allAds.filter(ad => ad.ownerId === currentUser.id)}
                  favoriteAds={favoriteAds}
                  onNavigate={handleNavigate} 
                  onDeleteAd={handleDeleteAd}
                  onToggleFavorite={handleToggleFavorite}
               />;
      case Page.PostAd:
        return <PostAdForm onAdPosted={handleAdPosted} onCancel={() => handleNavigate(Page.Dashboard)} editingAd={editingAd} />;
      case Page.Contact:
        return <Contact onReviewSubmit={handleReviewSubmitted} />;
      case Page.Profile:
        if (!currentUser) return null;
        return <Profile user={currentUser} onUpdateProfile={handleUpdateProfile} onCancel={() => handleNavigate(Page.Dashboard)} />;
      case Page.SearchResults:
        if (!searchCriteria) return null;
        // FIX: Pass handleToggleFavorite function instead of undefined onToggleFavorite
        return <SearchResults criteria={searchCriteria} results={searchResults} onNavigate={handleNavigate} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite}/>;
      case Page.About:
        return <About />;
      case Page.Terms:
        return <Terms />;
      case Page.Privacy:
        return <Privacy />;
      case Page.Faq:
        return <Faq onNavigate={handleNavigate} />;
      case Page.AdDetail:
        if (!viewingAd) return null;
        const owner = allUsers.find(user => user.id === viewingAd.ownerId);
        if (!owner) return <div className="p-8 text-center text-red-500">Error: Ad owner could not be found.</div>;
        const similarAds = allAds.filter(ad => ad.id !== viewingAd.id && (ad.category === viewingAd.category || ad.location === viewingAd.location)).slice(0, 4);
        // FIX: Pass handleToggleFavorite function instead of undefined onToggleFavorite
        return <AdDetail ad={viewingAd} owner={owner} onNavigate={handleNavigate} isFavorited={favoriteIds.includes(viewingAd.id)} onToggleFavorite={handleToggleFavorite} similarAds={similarAds} />;
      case Page.Blog:
        return <Blog posts={blogPosts} onNavigate={handleNavigate} />;
      case Page.BlogPost:
        if (!viewingPost) return null;
        return <BlogPostPage post={viewingPost} onNavigate={handleNavigate} />;
      case Page.AllAds:
        // FIX: Pass handleToggleFavorite function instead of undefined onToggleFavorite
        return <AllAds ads={allAds} users={allUsers} onNavigate={handleNavigate} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />;
      case Page.Messages:
        return <div className="text-center p-20"><h1 className="text-3xl font-bold">صفحة قيد الإنشاء</h1><p className="text-gray-600 mt-4">{currentPage}</p></div>
      default:
        // FIX: Pass handleToggleFavorite function instead of undefined onToggleFavorite
        return <Landing latestAds={allAds.slice(0, 4)} onNavigate={handleNavigate} onSearch={handleSearch} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {dbSetupError ? (
        <div className="bg-yellow-100 border-t-4 border-yellow-500 text-yellow-900 p-4 shadow-md" role="alert">
          <div className="flex">
            <div className="py-1">
                <svg className="fill-current h-6 w-6 text-yellow-500 ml-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 5v6h2V5H9zm0 8v2h2v-2H9z"/></svg>
            </div>
            <div>
                <p className="font-bold">خطوة إعداد مطلوبة!</p>
                <p className="text-sm">لم يتم العثور على جداول قاعدة البيانات (`ads`, `profiles`). لإصلاح هذا، يرجى تشغيل برنامج الإعداد SQL النصي الذي قدمته لك في محرر SQL الخاص بمشروع Supabase.</p>
                <a href="https://supabase.com/dashboard/project/tvhqaczentnykbeybmup/sql/new" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block bg-yellow-500 text-white font-bold py-1 px-3 text-xs rounded hover:bg-yellow-600 transition-colors">
                  فتح محرر SQL
                </a>
            </div>
          </div>
        </div>
      ) : error && (
        <div className="bg-red-100 border-b-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">خطأ في الاتصال بقاعدة البيانات</p>
          <p>حدثت مشكلة أثناء تحميل البيانات. يرجى مراجعة وحدة التحكم بحثًا عن أخطاء.</p>
          <pre className="mt-2 text-sm whitespace-pre-wrap">{error}</pre>
        </div>
      )}
      <Header 
        isLoggedIn={isLoggedIn} 
        user={isLoggedIn ? currentUser : null} 
        onLogout={handleLogout} 
        onNavigate={handleNavigate}
       />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer onNavigate={handleNavigate} />
      <BackToTopButton />
    </div>
  );
};

export default App;
