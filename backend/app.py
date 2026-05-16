from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import io
import base64
import os

app = Flask(__name__)
CORS(app)

DISEASE_CLASSES = [
    "Pepper__bell___Bacterial_spot",
    "Pepper__bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Tomato_Bacterial_spot",
    "Tomato_Early_blight",
    "Tomato_Late_blight",
    "Tomato_Leaf_Mold",
    "Tomato_Septoria_leaf_spot",
    "Tomato_Spider_mites_Two_spotted_spider_mite",
    "Tomato__Target_Spot",
    "Tomato__Tomato_YellowLeaf__Curl_Virus",
    "Tomato__Tomato_mosaic_virus",
    "Tomato_healthy",
]

NUM_CLASSES = len(DISEASE_CLASSES)

DISEASE_INFO = {
    "Pepper__bell___Bacterial_spot": {
        "display": "Pepper Bacterial Spot", "plant": "Pepper", "severity": "Moderate",
        "description": "Caused by Xanthomonas bacteria. Creates dark, water-soaked spots on leaves and fruit.",
        "treatment": ["Apply copper-based bactericides", "Remove infected plant material", "Avoid overhead irrigation", "Disinfect garden tools between plants"],
        "prevention": "Use disease-free transplants. Apply copper sprays during warm, wet weather.",
    },
    "Pepper__bell___healthy": {
        "display": "Healthy Pepper", "plant": "Pepper", "severity": "None",
        "description": "The pepper plant appears healthy with no signs of disease.",
        "treatment": [], "prevention": "Continue regular monitoring, proper watering, and fertilization.",
    },
    "Potato___Early_blight": {
        "display": "Potato Early Blight", "plant": "Potato", "severity": "Moderate",
        "description": "Caused by Alternaria solani. Dark brown lesions with concentric rings on older leaves.",
        "treatment": ["Apply chlorothalonil or mancozeb fungicides", "Remove and destroy infected plant material", "Ensure balanced fertilization", "Water at the base of plants"],
        "prevention": "Use certified disease-free seed potatoes. Avoid overhead irrigation.",
    },
    "Potato___Late_blight": {
        "display": "Potato Late Blight", "plant": "Potato", "severity": "Critical",
        "description": "Caused by Phytophthora infestans. Rapidly spreading dark patches. Caused the Irish Famine.",
        "treatment": ["Apply metalaxyl or cymoxanil fungicides IMMEDIATELY", "Remove and destroy all infected plant material", "Avoid working in field when plants are wet", "Harvest tubers early if infection is severe"],
        "prevention": "Plant resistant varieties. Apply protective fungicides during cool, wet weather.",
    },
    "Potato___healthy": {
        "display": "Healthy Potato", "plant": "Potato", "severity": "None",
        "description": "The potato plant appears healthy with no signs of disease.",
        "treatment": [], "prevention": "Use certified seed potatoes, practice crop rotation, and monitor regularly.",
    },
    "Tomato_Bacterial_spot": {
        "display": "Tomato Bacterial Spot", "plant": "Tomato", "severity": "Moderate",
        "description": "Caused by Xanthomonas species. Small dark spots with yellow halos on leaves.",
        "treatment": ["Apply copper-based bactericides", "Remove severely infected plants", "Avoid overhead irrigation", "Disinfect garden tools between plants"],
        "prevention": "Use disease-free transplants. Apply copper sprays preventively.",
    },
    "Tomato_Early_blight": {
        "display": "Tomato Early Blight", "plant": "Tomato", "severity": "Moderate",
        "description": "Caused by Alternaria solani. Target-board lesion pattern on older leaves.",
        "treatment": ["Apply chlorothalonil, mancozeb, or copper fungicides", "Remove infected lower leaves", "Mulch around plants to prevent soil splash", "Stake plants for better air circulation"],
        "prevention": "Water at soil level, not on foliage. Mulch to reduce soil splash.",
    },
    "Tomato_Late_blight": {
        "display": "Tomato Late Blight", "plant": "Tomato", "severity": "Critical",
        "description": "Caused by Phytophthora infestans. Large greasy dark patches on leaves and stems.",
        "treatment": ["Apply metalaxyl or cymoxanil fungicides immediately", "Remove and bag all infected plant material", "Do not compost infected material", "Consider removing entire plant if heavily infected"],
        "prevention": "Avoid wetting foliage. Apply protective fungicides in cool, humid conditions.",
    },
    "Tomato_Leaf_Mold": {
        "display": "Tomato Leaf Mold", "plant": "Tomato", "severity": "Moderate",
        "description": "Caused by Passalora fulva. Yellow patches on upper leaf surface with olive-green mold below.",
        "treatment": ["Improve air circulation between plants", "Apply fungicides (chlorothalonil)", "Reduce humidity especially in greenhouses", "Remove and destroy infected leaves"],
        "prevention": "Maintain low humidity. Space plants well for good airflow.",
    },
    "Tomato_Septoria_leaf_spot": {
        "display": "Tomato Septoria Leaf Spot", "plant": "Tomato", "severity": "Moderate",
        "description": "Caused by Septoria lycopersici. Small circular spots with dark borders and light centers.",
        "treatment": ["Apply copper or chlorothalonil fungicides", "Remove infected leaves immediately", "Avoid wetting foliage when watering", "Mulch around base to prevent soil splash"],
        "prevention": "Mulch soil to prevent splash. Rotate crops yearly.",
    },
    "Tomato_Spider_mites_Two_spotted_spider_mite": {
        "display": "Tomato Spider Mites", "plant": "Tomato", "severity": "High",
        "description": "Two-spotted spider mite infestation. Causes stippling, yellowing, and webbing on leaves.",
        "treatment": ["Apply miticides or insecticidal soap", "Spray plants with strong jets of water", "Introduce predatory mites", "Remove heavily infested leaves"],
        "prevention": "Keep plants well watered. Avoid dusty conditions. Monitor undersides of leaves regularly.",
    },
    "Tomato__Target_Spot": {
        "display": "Tomato Target Spot", "plant": "Tomato", "severity": "Moderate",
        "description": "Caused by Corynespora cassiicola. Circular lesions with concentric rings like a target board.",
        "treatment": ["Apply fungicides (azoxystrobin or chlorothalonil)", "Remove and destroy infected leaves", "Improve air circulation", "Avoid overhead irrigation"],
        "prevention": "Avoid overhead irrigation. Remove plant debris after harvest.",
    },
    "Tomato__Tomato_YellowLeaf__Curl_Virus": {
        "display": "Tomato Yellow Leaf Curl Virus", "plant": "Tomato", "severity": "Critical",
        "description": "A virus spread by whiteflies. Causes leaf curling, yellowing, and severe stunting of plants.",
        "treatment": ["No cure — remove and destroy infected plants immediately", "Control whitefly populations with insecticides or sticky traps", "Use reflective mulches to deter whiteflies", "Quarantine infected area to prevent spread"],
        "prevention": "Use virus-resistant varieties. Control whiteflies early. Use row covers on seedlings.",
    },
    "Tomato__Tomato_mosaic_virus": {
        "display": "Tomato Mosaic Virus", "plant": "Tomato", "severity": "High",
        "description": "A highly contagious virus causing mosaic patterns, leaf distortion, and reduced fruit yield.",
        "treatment": ["No cure — remove infected plants immediately", "Disinfect all tools with 10% bleach solution", "Wash hands thoroughly after handling infected plants", "Do not compost infected material"],
        "prevention": "Use resistant varieties. Never smoke near plants — tobacco carries the virus.",
    },
    "Tomato_healthy": {
        "display": "Healthy Tomato", "plant": "Tomato", "severity": "None",
        "description": "The tomato plant appears healthy with no signs of disease.",
        "treatment": [], "prevention": "Maintain consistent watering, provide good support, and monitor weekly.",
    },
}

