from fastapi import FastAPI

app = FastAPI(
    title="SafeClick API",
    description="SafeClick backend services",
    version="1.0.0"
)

@app.get("/")
def read_root():
    return {"message": "SafeClick API is running successfully!"}
