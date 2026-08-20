# เว็บไซต์แผนกไฟฟ้ากำลัง (Docker Multi-Container)

โปรเจกต์นี้แบ่งเป็น 5 containers ตามโจทย์ในสไลด์:

| Service    | Container   | Port ภายใน | Port ภายนอก |
|------------|-------------|------------|-------------|
| Frontend   | frontend    | 80         | 8080        |
| Backend    | backend     | 80         | 8081        |
| API        | api         | 80         | ไม่เปิด      |
| MySQL      | mysql       | 3306       | ไม่เปิด      |
| phpMyAdmin | phpmyadmin  | 80         | 8082 (เฉพาะกลุ่ม) |

## วิธีรัน

ต้องติดตั้ง Docker และ Docker Compose ก่อน จากนั้นรันที่โฟลเดอร์นี้:

```bash
docker compose up --build
```

เมื่อรันสำเร็จ เปิดดูได้ที่:

- **หน้าบ้าน (3D)**: http://localhost:8080
- **หลังบ้าน (เว็บแผนก)**: http://localhost:8081
- **phpMyAdmin** (เฉพาะกลุ่มดูแลระบบ): http://localhost:8082
  - user: `dept_user` / password: `dept_pass`

## โครงสร้างระบบ

- **frontend** — เว็บ 3D (Three.js) แสดงหม้อแปลงไฟฟ้ากำลัง เสาส่งไฟฟ้าแรงสูง และกระแสไฟฟ้าที่วิ่งบนสายส่งแบบเรียลไทม์ ใช้ Nginx เป็น web server และ reverse-proxy คำขอ `/api/*` ไปยัง container `api` ภายใน network เดียวกัน (เพราะ api ไม่เปิด port ออกสู่ภายนอก)
- **backend** — เว็บไซต์แผนก (Express + EJS) หน้าเกี่ยวกับสาขา / บุคลากร / ติดต่อ และหน้าแรกที่ดึงข่าวสารจาก `api`
- **api** — REST API (Express + MySQL) จัดการข้อมูลข่าวสาร (`/news`) แบบ CRUD เต็มรูปแบบ
- **mysql** — ฐานข้อมูล `dept_power` มีตาราง `news` และ `staff` พร้อมข้อมูลตัวอย่าง
- **phpmyadmin** — เครื่องมือจัดการฐานข้อมูลสำหรับกลุ่มผู้ดูแลเท่านั้น

## API ตัวอย่าง

```
GET    /news        รายการข่าวทั้งหมด
GET    /news/:id     ข่าวรายชิ้น
POST   /news         เพิ่มข่าว { title, summary, body, voltage_tag }
PUT    /news/:id     แก้ไขข่าว
DELETE /news/:id     ลบข่าว
```

(เข้าถึงจากภายนอกไม่ได้โดยตรง เพราะ api ไม่เปิด port — ต้องเรียกผ่าน frontend ที่ `/api/news` หรือจาก backend ผ่าน network ภายใน)
