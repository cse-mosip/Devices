from PIL import Image
import sys

try:
    output_path = "./helpers/finger.jpg"
    with Image.open("./helpers/finger.jp2") as img:
        img.convert("RGB").save(output_path, "JPEG")
        print(f"Image successfully converted to JPG format: {output_path}")
except Exception as e:
    print(f"An error occurred: {e}")

sys.stdout.flush()