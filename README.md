# 🌿 LeafDisease — Plant Disease Detection

A full-stack web app that uses a **MobileNetV2 deep learning model** to detect plant leaf diseases from photos. Built with **React (frontend)** + **Flask + PyTorch (backend)**.

---

## 📁 Project Structure

```
leaf-disease-app/
├── backend/
│   ├── app.py              # Flask API server
│   ├── train.py            # Model training script
│   ├── requirements.txt    # Python dependencies
│   └── data/               # (you add this) PlantVillage dataset
│       ├── train/
│       │   ├── Apple___Apple_scab/
│       │   ├── Apple___healthy/
│       │   └── ... (15 folders)
│       └── val/
│           └── ... (same 15 folders)
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        └── components/
            ├── Header.jsx
            ├── Hero.jsx
            ├── Uploader.jsx
            ├── ResultCard.jsx
            ├── HowItWorks.jsx
            ├── DiseaseLibrary.jsx
            └── Footer.jsx
```

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate 

# Windows: 
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server (demo mode — random weights)
python app.py
```

The Flask API runs on **http://localhost:5000**

> **Note:** Without training, the model uses random weights and predictions will be random. See the Training section below to use a real model.

---

### 2. Frontend Setup

```bash
cd frontend

# Install npm packages
npm install

# Start development server
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 🧠 Training the Model

### Step 1 — Get the Dataset

Download the **PlantVillage Dataset** from Kaggle:
👉 https://www.kaggle.com/datasets/emmarex/plantdisease

### Step 2 — Organize the Data

Split into train/val folders (80/20 split). The folder names must match exactly:

```
data/
  train/
    Apple___Apple_scab/
    Apple___Black_rot/
    Apple___Cedar_apple_rust/
    Apple___healthy/
    Corn___Cercospora_leaf_spot/
    Corn___Common_rust/
    Corn___Northern_Leaf_Blight/
    Corn___healthy/
    Potato___Early_blight/
    Potato___Late_blight/
    Potato___healthy/
    Tomato___Bacterial_spot/
    Tomato___Early_blight/
    Tomato___Late_blight/
    Tomato___healthy/
  val/
    (same 15 folders)
```

### Step 3 — Train

```bash
cd backend
python train.py
```

Training runs for 20 epochs with data augmentation. The best model is saved as `leaf_disease_model.pth`.

**Expected results:** ~93–96% validation accuracy with a GPU, ~85–90% on CPU.

### Step 4 — Restart the Server

```bash
python app.py
```

It will automatically detect and load `leaf_disease_model.pth`.

---

## 🔌 API Endpoints

| Method | Endpoint    | Description                        |
|--------|-------------|------------------------------------|
| GET    | `/health`   | Server health check                |
| POST   | `/predict`  | Upload image → get disease result  |
| GET    | `/classes`  | List all 15 supported classes      |

### Example — POST /predict

```bash
curl -X POST http://localhost:5000/predict \
  -F "image=@my_leaf.jpg"
```

**Response:**
```json
{
  "success": true,
  "prediction": "Tomato___Late_blight",
  "display_name": "Tomato Late Blight",
  "plant": "Tomato",
  "severity": "Critical",
  "confidence": 94.3,
  "description": "Caused by Phytophthora infestans...",
  "treatment": ["Apply metalaxyl fungicides...", "..."],
  "prevention": "Avoid wetting foliage...",
  "top3": [...],
  "thumbnail": "data:image/jpeg;base64,..."
}
```

---

## 🌿 Supported Disease Classes

| Plant   | Disease                    | Severity |
|---------|----------------------------|----------|
| Apple   | Apple Scab                 | Moderate |
| Apple   | Black Rot                  | High     |
| Apple   | Cedar Apple Rust           | Moderate |
| Apple   | Healthy                    | None     |
| Corn    | Gray Leaf Spot             | Moderate |
| Corn    | Common Rust                | Moderate |
| Corn    | Northern Leaf Blight       | High     |
| Corn    | Healthy                    | None     |
| Potato  | Early Blight               | Moderate |
| Potato  | Late Blight                | Critical |
| Potato  | Healthy                    | None     |
| Tomato  | Bacterial Spot             | Moderate |
| Tomato  | Early Blight               | Moderate |
| Tomato  | Late Blight                | Critical |
| Tomato  | Healthy                    | None     |

---

## 🛠️ Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Frontend   | React 18, Vite, CSS Variables |
| Backend    | Flask, Flask-CORS             |
| ML Model   | PyTorch, MobileNetV2          |
| Image Proc | Pillow, torchvision           |
| Dataset    | PlantVillage (Kaggle)         |

---


