from PIL import Image

def remove_green_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    
    # More aggressive green removal
    # We look for pixels where Green is significantly dominant
    for item in datas:
        r, g, b, a = item
        
        # Condition: Green is dominant channel AND Green is bright enough
        # This catches pure green, but also "mixed" green edges
        # Adjusted thresholds to "remove a bit more" of the edge
        if g > 100 and g > r + 30 and g > b + 30:
            newData.append((255, 255, 255, 0)) # Transparent
        else:
            newData.append(item)

    img.putdata(newData)
    
    # Optional: basic erosion to clean edges further (using a simple local check or just the aggressive threshold above)
    # The aggressive chromatic check is usually safer than morphological erosion on raw pixels without numpy
    
    img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    remove_green_background(
        "/home/sravan/.gemini/antigravity/brain/55762623-55d2-416b-8887-d6edf2b3cab0/profile_green_screen_v2_1768424959245.png",
        "/home/sravan/dev/portfolio/public/profile_subject_v4.png"
    )
