export const mockData = {
  kpis: {
    queries: '١٢٤٣',
    users: '٤٧',
    sources: '٥',
    topQuestion: 'كم عدد المعاملات؟'
  },
  recentQueries: [
    { time: '١٠:٤٥ ص', user: 'أحمد محمد', question: 'كم عدد المعاملات المكتملة هذا الشهر؟' },
    { time: '٠٩:٣٠ ص', user: 'سارة خالد', question: 'ما أكثر الإدارات استقبالاً للطلبات؟' },
    { time: '٠٨:١٥ ص', user: 'فهد عبدالله', question: 'كم عدد الرخص الصادرة؟' },
    { time: 'أمس', user: 'نورة سعد', question: 'ما نسبة إنجاز الطلبات؟' },
    { time: 'أمس', user: 'أحمد محمد', question: 'متوسط زمن الإنجاز' }
  ],
  transactions: Array.from({ length: 50 }).map((_, i) => ({
    id: `TRX-${1000 + i}`,
    department: ['إدارة الترخيص', 'الموارد البشرية', 'تقنية المعلومات', 'الشؤون المالية', 'العلاقات العامة'][i % 5],
    status: ['مكتمل', 'قيد المعالجة', 'مرفوض', 'بانتظار الموافقة'][i % 4],
    date: `٢٠٢٣/١٠/${(i % 30) + 1}`,
  })),
  sources: [
    { name: 'نظام المعاملات', records: '٤٥,٢٣١', status: 'متصل', lastUpdate: 'منذ ٥ دقائق' },
    { name: 'نظام الموارد البشرية', records: '١,٢٤٧', status: 'متصل', lastUpdate: 'منذ ١٠ دقائق' },
    { name: 'نظام الخدمات الإلكترونية', records: '٨٩,٤٣٢', status: 'متصل', lastUpdate: 'منذ ٣٠ دقيقة' },
    { name: 'نظام الرخص', records: '١٢,٦٧٨', status: 'متصل', lastUpdate: 'منذ ساعة' },
    { name: 'نظام الشكاوى', records: '٣,٤٥٦', status: 'تحديث', lastUpdate: 'منذ يومين' },
  ],
  users: [
    { name: 'الإدارة العليا', email: 'admin@gov.sa', role: 'قائد', lastLogin: 'الآن', status: 'نشط' },
    { name: 'أحمد محمد', email: 'ahmed@gov.sa', role: 'مدير', lastLogin: 'منذ ساعة', status: 'نشط' },
    { name: 'سارة خالد', email: 'sara@gov.sa', role: 'محلل بيانات', lastLogin: 'أمس', status: 'نشط' },
  ]
};
