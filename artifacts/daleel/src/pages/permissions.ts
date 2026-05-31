import { mockData } from '../data';
import { showToast } from '../components/toast';
import { showModal } from '../components/modal';

export function renderPermissions(container: HTMLElement) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <div>
        <h1>إدارة الصلاحيات</h1>
        <p>إدارة المستخدمين وصلاحيات الوصول للنظام</p>
      </div>
      <button class="btn btn-primary" id="btn-add-user">إضافة مستخدم ➕</button>
    </div>

    <div class="card table-container">
      <table>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد الإلكتروني</th>
            <th>الدور</th>
            <th>الحالة</th>
            <th>آخر دخول</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          ${mockData.users.map(user => {
            let roleBadge = 'badge-blue';
            if (user.role === 'قائد') roleBadge = 'badge-green';
            if (user.role === 'محلل بيانات') roleBadge = 'badge-orange';
            
            return `
              <tr>
                <td style="font-weight: 500;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-border); display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--color-primary);">
                      ${user.name.charAt(0)}
                    </div>
                    ${user.name}
                  </div>
                </td>
                <td style="color: var(--color-muted);">${user.email}</td>
                <td><span class="badge ${roleBadge}">${user.role}</span></td>
                <td><span class="badge badge-green">نشط</span></td>
                <td style="color: var(--color-muted);">${user.lastLogin}</td>
                <td>
                  <div style="display: flex; gap: 8px;">
                    <button class="btn btn-secondary edit-btn" style="padding: 4px 8px; font-size: 12px;" data-name="${user.name}">تعديل</button>
                    <button class="btn btn-secondary del-btn" style="padding: 4px 8px; font-size: 12px; color: var(--color-danger);">حذف</button>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;

  document.getElementById('btn-add-user')?.addEventListener('click', () => {
    showModal(
      'إضافة مستخدم جديد',
      `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 8px;">الاسم</label>
            <input type="text" class="input" placeholder="اسم المستخدم">
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px;">البريد الإلكتروني</label>
            <input type="email" class="input" placeholder="email@gov.sa">
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px;">الدور</label>
            <select class="input">
              <option>قائد</option>
              <option>مدير</option>
              <option>محلل بيانات</option>
            </select>
          </div>
        </div>
      `,
      () => {
        showToast('تمت إضافة المستخدم بنجاح', 'success');
      }
    );
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = (e.target as HTMLElement).getAttribute('data-name');
      showModal(
        'تعديل الصلاحيات',
        `
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <p>تعديل صلاحيات المستخدم: <strong>${name}</strong></p>
            <div>
              <label style="display: block; margin-bottom: 8px;">الدور</label>
              <select class="input">
                <option>قائد</option>
                <option>مدير</option>
                <option>محلل بيانات</option>
              </select>
            </div>
          </div>
        `,
        () => {
          showToast('تم تحديث الصلاحيات بنجاح', 'success');
        }
      );
    });
  });

  document.querySelectorAll('.del-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      showModal(
        'تأكيد الحذف',
        '<p>هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.</p>',
        () => {
          const tr = (e.target as HTMLElement).closest('tr');
          if (tr) {
            tr.remove();
            showToast('تم حذف المستخدم بنجاح', 'success');
          }
        }
      );
    });
  });
}
