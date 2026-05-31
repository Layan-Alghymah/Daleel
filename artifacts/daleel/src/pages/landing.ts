export function renderLanding(container: HTMLElement) {
  container.innerHTML = `
    <div style="min-height:100vh; background:#fff; font-family:'IBM Plex Sans Arabic',sans-serif; direction:rtl; color:#0f172a;">

      <!-- ══ Navbar ════════════════════════════════════════════ -->
      <nav style="
        position:sticky; top:0; z-index:100;
        background:rgba(255,255,255,0.92); backdrop-filter:blur(12px);
        border-bottom:1px solid #e2e8f0;
        padding:0 48px; height:64px;
        display:flex; align-items:center; justify-content:space-between;
      ">
        <div style="display:flex;align-items:center;gap:10px;">
          <img src="/logo.png" alt="دليل" style="width:36px;height:36px;" onerror="this.style.display='none'">
          <span style="font-size:20px;font-weight:800;color:#1e3a5f;letter-spacing:-0.3px;">دليل</span>
        </div>
        <a href="#login" style="
          text-decoration:none;
          padding:9px 24px; border-radius:8px;
          background:#1e3a5f; color:#fff;
          font-size:14px; font-weight:600; font-family:inherit;
          transition:background 0.15s;
        " onmouseover="this.style.background='#2d5491'" onmouseout="this.style.background='#1e3a5f'">
          تسجيل دخول
        </a>
      </nav>

      <!-- ══ Hero ══════════════════════════════════════════════ -->
      <section style="
        padding:80px 48px 96px;
        display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center;
        max-width:1200px; margin:0 auto;
      ">
        <!-- Right: text -->
        <div>
          <div style="
            display:inline-flex; align-items:center; gap:8px;
            background:#eef4ff; color:#1e3a5f;
            padding:6px 16px; border-radius:20px;
            font-size:13px; font-weight:600; margin-bottom:28px;
            border:1px solid #c7d9f8;
          ">
            <span style="width:7px;height:7px;border-radius:50%;background:#1e3a5f;flex-shrink:0;"></span>
            مساعد ذكي مؤسسي
          </div>

          <h1 style="font-size:64px;font-weight:900;color:#1e3a5f;line-height:1;margin:0 0 16px;letter-spacing:-1px;">
            دليل
          </h1>
          <h2 style="font-size:24px;font-weight:700;color:#2d5491;line-height:1.4;margin:0 0 20px;">
            مساعد الاستعلام الذكي<br>للبيانات المؤسسية
          </h2>
          <p style="font-size:16px;color:#475569;line-height:1.9;margin:0 0 40px;max-width:420px;">
            اسأل عن أي بيانات مؤسسية بلغة طبيعية واحصل على إجابات فورية بالأرقام والرسوم البيانية دون الحاجة لمعرفة تقنية.
          </p>
          <a href="#login" style="
            text-decoration:none; display:inline-block;
            padding:14px 36px; border-radius:10px;
            background:#1e3a5f; color:#fff;
            font-size:16px; font-weight:700; font-family:inherit;
            box-shadow:0 4px 14px rgba(30,58,95,0.35);
            transition:all 0.15s;
          " onmouseover="this.style.background='#2d5491';this.style.boxShadow='0 6px 20px rgba(30,58,95,0.45)'"
             onmouseout="this.style.background='#1e3a5f';this.style.boxShadow='0 4px 14px rgba(30,58,95,0.35)'">
            تسجيل دخول ←
          </a>
        </div>

        <!-- Left: mock chat visual -->
        <div style="position:relative;display:flex;flex-direction:column;gap:14px;padding:32px;background:linear-gradient(135deg,#f0f5ff 0%,#e8f0fe 100%);border-radius:20px;border:1px solid #c7d9f8;overflow:hidden;">

          <!-- decorative circles -->
          <div style="position:absolute;top:-30px;left:-30px;width:120px;height:120px;border-radius:50%;background:rgba(30,58,95,0.07);"></div>
          <div style="position:absolute;bottom:-20px;right:-20px;width:80px;height:80px;border-radius:50%;background:rgba(45,84,145,0.08);"></div>

          <!-- chat header -->
          <div style="display:flex;align-items:center;gap:10px;padding-bottom:14px;border-bottom:1px solid #c7d9f8;position:relative;z-index:1;">
            <div style="width:34px;height:34px;border-radius:50%;background:#1e3a5f;display:flex;align-items:center;justify-content:center;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <div>
              <div style="font-weight:700;font-size:14px;color:#1e3a5f;">دليل</div>
              <div style="font-size:11px;color:#64748b;">مساعد الاستعلام الذكي</div>
            </div>
            <div style="margin-right:auto;display:flex;align-items:center;gap:5px;">
              <span style="width:7px;height:7px;border-radius:50%;background:#22c55e;"></span>
              <span style="font-size:11px;color:#22c55e;font-weight:600;">متصل</span>
            </div>
          </div>

          <!-- user bubble -->
          <div style="position:relative;z-index:1;align-self:flex-start;">
            <div style="background:#1e3a5f;color:#fff;padding:11px 16px;border-radius:12px 12px 4px 12px;font-size:13px;max-width:260px;line-height:1.6;">
              كم عدد المعاملات المكتملة هذا الشهر؟
            </div>
            <div style="font-size:10px;color:#94a3b8;margin-top:4px;text-align:right;">أنت</div>
          </div>

          <!-- ai bubble -->
          <div style="position:relative;z-index:1;align-self:flex-end;">
            <div style="background:#fff;border:1px solid #e2e8f0;padding:12px 16px;border-radius:12px 12px 12px 4px;font-size:13px;max-width:280px;line-height:1.6;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
              <div style="font-weight:600;color:#1e3a5f;margin-bottom:8px;">١٢,٤٥٦ معاملة مكتملة</div>
              <!-- mini bar chart -->
              <div style="display:flex;align-items:flex-end;gap:5px;height:44px;margin-bottom:8px;">
                ${[70,45,80,55,90,38,62].map((h, i) => `
                  <div style="flex:1;height:${h}%;border-radius:3px 3px 0 0;background:${i === 4 ? '#1e3a5f' : '#c7d9f8'};"></div>
                `).join('')}
              </div>
              <div style="font-size:11px;color:#64748b;">↑ زيادة ٨٪ عن الشهر الماضي</div>
            </div>
            <div style="font-size:10px;color:#94a3b8;margin-top:4px;">دليل</div>
          </div>

          <!-- typing indicator -->
          <div style="position:relative;z-index:1;align-self:flex-start;">
            <div style="background:#fff;border:1px solid #e2e8f0;padding:10px 16px;border-radius:12px;display:inline-flex;gap:5px;align-items:center;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
              ${[0,200,400].map(d => `<span style="width:7px;height:7px;border-radius:50%;background:#94a3b8;animation:bounce 1.2s infinite ${d}ms;"></span>`).join('')}
            </div>
          </div>

        </div>
      </section>

      <!-- ══ Features ══════════════════════════════════════════ -->
      <section style="background:#f8fafc;padding:80px 48px;border-top:1px solid #e2e8f0;">
        <div style="max-width:1200px;margin:0 auto;">
          <h2 style="text-align:center;font-size:30px;font-weight:800;color:#1e3a5f;margin:0 0 12px;">كل ما تحتاجه في مكان واحد</h2>
          <p style="text-align:center;color:#64748b;font-size:16px;margin:0 0 56px;">مصمم لتمكين فرق العمل من الوصول للبيانات بسرعة ودقة</p>

          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:28px;">

            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:36px 28px;transition:all 0.2s;cursor:default;"
                 onmouseover="this.style.boxShadow='0 8px 30px rgba(30,58,95,0.12)';this.style.borderColor='#c7d9f8'"
                 onmouseout="this.style.boxShadow='none';this.style.borderColor='#e2e8f0'">
              <div style="width:52px;height:52px;border-radius:14px;background:#eef4ff;display:flex;align-items:center;justify-content:center;margin-bottom:20px;color:#1e3a5f;">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </div>
              <h3 style="font-size:18px;font-weight:700;color:#1e3a5f;margin:0 0 10px;">استعلام بالعربية الطبيعية</h3>
              <p style="font-size:14px;color:#64748b;line-height:1.8;margin:0;">اكتب سؤالك بأسلوبك الطبيعي دون الحاجة لمعرفة لغات برمجية أو SQL.</p>
            </div>

            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:36px 28px;transition:all 0.2s;cursor:default;"
                 onmouseover="this.style.boxShadow='0 8px 30px rgba(30,58,95,0.12)';this.style.borderColor='#c7d9f8'"
                 onmouseout="this.style.boxShadow='none';this.style.borderColor='#e2e8f0'">
              <div style="width:52px;height:52px;border-radius:14px;background:#f0fdf4;display:flex;align-items:center;justify-content:center;margin-bottom:20px;color:#16a34a;">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
              <h3 style="font-size:18px;font-weight:700;color:#1e3a5f;margin:0 0 10px;">نتائج فورية بالرسوم والجداول</h3>
              <p style="font-size:14px;color:#64748b;line-height:1.8;margin:0;">احصل على إجابات مدعومة بمخططات بيانية وجداول تفصيلية قابلة للتصدير.</p>
            </div>

            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:36px 28px;transition:all 0.2s;cursor:default;"
                 onmouseover="this.style.boxShadow='0 8px 30px rgba(30,58,95,0.12)';this.style.borderColor='#c7d9f8'"
                 onmouseout="this.style.boxShadow='none';this.style.borderColor='#e2e8f0'">
              <div style="width:52px;height:52px;border-radius:14px;background:#fff7ed;display:flex;align-items:center;justify-content:center;margin-bottom:20px;color:#ea580c;">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 style="font-size:18px;font-weight:700;color:#1e3a5f;margin:0 0 10px;">أمان وصلاحيات حسب الدور</h3>
              <p style="font-size:14px;color:#64748b;line-height:1.8;margin:0;">نظام صلاحيات متعدد المستويات يضمن وصول كل مستخدم فقط للبيانات المخصصة له.</p>
            </div>

          </div>
        </div>
      </section>

      <!-- ══ Footer ════════════════════════════════════════════ -->
      <footer style="
        background:#1e3a5f; color:rgba(255,255,255,0.7);
        text-align:center; padding:28px 48px;
        font-size:14px;
      ">
        دليل — مساعد الاستعلام الذكي &copy; 2026
      </footer>

    </div>

    <style>
      @keyframes bounce {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-6px); }
      }
    </style>
  `;
}
