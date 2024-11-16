from typing import Annotated, Any
from fastapi import FastAPI, File, Form, UploadFile
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
        json.dump({"products": []}, f, indent=2)


def load_data() -> dict[str, Any]:
    with open(DATA_FILE, "r") as f:
        return json.load(f)  # pyright: ignore[reportAny]


def save_data(data: dict[str, Any]):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)


# GET Endpoint: List all products
@app.get("/api/products")
def get_products() -> Any:  # pyright: ignore[reportAny]
    data = load_data()
    return data["products"]  # pyright: ignore[reportAny]


# POST Endpoint: Upload a new product
@app.post("/api/products")
async def create_product(
    product_name: Annotated[str, Form()],
    product_desc: Annotated[str, Form()],
    files: Annotated[list[UploadFile], File()],
) -> None:
    data = load_data()

    urls: list[str] = []
    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename or "image")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        urls.append(f"/{UPLOAD_DIR}/{file.filename}")

    product: dict[str, str | list[str]] = {
        "name": product_name,
        "description": product_desc,
        "urls": urls,
    }

    data["products"].append(product)  # pyright: ignore[reportAny]
    save_data(data)


app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
# After everything so that it takes the lowest precedence
FRONT_DIR = "out"
app.mount("/", StaticFiles(directory=FRONT_DIR, html=True), name="frontend")
