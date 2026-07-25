from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time
import pandas as pd

# Chrome Driver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Cafe Page
driver.get("https://www.justdial.com/Bhopal/Cafes")

time.sleep(5)

# Auto Scroll
last_height = driver.execute_script("return document.body.scrollHeight")

for _ in range(30):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(3)

    new_height = driver.execute_script("return document.body.scrollHeight")

    if new_height == last_height:
        break

    last_height = new_height

# Scrape Data
cafes = driver.find_elements(
    By.CSS_SELECTOR,
    "span.resultbox_title_anchor"
)

addresses = driver.find_elements(
    By.CSS_SELECTOR,
    "div.locatcity"
)

phones = driver.find_elements(
    By.CSS_SELECTOR,
    "span.callcontent"
)

print("Total Cafes:", len(cafes))
print("Total Addresses:", len(addresses))
print("Total Phones:", len(phones))

data = []

for i in range(min(len(cafes), len(addresses), len(phones))):
    data.append({
        "Business Name": cafes[i].text,
        "Category": "Cafe",
        "City": "Bhopal",
        "Address": addresses[i].text,
        "Phone": phones[i].text,
        "Source": "Justdial"
    })

    print("----------------------------")
    print("Cafe :", cafes[i].text)
    print("Address :", addresses[i].text)
    print("Phone :", phones[i].text)

# Save CSV
df = pd.DataFrame(data)
df.to_csv("cafes.csv", index=False)

print("Cafes CSV Saved Successfully ✅")

input("Press Enter to close...")

driver.quit()