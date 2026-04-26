import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  Save,
  Plus,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  year: string;
  image: string;
  color: string;
  gallery?: string[];
  copyText?: string;
}

interface SiteData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    avatar: string;
  };
  about: {
    content: string;
    skills: { name: string; description: string; color: string; level: number }[];
    timeline: { year: string; title: string; company: string; description: string; color: string }[];
    funFacts: { emoji: string; fact: string; detail: string; color: string }[];
  };
  footer: {
    email: string;
    location: string;
    copyright: string;
  };
}

// --- Initial Data ---
const initialData: SiteData = {
  hero: {
    title: "创意随性.",
    subtitle: "VIBE CODER // 北京 // EST 2026",
    description: "编写感觉和看起来一样好的代码。野兽派美学遇见整洁架构。在这里，卓越的技术与原始的创意能量完美融合。",
    badge: "查看我的作品",
    avatar: "/images/avatar.png" // 上传 avatar.png 到 /public/images 后即可显示
  },
  about: {
    content: "我是一名主攻AI方向的计算机应届毕业生，致力于探索人工智能与直觉编程的边界。我热爱 Vibe Coding，享受在心流中将复杂算法转化为优雅且富有灵性的智能应用。",
    skills: [
      { name: "VIBE CODE", description: "React, Next.js, TypeScript. 代码性能出众。", color: "bg-[#8FFF00]", level: 100 },
      { name: "UI CRAFT", description: "注重个性的野兽派界面。设计触感极佳。", color: "bg-[#8FFF00]", level: 100 },
      { name: "ANIMATIONS", description: "增强体验的平滑交互 and 动效。注入灵魂。", color: "bg-[#8FFF00]", level: 100 },
      { name: "ARCHITECTURE", description: "可扩展的代码架构。让开发者爱不释手。", color: "bg-[#8FFF00]", level: 100 }
    ],
    timeline: [
      { year: "2026", title: "破茧 · 极客毕业生", company: "AI 商业落地先锋", description: "实现从技术认知到商业价值的闭环。清晰把控主流大模型底层逻辑，能独立使用工作流敏捷完成产品 MVP 验证，致力于以数据驱动迭代，推动前沿 AI 技术在真实业务场景的高效落地。", color: "bg-[#00F0FF]" },
      { year: "2025", title: "淬炼 · 敏捷实习生", company: "AI 工作流架构师", description: "从熟悉走向深度掌握。在真实的用户运营与教育场景中，熟练利用 Coze 搭建智能体工作流，接入 Deepseek 与 NotebookLM 深度处理复杂业务数据，将 AI 沉淀为赋能业务的核心驱动力。", color: "bg-[#FFFF00]" },
      { year: "2024", title: "启蒙 · 象牙塔创客", company: "AIGC 探索实干家", description: "告别小白阶段，开启 AI 认知启蒙。在校园矩阵管理与早期电商操盘中，初步尝试 LLM 辅助主题策划，并结合 AIGC 工具批量生成高转化视觉素材，迈出拥抱人工智能的第一步。", color: "bg-[#FF0055]" }
    ],
    funFacts: [
      { emoji: "⚡", fact: "咖啡因驱动", detail: "每天至少消耗 3 杯浓缩咖啡来维持代码的'动态平衡'。", color: "bg-[#00F0FF]" },
      { emoji: "🎨", fact: "像素完美主义者", detail: "哪怕是 1px 的偏移，也会让我感到彻夜难眠。", color: "bg-[#FFFF00]" },
      { emoji: "🏮", fact: "动漫爱好者", detail: "深度番剧爱好者，在热血与治愈二次元世界寻找现实编程的终极答案。", color: "bg-[#FF0055]" },
      { emoji: "🔥", fact: "高能量 E 人", detail: "社交场上的破冰利器，热衷于在各种技术交流中碰撞灵感，能量槽始终满格！", color: "bg-[#8FFF00]" }
    ]
  },
  footer: {
    email: "hello@personal.me",
    location: "上海 / 远程",
    copyright: "© 2026 个人主页. 版权所有皆是浮云，尽情复制。"
  }
};

