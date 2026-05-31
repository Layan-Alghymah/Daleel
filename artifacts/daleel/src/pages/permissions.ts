import { showToast } from '../components/toast';
import { showModal } from '../components/modal';

let users = [
  { id: 1, name:'الإدارة العليا', email:'admin@gov.sa', role:'قائد', lastLogin:'الآن', status:'نشط', dept:'الإدارة العليا' },
  { id: 2, name:'أحمد محمد', email:'ahmed@gov.sa', role:'مدير', lastLogin:'منذ ساعة', status:'نشط', dept:'تقنية المعلومات' },
  { id: 3, name:'سارة خالد', email:'sara@gov.sa', role:'محلل بيانات', lastLogin:'أمس', status:'نشط', dept:'الموارد البشرية' },
  { id: 4, name:'فهد العمري', email:'fahad@gov.sa', role:'مدير', lastLogin:'منذ ٣ أيام', status:'نشط', dept:'الشؤون المالية' },
  { id: 5, name:'نورة السعد', email:'noura@gov.sa', role:'محلل بيانات', lastLogin:'منذ أسبوع', status:'موقوف', dept:'التخطيط' },
  { id: 6, name:'خالد الزهراني', email:'khaled@gov.sa', role:'مدير', lastLogin:'أمس', status:'نشط', dept:'العلاقات العامة' },
  { id: 7, name:'لمى الحربي', email:'lama@gov.sa', role:'محلل بيانات', lastLogin:'اليوم', status:'نشط', dept:'التطوير' },
];
let nextId = 8;
let currentRoleFilter = 'الكل';
let searchTerm = '';

