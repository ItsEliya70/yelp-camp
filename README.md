# 🏕️ YelpCamp

YelpCamp is a full-stack web application inspired by Yelp, where users can create, review, and explore campgrounds.  
Built with Node.js, Express, MongoDB, and EJS, the app includes authentication, image uploads, and interactive maps.

[Live Demo](https://yelp-camp-5ttx.onrender.com/)

---

## 🌟 Features

- 🏞️ Create, view, edit, and delete campgrounds  
- 📸 Upload images (stored on **Cloudinary**)  
- 🧭 Display campground locations on a map (**Mapbox API**)  
- 💬 Add, edit, and delete reviews for each campground  
- 🔐 User authentication with **Passport.js**  
- ⚙️ Input validation with **Joi**  
- 🧱 Responsive design using **Bootstrap 5**  
- 🗃️ MongoDB (local or Atlas) database integration  

---

## 🧠 Technologies Used

**Frontend:**
- EJS (Embedded JavaScript Templates)
- Bootstrap 5
- Vanilla JavaScript

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose ORM
- Passport.js (Local Strategy)
- Cloudinary (image storage)
- Mapbox (maps and geocoding)
- Joi (schema validation)
- connect-flash & express-session

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/yelp-camp.git
cd yelp-camp
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a `.env` file  
In the root folder, create a `.env` file and fill in your credentials as shown below:

```env
MONGO_URI=mongodb://localhost:27017/yelp-camp
MAPBOX_TOKEN=your_mapbox_token
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

> 🧩 You can also check `.env.example` for reference.

### 4. Run MongoDB locally
Make sure MongoDB is running on your machine:
```bash
mongod
```

### 5. Start the server
```bash
npm start
```
or (for development with auto-reload)
```bash
npx nodemon app.js
```

Then open:
```
http://localhost:3000
```

---

## 🧭 Project Structure

```
yelp-camp/
├── app.js
├── models/
│   ├── campground.js
│   ├── review.js
│   └── user.js
├── routes/
│   ├── campgrounds.js
│   ├── reviews.js
│   └── users.js
├── public/
│   ├── stylesheets/
│   └── scripts/
├── views/
│   ├── campgrounds/
│   ├── users/
│   ├── partials/
│   └── layouts/
├── utils/
│   ├── catchAsync.js
│   ├── ExpressError.js
│   └── middleware.js
├── seeds/
│   └── index.js
└── .env.example
```

---

## 🧑‍💻 Scripts

| Command | Description |
|----------|-------------|
| `npm start` | Start the app |
| `npm run dev` | Start with Nodemon (dev mode) |
| `seed:db` | (Optional) Populate DB with sample campgrounds |

---

## 🧩 Future Improvements

- 🌍 Deploy on Render / Railway / Vercel  
- 💾 Use MongoDB Atlas instead of local DB  
- 💌 Add password reset & email verification  
- 🗺️ Filter campgrounds by location and rating  

---

## 🛠️ Known Issues / Fixes
- Some minor validation edge cases are still being refined  
- Custom styling tweaks and UI improvements in progress  

---


## 👨‍💻 Author

**Eliya Noah**  
📧 [eliyanoah70@gmail.com]  
💻 [GitHub Profile](https://github.com/ItsEliya70)
