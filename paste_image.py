import sys
import os
import subprocess
import datetime

project_dir = os.path.dirname(os.path.abspath(__file__))
images_dir = os.path.join(project_dir, "frontend", "assets", "Images")
os.makedirs(images_dir, exist_ok=True)

filename = sys.argv[1] if len(sys.argv) > 1 else None
if not filename:
    ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"image_{ts}.png"

if not os.path.splitext(filename)[1]:
    filename += ".png"

out_path = os.path.join(images_dir, filename)

# PowerShell script to save clipboard image directly to out_path
ps_cmd = f"""
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
if ([System.Windows.Forms.Clipboard]::ContainsImage()) {{
    $img = [System.Windows.Forms.Clipboard]::GetImage()
    $img.Save('{out_path}', [System.Drawing.Imaging.ImageFormat]::Png)
    $img.Dispose()
    Write-Output "SUCCESS"
}} else {{
    Write-Output "NO_IMAGE"
}}
"""

res = subprocess.run(["powershell", "-NoProfile", "-Command", ps_cmd], capture_output=True, text=True)
output = res.stdout.strip()

if "SUCCESS" in output:
    print(f"\n[OK] Image successfully saved from clipboard to:")
    print(f"     frontend/assets/Images/{filename}")
    print(f"\nUsage in HTML:")
    print(f'     <img src="../assets/Images/{filename}" alt="Image">')
    print(f"\nUsage in CSS:")
    print(f'     background: url("../assets/Images/{filename}") center / cover no-repeat;')
elif "NO_IMAGE" in output:
    print("\n[!] No image was found in your clipboard.")
    print("    Copy an image first (e.g. right-click image -> 'Copy Image', or take a screenshot), then run this tool!")
else:
    print("\n[!] Error:", res.stderr.strip() or output)