export function renderPermissions(container: HTMLElement) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
      <div>
        <h1>إدارة الصلاحيات</h1>
        <p style="color: var(--color-muted);">إدارة المستخدمين وصلاحيات الوصول للنظام</p>
      </div>
      <button class="btn btn-primary" id="btn-add-user">إضافة مستخدم</button>
    </div>

    <div class="card" style="margin-bottom: 24px; padding: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
      <div class="btn-group role-filters">
        <button class="btn active" data-role="الكل">الكل</button>
        <button class="btn" data-role="قائد">قائد</button>
        <button class="btn" data-role="مدير">مدير</button>
        <button class="btn" data-role="محلل بيانات">محلل بيانات</button>
      </div>
      <input type="text" id="user-search" class="input" placeholder="بحث بالاسم أو البريد..." style="width: 300px;">
    </div>

    <div style="margin-bottom: 16px; font-weight: 600; color: var(--color-primary);" id="users-summary"></div>

    <div class="card table-container">
      <table>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد الإلكتروني</th>
            <th>الإدارة</th>
            <th>الدور</th>
            <th>الحالة</th>
            <th>آخر دخول</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody id="users-tbody">
        </tbody>
      </table>
    </div>
  `;

  const tbody = document.getElementById('users-tbody')!;
  const summary = document.getElementById('users-summary')!;

  function renderTable() {
    let filtered = users.filter(u => {
      const matchRole = currentRoleFilter === 'الكل' || u.role === currentRoleFilter;
      const matchSearch = !searchTerm || u.name.includes(searchTerm) || u.email.includes(searchTerm) || u.dept.includes(searchTerm);
      return matchRole && matchSearch;
    });

    // Summary
    const total = filtered.length;
    const leads = filtered.filter(u => u.role === 'قائد').length;
    const managers = filtered.filter(u => u.role === 'مدير').length;
    const analysts = filtered.filter(u => u.role === 'محلل بيانات').length;
    summary.innerHTML = `${total} مستخدمين — ${leads} قائد — ${managers} مدير — ${analysts} محلل`;

    tbody.innerHTML = filtered.length ? filtered.map(user => {
      let roleBadge = 'badge-blue';
      if (user.role === 'قائد') roleBadge = 'badge-green';
      if (user.role === 'محلل بيانات') roleBadge = 'badge-orange';
      
      const statusBadge = user.status === 'نشط' ? 'badge-green' : 'badge-danger';
      const statusStyle = user.status === 'موقوف' ? 'background: #FECACA; color: #991B1B;' : '';

      return `
        <tr>
          <td style="font-weight: 500;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-background); display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--color-primary); border: 1px solid var(--color-border);">
                ${user.name.charAt(0)}
              </div>
              ${user.name}
            </div>
          </td>
          <td style="color: var(--color-muted);">${user.email}</td>
          <td>${user.dept}</td>
          <td><span class="badge ${roleBadge}">${user.role}</span></td>
          <td><span class="badge ${statusBadge} status-toggle" data-id="${user.id}" style="cursor: pointer; ${statusStyle}">${user.status}</span></td>
          <td style="color: var(--color-muted);">${user.lastLogin}</td>
          <td>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-secondary edit-btn" data-id="${user.id}" style="padding: 4px 8px; font-size: 12px;">تعديل</button>
              <button class="btn btn-secondary del-btn" data-id="${user.id}" style="padding: 4px 8px; font-size: 12px; color: var(--color-danger);">حذف</button>
            </div>
          </td>
        </tr>
      `;
    }).join('') : `<tr><td colspan="7"><div class="empty-state">لا يوجد مستخدمين</div></td></tr>`;

    attachListeners();
  }

  function attachListeners() {
    document.querySelectorAll('.status-toggle').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = parseInt((e.target as HTMLElement).getAttribute('data-id') || '0');
        const user = users.find(u => u.id === id);
        if (user) {
          user.status = user.status === 'نشط' ? 'موقوف' : 'نشط';
          renderTable();
          showToast(`تم ${user.status === 'نشط' ? 'تفعيل' : 'إيقاف'} المستخدم`, 'success');
        }
      });
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt((e.target as HTMLElement).getAttribute('data-id') || '0');
        const user = users.find(u => u.id === id);
        if (user) {
          showModal(
            'تعديل المستخدم',
            `
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <p>تعديل بيانات: <strong>${user.name}</strong></p>
                <div>
                  <label style="display: block; margin-bottom: 8px;">الإدارة</label>
                  <input type="text" id="edit-dept" class="input" value="${user.dept}">
                </div>
                <div>
                  <label style="display: block; margin-bottom: 8px;">الدور</label>
                  <select id="edit-role" class="input">
                    <option ${user.role === 'قائد' ? 'selected' : ''}>قائد</option>
                    <option ${user.role === 'مدير' ? 'selected' : ''}>مدير</option>
                    <option ${user.role === 'محلل بيانات' ? 'selected' : ''}>محلل بيانات</option>
                  </select>
                </div>
              </div>
            `,
            () => {
              user.dept = (document.getElementById('edit-dept') as HTMLInputElement).value;
              user.role = (document.getElementById('edit-role') as HTMLSelectElement).value;
              renderTable();
              showToast('تم تحديث بيانات المستخدم بنجاح', 'success');
            }
          );
        }
      });
    });

    document.querySelectorAll('.del-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt((e.target as HTMLElement).getAttribute('data-id') || '0');
        const user = users.find(u => u.id === id);
        if (user) {
          showModal(
            'تأكيد الحذف',
            `<p>هل أنت متأكد من حذف المستخدم <strong>${user.name}</strong>؟ لا يمكن التراجع عن هذا الإجراء.</p>`,
            () => {
              users = users.filter(u => u.id !== id);
              renderTable();
              showToast('تم حذف المستخدم بنجاح', 'success');
            }
          );
        }
      });
    });
  }

  document.getElementById('user-search')?.addEventListener('input', (e) => {
    searchTerm = (e.target as HTMLInputElement).value;
    renderTable();
  });

  document.querySelectorAll('.role-filters .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.role-filters .btn').forEach(b => b.classList.remove('active'));
      const target = e.target as HTMLElement;
      target.classList.add('active');
      currentRoleFilter = target.getAttribute('data-role') || 'الكل';
      renderTable();
    });
  });

  document.getElementById('btn-add-user')?.addEventListener('click', () => {
    showModal(
      'إضافة مستخدم جديد',
      `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 8px;">الاسم</label>
            <input type="text" id="add-name" class="input" placeholder="اسم المستخدم">
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px;">البريد الإلكتروني</label>
            <input type="email" id="add-email" class="input" placeholder="email@gov.sa">
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px;">الإدارة</label>
            <input type="text" id="add-dept" class="input" placeholder="مثال: تقنية المعلومات">
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px;">الدور</label>
            <select id="add-role" class="input">
              <option>قائد</option>
              <option>مدير</option>
              <option selected>محلل بيانات</option>
            </select>
          </div>
        </div>
      `,
      () => {
        const name = (document.getElementById('add-name') as HTMLInputElement).value;
        const email = (document.getElementById('add-email') as HTMLInputElement).value;
        const dept = (document.getElementById('add-dept') as HTMLInputElement).value;
        const role = (document.getElementById('add-role') as HTMLSelectElement).value;

        if (name && email) {
          users.unshift({ id: nextId++, name, email, role, dept, status: 'نشط', lastLogin: 'لم يسجل دخول' });
          renderTable();
          showToast('تمت إضافة المستخدم بنجاح', 'success');
        }
      }
    );
  });

  renderTable();
}