# ── Model — no wrapper class, matches how train.py saved it ──
MODEL_PATH = "leaf_disease_model.pth"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = models.mobilenet_v2(weights=None)
model.classifier[1] = nn.Linear(model.last_channel, NUM_CLASSES)
model = model.to(device)

if os.path.exists(MODEL_PATH):
    model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
    print(f"✅ Loaded trained model from {MODEL_PATH}")
else:
    print("⚠️  No trained model found. Using random weights (demo mode).")

model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "device": str(device), "classes": NUM_CLASSES, "model_loaded": os.path.exists(MODEL_PATH)})

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400
    try:
        img = Image.open(io.BytesIO(file.read())).convert("RGB")
        input_tensor = transform(img).unsqueeze(0).to(device)
        with torch.no_grad():
            probabilities = torch.softmax(model(input_tensor), dim=1)[0]
        top3_probs, top3_indices = torch.topk(probabilities, 3)
        top3 = []
        for prob, idx in zip(top3_probs.tolist(), top3_indices.tolist()):
            cls = DISEASE_CLASSES[idx]
            info = DISEASE_INFO.get(cls, {})
            top3.append({"class": cls, "display": info.get("display", cls), "plant": info.get("plant", "Unknown"), "confidence": round(prob * 100, 2)})
        pred_class = DISEASE_CLASSES[top3_indices[0]]
        info = DISEASE_INFO.get(pred_class, {})
        thumb = img.resize((300, 300))
        buffer = io.BytesIO()
        thumb.save(buffer, format="JPEG", quality=85)
        thumb_b64 = base64.b64encode(buffer.getvalue()).decode()
        return jsonify({
            "success": True,
            "prediction": pred_class,
            "display_name": info.get("display", pred_class),
            "plant": info.get("plant", "Unknown"),
            "severity": info.get("severity", "Unknown"),
            "confidence": round(top3_probs[0].item() * 100, 2),
            "description": info.get("description", ""),
            "treatment": info.get("treatment", []),
            "prevention": info.get("prevention", ""),
            "top3": top3,
            "thumbnail": f"data:image/jpeg;base64,{thumb_b64}",
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/classes", methods=["GET"])
def get_classes():
    return jsonify({"classes": [{"id": cls, "display": DISEASE_INFO.get(cls, {}).get("display", cls), "plant": DISEASE_INFO.get(cls, {}).get("plant", "Unknown"), "severity": DISEASE_INFO.get(cls, {}).get("severity", "Unknown")} for cls in DISEASE_CLASSES], "total": NUM_CLASSES})

if __name__ == "__main__":
    app.run(debug=True, port=5000)