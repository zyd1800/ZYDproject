import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'motion/react';
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
  ChevronRight,
  Sparkles,
  Zap,
  Globe,
  Smartphone,
  Palette,
  Code2,
  ArrowRight,
  Star
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
    id: "7",
    title: "植愈领养",
    description: "微信小程序植物领养养成平台。签到浇水做任务赚积分，兑换植物写生长日记，治愈系云端养成体验。",
    longDescription: "都市青年生活节奏快、情感压力大，亟需一种低门槛的绿色情感寄托方式。市面现有养成类产品激励体系薄弱、社交互动缺失，用户粘性不足。\n\n从0到1独立设计并交付一款基于微信生态的绿植领养养成平台，通过系统化日常任务与积分机制，构建完整的「云端养植物」产品闭环。\n\n独立完成需求分析、信息架构与交互设计，基于微信云开发构建后端基础设施，设计19个页面与33个云函数。核心功能模块包括：基于植物生长阶段的动态任务生成引擎、养护记录驱动的积分计算体系、图片云存储与临时URL转换机制。UI采用绿色治愈系卡片式布局，以植物主题图标与暖色点缀营造情感化体验。\n\n项目通过微信审核正式上线，实现从注册、领养、养护日记、积分兑换到社交分享的完整业务闭环，全流程用户转化链路跑通，展示了微信生态小程序全栈产品交付能力与独立项目管理能力。",
    tags: ["MINI PROGRAM", "2026"],
    year: "2026",
    image: "/images/034.webp",
    color: "bg-white",
    gallery: [
      "/images/029.webp",
      "/images/030.webp",
      "/images/031.webp",
      "/images/032.webp",
      "/images/033.webp"
    ],
    copyText: "小程序名：植愈养成"
  },
  {
    id: "1",
    title: "十二星座网页",
    description: "基于 WebGL 着色器的沉浸式星座交互体验，融合 AI 配音的古希腊语音频播放器。",
    longDescription: "星座文化在年轻用户中拥有庞大受众，但现有星座科普产品多停留在图文罗列阶段，缺乏沉浸式视觉交互和具有文化厚度的内容体系，难以满足用户对「质感体验」的需求。\n\n以古希腊美学为设计基底，构建一个融合WebGL 3D视觉、AI语音合成与结构化知识体系的沉浸式星座文化科普网页，打造差异化的文化消费体验。\n\n借助Gemini与Playwright完成竞品设计逆向分析与字体风格匹配的调研闭环；运用Claude code交付GLSL自定义Fragment Shader聚光灯衰减算法与8路Canvas条件渲染的性能优化方案；集成gTTS AI语音引擎为12星座希腊语名称生成高保真音频；设计12星座神话故事、四大元素体系、Zodiac FAQ手风琴组件等完整内容架构，实现AI驱动的全链路内容生产与交付。\n\n上线了具备光影鼠标互动、卡牌发掘动效与AI音频播放的沉浸式科普网页，通过GitHub开源与Netlify全球部署上线，形成了可复用的AI驱动文化交流产品的设计方法论。",
    tags: ["WEB DESIGN", "2026"],
    year: "2026",
    image: "/images/043.webp",
    color: "bg-[#0755bb]",
    gallery: [
      "/images/035.webp",
      "/images/036.webp",
      "/images/037.webp",
      "/images/038.webp",
      "/images/039.webp",
      "/images/040.webp",
      "/images/041.webp",
      "/images/042.webp"
    ],
    copyText: "https://the-twelve.netlify.app"
  },
  {
    id: "2",
    title: "猫猫网页",
    description: "基于滚动驱动的个人介绍网页。一段关于小猫Martin的沉浸式讲故事体验，滚动即播放。",
    longDescription: "个人品牌展示面临同质化困境——传统静态简历页打开3秒即被关闭，用户在信息冗余中缺乏记忆锚点。如何在有限注意力窗口内建立深刻的情感连接，是个人品牌设计的核心命题。\n\n以「小猫Martin」为主角，打造一款滚动驱动的沉浸式叙事网页，通过动态视频与文字交错的互动体验，让用户在「看故事」的过程中自然完成对个人品牌的价值认知。\n\n采用纯HTML+CSS+JS构建滚动叙事（Scrollytelling）架构，通过Seedance 2.0生成6段小猫动态视频素材；借助Claude code实现视频进度与滚动深度的实时同步引擎，以playbackRate逐帧驱动替代传统seek方案，彻底消除卡顿问题；引入缓动平滑算法适配间断性滚动习惯；UI融入Apple风格动效语言——弹簧入场曲线、子元素逐级延迟亮相、高亮词发光脉冲；中英文双语文本以左右交错浮动布局覆盖于视频之上。\n\n通过Netlify全球CDN部署上线，实现了「滚到哪看到哪」的无缝叙事体验，用户平均停留时长与页面回访率显著优于传统静态介绍页，成功打造了兼具情感温度与艺术审美的个人品牌入口。",
    tags: ["WEB DESIGN", "2026"],
    year: "2026",
    image: "/images/023.webp",
    color: "bg-[#00F0FF]",
    gallery: [
      "/images/024.webp",
      "/images/025.webp",
      "/images/026.webp",
      "/images/027.webp",
      "/images/028.webp"
    ],
    copyText: "https://catmartinweb.netlify.app/"
  },
  {
    id: "4",
    title: "电商平台运营",
    description: "独立电商操盘的自动化探索。搭建AI专属工作流，单人运营效能获得极大释放",
    longDescription: "在校期间面临「学业与创业并行」的时间资源冲突：传统电商运营高度依赖人工，选品分析、客服应答、营销提效均需大量精力投入，单人操盘的天花板极低。\n\n在保持学业的前提下，从0到1独立操盘一家拼多多汽车配件店铺，探索AI技术在真实电商场景中的降本增效路径，验证「AI赋能单人商业闭环」的可行性。\n\n产品策略层：借助大模型进行竞品语义分析与标题精准优化，利用AIGC工具批量生成并A/B测试高转化主图。运营效率层：搭建AI自动化工作流高效处理库存同步与客情问询，释放重复性人工操作。增长层：通过数据驱动迭代营销策略，在2025年3月实施精准投放组合拳。\n\n累计处理订单670+笔，总营收突破3.5万元，单月峰值营收达6529元（2025年3月）。完整跑通了从选品→营销→履约→售后的0到1商业闭环，用真实数据验证了AI技术在单人电商操盘场景中的ROI价值。",
    tags: ["OPERATION", "2024"],
    year: "2024",
    image: "/images/021.webp",
    color: "bg-white",
    gallery: [
      "/images/2024.webp",
      "/images/2025.webp",
      "/images/2026.webp"
    ],
    copyText: "拼多多店铺名：凯凯的汽车配件店"
  },
  {
    id: "5",
    title: "校园新闻网站",
    description: "一个第一时间了解或发布校园新闻的社区，（初次尝试vibe coding，里程碑似的意义）",
    longDescription: "校园新闻资讯高度碎片化——多源信息分散在不同渠道，缺乏统一入口。同时，内容安全管控依赖人工审核，效率低且漏检率高，个性化推荐能力缺失导致信息过载。\n\n首次采用Vibe Coding（自然语言驱动编程）开发模式，借助AI工具全链路驱动，构建一个集智能聚合、个性化推荐与实时内容安全于一体的校园新闻管理平台，验证「AI辅助软件工程」在真实产品交付中的可行性。\n\n以Gemini担任「产品架构师」角色，负责系统需求分析、用户角色规划与精准提示词生成；以Trae作为「核心开发执行者」完成前后端代码编程与自动化测试。基于Spring Boot + Vue 3构建前后端分离架构；核心功能实现：Jaccard相似度个性化新闻推荐算法、DFA树敏感词实时拦截机制、JWT + Spring Security多角色权限管控体系。\n\n成功交付一个智能、安全、高效的校园资讯聚合平台。这次跨界开发实践深刻验证了自然语言驱动编程（Vibe Coding）在软件工程全生命周期中的可行性与效率优势，为AI产品管理者的技术视野与工程协作方法论拓展了核心认知边界。", 
    tags: ["WEB DESIGN", "2025"],
    year: "2025",
    image: "/images/010.webp",
    color: "bg-white",
    gallery: [
      "/images/011.webp",
      "/images/012.webp",
      "/images/013.webp",
      "/images/014.webp",
      "/images/015.webp",
      "/images/016.webp",
      "/images/017.webp"
    ],
    copyText: "demo版本，未上线"
  },
  {
    id: "6",
    title: "公司抽奖网站",
    description: "以 AI 美学雕琢年会仪式感，用极简网页定格每一份幸运高光",
    longDescription: "企业年会抽奖环节长期依赖传统手动方式——主持人念名字、纸箱抽签，效率低下且缺乏仪式感，无法匹配现代企业「科技+人文」的年会品质诉求，尤其在混合办公场景下线下/线上协同体验割裂。\n\n基于AI工具全链路驱动，在极短周期内快速交付一款兼具品牌仪式感与实用功能的企业年会抽奖网页工具，满足大屏投影与移动端双场景使用需求，零运维门槛。\n\n借助Gemini完成红金视觉风格的艺术方向设定与交互原型设计，支持企业Logo上传、自定义背景与响应式双端布局；通过Codex驱动核心功能开发——名单批量导入、不可重复随机抽奖算法、中奖名单一键导出。强化产品可靠性：防重复中奖校验机制、输入数据格式校验、本地存储兜底与礼花动态特效的情绪峰值设计。\n\n通过Netlify一键部署上线，生成零运维的线上访问链接，完美适配大屏投影与个人操作端，单次年会使用覆盖全公司员工。充分验证了AI驱动「轻量级企业工具」在短周期内高质量交付的能力，为AI产品管理的敏捷交付策略提供了成功案例。", 
    tags: ["WEB DESIGN", "2026"],
    year: "2026",
    image: "/images/022.webp",
    color: "bg-[#EFFF00]",
    gallery: [
      "/images/018.webp",
      "/images/019.webp",
      "/images/020.webp"
    ],
    copyText: "https://lotterydraw1800.netlify.app/"
  },
  {
    id: "3",
    title: "文案提取工作流",
    description: "通过COZE智能体搭建了一个仅通过抖音的分享链接就能提取该视频文案并加工的工具。来自信息与效率之间的碰撞。",
    longDescription: "短视频创作者面临「灵感充沛、执行阻塞」的效率困境——手动提取竞品视频文案、洗稿改写、梳理关键词与思维导图，每一步都需要在多个工具间反复切换，单个视频的文案加工耗时可达30分钟以上，严重拖累内容产出节奏。\n\n基于Coze智能体平台，设计并交付一个「分享链接即出结果」的一站式视频文案自动化处理工具，让创作者将精力从机械操作中解放出来，聚焦创意本身。\n\n产品设计层：构建严格的规则化提示词体系，预设分级优先级的核心执行规则，精准区分抖音链接解析、非抖音链接处理、润色指令与思维导图指令的不同响应逻辑，严控纯净文本输出，杜绝冗余字段。工作流架构层：设计3个专属自动化管道——① video工作流（链接提取→抖音解析→字幕生成），② xigao工作流（豆包大模型文案优化改写），③ key工作流（双大模型节点并行：核心关键词提取 + 结构化Markdown思维导图生成）。\n\n用户仅需发送抖音分享链接即可自动完成文案提取→智能润色→思维导图生成的全流程，单次处理时间由30分钟压缩至秒级。已部署为可复用的Coze智能体（bot_id：7630372911542927366），展示了AI智能体在垂域效率工具中的产品化落地能力与用户痛点洞察深度。",
    tags: ["AI workflow", "2025"],
    year: "2025",
    image: "/images/001.webp",
    color: "bg-[#FF0055]",
    gallery: [
      '/images/002.webp',
      '/images/003.webp',
      '/images/004.webp',
      '/images/005.webp'
    ],
    copyText: "该Coze智能体的bot_id：7630372911542927366"
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
  const [swipeStartX, setSwipeStartX] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
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

  // Reset swipe offset on index change
  useEffect(() => {
    setSwipeOffset(0);
    setIsSwiping(false);
  }, [currentIndex]);

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

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
      setIsSwiping(false);
    } else if (e.touches.length === 1) {
      setSwipeStartX(e.touches[0].clientX);
      setIsSwiping(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.touches.length === 2 && touchStart) {
      setIsSwiping(false);
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
    } else if (e.touches.length === 1 && swipeStartX !== null && isSwiping && scale === 1) {
      const offset = e.touches[0].clientX - swipeStartX;
      setSwipeOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    // Swipe detection: if offset exceeds threshold, navigate
    if (isSwiping && swipeStartX !== null && Math.abs(swipeOffset) > 50) {
      if (swipeOffset > 0) {
        prev();
      } else {
        next();
      }
    }
    setSwipeStartX(null);
    setSwipeOffset(0);
    setIsSwiping(false);
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
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
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-8 right-8 text-white hover:text-red-500 transition-colors z-[110]"
          >
            <X size={48} strokeWidth={3} />
          </motion.button>

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
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
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
                decoding="async"
              />
              </div>
            </motion.div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black font-black px-4 py-2 brutalist-border">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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

// ====== HOMEPAGE EXTENSIONS ======

const MarqueeTicker = () => {
  const items = ["VIBE CODER", "WEBGL SHADER", "AI WORKFLOW", "FULL-STACK", "CREATIVE DEV", "MINI PROGRAM", "NEO-BRUTALISM", "REACT", "THREE.JS", "COZE BOT", "TYPESCRIPT", "TAILWIND"];
  return (
    <div className="border-t-4 border-b-4 border-black bg-black overflow-hidden py-6">
      <motion.div className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-white font-display font-black text-2xl md:text-4xl uppercase tracking-tighter italic">
            {item}<span className="text-[#8FFF00] mx-6">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const StatsCounter = () => {
  const stats = [
    { value: 7, suffix: "+", label: "Projects Shipped", icon: <Code2 className="w-8 h-8" />, color: "bg-[#8FFF00]" },
    { value: 3, suffix: ".5w", label: "Revenue Generated", icon: <Zap className="w-8 h-8" />, color: "bg-[#00F0FF]" },
    { value: 670, suffix: "+", label: "Orders Fulfilled", icon: <Globe className="w-8 h-8" />, color: "bg-[#FF3D00]" },
    { value: 12, suffix: "", label: "Zodiac Signs", icon: <Star className="w-8 h-8" />, color: "bg-[#EFFF00]" },
  ];

  const StatCard = ({ stat, index }: any) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
      const el = ref.current; if (!el) return;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
      obs.observe(el); return () => obs.disconnect();
    }, []);
    useEffect(() => {
      if (!inView) return;
      const steps = 40; let cur = 0;
      const t = setInterval(() => { cur += stat.value / steps; if (cur >= stat.value) { setCount(stat.value); clearInterval(t); } else setCount(Math.floor(cur)); }, 1200 / steps);
      return () => clearInterval(t);
    }, [inView, stat.value]);
    return (
      <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * index }}
        className={`${stat.color} brutalist-border brutalist-shadow p-8 flex flex-col items-center text-center group hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all`}>
        <div className="mb-4 opacity-60 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
        <div className="text-6xl md:text-8xl font-display font-black tracking-tighter">{count}{stat.suffix}</div>
        <div className="mt-3 font-mono text-sm font-bold uppercase tracking-widest">{stat.label}</div>
      </motion.div>
    );
  };
  return (
    <div className="border-b-4 border-black bg-white p-6 md:p-24">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter leading-none">The Numbers<br/>Don't Lie.</h2>
        <div className="mt-4 font-mono text-sm uppercase tracking-widest text-gray-500">REAL RESULTS. REAL IMPACT.</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((s, i) => <StatCard key={i} stat={s} index={i} />)}
      </div>
    </div>
  );
};

