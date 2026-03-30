import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// 1. เตรียมพื้นที่สำหรับใส่ไฟล์ภาพจริงของคุณ
// คุณต้องเตรียม Array ที่มี URL หรือ Path ของรูปภาพทั้งหมด 300 รายการ
// เช่น [ 'url1', 'url2', '... jusqu'à 300' ] หรือ [ require('./img1.jpg'), require('./img2.jpg'), ... ]
const myActualImageSources: string[] = [
  // === ขั้นตอนของคุณ: ===
  // ค้นหาและวางรายการ URL หรือ Path ของรูปภาพทั้ง 300 รูปของคุณตรงนี้
  // (เช่น 'https://...', หรือ '/images/...')
  // อย่าลืมใส่เครื่องหมายคำพูดครอบและลูกศรคั่นแต่ละรายการ

  /* === วาง URL หรือ Path รูปภาพทั้ง 300 รูปตรงนี้ === */
  
  // -- ตัวอย่างข้อมูลสมมติ (เมื่อคุณวางรูปจริง ตัวอย่างนี้จะถูกลบออก) --
  // 'https://via.placeholder.com/800x800.png?text=Image+1',
  // 'https://via.placeholder.com/800x800.png?text=Image+2',
  // ... และต่อๆ ไปจนครบ 300 รูป
  // -----------------------------------------------------------------
];

// Fallback logic: ป้องกันโค้ดพังในระหว่างที่คุณยังใส่รูปไม่ครบ 300 รูป
// (จะใช้รูป Unsplash จำลอง 10 รูปแรกมาวนซ้ำให้เต็ม 300 ช่องแทน ถ้า Array ของคุณยังว่างอยู่)
const unsplashMockFallback = [
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
  'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
  'https://images.unsplash.com/photo-1623976250156-4598d1f58dc7?w=800',
  'https://images.unsplash.com/photo-1658584124309-768111d9c5db?w=800',
  'https://images.unsplash.com/photo-1646756089735-487709743361?w=800',
  'https://images.unsplash.com/photo-1758687126741-86737c57c210?w=800',
  'https://images.unsplash.com/photo-1698895685696-ac619ef9b202?w=800',
  'https://images.unsplash.com/photo-1758270705317-3ef6142d306f?w=800',
];

const imageSourcesToUse = myActualImageSources.length > 0 
  ? myActualImageSources 
  : Array.from({ length: 300 }).map((_, idx) => unsplashMockFallback[idx % unsplashMockFallback.length]);

// สร้างรายการรูปภาพสำหรับ Grid (300 รูป ไม่ซ้ำกัน ถ้าคุณวางข้อมูลครบ)
const reviewImages = imageSourcesToUse.slice(0, 300).map((src, idx) => ({
  id: idx,
  src: src,
  alt: `Review ${idx + 1}`
}));

export function ReviewSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedIndex]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % reviewImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + reviewImages.length) % reviewImages.length);
    }
  };

  return (
    <>
      <section id="reviews" className="py-10 bg-transparent relative flex flex-col justify-center h-screen min-h-screen">
        <div className="max-w-7xl mx-auto px-6 mb-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
           <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 flex items-center justify-center gap-x-4">
              <span className="relative inline-block leading-none">
                <span 
                  className="absolute -left-4.5 -top-3 w-14 h-14 md:w-16 md:h-16 bg-[#FCBA02] rounded-full z-0 opacity-100"
                  aria-hidden="true"
                ></span>
                <span className="font-sans relative z-10 text-black">รีวิวจากผู้เข้าร่วมเวิร์กชอป</span>
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              เสียงจากผู้เข้าร่วมเวิร์กชอปของ Dot to Dot จากหลากหลายกิจกรรมของพวกเรา
            </p>
          </motion.div>
        </div>

        {/* ส่วนแสดงรูป จัด Grid แบบ 25x12 (300 ช่อง) */}
        <div className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 flex-grow flex flex-col justify-center pb-8" style={{ maxHeight: '75vh' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full" 
            style={{ 
              display: 'grid', 
              // 25 คอลัมน์ และ 12 แถว
              gridTemplateColumns: 'repeat(25, 1fr)', 
              gridTemplateRows: 'repeat(12, 1fr)',
              gap: '4px'
            }}
          >
            {reviewImages.map((img, index) => (
              <motion.div
                key={img.id}
                onClick={() => setSelectedIndex(index)}
                className="relative cursor-pointer rounded overflow-hidden bg-gray-800 w-full h-full"
                whileHover={{ 
                  scale: 2.5, 
                  zIndex: 50, 
                  borderRadius: "8px",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.6)"
                }}
                transition={{ duration: 0.15 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox / รูปใหญ่ตอนคลิก (คงเดิม) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/10 hover:bg-[#ED1C26] text-white rounded-full flex items-center justify-center transition-all z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <button 
              onClick={handlePrev}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-[#ED1C26] text-white rounded-full flex items-center justify-center transition-all z-50"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} 
            >
              <img 
                src={reviewImages[selectedIndex].src} 
                alt={reviewImages[selectedIndex].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border-4 border-white/10"
              />
              
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/70 font-medium tracking-wider">
                {selectedIndex + 1} / {reviewImages.length}
              </div>
            </motion.div>

            <button 
              onClick={handleNext}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-[#ED1C26] text-white rounded-full flex items-center justify-center transition-all z-50"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