const initialProjects: Project[] = [
  {
    id: "1",
    title: "赛博朋克电商",
    description: "现代时尚零售的野兽派尝试。由于极具创新力的设计，转化率提升了 40%。",
    longDescription: "这是一个完整的端到端电商解决方案，采用了大胆的视觉风格。主要功能包括实时库存同步、无缝结算和沉浸式产品展示。通过使用最新的渲染技术，我们在保证高性能的同时实现了极为复杂的视觉效果。",
    tags: ["WEB DESIGN", "2023"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1000&auto=format&fit=crop",
    color: "bg-white",
    gallery: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000",
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1000"
    ],
    copyText: ""
  },
  {
    id: "2",
    title: "霓虹之夜视觉标识",
    description: "地下音乐社群的视觉形象设计。粗线条，高对比度，追求极致影响力。",
    longDescription: "为地下电子音乐社群设计的一整套视觉系统。包括品牌 Logo、海报生成系统以及一套响应式的网站设计。设计语言灵感来源于 80 年代的赛博朋克 and 90 年代的平面设计革命。",
    tags: ["BRANDING", "2024"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    color: "bg-[#00F0FF]",
    gallery: [
      "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000",
      "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000"
    ],
    copyText: ""
  },
  {
    id: "3",
    title: "文案提取工作流",
    description: "通过COZE智能体搭建了一个仅通过抖音的分享链接就能提取该视频文案并加工的工具。来自信息与效率之间的碰撞。",
    longDescription: "这是基于 Coze 平台搭建的「视频文案一键处理助手」智能体。专为短视频创作者打造的一站式文案处理工具。智能体通过严格的规则化提示词设定，明确首次打招呼话术、分级优先级的核心执行规则，精准区分抖音链接、非抖音链接、润色 / 思维导图指令的不同响应逻辑，严控仅输出纯净文本，杜绝冗余字段与无关内容。其内置 3 个专属工作流：一是 video 提取文案工作流，通过链接提取、抖音链接解析、字幕生成三大节点，精准提取纯文案内容；二是 xigao 洗稿润色工作流，通过豆包大模型节点完成文案优化改写；三是 key 关键词 & 思维导图工作流，双大模型节点分别完成核心关键词提取、结构化思维导图生成。用户输入抖音视频链接即可自动提取文案，发送对应指令即可触发后续操作，全流程自动化，大幅提升短视频二次创作效率。",
    tags: ["AI workflow", "2025"],
    year: "2025",
    image: "/images/001.png",
    color: "bg-[#FF0055]",
    gallery: [
      '/images/002.png',
      '/images/003.png',
      '/images/004.png',
      '/images/005.png'
    ],
    copyText: "该Coze智能体的bot_id：7630372911542927366"
  },
  {
    id: "4",
    title: "电商平台运营",
    description: "独立电商操盘的自动化探索。搭建AI专属工作流，单人运营效能获得极大释放",
    longDescription: "在近两年的时间里，我从0到1独立操盘了一家拼多多汽车配件店铺，全权负责了从选品策划、营销推广到订单履约及售后客服的全流程运营。这个项目最大的亮点，是我将AI技术深度融入了真实的商业实战中。我借助大模型进行竞品与语义分析来精准优化标题，并利用AIGC工具批量生成、测试高转化主图，有效提升了店铺的自然搜索流量。同时，为了在运营期间兼顾日常学业，我主动搭建了AI自动化工作流，用来高效处理库存与客情等突发问题，这大幅提升了我的个人效能。最终，这家店铺累计处理了670余笔订单，总营收突破了3.5万元，其中在2025年3月，我通过精准营销创下了6529元的单月营收峰值。这段经历不仅让我完整跑通了0到1的商业闭环，更让我切实锻炼了将前沿AI技术转化为实际生产力的落地实操能力。",
    tags: ["OPERATION", "2024"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
    color: "bg-white",
    gallery: [
      "/images/2024.jpg",
      "/images/2025.jpg",
      "/images/2026.jpg"
    ],
    copyText: "拼多多店铺名：凯凯的汽车配件店"
  },
  {
    id: "5",
    title: "AI 智能体工作流",
    description: "基于 Coze 平台搭建的智能体工作流，实现自动化文案处理",
    longDescription: "这是一个基于 Coze 平台的智能体工作流项目，主要用于处理短视频文案。通过搭建多个工作流节点，实现了从链接提取、文案生成到思维导图创建的全流程自动化。",
    tags: ["AI", "2025"],
    year: "2025",
    image: "/images/010.png",
    color: "bg-white",
    gallery: [
      "/images/010.png"
    ],
    copyText: "智能体工作流项目"
  },
  {
    id: "6",
    title: "创意设计作品",
    description: "展示创意设计能力的作品集项目",
    longDescription: "这是一个展示个人创意设计能力的项目，包含了多个设计作品和创意概念。通过不同的设计风格和表现手法，展现了创意设计的多样性。",
    tags: ["DESIGN", "2025"],
    year: "2025",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000",
    color: "bg-[#EFFF00]",
    gallery: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000"
    ],
    copyText: "创意设计作品集"
  }
];

// --- Sub-components ---

const SkillBar: React.FC<{ name: string; level: number; color: string; description: string }> = ({ name, level, description }) => (
  <div className="mb-8 group">
    <div className="flex justify-between items-end mb-2">
      <h4 className="text-xl font-black uppercase tracking-tighter italic">{name}</h4>
      <div className="flex items-baseline gap-0.5">
        <span className="text-3xl font-black italic text-[#8FFF00] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] tracking-tighter leading-none">{level}</span>
        <span className="text-xl font-black italic text-[#8FFF00] drop-shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] tracking-tighter leading-none">%</span>
      </div>
    </div>
    <div className="h-8 brutalist-border bg-white overflow-hidden relative brutalist-shadow-sm transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="h-full bg-[#8FFF00] border-r-4 border-black"
      />
    </div>
    <p className="mt-2 text-sm font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">{description}</p>
  </div>
);

const TimelineItem: React.FC<{ item: any; index: number }> = ({ item, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    className={`relative flex items-center justify-between mb-16 w-full ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
  >
    <div className="hidden md:block w-5/12"></div>
    
    <div className="z-20 flex items-center justify-center w-12 h-12 bg-black brutalist-border text-white brutalist-shadow-sm absolute left-1/2 -ms-6">
      <span className="font-black text-xs">{item.year}</span>
    </div>

    <div className={`w-full md:w-5/12 brutalist-card ${item.color} group hover:-translate-y-2 transition-transform`}>
      <span className="bg-black text-white px-2 py-1 font-mono text-xs font-bold mb-2 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {item.company}
      </span>
      <h4 className="text-2xl font-display font-black uppercase tracking-tighter mb-2">{item.title}</h4>
      <p className="font-bold leading-relaxed text-sm">{item.description}</p>
    </div>
  </motion.div>
);

const FactCard: React.FC<{ item: any }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      className={`brutalist-card ${item.color} cursor-pointer group flex flex-col items-center text-center justify-center min-h-[200px] transition-all relative overflow-hidden`}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div 
            key="fact"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex flex-col items-center"
          >
            <span className="text-5xl mb-4 group-hover:scale-125 transition-transform">{item.emoji}</span>
            <span className="text-xl font-display font-black uppercase tracking-tighter">{item.fact}</span>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="px-4"
          >
            <p className="font-bold leading-tight uppercase font-mono text-sm">{item.detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-2 right-2 opacity-50 group-hover:opacity-100 underline font-black text-[10px] uppercase">
        {isOpen ? "关闭" : "查看详情"}
      </div>
    </div>
  );
};

const EditableText = ({ 
  text, 
  onSave, 
  isEditing, 
  multiline = false,
  className = "" 
}: { 
  text: string; 
  onSave: (val: string) => void; 
  isEditing: boolean;
  multiline?: boolean;
  className?: string;
}) => {
  if (!isEditing) return <span className={className}>{text}</span>;

  return multiline ? (
    <textarea 
      className={`w-full bg-white border-2 border-black p-2 outline-none font-mono text-sm focus:bg-yellow-50 ${className}`}
      defaultValue={text}
      onBlur={(e) => onSave(e.target.value)}
    />
  ) : (
    <input 
      className={`w-full bg-white border-2 border-black p-2 outline-none font-mono text-sm focus:bg-yellow-50 ${className}`}
      defaultValue={text}
      onBlur={(e) => onSave(e.target.value)}
    />
  );
};

const ImageGalleryModal = ({ isOpen, onClose, images, currentIndex, onIndexChange }: {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (idx: number) => void;
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState<{ distance: number; centerX: number; centerY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newScale = Math.min(Math.max(scaleRef.current + delta, 0.5), 4);
      scaleRef.current = newScale;
      setScale(newScale);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  if (!isOpen) return null;

  const next = () => {
    onIndexChange((currentIndex + 1) % images.length);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    scaleRef.current = 1;
    positionRef.current = { x: 0, y: 0 };
  };
  const prev = () => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    scaleRef.current = 1;
    positionRef.current = { x: 0, y: 0 };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.clientX - positionRef.current.x, y: e.clientY - positionRef.current.y };
      setIsDragging(true);
      setDragStart(dragStartRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current && scaleRef.current > 1) {
      const newPos = {
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y
      };
      positionRef.current = newPos;
      setPosition(newPos);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const getDistance = (touch1: Touch, touch2: Touch) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getCenter = (touch1: Touch, touch2: Touch) => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2
    };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      const center = getCenter(e.touches[0], e.touches[1]);
      setTouchStart({ distance, centerX: center.x, centerY: center.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.touches.length === 2 && touchStart) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      const center = getCenter(e.touches[0], e.touches[1]);
      const scaleChange = distance / touchStart.distance;
      const newScale = Math.min(Math.max(scale * scaleChange, 0.5), 4);
      setScale(newScale);
      
      const dx = center.x - touchStart.centerX;
      const dy = center.y - touchStart.centerY;
      setPosition({
        x: position.x + dx,
        y: position.y + dy
      });
      
      setTouchStart({ distance, centerX: center.x, centerY: center.y });
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    scaleRef.current = 1;
    positionRef.current = { x: 0, y: 0 };
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-12"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleBackdropClick}
      style={{ touchAction: 'none' }}
    >
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-8 right-8 text-white hover:text-red-500 transition-colors z-[110]"
      >
        <X size={48} strokeWidth={3} />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white hover:text-[#8FFF00] transition-colors z-[110]"
      >
        <ChevronLeft size={64} strokeWidth={3} />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white hover:text-[#8FFF00] transition-colors z-[110]"
      >
        <ChevronRight size={64} strokeWidth={3} />
      </button>

      <div className="absolute top-8 left-8 z-[110] flex items-center gap-4">
        <div className="bg-white text-black px-4 py-2 brutalist-border font-black text-sm">
          滚轮缩放 | 双指缩放 | 拖拽移动
        </div>
        {scale !== 1 && (
          <button 
            onClick={(e) => { e.stopPropagation(); resetZoom(); }}
            className="bg-[#8FFF00] text-black px-4 py-2 brutalist-border font-black text-sm hover:bg-yellow-400 transition-colors"
          >
            重置
          </button>
        )}
      </div>

      <div className="relative w-full h-full flex items-center justify-center overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          <img 
            src={images[currentIndex]}
            className="max-w-full max-h-[80vh] object-contain"
            alt={`Gallery ${currentIndex}`}
            referrerPolicy="no-referrer"
            draggable={false}
          />
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black font-black px-4 py-2 brutalist-border">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

const CopyTextModal = ({ isOpen, onClose, text }: {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white border-4 border-black p-8 max-w-md w-full relative brutalist-shadow-lg"
      >
        <button 
          onClick={onClose}
          className="absolute -top-6 -right-6 bg-black text-white p-2 brutalist-border hover:bg-red-500 transition-colors"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 bg-yellow-400 inline-block px-2">信息面板 / INFO</h3>
        
        <div className="bg-gray-100 p-4 border-2 border-dashed border-black mb-6 font-mono text-sm break-all leading-relaxed">
          {text || "暂无备注信息。"}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleCopy}
            className={`flex-1 brutalist-border p-3 font-black uppercase transition-all flex items-center justify-center gap-2 ${copied ? 'bg-green-400' : 'bg-black text-white hover:bg-[#8FFF00] hover:text-black'}`}
          >
            {copied ? '已复制！' : '复制内容'}
          </button>
          <button 
            onClick={onClose}
            className="flex-1 brutalist-border p-3 font-black uppercase bg-white text-black hover:bg-gray-200 transition-all"
          >
            关闭
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState<SiteData>(initialData);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeTab, setActiveTab] = useState('home');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  
  // Gallery State
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeGallery, setActiveGallery] = useState<string[]>([]);
  
  // Copy Text State
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [activeCopyText, setActiveCopyText] = useState("");

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedDataRaw = localStorage.getItem('site_data');
      const savedProjectsRaw = localStorage.getItem('projects_data');
      
      if (savedDataRaw) {
        let parsed = JSON.parse(savedDataRaw);
        
        // Force update for the Anime section if it's the old one
        // and ensure the data structure matches initialData for deep merging
        if (parsed.about?.funFacts) {
          parsed.about.funFacts = parsed.about.funFacts.map((f: any) => {
            if (f.fact === "合成器爱好者") return initialData.about.funFacts[2];
            if (f.fact === "数字游民" || f.detail.includes("天生的社交达人")) return initialData.about.funFacts[3];
            // Migration for the orange color
            if (f.color === "bg-[#FF3D00]") f.color = "bg-[#FF0055]";
            return f;
          });
        }

        if (parsed.about?.timeline) {
          parsed.about.timeline = parsed.about.timeline.map((t: any) => {
            if (t.color === "bg-[#FF3D00]") t.color = "bg-[#FF0055]";
            return t;
          });
        }

        // Force update avatar if it was the old placeholder or a previous artifact link
        const oldPlaceholder = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
        if (parsed.hero && (parsed.hero.avatar === oldPlaceholder || !parsed.hero.avatar || parsed.hero.avatar.includes("artifact.ais-static.com"))) {
          parsed.hero.avatar = initialData.hero.avatar;
        }

        // Deep merge with initialData to ensure new fields (timeline, funFacts) exist
        setData({
          ...initialData,
          hero: { ...initialData.hero, ...parsed.hero },
          about: { 
            ...initialData.about, 
            ...parsed.about,
            skills: initialData.about.skills, // Force to 100%
            timeline: initialData.about.timeline, // Force update for the new content
            funFacts: parsed.about?.funFacts || initialData.about.funFacts
          },
          footer: { ...initialData.footer, ...parsed.footer }
        });
      }
      
      if (savedProjectsRaw) {
        let parsedProjects = JSON.parse(savedProjectsRaw);
        let dataChanged = false;

        const migratedProjects = parsedProjects.map((p: any) => {
          const initial = initialProjects.find(ip => ip.id === p.id);
          if (!initial) return p;

          let updated = { ...p };
          let changed = false;

          // General migration for DEVELOPMENT -> OPERATION tags
          if (updated.tags.includes("DEVELOPMENT")) {
            updated.tags = updated.tags.map((t: string) => t === "DEVELOPMENT" ? "OPERATION" : t);
            changed = true;
          }

          // Specific migrations per ID to ensure new content is applied
          if (p.id === "3") {
            const needsUpdate = !updated.copyText || updated.copyText === "" || !updated.gallery || updated.gallery.length === 0;
            if (needsUpdate) {
              updated.gallery = initial.gallery;
              updated.copyText = initial.copyText;
              changed = true;
            }
          }

          if (p.id === "4") {
            const hasNewGallery = updated.gallery?.some((img: string) => img.includes("2024.jpg"));
            if (!hasNewGallery) {
              updated.gallery = initial.gallery;
              updated.copyText = initial.copyText;
              updated.description = initial.description;
              updated.longDescription = initial.longDescription;
              changed = true;
            }
          }

          // Catch-all for missing galleries or copyText
          if (!updated.gallery || updated.gallery.length === 0) {
            updated.gallery = initial.gallery;
            changed = true;
          }
          if (updated.copyText === undefined) {
            updated.copyText = initial.copyText || "";
            changed = true;
          }

          if (changed) dataChanged = true;
          return updated;
        });

        setProjects(migratedProjects);
        if (dataChanged) {
          localStorage.setItem('projects_data', JSON.stringify(migratedProjects));
        }
      }
    } catch (e) {
      console.error("Failed to load data from storage", e);
    }
  }, []);

  const saveToStorage = (newData: SiteData, newProjects: Project[]) => {
    localStorage.setItem('site_data', JSON.stringify(newData));
    localStorage.setItem('projects_data', JSON.stringify(newProjects));
  };

  const updateField = (path: string, value: string) => {
    const keys = path.split('.');
    const newData = { ...data };
    let current: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setData(newData);
    saveToStorage(newData, projects);
  };

  const updateProjectField = (id: string, field: keyof Project, value: any) => {
    const newProjects = projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    setProjects(newProjects);
    saveToStorage(data, newProjects);
  };

  const navItems = [
    { id: 'home', label: '首页' },
    { id: 'about', label: '关于我' },
    { id: 'portfolio', label: '作品集' },
    { id: 'contact', label: '联系我' }
  ];

  return (
    <div className="min-h-screen bg-white text-black">

      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-40 bg-white border-b-4 border-black">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="bg-[#FF3D00] brutalist-border brutalist-shadow-sm px-4 py-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer">
            <span className="text-2xl font-display font-black text-white italic tracking-tighter">创意作品.VC</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-lg font-black uppercase tracking-tighter transition-all hover:text-[#FF3D00] ${activeTab === item.id ? 'underline decoration-4 underline-offset-4' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="md:hidden text-black">
            <button className="brutalist-border p-2 bg-yellow-400 font-bold">
               菜单
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto border-x-4 border-black min-h-[calc(100vh-80px)]">
        
        {/* --- Home Section --- */}
        {activeTab === 'home' && (
          <div className="flex flex-col md:flex-row min-h-[80vh]">
            <div className="flex-1 bg-[#FFFF00] p-12 flex flex-col justify-center border-b-4 md:border-b-0 md:border-r-4 border-black relative overflow-hidden">
              <div className="relative z-10">
                <div className="bg-black text-white px-6 py-2 inline-block mb-6 brutalist-shadow-sm font-sans font-black italic uppercase tracking-tighter">
                  <EditableText 
                    text={data.hero.subtitle} 
                    onSave={(v) => updateField('hero.subtitle', v)} 
                    isEditing={false} 
                  />
                </div>
                
                <h1 className="text-7xl md:text-9xl font-display font-black leading-none mb-8 tracking-tighter">
                  <EditableText 
                    text={data.hero.title} 
                    onSave={(v) => updateField('hero.title', v)} 
                    isEditing={false} 
                  />
                </h1>
                
                <div className="text-xl md:text-2xl font-medium max-w-xl leading-relaxed mb-10">
                  <EditableText 
                    text={data.hero.description} 
                    onSave={(v) => updateField('hero.description', v)} 
                    isEditing={false} 
                    multiline
                  />
                </div>
                
                <button 
                  onClick={() => setActiveTab('portfolio')}
                  className="brutalist-button text-xl flex items-center gap-4"
                >
                  <EditableText 
                    text={data.hero.badge} 
                    onSave={(v) => updateField('hero.badge', v)} 
                    isEditing={false} 
                  />
                  <Github />
                </button>
              </div>
            </div>
            
            <div className="flex-1 bg-[#00F0FF] p-6 flex items-center justify-center relative min-h-[500px]">
              <div className="w-full absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <div className="relative w-full h-full max-w-2xl brutalist-border overflow-hidden bg-gray-200 brutalist-shadow-lg scale-90 md:scale-100 group">
                {data.hero.avatar ? (
                  <img 
                    referrerPolicy="no-referrer"
                    src={data.hero.avatar} 
                    alt="Avatar" 
                    className="w-full h-full object-cover grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-500 cursor-crosshair"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-400">NO AVATAR</div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* --- About Section --- */}
        {activeTab === 'about' && (
          <div className="bg-white">
            {/* Skills & Main Text */}
            <div className="flex flex-col lg:flex-row border-b-4 border-black">
              <div className="lg:w-1/2 p-12 md:p-24 bg-black text-white flex flex-col justify-center">
                <h2 className="text-5xl md:text-8xl font-display font-black mb-12 tracking-tight uppercase italic leading-[1.1]">
                  Stay<br />Bold.<br />Stay Reckless.
                </h2>
                <div className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                  <EditableText 
                    text={data.about.content} 
                    onSave={(v) => updateField('about.content', v)} 
                    isEditing={false} 
                    multiline
                    className="bg-transparent text-white border-white focus:bg-gray-800"
                  />
                </div>
                <div className="flex gap-4">
                </div>
              </div>

              <div className="lg:w-1/2 p-12 md:p-24 bg-white">
                <h3 className="text-4xl font-display font-black mb-12 uppercase tracking-tighter italic">技术军火库 / SKILLS</h3>
                {data?.about?.skills?.map?.((skill: any, idx: number) => (
                  <SkillBar key={idx} {...skill} />
                ))}
              </div>
            </div>

            {/* Timeline Section */}
            <div className="bg-[#8FFF00] p-12 md:p-24 border-b-4 border-black overflow-hidden">
              <div className="text-center mb-32">
                <h2 className="text-6xl md:text-9xl font-display font-black tracking-tight uppercase italic leading-none relative inline-block">
                  大师之路
                  <div className="absolute -top-10 -right-16 bg-white text-black brutalist-border px-6 py-2 text-xl font-mono brutalist-shadow-sm rotate-12 whitespace-nowrap">
                    JOURNEY
                  </div>
                </h2>
              </div>
              
              <div className="relative max-w-5xl mx-auto">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-black hidden md:block"></div>
                {data?.about?.timeline?.map?.((item: any, idx: number) => (
                  <TimelineItem key={idx} item={item} index={idx} />
                ))}
              </div>
            </div>

            {/* Fun Facts Section */}
            <div className="p-12 md:p-24 bg-white">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
                  关于我<br />的一些小事.
                </h2>
                <div className="font-mono text-sm max-w-xs text-right font-bold uppercase bg-black text-white p-4 brutalist-shadow-sm">
                  Click the capsules to reveal the high-vibe secrets.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {data?.about?.funFacts?.map?.((fact: any, idx: number) => (
                  <FactCard key={idx} item={fact} />
                ))}
              </div>
            </div>
            
            <div className="p-12 border-t-4 border-black bg-yellow-400 text-center">
              <span className="text-2xl font-black italic uppercase tracking-tighter">想了解更多？去作品集看看吧 →</span>
            </div>
          </div>
        )}

        {/* --- Portfolio Section --- */}
        {activeTab === 'portfolio' && (
          <div className="bg-white">
            <div className="p-12 border-b-4 border-black bg-white flex justify-between items-end">
               <h2 className="text-6xl md:text-8xl font-display font-black italic tracking-tighter uppercase leading-none">Selected 作品.</h2>
               <div className="hidden md:block font-mono text-sm max-w-xs text-right font-bold uppercase">
                  curated selection of damage caused to the internet in the last few years.
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y-4 md:divide-y-0 md:divide-x-4 divide-black">
              {projects?.map?.((project) => (
                <div key={project.id} className={`flex flex-col group border-b-4 border-black h-fit transition-all hover:bg-gray-50`}>
                  <div className={`p-8 ${project.color} transition-all`}>
                    <div className="brutalist-border overflow-hidden bg-black aspect-video brutalist-shadow-sm mb-8 relative group cursor-pointer" onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}>
                      <img 
                        referrerPolicy="no-referrer"
                        src={project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000'} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-80"
                      />

                    </div>
                    
                    <div className="flex gap-3 mb-6">
                      {project.tags?.map?.(tag => (
                        <button key={tag} className="brutalist-border bg-white text-black px-2 py-1 text-xs font-black uppercase tracking-tighter">
                          {tag}
                        </button>
                      ))}
                    </div>
                    
                    <h3 className="text-4xl font-display font-black mb-4 uppercase tracking-tighter transition-colors">
                      <EditableText 
                        text={project.title} 
                        onSave={(v) => updateProjectField(project.id, 'title', v)} 
                        isEditing={false} 
                      />
                    </h3>
                    
                    <div className="text-lg font-bold mb-8 leading-relaxed">
                      <EditableText 
                        text={project.description} 
                        onSave={(v) => updateProjectField(project.id, 'description', v)} 
                        isEditing={false} 
                        multiline
                      />
                    </div>
                    
                    <button 
                      onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                      className="flex items-center gap-2 font-black text-xl uppercase tracking-tighter hover:underline decoration-4"
                    >
                      {expandedProject === project.id ? '收起详情 ↑' : '点击查看详情 →'}
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {expandedProject === project.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-black text-white p-8"
                      >
                        <h4 className="text-2xl font-black mb-4 uppercase text-[#00F0FF] italic tracking-tight">项目深度解析</h4>
                        <div className="text-lg font-medium leading-loose text-gray-300">
                          <EditableText 
                            text={project.longDescription} 
                            onSave={(v) => updateProjectField(project.id, 'longDescription', v)} 
                            isEditing={false} 
                            multiline
                            className="bg-transparent text-white border-gray-700 focus:bg-gray-900"
                          />
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-800 flex gap-4">
                           <button 
                             onClick={() => {
                               setActiveCopyText(project.copyText || "");
                               setCopyModalOpen(true);
                             }}
                             className="brutalist-border bg-white text-black px-4 py-2 font-bold uppercase hover:bg-yellow-400 transition-colors"
                           >
                            访问链接
                           </button>
                           <button 
                             onClick={() => {
                               setActiveGallery(project.gallery || [project.image]);
                               setGalleryIndex(0);
                               setGalleryOpen(true);
                             }}
                             className="brutalist-border bg-gray-800 text-white px-4 py-2 font-bold uppercase hover:bg-gray-700 transition-colors"
                           >
                            展示成果
                           </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              

            </div>
          </div>
        )}

        {/* --- 联系我 / CONTACT 部分 --- */}
        {activeTab === 'contact' && (
          <section id="contact" className="min-h-screen grid grid-cols-1 md:grid-cols-2 border-t-8 border-black">
            {/* 左侧黑色区域 */}
            <div className="bg-black text-white p-8 md:p-24 flex flex-col justify-center">
              <motion.h2 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-6xl md:text-9xl font-display font-black uppercase tracking-tighter leading-none mb-8"
              >
                LET'S TALK.
              </motion.h2>
              <p className="text-xl md:text-3xl font-medium italic mt-8 text-gray-400">
                GOT A PROJECT THAT'S TOO BOLD FOR THE AVERAGE AGENCY?<br />
                LET'S BUILD SOMETHING LOUD.
              </p>
              
              <div className="mt-16 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-[#EFFF00] text-xl font-black font-sans">EMAIL: </span>
                  <a 
                    href={`mailto:${data.footer.email}`}
                    className="text-white text-xl font-bold font-mono"
                  >
                    <EditableText 
                      text="zyding1800@163.com" 
                      onSave={(v) => updateField('footer.email', v)} 
                      isEditing={false} 
                    />
                  </a>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-[#00F0FF] text-xl font-black font-sans">LOCATION: </span>
                  <span className="text-white text-xl font-bold font-mono">
                    <EditableText 
                      text="Beijing" 
                      onSave={(v) => updateField('footer.location', v)} 
                      isEditing={false} 
                    />
                  </span>
                </div>
                
                <div className="mt-12 flex gap-6 flex-wrap">
                  <a href="#" className="text-[#EFFF00] font-black text-lg italic hover:underline hover:underline-offset-4 hover:decoration-[#EFFF00] transition-all">TWITTER</a>
                  <a href="#" className="text-[#00F0FF] font-black text-lg italic hover:underline hover:underline-offset-4 hover:decoration-[#00F0FF] transition-all">DRIBBBLE</a>
                  <a href="#" className="text-[#FF4D00] font-black text-lg italic hover:underline hover:underline-offset-4 hover:decoration-[#FF4D00] transition-all">INSTAGRAM</a>
                  <a href="#" className="text-green-400 font-black text-lg italic hover:underline hover:underline-offset-4 hover:decoration-green-400 transition-all">GITHUB</a>
                </div>
              </div>
            </div>

            {/* 右侧表单区域 */}
            <div className="bg-white p-8 md:p-24 flex flex-col justify-center">
              <form className="space-y-12">
                <div>
                  <label className="block text-2xl font-black mb-4 uppercase tracking-tighter italic">
                    你的尊姓大名 / YOUR NAME
                  </label>
                  <input 
                    className="w-full brutalist-border brutalist-shadow-sm p-4 md:p-6 bg-white border-black outline-none text-xl font-bold hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                    placeholder="JACK RYAN"
                  />
                </div>
                
                <div>
                  <label className="block text-2xl font-black mb-4 uppercase tracking-tighter italic">
                    电子邮箱 / EMAIL ADDRESS
                  </label>
                  <input 
                    type="email"
                    className="w-full brutalist-border brutalist-shadow-sm p-4 md:p-6 bg-white border-black outline-none text-xl font-bold hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                    placeholder="HELLO@WORLD.COM"
                  />
                </div>
                
                <div>
                  <label className="block text-2xl font-black mb-4 uppercase tracking-tighter italic">
                    核心使命 / THE MISSION
                  </label>
                  <textarea 
                    className="w-full brutalist-border brutalist-shadow-sm p-4 md:p-6 h-48 bg-white border-black outline-none text-xl font-bold resize-none hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                    placeholder="DESCRIBE THE CHAOS YOU WANT TO CREATE..."
                  />
                </div>
                
                <button 
                  type="button"
                  className="w-full bg-[#FF4D00] text-white brutalist-border brutalist-shadow p-10 font-black uppercase text-3xl italic hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:translate-x-[4px] active:translate-y-[4px]"
                >
                  发送发射信号 / SEND SIGNAL
                </button>
              </form>
            </div>
          </section>
        )}
      </main>

      {/* --- Footer --- */}
      <footer className="border-t-4 border-black bg-white p-8 md:p-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-black tracking-tighter">
              <EditableText 
                text={data.footer.copyright} 
                onSave={(v) => updateField('footer.copyright', v)} 
                isEditing={false} 
              />
            </h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              BUILT WITH VIBES, CODE, AND BRUTALIST AESTHETICS.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('contact')}
              className="brutalist-button p-3 bg-[#EFFF00] text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:translate-x-[4px] active:translate-y-[4px]"
            >
              <Twitter size={24} />
            </button>
            <button 
              onClick={() => setActiveTab('contact')}
              className="brutalist-button p-3 bg-[#00F0FF] text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:translate-x-[4px] active:translate-y-[4px]"
            >
              <Github size={24} />
            </button>
            <button 
              onClick={() => setActiveTab('contact')}
              className="brutalist-button p-3 bg-[#FF4D00] text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:translate-x-[4px] active:translate-y-[4px]"
            >
              <Mail size={24} />
            </button>
          </div>
        </div>
      </footer>

      {/* --- Image Gallery Modal --- */}
      <ImageGalleryModal 
        isOpen={galleryOpen} 
        onClose={() => setGalleryOpen(false)} 
        images={activeGallery}
        currentIndex={galleryIndex}
        onIndexChange={setGalleryIndex}
      />

      {/* --- Copy Text Modal --- */}
      <CopyTextModal 
        isOpen={copyModalOpen} 
        onClose={() => setCopyModalOpen(false)} 
        text={activeCopyText}
      />
    </div>
  );
}