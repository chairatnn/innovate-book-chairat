📚 Innovate Book Management System

Innovate Book แพลตฟอร์มบริหารจัดการหนังสือแบบ Full-stack ที่ออกแบบมาเพื่อการใช้งาน โดยมุ่งเน้นที่ประสิทธิภาพการจัดการข้อมูลขนาดใหญ่และการรักษาความปลอดภัยที่เป็นมาตรฐาน

✨ Key Features

🔐 Secure Authentication: ระบบสมาชิกและเข้าสู่ระบบด้วย JWT (JSON Web Token) พร้อมการป้องกัน Route สำคัญ

📱 Fully Responsive: การออกแบบที่รองรับทุกหน้าจอ (Mobile, Tablet, Desktop) ด้วย Tailwind CSS

📄 Server-side Pagination: ระบบแบ่งหน้าข้อมูลที่มีประสิทธิภาพ ช่วยลด Latency เมื่อมีข้อมูลหนังสือจำนวนมาก

🔄 State Management: การจัดการ Loading และ Error States ที่ชัดเจน เพื่อ UX ที่ดีเยี่ยม

🛠 Full CRUD Operations: ระบบจัดการข้อมูลหนังสือ (เพิ่ม, อ่าน, แก้ไข, ลบ) อย่างครบถ้วน

🛠 Tech Stack

    Frontend

        Core: React.js

        Styling: Tailwind CSS (Modern & Responsive UI)

        State Management: React Hooks

        API Client: Axios

    Backend

        Runtime: Node.js

        Framework: Express.js

        Database: MongoDB with Mongoose (ODM)

        Security: JWT, bcryptjs (Password Hashing)

        Logging: Morgan / Custom Error Middleware

🚀 Getting Started

    Prerequisites

        Node.js (v14.x or higher)

        MongoDB Atlas Account หรือ Local Instance

    Installation

        1.Clone the repository

        Bash
        git clone https://github.com/chairatnn/innovate-book-chairat.git
        cd innovate-book-chairat
        
        2.Setup Backend

        Bash
        cd server # หรือชื่อโฟลเดอร์ backend ของคุณ
        npm install

        สร้างไฟล์ .env และกำหนดค่าดังนี้:

        ข้อมูลโค้ด
            PORT=3000
            MONGO_URI=your_mongodb_connection_string
            JWT_SECRET=your_secret_key

        3.Setup Frontend

        Bash
        cd client # หรือชื่อโฟลเดอร์ frontend ของคุณ
        npm install
        npm start

📁 Project Structure

        Plaintext
        ├── client/              # React Frontend
        │   ├── src/
        │   │   ├── components/  # Reusable UI Components
        │   │   ├── pages/       # Page Views
        │   │   └── services/    # API Interaction
        ├── server/              # Node.js Backend
        │   ├── controllers/     # Business Logic
        │   ├── models/          # MongoDB Schemas
        │   ├── routes/          # API Endpoints
        │   └── middleware/      # Auth & Error Handling

🛡️ API Documentation

สำหรับรายละเอียด Endpoints ทั้งหมด โปรดดูที่ไฟล์ API_DOC.md

📈 Future Roadmap

[ ] ระบบค้นหาแบบ Full-text Search ด้วย AI Vector Search

[ ] ฟีเจอร์ Upload รูปภาพหน้าปกหนังสือ (Cloudinary Integration)

[ ] ระบบแนะนำหนังสือ (Recommendation System) ตามความสนใจของผู้ใช้

👤 Author

Chairat N.

GitHub: https://github.com/chairatnn

Experience: Software Developer & Project Manager (10+ years)