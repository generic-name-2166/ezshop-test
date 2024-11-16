from typing import Any
from fastapi import FastAPI, UploadFile
from fastapi.staticfiles import StaticFiles
import os
import json
import shutil


app: FastAPI = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

DATA_FILE = "data.json"
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        json.dump({"products": []}, f)

FRONT_DIR = "out"
app.mount("/", StaticFiles(directory=FRONT_DIR, html=True), name="frontend")
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


def load_data() -> dict[str, Any]:
    with open(DATA_FILE, "r") as f:
        return json.load(f)  # pyright: ignore[reportAny]


def save_data(data: dict[str, Any]):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)


# GET Endpoint: List all products
@app.get("/api/products")
def get_products() -> Any:  # pyright: ignore[reportAny]
    data = load_data()
    return data["products"]  # pyright: ignore[reportAny]


# POST Endpoint: Upload a new product
@app.post("/api/products")
async def create_product(
    product_name: str,
    product_desc: str,
    files: list[UploadFile],
):
    data = load_data()

    image_urls: list[str] = []
    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename or "image")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        image_urls.append(f"/{UPLOAD_DIR}/{file.filename}")

    product: dict[str, str | list[str]] = {
        "name": product_name,
        "description": product_desc,
        "image_urls": image_urls,
    }

    data["products"].append(product)  # pyright: ignore[reportAny]
    save_data(data)
