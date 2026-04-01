// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
// ==========================================
// 1. 載入 Firebase 模組
// ==========================================
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
// 【新增】載入 Firebase 驗證模組
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// ==========================================
// 2. 填入您的 Firebase 設定 (取自截圖)
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyCqtwLLAt4FrOeapIp9TsQXRghpWwfZew8",
  authDomain: "job-interview-83e53.firebaseapp.com",
  projectId: "job-interview-83e53",
  storageBucket: "job-interview-83e53.firebasestorage.app",
  messagingSenderId: "580948074890",
  appId: "1:580948074890:web:0d3a8c1be976569b9be873"
};

// 初始化 Firebase、Firestore 與 Auth
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});
const auth = getAuth(app); 

// ==========================================
// 免安裝升級版：內建原生 SVG 圖示 (加入 TypeScript any 定義)
// ==========================================
const SvgIcon = ({ path, className, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    {path}
  </svg>
);

const User = (p: any) => <SvgIcon path={<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>} {...p} />;
const Phone = (p: any) => <SvgIcon path={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>} {...p} />;
const Briefcase = (p: any) => <SvgIcon path={<><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>} {...p} />;
const CheckCircle = (p: any) => <SvgIcon path={<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></>} {...p} />;
const AlertCircle = (p: any) => <SvgIcon path={<><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></>} {...p} />;
const Loader2 = (p: any) => <SvgIcon path={<path d="M21 12a9 9 0 1 1-6.219-8.56"/>} {...p} />;
const Utensils = (p: any) => <SvgIcon path={<><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></>} {...p} />;
const ArrowRight = (p: any) => <SvgIcon path={<><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>} {...p} />;
const ChevronRight = (p: any) => <SvgIcon path={<path d="m9 18 6-6-6-6"/>} {...p} />;
const SettingsIcon = (p: any) => <SvgIcon path={<><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/><circle cx="12" cy="12" r="3"/></>} {...p} />;
const Plus = (p: any) => <SvgIcon path={<><path d="M5 12h14"/><path d="M12 5v14"/></>} {...p} />;
const Trash2 = (p: any) => <SvgIcon path={<><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></>} {...p} />;
const ShieldCheck = (p: any) => <SvgIcon path={<><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4.5 1 6.5 2a1 1 0 0 1 1 1v7z"/><path d="m9 12 2 2 4-4"/></>} {...p} />;
const Lock = (p: any) => <SvgIcon path={<><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>} {...p} />;
const LogOut = (p: any) => <SvgIcon path={<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></>} {...p} />;
const SaveIcon = (p: any) => <SvgIcon path={<><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></>} {...p} />;
const ImageIcon = (p: any) => <SvgIcon path={<><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>} {...p} />;
const MapPin = (p: any) => <SvgIcon path={<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>} {...p} />;
const Users = (p: any) => <SvgIcon path={<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>} {...p} />;

// ==========================================
// 原生 Canvas 圖片裁切器
// ==========================================
const ImageCropper = ({ imageUrl, onCrop, onCancel }: any) => {
  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState<any>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<any>({ x: 0, y: 0 });
  const [baseScale, setBaseScale] = useState<number>(1);
  const imgRef = useRef<HTMLImageElement>(null);
  const size = 240; 

  const handleImageLoad = (e: any) => {
    const { naturalWidth, naturalHeight } = e.target;
    const scale = Math.max(size / naturalWidth, size / naturalHeight);
    setBaseScale(scale);
  };

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: any) => {
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
  };
  const handleTouchMove = (e: any) => {
    if (!isDragging) return;
    e.preventDefault(); 
    setPosition({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y });
  };

  const handleCrop = () => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const img = imgRef.current;
    if (!ctx || !img) return;

    const scale = baseScale * zoom;
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (size - dw) / 2 + position.x;
    const dy = (size - dh) / 2 + position.y;

    ctx.fillStyle = '#ffffff'; 
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(img, dx, dy, dw, dh);
    onCrop(canvas.toDataURL('image/jpeg', 0.9));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 w-full max-w-sm shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-zinc-900 mb-6 tracking-tight">調整 LOGO 大小與位置</h3>
        
        <div 
          className="relative rounded-full overflow-hidden bg-zinc-100 cursor-move border-4 border-zinc-100 shadow-inner"
          style={{ width: size, height: size, touchAction: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          <img 
            ref={imgRef}
            src={imageUrl}
            onLoad={handleImageLoad}
            alt="Crop preview"
            draggable={false}
            className="absolute max-w-none pointer-events-none origin-center"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${baseScale * zoom})`
            }}
          />
        </div>

        <div className="w-full mt-8 flex items-center space-x-4">
          <span className="text-zinc-400 font-bold text-sm">縮小</span>
          <input 
            type="range" min="1" max="3" step="0.05" 
            value={zoom} onChange={(e: any) => setZoom(parseFloat(e.target.value))}
            className="flex-1 accent-zinc-900 h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-zinc-400 font-bold text-sm">放大</span>
        </div>
        <p className="text-[13px] text-zinc-400 mt-3 mb-8 font-medium">提示：請在圓框內拖曳圖片調整位置</p>

        <div className="flex space-x-3 w-full">
          <button type="button" onClick={onCancel} className="flex-1 py-3.5 rounded-full bg-zinc-100 text-zinc-700 font-bold hover:bg-zinc-200 active:scale-95 transition-all">
            取消
          </button>
          <button type="button" onClick={handleCrop} className="flex-1 py-3.5 rounded-full bg-zinc-900 text-white font-bold hover:bg-zinc-800 active:scale-95 transition-all shadow-md">
            確認裁切
          </button>
        </div>
      </div>
    </div>
  );
};


export default function App() {
  useEffect(() => {
    if (!document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }, []);

  const [currentView, setCurrentView] = useState<string>('candidate');
  
  // 記錄 Firebase 登入狀態
  const [user, setUser] = useState<any>(null);

  // 後台主分類狀態
  const [adminMainTab, setAdminMainTab] = useState<string>('settings'); 
  const [adminEmployeeTab, setAdminEmployeeTab] = useState<string>('all'); 
  
  // 登入 Modal 狀態
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>(''); 
  const [passwordInput, setPasswordInput] = useState<string>('');
  
  // 【修改】將登入錯誤訊息改為字串，顯示精準錯誤原因
  const [loginError, setLoginError] = useState<string | false>(false);
  const [tempLogoUrl, setTempLogoUrl] = useState<any>(null);

  const defaultHeader = {
    title: "Thrilled to Join\nOur Team!",
    description: "歡迎來到美味餐飲集團！請填寫以下面試資料，為您的招募旅程踏出第一步。",
    logoUrl: "" 
  };
  const [headerContent, setHeaderContent] = useState<any>(defaultHeader);
  const [draftHeaderContent, setDraftHeaderContent] = useState<any>(defaultHeader);

  const [customBranches, setCustomBranches] = useState<string[]>(['虎尾店', '斗六店']);
  const [draftBranches, setDraftBranches] = useState<string[]>([]);
  const [newBranchInput, setNewBranchInput] = useState<string>('');

  const [customQuestions, setCustomQuestions] = useState<any[]>([
    { id: 'q1', text: '您過去有餐飲業相關經驗嗎？請簡述您的經歷。', type: 'textarea', required: true },
    { id: 'q2', text: '請簡短自我介紹，並分享您為什麼想加入美味餐飲集團？', type: 'textarea', required: true },
    { id: 'q3', text: '一週內可配合排班的時段為何？(例如: 平日晚班、假日全天)', type: 'text', required: true }
  ]);
  const [draftQuestions, setDraftQuestions] = useState<any[]>([]); 
  
  const [candidatesList, setCandidatesList] = useState<any[]>([]);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState<boolean>(false);

  const [showSaveToast, setShowSaveToast] = useState<boolean>(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState<boolean>(false);

  const [newQuestion, setNewQuestion] = useState<any>({ text: '', type: 'text', required: true });
  const [formData, setFormData] = useState<any>({ name: '', phone: '', position: '', branch: '', answers: {}, consent: false });
  const [status, setStatus] = useState<string>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docSnap = await getDoc(doc(db, "system_settings", "main"));
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.headerContent) {
            setHeaderContent(data.headerContent);
            setDraftHeaderContent(data.headerContent);
          }
          if (data.customQuestions) {
            setCustomQuestions(data.customQuestions);
            setDraftQuestions(data.customQuestions);
          }
          if (data.customBranches) {
            setCustomBranches(data.customBranches);
            setDraftBranches(data.customBranches);
          }
        }
      } catch (error: any) {
        console.warn("無法從 Firebase 載入設定，將使用預設值。原因:", error.message);
      }
    };
    fetchSettings();
  }, []);

  const handleAdminLogin = async (e: any) => {
    e.preventDefault();
    setLoginError(false);
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      setCurrentView('admin');
      setDraftQuestions([...customQuestions]); 
      setDraftBranches([...customBranches]);
      setDraftHeaderContent({ ...headerContent });
      setShowLoginModal(false);
      setPasswordInput('');
      setEmailInput('');
    } catch (error: any) {
      console.error("登入失敗完整錯誤:", error);
      // 【修改】精準判斷錯誤原因並顯示對應中文訊息
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setLoginError('帳號或密碼錯誤，請重新輸入');
      } else if (error.code === 'auth/unauthorized-domain') {
        setLoginError('目前網址尚未被 Firebase 授權，請至後台加入「已授權網域」');
      } else {
        setLoginError(`登入失敗 (${error.code})`);
      }
    }
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    setPasswordInput('');
    setEmailInput('');
    setLoginError(false);
  };

  const handleLogoutAttempt = () => {
    const isQuestionsDirty = JSON.stringify(draftQuestions) !== JSON.stringify(customQuestions);
    const isHeaderDirty = JSON.stringify(draftHeaderContent) !== JSON.stringify(headerContent);
    const isBranchesDirty = JSON.stringify(draftBranches) !== JSON.stringify(customBranches);
    
    if (isQuestionsDirty || isHeaderDirty || isBranchesDirty) {
      setShowUnsavedModal(true);
    } else {
      signOut(auth).then(() => {
        setCurrentView('candidate');
      });
    }
  };

  const handleConfirmLogout = () => {
    signOut(auth).then(() => {
      setShowUnsavedModal(false);
      setCurrentView('candidate');
    });
  };

  const handleLogoUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempLogoUrl(reader.result); 
        e.target.value = ''; 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropConfirm = (croppedBase64: string) => {
    setDraftHeaderContent((prev: any) => ({ ...prev, logoUrl: croppedBase64 }));
    setTempLogoUrl(null); 
  };

  const handleBasicInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, answers: { ...prev.answers, [questionId]: value } }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const missingRequired = customQuestions.find(q => q.required && !formData.answers[q.id]);
    if (missingRequired) {
      setStatus('error');
      setErrorMessage(`請完成必填題目：${missingRequired.text}`);
      return;
    }
    setStatus('submitting');
    setErrorMessage('');
    
    try {
      const payload = {
        candidate_name: formData.name,
        candidate_phone: formData.phone,
        applied_position: formData.position,
        applied_branch: formData.branch,
        has_consented: formData.consent, 
        custom_answers: customQuestions.map(q => ({
          question: q.text,
          answer: formData.answers[q.id] || ''
        })),
        source: 'fnb_interview_portal',
        submitted_at: new Date().toISOString()
      };

      await addDoc(collection(db, "candidates"), payload);
      setStatus('success');
    } catch (error: any) {
      setStatus('error');
      console.warn("寫入失敗:", error.message);
      if (error.message && error.message.includes('offline')) {
        setErrorMessage('目前處於離線狀態或被瀏覽器阻擋連線，請檢查網路狀態。');
      } else {
        setErrorMessage('資料庫連線失敗，請檢查 Firebase 設定與存取權限。');
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', position: '', branch: '', answers: {}, consent: false });
    setStatus('idle');
  };

  const handleAddQuestion = () => {
    if (!newQuestion.text.trim()) return;
    setDraftQuestions([...draftQuestions, { ...newQuestion, id: `q${Date.now()}` }]);
    setNewQuestion({ text: '', type: 'text', required: true });
  };
  const handleDeleteQuestion = (id: string) => {
    setDraftQuestions(draftQuestions.filter(q => q.id !== id));
  };

  const handleAddBranch = () => {
    const trimmed = newBranchInput.trim();
    if (trimmed && !draftBranches.includes(trimmed)) {
      setDraftBranches([...draftBranches, trimmed]);
      setNewBranchInput('');
    }
  };
  const handleDeleteBranch = (branch: string) => {
    setDraftBranches(draftBranches.filter(b => b !== branch));
  };

  const handleSaveSettings = async () => {
    setCustomQuestions([...draftQuestions]);
    setCustomBranches([...draftBranches]);
    setHeaderContent({ ...draftHeaderContent });
    
    const draftIds = draftQuestions.map(q => q.id);
    const newAnswers = { ...formData.answers };
    let hasDeleted = false;
    Object.keys(newAnswers).forEach(key => {
      if (!draftIds.includes(key)) {
        delete newAnswers[key];
        hasDeleted = true;
      }
    });
    if (hasDeleted) {
      setFormData((prev: any) => ({ ...prev, answers: newAnswers }));
    }

    try {
      await setDoc(doc(db, "system_settings", "main"), {
        headerContent: draftHeaderContent,
        customQuestions: draftQuestions,
        customBranches: draftBranches,
        updated_at: new Date().toISOString()
      });
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 3000);
    } catch (error: any) {
      console.warn("儲存失敗:", error.message);
      if (error.message && error.message.includes('offline')) {
        alert("儲存設定失敗：目前處於離線狀態或被瀏覽器阻擋，請檢查網路連線。");
      } else {
        alert("儲存設定失敗，請確認 Firebase 資料庫的讀寫權限 (Firestore Rules) 是否已開放。");
      }
    }
  };

  useEffect(() => {
    if (currentView === 'admin' && adminMainTab === 'employees') {
      const fetchCandidates = async () => {
        setIsLoadingCandidates(true);
        try {
          const querySnapshot = await getDocs(collection(db, "candidates"));
          const list: any[] = [];
          querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          list.sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());
          setCandidatesList(list);
        } catch (error: any) {
          console.warn("載入名單失敗:", error.message);
        } finally {
          setIsLoadingCandidates(false);
        }
      };
      fetchCandidates();
    }
  }, [currentView, adminMainTab]);

  const filteredCandidates = adminEmployeeTab === 'all'
    ? candidatesList
    : candidatesList.filter(c => c.applied_branch === adminEmployeeTab);

  const inputClassName = "focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 block w-full pl-11 sm:text-sm border-transparent bg-zinc-100 rounded-2xl py-3.5 transition-all hover:bg-zinc-200 focus:bg-white";

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans pb-12 relative">
      
      {tempLogoUrl && (
        <ImageCropper 
          imageUrl={tempLogoUrl} 
          onCrop={handleCropConfirm} 
          onCancel={() => setTempLogoUrl(null)} 
        />
      )}

      {showSaveToast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-zinc-900 text-white px-6 py-4 rounded-full shadow-xl flex items-center space-x-3 border border-zinc-700">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="font-bold text-[15px] tracking-wide">所有變更已成功儲存至雲端！</span>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-900">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-2 text-center tracking-tight">後台編輯登入</h3>
            <p className="text-sm text-zinc-500 mb-6 text-center font-medium">請輸入管理員專屬帳號密碼</p>
            
            <form onSubmit={handleAdminLogin}>
              <div className="space-y-4 mb-6">
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e: any) => {
                    setEmailInput(e.target.value);
                    if (loginError) setLoginError(false);
                  }}
                  autoFocus
                  required
                  placeholder="管理員 Email"
                  className={`w-full bg-zinc-100 border-2 rounded-2xl py-3.5 px-4 focus:outline-none transition-all ${
                    loginError ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-transparent focus:border-zinc-900 focus:bg-white'
                  }`}
                />
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e: any) => {
                    setPasswordInput(e.target.value);
                    if (loginError) setLoginError(false);
                  }}
                  required
                  placeholder="請輸入密碼"
                  className={`w-full bg-zinc-100 border-2 rounded-2xl py-3.5 px-4 focus:outline-none transition-all ${
                    loginError ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-transparent focus:border-zinc-900 focus:bg-white'
                  }`}
                />
                {/* 【修改】顯示精準的錯誤訊息 */}
                {loginError && <p className="text-red-500 text-sm mt-2 font-bold animate-pulse">{loginError}</p>}
              </div>
              
              <div className="flex space-x-3">
                <button type="button" onClick={closeLoginModal} className="flex-1 py-3.5 rounded-full bg-zinc-100 text-zinc-700 font-bold hover:bg-zinc-200 active:scale-95 transition-all">取消</button>
                <button type="submit" className="flex-1 py-3.5 rounded-full bg-zinc-900 text-white font-bold hover:bg-zinc-800 active:scale-95 transition-all shadow-md">確認登入</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showUnsavedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-2 text-center tracking-tight">尚未儲存變更</h3>
            <p className="text-sm text-zinc-500 mb-6 text-center font-medium leading-relaxed">
              您剛剛有修改或刪除資料，但尚未點擊底部儲存。<br/>確定要放棄修改並登出嗎？
            </p>
            <div className="flex space-x-3">
              <button onClick={() => setShowUnsavedModal(false)} className="flex-1 py-3.5 rounded-full bg-zinc-100 text-zinc-700 font-bold hover:bg-zinc-200 active:scale-95 transition-all">繼續編輯</button>
              <button onClick={handleConfirmLogout} className="flex-1 py-3.5 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 active:scale-95 transition-all shadow-md">放棄並登出</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto pt-16 px-4 sm:px-6">
        {currentView === 'admin' ? (
          /* ========================================================================================= */
          /* 後台管理端畫面 */
          /* ========================================================================================= */
          <div className="animate-in fade-in duration-300">
            
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight flex items-center">
                <SettingsIcon className="w-6 h-6 mr-2 text-zinc-900" />
                面試單後台管理
              </h2>
              <button
                onClick={handleLogoutAttempt}
                className="flex items-center px-5 py-2.5 bg-white border border-zinc-200 rounded-full text-sm font-bold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm active:scale-95"
              >
                <LogOut className="w-4 h-4 mr-2" />登出並返回
              </button>
            </div>

            {/* 後台主分類風琴式 UI */}
            <div className="flex space-x-3 mb-6">
              <button 
                onClick={() => setAdminMainTab('settings')}
                className={`flex-1 py-4 font-bold text-lg rounded-[1.5rem] transition-all flex items-center justify-center ${adminMainTab === 'settings' ? 'bg-zinc-900 text-white shadow-md' : 'bg-white text-zinc-500 border border-zinc-200 hover:bg-zinc-50'}`}
              >
                <SettingsIcon className="w-5 h-5 mr-2" /> 面試單設定
              </button>
              <button 
                onClick={() => setAdminMainTab('employees')}
                className={`flex-1 py-4 font-bold text-lg rounded-[1.5rem] transition-all flex items-center justify-center ${adminMainTab === 'employees' ? 'bg-zinc-900 text-white shadow-md' : 'bg-white text-zinc-500 border border-zinc-200 hover:bg-zinc-50'}`}
              >
                <Users className="w-5 h-5 mr-2" /> 員工管理
              </button>
            </div>

            {/* ======================================================= */}
            {/* 分頁 1: 面試單設定                                         */}
            {/* ======================================================= */}
            {adminMainTab === 'settings' && (
              <div className="space-y-6 animate-in slide-in-from-bottom-2 fade-in">
                {/* 視覺文案與分店設定 */}
                <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-zinc-100">
                  <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center mr-3">
                      <ImageIcon className="w-4 h-4 text-zinc-900" />
                    </div>
                    首頁視覺與文案設定
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Logo 上傳 */}
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-3">品牌 LOGO</label>
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center overflow-hidden border border-zinc-200 shrink-0">
                          {draftHeaderContent.logoUrl ? (
                            <img src={draftHeaderContent.logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                          ) : (
                            <Utensils className="w-10 h-10 text-zinc-300" />
                          )}
                        </div>
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer transition-colors"
                          />
                          <p className="text-[13px] text-zinc-400 mt-2 font-medium">建議上傳 240x240px 以上之圖片。上傳後可手動裁切。</p>
                          {draftHeaderContent.logoUrl && (
                            <button 
                              onClick={() => setDraftHeaderContent((prev: any) => ({ ...prev, logoUrl: '' }))}
                              className="text-red-500 text-xs font-bold mt-2 hover:text-red-600 transition-colors"
                            >
                              移除自訂 LOGO
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 標題設定 */}
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">主標題</label>
                      <textarea
                        value={draftHeaderContent.title}
                        onChange={(e: any) => setDraftHeaderContent((prev: any) => ({...prev, title: e.target.value}))}
                        rows={2}
                        className="focus:ring-2 focus:ring-zinc-900 block w-full sm:text-sm border-transparent bg-zinc-100 rounded-2xl py-3.5 px-4 transition-all focus:bg-white resize-none"
                        placeholder="請輸入前台標題 (可換行)"
                      />
                    </div>

                    {/* 描述設定 */}
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">下方內容 (歡迎文案)</label>
                      <textarea
                        value={draftHeaderContent.description}
                        onChange={(e: any) => setDraftHeaderContent((prev: any) => ({...prev, description: e.target.value}))}
                        rows={3}
                        className="focus:ring-2 focus:ring-zinc-900 block w-full sm:text-sm border-transparent bg-zinc-100 rounded-2xl py-3.5 px-4 transition-all focus:bg-white resize-none"
                        placeholder="輸入給應徵者的說明文字..."
                      />
                    </div>

                    {/* 應徵分店設定 */}
                    <div className="pt-6 border-t border-zinc-100">
                      <label className="block text-sm font-semibold text-zinc-700 mb-3">應徵分店選項</label>
                      <div className="flex space-x-3 mb-4">
                        <input
                          type="text"
                          value={newBranchInput}
                          onChange={(e: any) => setNewBranchInput(e.target.value)}
                          placeholder="輸入分店名稱 (例如：虎尾店)"
                          className="focus:ring-2 focus:ring-zinc-900 block w-full sm:text-sm border-transparent bg-zinc-100 rounded-2xl py-3 px-4 transition-all focus:bg-white"
                          onKeyDown={(e: any) => { if (e.key === 'Enter') { e.preventDefault(); handleAddBranch(); } }}
                        />
                        <button
                          onClick={handleAddBranch}
                          disabled={!newBranchInput.trim()}
                          className="px-6 py-3 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
                        >
                          新增分店
                        </button>
                      </div>
                      
                      {draftBranches.length === 0 ? (
                        <p className="text-sm text-zinc-400 font-medium bg-zinc-50 py-4 text-center rounded-2xl">目前尚無任何分店選項</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {draftBranches.map(branch => (
                            <div key={branch} className="flex items-center bg-zinc-100 border border-zinc-200 px-4 py-2 rounded-full">
                              <span className="text-[13px] font-bold text-zinc-800 mr-2">{branch}</span>
                              <button 
                                onClick={() => handleDeleteBranch(branch)}
                                className="text-zinc-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 題庫管理區塊 */}
                <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-zinc-100">
                  <h3 className="text-lg font-bold text-zinc-900 mb-5 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center mr-3">
                      <ShieldCheck className="w-4 h-4 text-zinc-900" />
                    </div>
                    面試題庫管理
                  </h3>
                  
                  <div className="space-y-5 mb-8 pb-8 border-b border-zinc-100">
                    <h4 className="text-sm font-bold text-zinc-700 mb-3 flex items-center">
                      <Plus className="w-4 h-4 mr-1 text-zinc-400" /> 加入新題目
                    </h4>
                    <div>
                      <input
                        type="text"
                        value={newQuestion.text}
                        onChange={(e: any) => setNewQuestion((prev: any) => ({...prev, text: e.target.value}))}
                        placeholder="例如：您對餐飲服務的熱情是什麼？"
                        className="focus:ring-2 focus:ring-zinc-900 block w-full sm:text-sm border-transparent bg-zinc-100 rounded-2xl py-3.5 px-4 transition-all focus:bg-white"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="flex-1">
                        <select
                          value={newQuestion.type}
                          onChange={(e: any) => setNewQuestion((prev: any) => ({...prev, type: e.target.value}))}
                          className="focus:ring-2 focus:ring-zinc-900 block w-full sm:text-sm border-transparent bg-zinc-100 rounded-2xl py-3.5 px-4 transition-all focus:bg-white"
                        >
                          <option value="text">單行填寫 (簡短回答)</option>
                          <option value="textarea">多行問答 (詳細論述)</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <label className="flex items-center text-sm font-semibold text-zinc-700 cursor-pointer bg-zinc-100 px-4 py-3.5 rounded-2xl w-full sm:w-auto hover:bg-zinc-200 transition-colors">
                          <input
                            type="checkbox"
                            checked={newQuestion.required}
                            onChange={(e: any) => setNewQuestion((prev: any) => ({...prev, required: e.target.checked}))}
                            className="mr-3 rounded text-zinc-900 focus:ring-zinc-900 w-5 h-5 border-zinc-300"
                          />
                          必填項目
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={handleAddQuestion}
                      disabled={!newQuestion.text.trim()}
                      className="w-full bg-zinc-900 text-white py-4 rounded-full font-bold hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.98] mt-2"
                    >
                      暫存並加入清單
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-zinc-700 mb-4">草稿列表 ({draftQuestions.length})</h4>
                  {draftQuestions.length === 0 ? (
                    <p className="text-zinc-400 text-center py-8 font-medium bg-zinc-50 rounded-3xl">目前沒有任何自訂題目</p>
                  ) : (
                    <ul className="space-y-4">
                      {draftQuestions.map((q, index) => (
                        <li key={q.id} className="flex items-start justify-between p-5 bg-zinc-50 rounded-3xl transition-colors hover:bg-zinc-100">
                          <div className="flex-1 pr-4">
                            <div className="flex items-center mb-2">
                              <span className="bg-white shadow-sm text-zinc-900 text-xs px-3 py-1 rounded-full mr-2 font-bold">Q{index + 1}</span>
                              <span className="text-xs font-semibold text-zinc-500 bg-zinc-200/50 px-2 py-1 rounded-md">
                                {q.type === 'text' ? '單行填寫' : '多行問答'}
                              </span>
                              {q.required && <span className="ml-2 text-xs text-red-500 font-bold">• 必填</span>}
                            </div>
                            <p className="text-sm font-semibold text-zinc-800 leading-relaxed">{q.text}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-zinc-400 hover:text-red-500 hover:bg-red-50 shadow-sm transition-all flex-shrink-0"
                            title="刪除"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* 底部儲存按鈕卡片 */}
                <div className="mt-8 bg-zinc-900 p-6 sm:p-8 rounded-[2rem] shadow-xl flex flex-col sm:flex-row justify-between items-center space-y-5 sm:space-y-0 relative overflow-hidden">
                  <div className="relative z-10 text-center sm:text-left">
                    <h4 className="text-xl font-bold text-white mb-1 tracking-wide">儲存所有變更</h4>
                    <p className="text-sm text-zinc-400 font-medium">包含視覺文案與題庫，確認無誤後點擊發布至雲端資料庫。</p>
                  </div>
                  <button
                    onClick={handleSaveSettings}
                    className="relative z-10 w-full sm:w-auto px-8 py-4 bg-white text-zinc-900 rounded-full font-extrabold shadow-md hover:bg-zinc-100 transition-all active:scale-95 flex items-center justify-center"
                  >
                    <SaveIcon className="w-5 h-5 mr-2" />
                    確認儲存並發布
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 分頁 2: 員工管理 (讀取 Firebase 資料)                      */}
            {/* ======================================================= */}
            {adminMainTab === 'employees' && (
              <div className="animate-in slide-in-from-bottom-2 fade-in pt-4">
                {/* 員工 - 風琴式 / 資料夾頁籤 UI */}
                <div className="flex items-end pl-4 -mb-px overflow-x-auto no-scrollbar">
                  <button 
                    onClick={() => setAdminEmployeeTab('all')}
                    className={`px-8 py-4 font-bold text-[15px] rounded-t-[1.5rem] transition-all relative border border-transparent whitespace-nowrap ${
                      adminEmployeeTab === 'all' 
                        ? 'bg-white text-zinc-900 z-20 border-zinc-100 border-b-white shadow-[0_-4px_10px_rgba(0,0,0,0.02)]' 
                        : 'bg-zinc-100 text-zinc-500 z-10 hover:bg-zinc-200'
                    }`}
                  >
                    全部門店
                  </button>
                  
                  {customBranches.map(branch => (
                    <button 
                      key={branch}
                      onClick={() => setAdminEmployeeTab(branch)}
                      className={`px-8 py-4 font-bold text-[15px] rounded-t-[1.5rem] transition-all relative border border-transparent whitespace-nowrap ${
                        adminEmployeeTab === branch 
                          ? 'bg-white text-zinc-900 z-20 border-zinc-100 border-b-white shadow-[0_-4px_10px_rgba(0,0,0,0.02)]' 
                          : 'bg-zinc-100 text-zinc-500 z-10 hover:bg-zinc-200 -ml-3'
                      }`}
                    >
                      {branch}
                    </button>
                  ))}
                </div>

                {/* 內容區塊 */}
                <div className="bg-white rounded-[2rem] rounded-tl-none shadow-sm border border-zinc-100 p-8 relative z-10 min-h-[400px]">
                  <div className="flex items-center mb-8 pb-4 border-b border-zinc-100">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-zinc-900" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900">
                      {adminEmployeeTab === 'all' ? '全部門店' : adminEmployeeTab} 員工列表
                    </h3>
                  </div>

                  {isLoadingCandidates ? (
                    <div className="py-20 text-center text-zinc-400 font-medium bg-zinc-50 rounded-3xl border border-zinc-100 flex flex-col items-center">
                      <Loader2 className="animate-spin w-8 h-8 mb-4 text-zinc-400" />
                      正在從 Firebase 載入資料...
                    </div>
                  ) : filteredCandidates.length === 0 ? (
                    <div className="py-20 text-center text-zinc-400 font-medium bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
                      目前 {adminEmployeeTab === 'all' ? '全部門店' : adminEmployeeTab} 尚未有任何員工資料
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredCandidates.map(candidate => (
                        <div key={candidate.id} className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 hover:border-zinc-300 transition-all">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-lg font-bold text-zinc-900 mb-1">{candidate.candidate_name}</h4>
                              <p className="text-sm text-zinc-500 font-medium">
                                {candidate.candidate_phone} · 應徵職位：{candidate.applied_position === 'waiter' ? '外場服務人員' : candidate.applied_position === 'kitchen' ? '內場廚房人員' : candidate.applied_position === 'store_manager' ? '店長 / 儲備幹部' : candidate.applied_position}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-zinc-900 bg-white border border-zinc-200 px-3 py-1.5 rounded-full shadow-sm">
                              {candidate.applied_branch}
                            </span>
                          </div>
                          
                          <div className="space-y-3 pt-4 border-t border-zinc-200">
                            {candidate.custom_answers && candidate.custom_answers.map((ans: any, idx: number) => (
                              <div key={idx}>
                                <p className="text-xs font-bold text-zinc-500 mb-1">Q: {ans.question}</p>
                                <p className="text-sm text-zinc-800 font-medium bg-white p-3 rounded-2xl border border-zinc-100 leading-relaxed whitespace-pre-wrap">
                                  {ans.answer || '無回答'}
                                </p>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 text-xs text-zinc-400 font-medium text-right">
                            提交時間：{new Date(candidate.submitted_at).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        ) : (
          /* ========================================================================================= */
          /* 面試者填寫端畫面 */
          /* ========================================================================================= */
          <div className="bg-white pb-10 px-6 sm:px-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] border border-zinc-100 animate-in fade-in duration-300">
            {/* Header / Hero Section (套用動態資料) */}
            <div className="text-center pt-12 pb-8">
              {/* 隱藏的後台入口 LOGO */}
              <div 
                onClick={() => {
                  if (user) {
                    setCurrentView('admin');
                    setDraftQuestions([...customQuestions]);
                    setDraftBranches([...customBranches]);
                    setDraftHeaderContent({ ...headerContent });
                  } else {
                    setShowLoginModal(true);
                  }
                }}
                className="w-20 h-20 bg-zinc-100 rounded-full mx-auto flex items-center justify-center mb-6 cursor-pointer hover:bg-zinc-200 hover:shadow-md transition-all active:scale-95 overflow-hidden"
                title="點擊進入後台"
              >
                {headerContent.logoUrl ? (
                  <img src={headerContent.logoUrl} alt="Brand Logo" className="w-full h-full object-cover" />
                ) : (
                  <Utensils className="w-10 h-10 text-zinc-900" />
                )}
              </div>
              
              <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-4 whitespace-pre-line">
                {headerContent.title}
              </h2>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed max-w-sm mx-auto whitespace-pre-line">
                {headerContent.description}
              </p>
            </div>

            {status === 'success' ? (
              <div className="rounded-[2rem] bg-zinc-50 p-10 text-center border border-zinc-100 animate-in fade-in zoom-in duration-300 mt-4">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-white shadow-sm mb-6">
                  <CheckCircle className="h-10 w-10 text-zinc-900" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-3 tracking-tight">送出成功！</h3>
                <p className="text-sm font-medium text-zinc-500 mb-8 max-w-sm mx-auto leading-relaxed">
                  親愛的 <strong>{formData.name}</strong>，您的資料已同步至雲端系統，請準備開始線上測驗。
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center px-8 py-4 text-sm font-bold rounded-full shadow-md text-white bg-zinc-900 hover:bg-zinc-800 transition-all active:scale-[0.98]"
                >
                  返回首頁
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ) : (
              <form className="space-y-10" onSubmit={handleSubmit}>
                
                {status === 'error' && (
                  <div className="rounded-2xl bg-red-50 p-5 border border-red-100">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <div className="ml-3">
                        <h3 className="text-sm font-bold text-red-800">發生錯誤</h3>
                        <p className="mt-1 text-sm font-medium text-red-600">{errorMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- 區塊 1: 基本資料 --- */}
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center mr-3 text-sm">1</span>
                    基本資料
                  </h3>
                  <div className="space-y-5">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-zinc-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleBasicInputChange}
                        className={inputClassName}
                        placeholder="真實姓名 (例如：王大明)"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-zinc-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleBasicInputChange}
                        className={inputClassName}
                        placeholder="聯絡電話 (0912-345-678)"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-zinc-400" />
                      </div>
                      <select
                        name="position"
                        required
                        value={formData.position}
                        onChange={handleBasicInputChange}
                        className={`${inputClassName} appearance-none`}
                      >
                        <option value="" disabled>請選擇欲應徵職缺...</option>
                        <option value="waiter">外場服務人員 (正職/兼職)</option>
                        <option value="kitchen">內場廚房人員 (正職/兼職)</option>
                        <option value="store_manager">店長 / 儲備幹部</option>
                      </select>
                    </div>

                    {/* 應徵分店選單 */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-zinc-400" />
                      </div>
                      <select
                        name="branch"
                        required
                        value={formData.branch}
                        onChange={handleBasicInputChange}
                        className={`${inputClassName} appearance-none`}
                      >
                        <option value="" disabled>請選擇應徵分店...</option>
                        {customBranches.length === 0 && <option value="none" disabled>目前無可用分店</option>}
                        {customBranches.map(branch => (
                          <option key={branch} value={branch}>{branch}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* --- 區塊 2: 專業問答題 --- */}
                {customQuestions.length > 0 && (
                  <div className="pt-2 border-t border-zinc-100">
                    <h3 className="text-lg font-bold text-zinc-900 mb-6 mt-8 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center mr-3 text-sm">2</span>
                      面試問答
                    </h3>
                    <div className="space-y-8">
                      {customQuestions.map((q, index) => (
                        <div key={q.id}>
                          <label className="block text-sm font-bold text-zinc-900 mb-3 leading-relaxed">
                            {q.text} {q.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {q.type === 'textarea' ? (
                            <textarea
                              required={q.required}
                              rows={4}
                              value={formData.answers[q.id] || ''}
                              onChange={(e: any) => handleAnswerChange(q.id, e.target.value)}
                              className="focus:ring-2 focus:ring-zinc-900 block w-full sm:text-sm border-transparent bg-zinc-100 rounded-3xl py-4 px-5 transition-all focus:bg-white resize-none"
                              placeholder="請在此輸入您的回答..."
                            />
                          ) : (
                            <input
                              type="text"
                              required={q.required}
                              value={formData.answers[q.id] || ''}
                              onChange={(e: any) => handleAnswerChange(q.id, e.target.value)}
                              className="focus:ring-2 focus:ring-zinc-900 block w-full sm:text-sm border-transparent bg-zinc-100 rounded-2xl py-3.5 px-5 transition-all focus:bg-white"
                              placeholder="請輸入簡短回答..."
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* --- 區塊 3: 個資同意書 --- */}
                <div className="bg-zinc-50 p-6 rounded-3xl mt-8">
                  <div className="flex items-start">
                    <div className="flex items-center h-6">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        required
                        checked={formData.consent}
                        onChange={handleBasicInputChange}
                        className="h-5 w-5 text-zinc-900 border-zinc-300 rounded focus:ring-zinc-900 cursor-pointer bg-white"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="consent" className="text-sm font-bold text-zinc-900 cursor-pointer block mb-1">
                        同意隱私權與個資聲明 <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                        我瞭解並同意美味餐飲集團為「人才招募」目的，蒐集、處理我的個人資料，未經同意不外流。
                      </p>
                    </div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* 完美復刻的專屬 Continue 膠囊按鈕 */}
                {/* ========================================================= */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'submitting' || !formData.consent}
                    className={`relative w-full h-16 rounded-full flex items-center px-2 transition-all duration-300 group ${
                      (status === 'submitting' || !formData.consent) 
                      ? 'bg-zinc-200 cursor-not-allowed opacity-70' 
                      : 'bg-[#E5E5EA] hover:bg-[#D1D1D6] active:scale-[0.98]'
                    }`}
                  >
                    {/* 左側圓形 Icon 區塊 */}
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-105">
                      {status === 'submitting' ? (
                        <Loader2 className="animate-spin h-6 w-6 text-zinc-900" />
                      ) : (
                        <CheckCircle className="h-6 w-6 text-zinc-900" />
                      )}
                    </div>
                    
                    {/* 中間文字 */}
                    <span className="absolute inset-0 flex items-center justify-center text-[15px] font-bold text-zinc-900 tracking-wide">
                      {status === 'submitting' ? '傳送中...' : 'Continue'}
                    </span>
                    
                    {/* 右側箭頭裝飾 */}
                    <div className="absolute right-6 flex items-center space-x-[-8px] text-zinc-400 transition-transform group-hover:translate-x-1">
                      <ChevronRight className="w-5 h-5 opacity-40" />
                      <ChevronRight className="w-5 h-5 opacity-70" />
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </button>
                </div>

              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
