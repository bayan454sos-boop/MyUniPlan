import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("myuniplan.db");

// Initialize database
db.exec(`
  DROP TABLE IF EXISTS staff;
  DROP TABLE IF EXISTS seniors;

  CREATE TABLE IF NOT EXISTS course_details (
    code TEXT PRIMARY KEY,
    description_en TEXT,
    description_ar TEXT,
    instructor_email TEXT
  );

  CREATE TABLE IF NOT EXISTS staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_en TEXT,
    name_ar TEXT,
    role_en TEXT,
    role_ar TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    type TEXT -- 'instructor' or 'admin'
  );

  CREATE TABLE IF NOT EXISTS seniors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_en TEXT,
    name_ar TEXT,
    major_en TEXT,
    major_ar TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    is_available BOOLEAN DEFAULT 1
  );

  -- Seed some data if empty
  INSERT OR IGNORE INTO course_details (code, description_en, description_ar, instructor_email)
  VALUES 
    ('EDEF1102', 'Foundational concepts in education and pedagogy.', 'المفاهيم التأسيسية في التربية وطرق التدريس.', 'edef1102@utas.edu.om'),
    ('EDEN1101', 'Advanced study of English grammar and structural awareness.', 'دراسة متقدمة لقواعد اللغة الإنجليزية والوعي الهيكلي.', 'eden1101@utas.edu.om'),
    ('EDEN1102', 'Developing advanced listening and speaking competencies.', 'تطوير كفايات الاستماع والتحدث المتقدمة.', 'eden1102@utas.edu.om'),
    ('EDEN1207', 'Introduction to the scientific study of language.', 'مقدمة في الدراسة العلمية للغة.', 'eden1207@utas.edu.om'),
    ('EDPR3109', 'First practical teaching experience in a school setting.', 'أول تجربة تدريس عملية في بيئة مدرسية.', 'practicum@utas.edu.om');

  -- Seed staff data if empty
  INSERT OR IGNORE INTO staff (name_en, name_ar, role_en, role_ar, email, phone, type) VALUES
    ('Dr. Sharifa', 'د. شريفة العدوية', 'Department Instructor', 'محاضر بالقسم', 'sharifa.aladawi@utas.edu.om', '', 'instructor'),
    ('Dr. Abdullah', 'د. عبد الله العبري', 'Department Instructor', 'محاضر بالقسم', 'abdullah.alabri@utas.edu.om', '', 'instructor'),
    ('Muna Al-Ghafri', 'أ. منى الغافرية', 'Head of Admission & Registration', 'رئيسة مركز القبول والتسجيل', 'a.r.c-rustaq@utas.edu.om', '26774968', 'admin'),
    ('Bader Al-Ghafri', 'أ. بدر الغافري', 'Biology Specialization (SIS + CIMS)', 'مواضيع تخصص الأحياء (SIS + CIMS)', 'bader.alghafri@utas.edu.om', '26774964', 'admin'),
    ('Mohamed Al-Fouri', 'أ. محمد الفوري', 'Physics Specialization (SIS + CIMS)', 'مواضيع تخصص الفيزياء (SIS + CIMS)', 'mohamed.alfori@utas.edu.om', '26774934', 'admin'),
    ('Younis Al-Nofli', 'أ. يونس النوفلي', 'Math Specialization (SIS + CIMS)', 'مواضيع تخصص الرياضيات (SIS + CIMS)', 'younis.alnofli@utas.edu.om', '26774966', 'admin'),
    ('Fatma Al-Khatri', 'أ. فاطمة الخاطرية', 'Chemistry Specialization (SIS + CIMS)', 'مواضيع تخصص الكيمياء (SIS + CIMS)', 'fatma.alkhatri@utas.edu.om', '26774967', 'admin'),
    ('Eman Al-Hinai', 'أ. إيمان الهنائية', 'English Specialization (CIMS only)', 'مواضيع تخصص اللغة الإنجليزية (CIMS فقط)', 'eman.s.alhinai@utas.edu.om', '26774871', 'admin'),
    ('Khamis Al-Abri', 'أ. خميس العبري', 'English (SIS only) + Scheduling & Exams', 'مواضيع تخصص اللغة الإنجليزية (SIS فقط) + قسم الجدولة والاختبارات', 'khamis.alabri@utas.edu.om', '26774969', 'admin'),
    ('Zahra Al-Abri', 'أ. زهرة العبرية', 'Scheduling & Exams', 'قسم الجدولة والاختبارات', 'zahra.alabri@utas.edu.om', '26774965', 'admin');

  -- Seed seniors data if empty
  INSERT OR IGNORE INTO seniors (name_en, name_ar, major_en, major_ar, email, phone, is_available) VALUES
    ('Bayan', 'بيان', 'English Language Teaching', 'تدريس اللغة الإنجليزية', '1663s22119@utas.edu.om', '', 1),
    ('Noor Al-Huda', 'نور الهدى', 'English Language Teaching', 'تدريس اللغة الإنجليزية', '1633s2259@utas.edu.om', '', 1),
    ('Ariyam', 'أريام', 'English Language Teaching', 'تدريس اللغة الإنجليزية', '2021161081@utas.edu.om', '', 1),
    ('Wedad', 'وداد', 'English Language Teaching', 'تدريس اللغة الإنجليزية', '1633s2274@utas.edu.om', '', 1);
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/course-details/:code", (req, res) => {
    const row = db.prepare("SELECT * FROM course_details WHERE code = ?").get(req.params.code);
    res.json(row || {});
  });

  app.post("/api/course-details", (req, res) => {
    const { code, description_en, description_ar, instructor_email } = req.body;
    db.prepare(`
      INSERT INTO course_details (code, description_en, description_ar, instructor_email)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(code) DO UPDATE SET
        description_en = excluded.description_en,
        description_ar = excluded.description_ar,
        instructor_email = excluded.instructor_email
    `).run(code, description_en, description_ar, instructor_email);
    res.json({ success: true });
  });

  app.get("/api/staff", (req, res) => {
    const rows = db.prepare("SELECT * FROM staff").all();
    res.json(rows);
  });

  app.post("/api/staff", (req, res) => {
    const { name_en, name_ar, role_en, role_ar, email, phone, type } = req.body;
    db.prepare(`
      INSERT INTO staff (name_en, name_ar, role_en, role_ar, email, phone, type)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(name_en, name_ar, role_en, role_ar, email, phone, type);
    res.json({ success: true });
  });

  app.get("/api/seniors", (req, res) => {
    const rows = db.prepare("SELECT * FROM seniors WHERE is_available = 1").all();
    res.json(rows);
  });

  app.post("/api/seniors", (req, res) => {
    const { name_en, name_ar, major_en, major_ar, email, phone } = req.body;
    db.prepare(`
      INSERT INTO seniors (name_en, name_ar, major_en, major_ar, email, phone)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name_en, name_ar, major_en, major_ar, email, phone);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