const ScrollDrivenCards = ({ projects }: { projects: Project[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const featuredIds = ["7", "1", "2", "6"];
  const featured = projects.filter(p => featuredIds.includes(p.id));
  featured.sort((a, b) => featuredIds.indexOf(a.id) - featuredIds.indexOf(b.id));

  const quotes: Record<string, string[]> = {
    "7": ["从种子到灵魂 — 19个页面构建治愈体验", "云端养护引擎 — 33个云函数精准调度", "绿色疗愈设计 — 像素级卡片美学打磨", "微信生态全栈 — 审核上线完整交付"],
    "1": ["着色器之光 — GLSL 诗意雕刻金属质感", "十二星辰之声 — AI合成古希腊语音呢喃", "星穹卡牌 — 滚动触发发掘揭示动效", "神话体系深度 — 四大元素十二灵魂"],
    "2": ["滚动即播放 — 小猫马丁与你共舞叙事", "Seedance 梦境 — 六段AI生成动态影像", "逐帧魔法 — 零卡顿纯丝滑播放体验", "双语灵魂 — 中英文文字穿梭交错画面"],
    "6": ["红金美学 — AI 设计的年会视觉系统", "一键部署 — Netlify 零运维即开即用", "防重复校验 — 抽奖公平性万无一失", "大屏适配 — 投影端与 PC 端完美呈现"],
  };
  const quoteColors = ["bg-[#8FFF00]", "bg-[#00F0FF]", "bg-[#EFFF00]", "bg-[#FF3D00]"];

  // Unequal distribution: last card gets 1.4x space
  const weights = [1, 1, 1, 1.4];
  const totalWeight = weights.reduce((s, w) => s + w, 0);
  const breakpoints: number[] = [];
  let acc = 0;
  weights.forEach(w => { breakpoints.push(acc); acc += w / totalWeight; });
  breakpoints.push(1);

  return (
    <div ref={containerRef} style={{ height: `${featured.length * 120}vh` }} className="relative bg-black border-b-4 border-black">
      {featured.map((project, i) => {
        const start = breakpoints[i];
        const end = breakpoints[i + 1];
        const mid = (start + end) / 2;
        const range = end - start; // how wide this scene's scroll zone is

        const fadeIn = useTransform(scrollYProgress, [start + range * 0.15, start + range * 0.35], [0, 1]);
        const fadeOut = useTransform(scrollYProgress, [end - range * 0.15, end], [1, 0]);
        const showQuotes = useTransform(scrollYProgress, [start + range * 0.1, start + range * 0.35, end - range * 0.1, end], [0, 1, 1, 0]);
        const [quotesOn, setQuotesOn] = useState(false);
        useMotionValueEvent(showQuotes, "change", (v: number) => {
          const next = v > 0.3;
          if (next !== quotesOn) setQuotesOn(next);
        });

        const cardScale = useTransform(scrollYProgress, [start, mid, end], [0.88, 1, 0.88]);
        const cardY = useTransform(scrollYProgress, [start, mid, end], [60, 0, -60]);

        const projectQuotes = quotes[project.id] || quotes["7"];

        return (
          <div key={project.id} className="h-screen sticky top-0 flex items-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12 flex flex-col gap-4 md:grid md:grid-cols-[1.1fr_1fr] md:gap-12 md:items-center h-full justify-center">
              {/* Card (desktop: left, mobile: top) */}
              <motion.div style={{ scale: cardScale, y: cardY }}
                className="brutalist-border brutalist-shadow-lg bg-white overflow-hidden w-full max-w-[680px] aspect-[4/3] relative group mx-auto md:mx-0">
                <div className={`h-3 md:h-4 ${project.color}`} />
                <div className="relative h-[62%] overflow-hidden">
                  <img referrerPolicy="no-referrer" src={project.image} alt={project.title}
                    loading="eager" fetchpriority="high" decoding="async"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-[0.5deg]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
                <div className="p-3 md:p-6 flex items-center justify-between">
                  <div>
                    <div className="flex gap-2 mb-2">
                      {project.tags.map(t => (<span key={t} className="brutalist-border bg-black text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter">{t}</span>))}
                    </div>
                    <h3 className="text-lg md:text-4xl font-display font-black uppercase tracking-tighter">{project.title}</h3>
                    <p className="text-xs md:text-sm font-bold text-gray-500 mt-1 uppercase tracking-wide line-clamp-1 md:line-clamp-none">{project.description}</p>
                  </div>
                  <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                    <ArrowRight className="w-5 h-5 md:w-8 md:h-8" />
                  </motion.div>
                </div>
                <motion.div className="absolute inset-0 bg-[#8FFF00] mix-blend-difference pointer-events-none"
                  initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.35 }} />
              </motion.div>

              {/* Desktop Quotes (right, vertical) */}
              <div className="hidden md:flex flex-col gap-4">
                <AnimatePresence mode="wait">
                  {quotesOn && (
                    <motion.div key={`${project.id}-quotes`} className="flex flex-col gap-4"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}>
                      {projectQuotes.map((quote, qi) => (
                        <motion.div key={qi}
                          initial={{ opacity: 0, x: 80 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -40 }}
                          transition={{ duration: 0.5, delay: 0.1 * qi, ease: "easeOut" }}
                          className="group">
                          <div className={`${quoteColors[qi]} text-black px-5 py-4 brutalist-border brutalist-shadow-sm transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-2px] hover:brutalist-shadow cursor-default`}>
                            <div className="flex items-start gap-3">
                              <span className="font-display font-black text-3xl md:text-4xl leading-none opacity-30 group-hover:opacity-60 transition-opacity">
                                {String(qi + 1).padStart(2, '0')}
                              </span>
                              <div>
                                <p className="font-display font-black text-sm md:text-base uppercase tracking-tighter leading-tight">
                                  {quote}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Quotes (below card, horizontal grid) */}
              <div className="flex md:hidden flex-wrap gap-2 justify-center">
                <AnimatePresence mode="wait">
                  {quotesOn && (
                    <motion.div key={`${project.id}-quotes-mobile`} className="grid grid-cols-2 gap-2"
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}>
                      {projectQuotes.map((quote, qi) => (
                        <motion.div key={qi}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.08 * qi }}>
                          <div className={`${quoteColors[qi]} text-black px-3 py-2 brutalist-border brutalist-shadow-sm`}>
                            <span className="font-mono text-[10px] font-black opacity-40 mr-1">{String(qi + 1).padStart(2, '0')}</span>
                            <span className="font-display font-black text-[11px] uppercase tracking-tighter leading-tight">{quote}</span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Scroll indicator */}
            <motion.div style={{ opacity: useTransform(scrollYProgress, [start + range * 0.02, start + range * 0.1], [1, 0]) }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </motion.div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

const CTASection = ({ onExplore, onContact }: { onExplore: () => void; onContact: () => void }) => (
  <div className="border-b-4 border-black bg-[#FF3D00] p-6 md:p-24 text-center relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:30px_30px]" />
    </div>
    <div className="relative z-10">
      <motion.div initial={{ rotate: -3, scale: 0.9, opacity: 0 }} whileInView={{ rotate: 0, scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 15 }}>
        <h2 className="text-5xl md:text-8xl font-display font-black italic uppercase tracking-tighter leading-none text-white mb-8">DARE TO<br/>BUILD THE<br/>IMPOSSIBLE?</h2>
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl font-bold text-white/90 max-w-2xl mx-auto mb-12 font-mono uppercase">
        Every great product starts with a single commit.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button onClick={onExplore} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="bg-white text-[#FF3D00] px-12 py-6 brutalist-border brutalist-shadow font-black text-2xl uppercase italic hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-3">
          <Sparkles className="w-6 h-6" /> Explore Work
        </motion.button>
        <motion.button onClick={onContact} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="bg-transparent border-4 border-white text-white px-12 py-6 font-black text-2xl uppercase italic hover:bg-white hover:text-[#FF3D00] transition-all flex items-center justify-center gap-3">
          <Mail className="w-6 h-6" /> Get In Touch
        </motion.button>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}
        className="mt-16 flex justify-center gap-6">
        {[Github, Twitter, Linkedin].map((Icon, i) => (
          <a key={i} href="#" className="text-white/60 hover:text-white transition-colors"><Icon className="w-6 h-6" /></a>
        ))}
      </motion.div>
    </div>
  </div>
);

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      // Clear localStorage to ensure we always use the latest code data
      localStorage.removeItem('projects_data');
      localStorage.removeItem('site_data');
      
      // Always use the latest initial data from code
      setData(initialData);
      setProjects(initialProjects);
      
      // Save to localStorage for future use
      localStorage.setItem('site_data', JSON.stringify(initialData));
      localStorage.setItem('projects_data', JSON.stringify(initialProjects));
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
          <div className="bg-[#FF3D00] brutalist-border brutalist-shadow-sm px-4 py-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer" onClick={() => setActiveTab('home')}>
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
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="brutalist-border p-2 bg-yellow-400 font-bold flex items-center gap-1">
              <span className="text-sm">{mobileMenuOpen ? '✕' : '☰'}</span>
              <span>菜单</span>
            </button>
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-20 left-0 right-0 bg-white border-b-4 border-black z-50">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                      className={`w-full text-left px-6 py-4 font-black uppercase tracking-tighter border-b-2 border-black last:border-b-0 hover:bg-yellow-400 transition-colors ${activeTab === item.id ? 'bg-yellow-400' : ''}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto border-x-4 border-black min-h-[calc(100vh-80px)]">
        
        {/* --- Home Section --- */}
        {activeTab === 'home' && (
          <div className="flex flex-col md:flex-row min-h-[80vh]">
            <div className="flex-1 bg-[#FFFF00] p-6 md:p-12 flex flex-col justify-center border-b-4 md:border-b-0 md:border-r-4 border-black relative overflow-hidden">
              <div className="relative z-10">
                <div className="bg-black text-white px-6 py-2 inline-block mb-6 brutalist-shadow-sm font-sans font-black italic uppercase tracking-tighter">
                  <EditableText 
                    text={data.hero.subtitle} 
                    onSave={(v) => updateField('hero.subtitle', v)} 
                    isEditing={false} 
                  />
                </div>
                
                <h1 className="text-5xl md:text-9xl font-display font-black leading-none mb-8 tracking-tighter">
                  <EditableText 
                    text={data.hero.title} 
                    onSave={(v) => updateField('hero.title', v)} 
                    isEditing={false} 
                  />
                </h1>
                
                <div className="text-lg md:text-2xl font-medium max-w-xl leading-relaxed mb-10">
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
            
            <div className="flex-1 bg-[#00F0FF] p-6 flex items-center justify-center relative min-h-[300px] md:min-h-[500px]">
              <div className="w-full absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <div className="relative w-full h-full max-w-2xl brutalist-border overflow-hidden bg-gray-200 brutalist-shadow-lg scale-90 md:scale-100 group">
                {data.hero.avatar ? (
                  <img 
                    referrerPolicy="no-referrer"
                    src={data.hero.avatar} 
                    alt="Avatar"
                    loading="eager" fetchpriority="high" decoding="async"
                    className="w-full h-full object-cover grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-500 cursor-crosshair"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-400">NO AVATAR</div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* --- Home Extended Sections --- */}
        {activeTab === 'home' && (
          <>
            <MarqueeTicker />
            <ScrollDrivenCards projects={projects} />
            <StatsCounter />
            <CTASection onExplore={() => setActiveTab('portfolio')} onContact={() => setActiveTab('contact')} />
          </>
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
                    <div className="brutalist-border overflow-hidden bg-gray-200 aspect-video brutalist-shadow-sm mb-8 relative group cursor-pointer" onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}>
                      <img 
                        referrerPolicy="no-referrer"
                        src={project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000'} 
                        alt={project.title}
                        loading="lazy" decoding="async"
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-80"
                        style={{ background: '#e5e7eb' }}
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